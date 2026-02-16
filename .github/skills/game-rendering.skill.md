---
type: skill
name: Game Rendering
description: >
  Handles all visual rendering of the game using HTML5 Canvas, including
  sprites, animations, and UI elements.
---

# Game Rendering Skill

## Canvas Operations

### Maze Rendering
```
drawMaze(canvas, mazeLayout, scale) -> void
- Draw walls as rectangles
- Draw pellets as circles
- Draw power-up roses
- Apply color schemes and textures
```

### Sprite Drawing
```
drawPacMan(ctx, position, direction, mouthAngle) -> void
drawGhost(ctx, ghostData, position, color) -> void
drawHeart(ctx, projectile, position, rotation) -> void
- Render characters with appropriate sprites/shapes
- Apply animations based on game state
- Handle direction and facing
```

### Animation System
```
updateAnimationFrame(gameState, deltaTime) -> void
- Update Pac-Man mouth animation
- Ghost flicker effects
- Heart rotation and fade effects
- Power-up glow animation
```

### UI Rendering
```
drawScore(ctx, score, position) -> void
drawLives(ctx, lives, position) -> void
drawGameState(ctx, state, message) -> void
- Render score and lives display
- Show game over/win messages
- Display pause state
- Show power-up duration bar
```

## Performance Considerations
- Clear canvas each frame efficiently
- Use layer-based rendering for complex scenes
- Minimize redraw operations
- Optimize sprite caching
- Use transform matrices for rotation/scaling
