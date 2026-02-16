# Coding Standards and Style Guide

## General Principles
- **Readability First**: Code should be clear and understandable to other developers
- **Minimal Comments**: Only comment non-obvious logic; code should be self-documenting
- **DRY Principle**: Don't Repeat Yourself - extract common patterns into functions
- **Modular Design**: Separate concerns into focused, single-responsibility functions/classes
- **Performance**: Optimize for performance without sacrificing readability

## JavaScript Style

### Naming Conventions
```javascript
// Constants: UPPER_SNAKE_CASE
const MAX_LIVES = 3;
const MAZE_GRID_SIZE = 20;

// Variables and functions: camelCase
let currentScore = 0;
function updateGameState() { }

// Classes: PascalCase
class PacManGame { }
class Ghost { }

// Private functions: prefix with underscore
function _calculateCollision() { }
```

### Code Organization
```javascript
// 1. Constants at top
const BOARD_WIDTH = 800;
const BOARD_HEIGHT = 600;

// 2. Class or function definitions
function Game() {
  // Constructor logic
}

// 3. Methods/properties
Game.prototype.init = function() { };
Game.prototype.update = function() { };

// 4. Exports
export default Game;
```

### Function Structure
- Keep functions focused and under 50 lines when possible
- Use descriptive names that indicate what the function does
- Place return statements at the end
- Avoid deeply nested conditionals (use early returns or helper functions)

```javascript
// Good
function moveGhost(ghost, targetPosition, maze) {
  const nextPosition = calculatePath(ghost.position, targetPosition, maze);
  if (!isValidPosition(nextPosition, maze)) return ghost.position;
  return nextPosition;
}

// Bad - deeply nested
function moveGhost(ghost, targetPosition, maze) {
  if (ghost) {
    if (targetPosition) {
      if (maze) {
        // ... logic
      }
    }
  }
}
```

### Variables
- Use `const` by default
- Use `let` when variable is reassigned
- Avoid `var`
- Initialize variables near their usage

```javascript
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let pacManPosition = { x: 10, y: 10 };
```

### Error Handling
```javascript
try {
  const papers = await fetchArXivPapers(query);
  displayPapers(papers);
} catch (error) {
  console.error('Failed to fetch papers:', error);
  displayErrorMessage('Could not load papers. Please try again later.');
}
```

## HTML Style Guide

### Document Structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Page description">
  <title>Page Title</title>
  <link rel="stylesheet" href="path/to/styles.css">
</head>
<body>
  <!-- Content here -->
  <script src="path/to/script.js"></script>
</body>
</html>
```

### Semantic HTML
```html
<!-- Good - using semantic tags -->
<header>
  <h1>Page Title</h1>
  <nav><!-- navigation --></nav>
</header>
<main>
  <article>
    <h2>Article Title</h2>
    <p>Content</p>
  </article>
  <aside><!-- sidebar --></aside>
</main>
<footer><!-- footer content --></footer>

<!-- Bad - using divs for everything -->
<div class="header">
  <div class="title">Page Title</div>
  <div class="nav"><!-- navigation --></div>
</div>
```

### Accessibility
- Always use `alt` text for images
- Use proper heading hierarchy (h1, h2, h3...)
- Use `label` tags for form inputs
- Include `aria-label` or `aria-describedby` for complex elements
- Ensure sufficient color contrast

```html
<img src="pacman.png" alt="Yellow Pac-Man character facing right">
<label for="search">Search papers:</label>
<input type="text" id="search" placeholder="Enter keywords">
```

### Formatting Rules
- 2-space indentation
- One element per line (except inline elements)
- Self-closing tags: `<br>`, `<img>`, `<input>` (no need for trailing slash in HTML5)
- Attributes in alphabetical order where logical

```html
<a class="btn" href="/papers" id="papers-link">Papers</a>
<img alt="Description" src="image.jpg" width="100">
```

### Class and ID Naming
```html
<!-- BEM (Block Element Modifier) convention -->
<article class="paper-card">
  <div class="paper-card__header">
    <h2 class="paper-card__title">Title</h2>
    <span class="paper-card__id">ID</span>
  </div>
  <div class="paper-card__body">
    <p class="paper-card__abstract">Abstract</p>
  </div>
  <div class="paper-card__footer">
    <a class="paper-card__link paper-card__link--pdf">PDF</a>
    <a class="paper-card__link paper-card__link--arxiv">arXiv</a>
  </div>
</article>
```

## CSS Style Guide

### File Organization
```css
/* 1. Reset/Base styles */
* { margin: 0; padding: 0; }
html { font-size: 16px; }

/* 2. Layout styles */
body { display: grid; grid-template-areas: "header" "main" "footer"; }
header { grid-area: header; }

/* 3. Component styles */
.paper-card { }
.paper-card__title { }

/* 4. Utility styles */
.hidden { display: none; }
.text-center { text-align: center; }
```

### Naming Conventions
- Use lowercase with hyphens: `.card-header`, `.btn-primary`
- Use BEM for complex components
- Prefix utility classes with state: `.is-active`, `.has-error`

### Units
- Use `rem` or `em` for font sizes (relative to base)
- Use `px` for borders and precise measurements
- Use `%` or `fr` for layouts
- Use `em` for spacing that should scale with text

```css
.card {
  padding: 1.5rem;
  border: 1px solid #ccc;
  font-size: 1.125rem;
}
```

## Git Commit Messages

### Format
```
type(scope): subject

body

footer
```

### Types
- `feat`: A new feature
- `fix`: A bug fix
- `style`: Formatting changes
- `refactor`: Code refactoring
- `chore`: Build process, dependencies
- `docs`: Documentation updates
- `test`: Adding or updating tests

### Examples
```
feat(game): add rose power-up mechanic
fix(rendering): correct canvas scaling on mobile
chore: update dependencies
docs: add gameplay instructions
```

## Project-Specific Guidelines

### Game Development
- Keep game logic separate from rendering
- Use consistent coordinate systems
- Document physics calculations
- Test performance on target browsers

### Paper Display
- Ensure proper URL encoding for API calls
- Handle empty result sets gracefully
- Format dates consistently
- Test responsive design at multiple breakpoints
