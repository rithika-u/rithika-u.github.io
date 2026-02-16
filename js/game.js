const GRID_SIZE = 20;
const ROWS = 15;
const COLS = 20;
const GHOST_COUNT = 4;
const POWER_UP_DURATION = 7;
const POWER_UP_SPAWN_RATE = 0.015;

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.gameRunning = false;
    this.gamePaused = false;
    this.score = 0;
    this.lives = 3;
    this.level = 1;
    
    this.pacMan = { x: 10, y: 7, direction: 0, nextDirection: 0, mouthOpen: true };
    this.ghosts = [];
    this.pellets = [];
    this.powerUp = null;
    this.projectiles = [];
    this.maze = [];
    
    this.powerUpActive = false;
    this.powerUpTime = 0;
    
    this.frameCount = 0;
    this.gameOverMessage = '';
    
    this.initMaze();
    this.initGhosts();
    this.initPellets();
  }

  initMaze() {
    this.maze = [];
    for (let y = 0; y < ROWS; y++) {
      this.maze[y] = [];
      for (let x = 0; x < COLS; x++) {
        const isBorder = x === 0 || x === COLS - 1 || y === 0 || y === ROWS - 1;
        const isWall = this.isWallPosition(x, y);
        this.maze[y][x] = isBorder || isWall ? 1 : 0;
      }
    }
  }

  isWallPosition(x, y) {
    const patterns = [
      (x === 5 || x === 15) && (y > 2 && y < ROWS - 1),
      (y === 5 || y === 10) && (x > 1 && x < COLS - 1),
      (x === 10 && y > 3 && y < 6),
      (x > 3 && x < 7 && y === 3),
      (x > 13 && x < 17 && y === 11),
    ];
    return patterns.some(p => p);
  }

  initGhosts() {
    const ghostColors = ['#FF0000', '#FFB6C1', '#00FFFF', '#FFB347'];
    const startPositions = [[1, 1], [COLS - 2, 1], [1, ROWS - 2], [COLS - 2, ROWS - 2]];
    
    for (let i = 0; i < GHOST_COUNT; i++) {
      const [sx, sy] = startPositions[i];
      this.ghosts.push({
        x: sx,
        y: sy,
        startX: sx,
        startY: sy,
        color: ghostColors[i],
        moveCounter: 0,
        direction: 0,
      });
    }
  }

  initPellets() {
    this.pellets = [];
    for (let y = 1; y < ROWS - 1; y++) {
      for (let x = 1; x < COLS - 1; x++) {
        if (this.maze[y][x] === 0) {
          this.pellets.push({ x, y, eaten: false });
        }
      }
    }
  }

  update() {
    if (!this.gameRunning || this.gamePaused) return;

    this.pacMan.direction = this.pacMan.nextDirection;
    this.updatePacMan();
    this.updateGhosts();
    this.updateProjectiles();
    this.updatePowerUp();
    this.checkCollisions();
    this.frameCount++;
  }

  updatePacMan() {
    const dirs = [[0, -1], [1, 0], [0, 1], [-1, 0]];
    const [dx, dy] = dirs[this.pacMan.direction];
    const newX = this.pacMan.x + dx;
    const newY = this.pacMan.y + dy;

    if (!this.isWall(newX, newY)) {
      this.pacMan.x = newX;
      this.pacMan.y = newY;
    }

    if (this.frameCount % 5 === 0) {
      this.pacMan.mouthOpen = !this.pacMan.mouthOpen;
    }
  }

  updateGhosts() {
    for (let ghost of this.ghosts) {
      ghost.moveCounter++;
      if (ghost.moveCounter > 10) {
        ghost.moveCounter = 0;
        const path = this.findPath(ghost.x, ghost.y, this.pacMan.x, this.pacMan.y);
        if (path.length > 1) {
          ghost.x = path[1].x;
          ghost.y = path[1].y;
        }
      }
    }
  }

  findPath(startX, startY, endX, endY) {
    const queue = [[{ x: startX, y: startY, path: [] }]];
    const visited = new Set();
    visited.add(`${startX},${startY}`);

    while (queue[0].length > 0) {
      const current = queue[0].shift();
      if (current.x === endX && current.y === endY) {
        return current.path.concat([{ x: current.x, y: current.y }]);
      }

      const dirs = [[0, -1], [1, 0], [0, 1], [-1, 0]];
      for (const [dx, dy] of dirs) {
        const nx = current.x + dx;
        const ny = current.y + dy;
        const key = `${nx},${ny}`;
        
        if (!visited.has(key) && !this.isWall(nx, ny)) {
          visited.add(key);
          queue[0].push({
            x: nx,
            y: ny,
            path: current.path.concat([{ x: current.x, y: current.y }]),
          });
        }
      }
    }
    return [{ x: startX, y: startY }];
  }

  updateProjectiles() {
    if (this.powerUpActive) {
      if (this.frameCount % 3 === 0) {
        const dirs = [[0, -1], [1, 0], [0, 1], [-1, 0]];
        const [dx, dy] = dirs[this.pacMan.direction];
        this.projectiles.push({
          x: this.pacMan.x + dx * 0.5,
          y: this.pacMan.y + dy * 0.5,
          dx,
          dy,
          rotation: 0,
        });
      }
    }

    this.projectiles = this.projectiles.filter(proj => {
      proj.x += proj.dx;
      proj.y += proj.dy;
      proj.rotation += 0.2;
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

    if (!this.powerUp && Math.random() < POWER_UP_SPAWN_RATE) {
      const x = Math.floor(Math.random() * (COLS - 2)) + 1;
      const y = Math.floor(Math.random() * (ROWS - 2)) + 1;
      if (!this.isWall(x, y)) {
        this.powerUp = { x, y };
      }
    }
  }

  checkCollisions() {
    if (this.powerUp && this.pacMan.x === this.powerUp.x && this.pacMan.y === this.powerUp.y) {
      this.powerUpActive = true;
      this.powerUpTime = POWER_UP_DURATION * 60;
      this.score += 50;
      this.powerUp = null;
      this.updateUI();
    }

    for (let pellet of this.pellets) {
      if (!pellet.eaten && this.pacMan.x === pellet.x && this.pacMan.y === pellet.y) {
        pellet.eaten = true;
        this.score += 10;
        this.updateUI();
      }
    }

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

    for (let ghost of this.ghosts) {
      if (this.pacMan.x === ghost.x && this.pacMan.y === ghost.y) {
        if (this.powerUpActive) {
          ghost.x = ghost.startX;
          ghost.y = ghost.startY;
          this.score += 200;
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

    const uneatenPellets = this.pellets.filter(p => !p.eaten).length;
    if (uneatenPellets === 0) {
      this.endGame(true);
    }
  }

  resetPacMan() {
    this.pacMan.x = 10;
    this.pacMan.y = 7;
    this.pacMan.direction = 0;
    this.pacMan.nextDirection = 0;
    this.powerUpActive = false;
    this.powerUpTime = 0;
    this.projectiles = [];
  }

  endGame(won) {
    this.gameRunning = false;
    this.gameOverMessage = won ? 'You Won! 💕' : 'Game Over! Try Again!';
    this.updateUI();
  }

  isWall(x, y) {
    if (x < 0 || x >= COLS || y < 0 || y >= ROWS) return true;
    return this.maze[Math.floor(y)][Math.floor(x)] === 1;
  }

  draw() {
    this.ctx.fillStyle = '#1a1a2e';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawMaze();
    this.drawPellets();
    this.drawPowerUp();
    this.drawGhosts();
    this.drawProjectiles();
    this.drawPacMan();
  }

  drawMaze() {
    this.ctx.fillStyle = '#0f3460';
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        if (this.maze[y][x] === 1) {
          this.ctx.fillRect(x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
        }
      }
    }
  }

  drawPellets() {
    this.ctx.fillStyle = '#ffb6c1';
    for (let pellet of this.pellets) {
      if (!pellet.eaten) {
        const x = pellet.x * GRID_SIZE + GRID_SIZE / 2;
        const y = pellet.y * GRID_SIZE + GRID_SIZE / 2;
        this.ctx.beginPath();
        this.ctx.arc(x, y, 2, 0, Math.PI * 2);
        this.ctx.fill();
      }
    }
  }

  drawPowerUp() {
    if (this.powerUp) {
      const x = this.powerUp.x * GRID_SIZE + GRID_SIZE / 2;
      const y = this.powerUp.y * GRID_SIZE + GRID_SIZE / 2;
      this.ctx.font = '18px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText('🌹', x, y);
    }
  }

  drawPacMan() {
    const x = this.pacMan.x * GRID_SIZE + GRID_SIZE / 2;
    const y = this.pacMan.y * GRID_SIZE + GRID_SIZE / 2;
    this.ctx.fillStyle = '#ffff00';
    this.ctx.beginPath();
    const mouthAngle = this.pacMan.mouthOpen ? 0.3 : 0.1;
    this.ctx.arc(x, y, GRID_SIZE / 2 - 2, mouthAngle, Math.PI * 2 - mouthAngle);
    this.ctx.lineTo(x, y);
    this.ctx.fill();
  }

  drawGhosts() {
    for (let ghost of this.ghosts) {
      const x = ghost.x * GRID_SIZE + GRID_SIZE / 2;
      const y = ghost.y * GRID_SIZE + GRID_SIZE / 2;
      this.ctx.fillStyle = ghost.color;
      this.ctx.fillRect(x - GRID_SIZE / 2 + 2, y - GRID_SIZE / 2 + 2, GRID_SIZE - 4, GRID_SIZE - 4);
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(x - 5, y - 3, 3, 3);
      this.ctx.fillRect(x + 2, y - 3, 3, 3);
    }
  }

  drawProjectiles() {
    for (let proj of this.projectiles) {
      const x = proj.x * GRID_SIZE;
      const y = proj.y * GRID_SIZE;
      this.ctx.save();
      this.ctx.translate(x, y);
      this.ctx.rotate(proj.rotation);
      this.ctx.font = '12px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText('💕', 0, 0);
      this.ctx.restore();
    }
  }

  updateUI() {
    document.getElementById('score').textContent = this.score;
    document.getElementById('lives').textContent = this.lives;
    document.getElementById('level').textContent = this.level;

    const powerUpInfo = document.getElementById('powerUpInfo');
    if (this.powerUpActive) {
      powerUpInfo.style.display = 'block';
      document.getElementById('powerUpTime').textContent = Math.ceil(this.powerUpTime / 60);
      const percentage = (this.powerUpTime / (POWER_UP_DURATION * 60)) * 100;
      document.getElementById('powerUpBar').style.width = percentage + '%';
    } else {
      powerUpInfo.style.display = 'none';
    }

    if (this.gameOverMessage) {
      document.getElementById('gameStatus').innerHTML = `<p class="game-message">${this.gameOverMessage}</p>`;
    }
  }
}

let game;

window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('gameCanvas');
  game = new Game(canvas);

  const startBtn = document.getElementById('startBtn');
  const pauseBtn = document.getElementById('pauseBtn');
  const resumeBtn = document.getElementById('resumeBtn');
  const resetBtn = document.getElementById('resetBtn');

  startBtn.addEventListener('click', () => {
    if (!game.gameRunning) {
      game.gameRunning = true;
      game.gamePaused = false;
      game.gameOverMessage = '';
      startBtn.disabled = true;
      pauseBtn.disabled = false;
      pauseBtn.style.display = 'inline-block';
      resumeBtn.style.display = 'none';
      gameLoop();
    }
  });

  pauseBtn.addEventListener('click', () => {
    game.gamePaused = true;
    pauseBtn.style.display = 'none';
    resumeBtn.style.display = 'inline-block';
    document.getElementById('gameStatus').innerHTML = '<p class="game-message">⏸ Paused</p>';
  });

  resumeBtn.addEventListener('click', () => {
    game.gamePaused = false;
    pauseBtn.style.display = 'inline-block';
    resumeBtn.style.display = 'none';
    document.getElementById('gameStatus').innerHTML = '<p></p>';
    gameLoop();
  });

  resetBtn.addEventListener('click', () => {
    game = new Game(canvas);
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    pauseBtn.style.display = 'inline-block';
    resumeBtn.style.display = 'none';
    document.getElementById('gameStatus').innerHTML = '<p>Press Start to begin!</p>';
    game.draw();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
      e.preventDefault();
      startBtn.click();
    }
    if (e.key === 'p' || e.key === 'P') {
      if (game.gameRunning && !game.gamePaused) pauseBtn.click();
      else if (game.gamePaused) resumeBtn.click();
    }

    const keyMap = { ArrowUp: 0, ArrowRight: 1, ArrowDown: 2, ArrowLeft: 3, w: 0, d: 1, s: 2, a: 3 };
    if (keyMap.hasOwnProperty(e.key)) {
      game.pacMan.nextDirection = keyMap[e.key];
    }
  });

  function gameLoop() {
    game.update();
    game.draw();
    if (game.gameRunning) {
      requestAnimationFrame(gameLoop);
    }
  }

  game.draw();
});
