---
type: skill
name: HTML Generation
description: >
  Creates semantic, accessible HTML for both the game page and arXiv papers page,
  with proper structure and styling hooks.
---

# HTML Generation Skill

## Page Generation

### Game Page Structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pac-Man Valentine's Special</title>
  <link rel="stylesheet" href="styles/game.css">
</head>
<body>
  <header class="game-header">
    <h1>💕 Pac-Man Valentine's Special 🌹</h1>
  </header>
  <main class="game-container">
    <canvas id="gameCanvas"></canvas>
    <div class="game-info">
      <div class="score">Score: <span id="score">0</span></div>
      <div class="lives">Lives: <span id="lives">3</span></div>
      <div class="instructions">Use Arrow Keys to Move | Space to Start</div>
    </div>
  </main>
  <footer>
    <a href="index.html">← Back to Home</a>
  </footer>
  <script src="js/game.js"></script>
</body>
</html>
```

### ArXiv Page Structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Latest Research Papers</title>
  <link rel="stylesheet" href="styles/papers.css">
</head>
<body>
  <header class="papers-header">
    <h1>Latest Research Papers</h1>
    <p class="updated-at">Last updated: <span id="lastUpdate"></span></p>
  </header>
  <main class="papers-container">
    <aside class="filters">
      <input type="text" id="searchInput" placeholder="Search papers...">
      <div class="category-filters">
        <!-- Dynamically populated -->
      </div>
    </aside>
    <section class="papers-list" id="papersList">
      <!-- Dynamically populated with paper cards -->
    </section>
  </main>
  <footer>
    <a href="index.html">← Back to Home</a>
  </footer>
  <script src="js/papers.js"></script>
</body>
</html>
```

### Paper Card Component
```html
<article class="paper-card">
  <div class="paper-header">
    <h2><a href="https://arxiv.org/abs/{id}">{title}</a></h2>
    <span class="arxiv-id">{id}</span>
  </div>
  <div class="paper-meta">
    <p class="authors">By: {authors.join(", ")}</p>
    <p class="date">{published.toLocaleDateString()}</p>
    <div class="categories">
      {categories.map(cat => `<span class="category">${cat}</span>`)}
    </div>
  </div>
  <p class="abstract">{summary}</p>
  <div class="paper-actions">
    <a href="https://arxiv.org/pdf/{id}.pdf" class="btn btn-pdf" target="_blank">
      📄 View PDF
    </a>
    <a href="https://arxiv.org/abs/{id}" class="btn btn-arxiv" target="_blank">
      View on arXiv
    </a>
  </div>
</article>
```

## Best Practices
- Use semantic HTML5 tags (header, main, section, article, footer)
- Include proper meta tags for responsive design
- Add ARIA labels for accessibility
- Structure for progressive enhancement
- Minimize inline styles, use CSS classes
- Include skip navigation links if needed
