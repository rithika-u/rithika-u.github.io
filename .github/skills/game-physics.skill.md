---
type: skill
name: Game Physics
description: >
  Implements collision detection, movement vectors, and physics calculations
  for the Pac-Man game environment.
---

# Game Physics Skill

## Core Functions

### Collision Detection
```
checkWallCollision(position, direction) -> bool
- Detect if Pac-Man/ghost would hit a wall
- Check against maze layout grid
- Return true if collision detected
```

### Ghost Pathfinding
```
calculateGhostPath(ghostPos, targetPos, maze) -> direction
- Implement A* or BFS algorithm
- Find shortest path to Pac-Man
- Return next direction to move
```

### Projectile Trajectory
```
updateProjectilePosition(projectile, frameTime) -> newPosition
- Calculate straight-line movement
- Check for ghost collisions
- Return updated position or null if off-screen
```

### Distance Calculation
```
euclideanDistance(pos1, pos2) -> float
manhattanDistance(pos1, pos2) -> float
- Calculate distance for AI decisions
- Used in ghost behavior and power-up effects
```

## Usage in Game Loop
1. Update Pac-Man position based on input
2. Check wall collisions
3. Update ghost positions using pathfinding
4. Update projectiles and check hits
5. Detect power-up/ghost collisions
