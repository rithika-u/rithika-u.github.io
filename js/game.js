// Pac-Man Valentine's Edition - Easy Mode
const GRID_SIZE = 15;  // Smaller cells to fit bigger board
const ROWS = 31;  // Bigger board
const COLS = 31;
const GHOST_COUNT = 4;  // Back to 4 ghosts - they'll be in corners now
const POWER_UP_DURATION = 10;

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.gameRunning = false;
    this.gamePaused = false;
    this.score = 0;
    this.lives = 5;  // More lives to start
    this.level = 1;
    
    this.pacMan = { x: 15, y: 15, direction: 0, nextDirection: 0, mouthOpen: true };
    this.ghosts = [];
    this.pellets = [];
    this.powerUps = [];
    this.projectiles = [];
    this.maze = [];
    
    this.powerUpActive = false;
    this.powerUpTime = 0;
    
    this.frameCount = 0;
    this.gameStartTime = 0;
    this.graceTime = 300;  // 5 seconds grace period
    this.gameOverMessage = '';
    this.pelletsRemaining = 0;
    
    this.initMaze();
    this.initGhosts();
    this.initPellets();
    this.setupKeyListeners();
  }

  initMaze() {
    const mazePattern = [
      "###############################",
      "#.....#.......#.......#.....#",
      "#.###.#.#####.#.#####.#.###.#",
      "#.#...#.#.....#.....#.#...#.#",
      "#.#.###.#.#########.#.###.#.#",
      "#.#.#...#.#.......#.#.#...#.#",
      "#.#.#.###.#.#####.#.#.#.###.#",
      "#...#.....#.#...#.#.#.......#",
      "#.#########.#.#.#.#.#########",
      "#.#...........#.#...........#",
      "#.#.#########.#.#########.#.#",
      "#...#.......#...#.......#...#",
      "#.###.#####.....#####.#.###.#",
      "#.#...#.......#.......#.#...#",
      "#.#.###.#####.#.#####.#.#.###",
      "#...#...#.....#.....#...#...#",
      "#####.#.#.###.#.###.#.#.#####",
      "#.....#.#.....#.....#.#.....#",
      "#.#########.###.#########.#.#",
      "#.#.......#.....#.......#.#.#",
      "#.#.#####.#.###.#.#####.#.#.#",
      "#...#...#.#...#.#...#...#...#",
      "#.###.#.#.###.#.###.#.#.###.#",
      "#.#...#.#.....#.....#.#...#.#",
      "#.#.###.#.#########.#.###.#.#",
      "#.#.....#.....#.....#.....#.#",
      "#.#################.#######.#",
      "#.....................#.....#",
      "#.#########################.#",
      "#.......................#...#",
      "###############################"
    ];

    this.maze = [];
    for (let y = 0; y < ROWS; y++) {
      this.maze[y] = [];
      for (let x = 0; x < COLS; x++) {
        this.maze[y][x] = mazePattern[y]?.[x] === '#' ? 1 : 0;
      }
    }
  }

  initGhosts() {
    const ghostColors = ['#FF0000', '#FFB6C1', '#00FFFF', '#FFB347'];
    // Place ghosts in 4 corners
    const startPositions = [[2, 2], [28, 2], [2, 28], [28, 28]];
    
    for (let i = 0; i < GHOST_COUNT; i++) {
      const [sx, sy] = startPositions[i];
      this.ghosts.push({
        x: sx,
        y: sy,
        startX: sx,
        startY: sy,
        color: ghostColors[i],
        moveCounter: 0,
        moveDelay: 8,  // Very slow - moves every 8 frames
        direction: 0,
      });
    }
  }

  initPellets() {
    this.pellets = [];
    for (let y = 1; y < ROWS - 1; y++) {
      for (let x = 1; x < COLS - 1; x++) {
        if (this.maze[y][x] === 0 && !(x === 9 && (y === 9 || y === 10))) {
          this.pellets.push({ x, y, eaten: false });
        }
      }
    }
    this.pelletsRemaining = this.pellets.filter(p => !p.eaten).length;
  }

  setupKeyListeners() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        this.pacMan.nextDirection = 0;
        e.preventDefault();
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        this.pacMan.nextDirection = 1;
        e.preventDefault();
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        this.pacMan.nextDirection = 2;
        e.preventDefault();
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        this.pacMan.nextDirection = 3;
        e.preventDefault();
      } else if (e.key === ' ') {
        e.preventDefault();
        this.toggleStart();
      } else if (e.key === 'p' || e.key === 'P') {
        this.togglePause();
      }
    });
  }

  update() {
    if (!this.gameRunning || this.gamePaused) return;

    this.updatePacMan();
    this.updateGhosts();
    this.updateProjectiles();
    this.updatePowerUp();
    this.checkCollisions();
    this.checkWinCondition();
    this.frameCount++;
  }

  updatePacMan() {
    const dirs = [[0, -1], [1, 0], [0, 1], [-1, 0]];
    
    // Try next direction first
    let [dx, dy] = dirs[this.pacMan.nextDirection];
    let newX = this.pacMan.x + dx;
    let newY = this.pacMan.y + dy;

    if (this.isWall(newX, newY)) {
      // If next direction blocked, try current direction
      [dx, dy] = dirs[this.pacMan.direction];
      newX = this.pacMan.x + dx;
      newY = this.pacMan.y + dy;
    }

    if (!this.isWall(newX, newY)) {
      this.pacMan.x = newX;
      this.pacMan.y = newY;
      this.pacMan.direction = this.pacMan.nextDirection;
    }

    if (this.frameCount % 4 === 0) {
      this.pacMan.mouthOpen = !this.pacMan.mouthOpen;
    }
  }

  updateGhosts() {
    // Grace period: ghosts don't move for first 5 seconds
    if (this.frameCount - this.gameStartTime < this.graceTime) {
      return;
    }

    for (let ghost of this.ghosts) {
      ghost.moveCounter++;
      if (ghost.moveCounter >= ghost.moveDelay) {
        ghost.moveCounter = 0;

        // Very simple ghost AI: mostly random, rarely chase
        if (Math.random() > 0.95) {
          // 5% of time: move toward Pac-Man
          const validMoves = this.getValidGhostMoves(ghost);
          if (validMoves.length > 0) {
            const best = validMoves.reduce((prev, curr) => {
              const prevDist = Math.hypot(prev.x - this.pacMan.x, prev.y - this.pacMan.y);
              const currDist = Math.hypot(curr.x - this.pacMan.x, curr.y - this.pacMan.y);
              return currDist < prevDist ? curr : prev;
            });
            ghost.x = best.x;
            ghost.y = best.y;
          }
        } else {
          // 95% random movement
          const validMoves = this.getValidGhostMoves(ghost);
          if (validMoves.length > 0) {
            const move = validMoves[Math.floor(Math.random() * validMoves.length)];
            ghost.x = move.x;
            ghost.y = move.y;
          }
        }
      }
    }
  }

  getValidGhostMoves(ghost) {
    const dirs = [[0, -1], [1, 0], [0, 1], [-1, 0]];
    const moves = [];

    for (const [dx, dy] of dirs) {
      const nx = ghost.x + dx;
      const ny = ghost.y + dy;
      if (!this.isWall(nx, ny)) {
        moves.push({ x: nx, y: ny });
      }
    }

    return moves;
  }

  updateProjectiles() {
    if (this.powerUpActive && this.frameCount % 4 === 0) {
      const dirs = [[0, -1], [1, 0], [0, 1], [-1, 0]];
      const [dx, dy] = dirs[this.pacMan.direction];
      this.projectiles.push({
        x: this.pacMan.x + dx * 1.5,
        y: this.pacMan.y + dy * 1.5,
        dx,
        dy,
      });
    }

    this.projectiles = this.projectiles.filter(proj => {
      proj.x += proj.dx;
      proj.y += proj.dy;
      return proj.x > 0 && proj.x < COLS && proj.y > 0 && proj.y < ROWS;
    });
  }

  updatePowerUp() {
    if (this.powerUpActive) {
      this.powerUpTime--;
      if (this.powerUpTime <= 0) {
        this.powerUpActive = false;
        this.powerUpTime = 0;
        this.updateUI();
      }
    }

    // Spawn power-ups frequently
    if (Math.random() < 0.005 && this.powerUps.length < 3) {
      const x = Math.floor(Math.random() * (COLS - 2)) + 1;
      const y = Math.floor(Math.random() * (ROWS - 2)) + 1;
      if (!this.isWall(x, y) && !(x === this.pacMan.x && y === this.pacMan.y)) {
        this.powerUps.push({ x, y });
      }
    }
  }

  checkCollisions() {
    // Check power-up collision
    for (let i = this.powerUps.length - 1; i >= 0; i--) {
      if (this.pacMan.x === this.powerUps[i].x && this.pacMan.y === this.powerUps[i].y) {
        this.powerUps.splice(i, 1);
        this.powerUpActive = true;
        this.powerUpTime = POWER_UP_DURATION * 60;
        this.score += 50;
        this.updateUI();
      }
    }

    // Check pellet collision
    for (let pellet of this.pellets) {
      if (!pellet.eaten && this.pacMan.x === pellet.x && this.pacMan.y === pellet.y) {
        pellet.eaten = true;
        this.score += 10;
        this.pelletsRemaining--;
        this.updateUI();
      }
    }

    // Check projectile-ghost collision
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const proj = this.projectiles[i];
      for (let j = this.ghosts.length - 1; j >= 0; j--) {
        const ghost = this.ghosts[j];
        if (Math.abs(proj.x - ghost.x) < 0.5 && Math.abs(proj.y - ghost.y) < 0.5) {
          this.projectiles.splice(i, 1);
          ghost.x = ghost.startX;
          ghost.y = ghost.startY;
          this.score += 200;
          this.updateUI();
          break;
        }
      }
    }

    // Check ghost collision
    for (let ghost of this.ghosts) {
      if (this.pacMan.x === ghost.x && this.pacMan.y === ghost.y) {
        if (this.powerUpActive) {
          ghost.x = ghost.startX;
          ghost.y = ghost.startY;
          this.score += 200;
          this.updateUI();
        } else {
          this.lives--;
          this.updateUI();
          if (this.lives <= 0) {
            this.endGame(false);
          } else {
            this.resetPacMan();
          }
        }
      }
    }
  }

  checkWinCondition() {
    if (this.pelletsRemaining === 0) {
      this.endGame(true);
    }
  }

  isWall(x, y) {
    if (x < 0 || x >= COLS || y < 0 || y >= ROWS) return true;
    return this.maze[y][x] === 1;
  }

  resetPacMan() {
    this.pacMan.x = 15;
    this.pacMan.y = 15;
    this.pacMan.direction = 0;
    this.pacMan.nextDirection = 0;
  }

  start() {
    this.gameRunning = true;
    this.gamePaused = false;
    this.gameStartTime = this.frameCount;
    this.updateUI();
  }

  toggleStart() {
    if (!this.gameRunning) {
      this.start();
    }
  }

  togglePause() {
    if (this.gameRunning) {
      this.gamePaused = !this.gamePaused;
      this.updateUI();
    }
  }

  reset() {
    this.gameRunning = false;
    this.gamePaused = false;
    this.score = 0;
    this.lives = 5;
    this.level = 1;
    this.frameCount = 0;
    this.gameOverMessage = '';
    this.powerUpActive = false;
    this.powerUpTime = 0;
    this.projectiles = [];
    this.powerUps = [];
    
    this.initMaze();
    this.initGhosts();
    this.initPellets();
    this.resetPacMan();
    this.updateUI();
  }

  endGame(won) {
    this.gameRunning = false;
    this.gameOverMessage = won ? `🎉 YOU WON! Score: ${this.score}` : `💀 GAME OVER! Score: ${this.score}`;
    this.updateUI();
  }

  updateUI() {
    document.getElementById('score').textContent = this.score;
    document.getElementById('lives').textContent = this.lives;
    document.getElementById('level').textContent = this.level;
    
    const status = document.getElementById('gameStatus');
    if (this.gameOverMessage) {
      status.innerHTML = `<p style="color: #e94560; font-weight: bold; font-size: 18px;">${this.gameOverMessage}</p>`;
    } else if (!this.gameRunning) {
      status.innerHTML = '<p>Press <strong>Start</strong> or press <strong>Space</strong> to begin!</p>';
    } else if (this.gamePaused) {
      status.innerHTML = '<p style="color: #f39c12;">⏸ PAUSED - Press <strong>P</strong> to resume</p>';
    } else {
      const timeIntoGame = this.frameCount - this.gameStartTime;
      if (timeIntoGame < this.graceTime) {
        const secondsLeft = Math.ceil((this.graceTime - timeIntoGame) / 60);
        status.innerHTML = `<p style="color: #4CAF50;">✨ Ready in <strong>${secondsLeft}</strong>s - Collect dots! Pellets left: <strong>${this.pelletsRemaining}</strong></p>`;
      } else {
        status.innerHTML = `<p>Collect dots! Avoid the ghost! Pellets left: <strong>${this.pelletsRemaining}</strong></p>`;
      }
    }

    if (this.powerUpActive) {
      document.getElementById('powerUpInfo').style.display = 'block';
      document.getElementById('powerUpTime').textContent = Math.ceil(this.powerUpTime / 60);
      const barWidth = (this.powerUpTime / (POWER_UP_DURATION * 60)) * 100;
      document.getElementById('powerUpBar').style.width = barWidth + '%';
    } else {
      document.getElementById('powerUpInfo').style.display = 'none';
    }
  }

  draw() {
    const ctx = this.ctx;
    const cellSize = GRID_SIZE;

    // Clear canvas
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw maze
    ctx.fillStyle = '#0066cc';
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        if (this.maze[y][x] === 1) {
          ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
      }
    }

    // Draw pellets
    ctx.fillStyle = '#ffb6c1';
    for (let pellet of this.pellets) {
      if (!pellet.eaten) {
        ctx.beginPath();
        ctx.arc(pellet.x * cellSize + cellSize / 2, pellet.y * cellSize + cellSize / 2, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Draw power-ups
    ctx.fillStyle = '#FFD700';
    for (let powerUp of this.powerUps) {
      ctx.beginPath();
      ctx.arc(powerUp.x * cellSize + cellSize / 2, powerUp.y * cellSize + cellSize / 2, 6, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw Pac-Man
    ctx.fillStyle = '#FFFF00';
    const mouthAngle = this.pacMan.mouthOpen ? 0.3 : 0.1;
    const directions = [Math.PI * 1.5, 0, Math.PI * 0.5, Math.PI];
    const angle = directions[this.pacMan.direction];
    
    ctx.beginPath();
    ctx.arc(
      this.pacMan.x * cellSize + cellSize / 2,
      this.pacMan.y * cellSize + cellSize / 2,
      cellSize / 2 - 1,
      angle + mouthAngle,
      angle - mouthAngle + Math.PI * 2
    );
    ctx.lineTo(this.pacMan.x * cellSize + cellSize / 2, this.pacMan.y * cellSize + cellSize / 2);
    ctx.fill();

    // Draw ghosts
    for (let ghost of this.ghosts) {
      ctx.fillStyle = ghost.color;
      ctx.fillRect(ghost.x * cellSize + 2, ghost.y * cellSize + 2, cellSize - 4, cellSize - 4);
      
      // Ghost eyes
      ctx.fillStyle = 'white';
      ctx.fillRect(ghost.x * cellSize + 4, ghost.y * cellSize + 4, 3, 3);
      ctx.fillRect(ghost.x * cellSize + cellSize - 7, ghost.y * cellSize + 4, 3, 3);
    }

    // Draw projectiles (hearts)
    ctx.fillStyle = '#FF1493';
    for (let proj of this.projectiles) {
      ctx.beginPath();
      ctx.arc(proj.x * cellSize, proj.y * cellSize, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

// Game initialization
let game;
const canvas = document.getElementById('gameCanvas');
game = new Game(canvas);

function gameLoop() {
  game.update();
  game.draw();
  requestAnimationFrame(gameLoop);
}

document.getElementById('startBtn').addEventListener('click', () => {
  game.start();
});

document.getElementById('pauseBtn').addEventListener('click', () => {
  if (game.gameRunning && !game.gamePaused) {
    game.gamePaused = true;
    game.updateUI();
    document.getElementById('pauseBtn').disabled = true;
    document.getElementById('resumeBtn').disabled = false;
  }
});

document.getElementById('resumeBtn').addEventListener('click', () => {
  if (game.gameRunning && game.gamePaused) {
    game.gamePaused = false;
    game.updateUI();
    document.getElementById('pauseBtn').disabled = false;
    document.getElementById('resumeBtn').disabled = true;
  }
});

document.getElementById('resetBtn').addEventListener('click', () => {
  game.reset();
});

game.updateUI();
gameLoop();
