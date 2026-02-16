# HTML-Specific Development Instructions

## Overview
This document provides detailed guidance for creating HTML pages for the Valentine's Pac-Man project. All HTML should be semantic, accessible, and performant.

## Game Page (pacman-valentine.html)

### Structure Overview
- Canvas element for game rendering (primary focus)
- Header with game title and branding
- Game info panel showing score and lives
- Instructions section
- Back-to-home navigation

### Key Sections

#### 1. Game Canvas Container
```html
<main class="game-container">
  <canvas id="gameCanvas" width="800" height="600"></canvas>
  <div class="game-info">
    <div class="score-display">Score: <span id="score">0</span></div>
    <div class="lives-display">Lives: <span id="lives">3</span></div>
    <div class="power-up-timer" id="powerUpTimer" style="display: none;">
      Power-up: <span id="timerValue">0</span>s
    </div>
  </div>
</main>
```

**Notes:**
- Canvas dimensions should match game grid (recommend 800x600 or 1024x768)
- Unique IDs for all game state elements (score, lives, power-up timer)
- Use `display: none` for initially hidden elements rather than removing them

#### 2. Instructions Panel
```html
<aside class="game-instructions">
  <h2>How to Play</h2>
  <ul>
    <li><strong>Move:</strong> Arrow Keys or WASD</li>
    <li><strong>Start:</strong> Press Space or click "Start Game"</li>
    <li><strong>Pause:</strong> Press P</li>
    <li><strong>Goal:</strong> Eat dots and roses, avoid ghosts</li>
    <li><strong>Power-up:</strong> Rose 🌹 lets you shoot hearts 💕</li>
  </ul>
  <button id="startBtn" class="btn btn-primary">Start Game</button>
  <button id="pauseBtn" class="btn btn-secondary" disabled>Pause</button>
</aside>
```

#### 3. Metadata
```html
<header class="game-header">
  <h1>💕 Pac-Man Valentine's Special 🌹</h1>
  <p class="tagline">A Love-Themed Maze Adventure</p>
  <p class="game-meta">
    Play directly in your browser | No installation needed
  </p>
</header>
```

## Papers Page (papers.html)

### Structure Overview
- Header with title and last-update timestamp
- Search/filter sidebar
- Main papers grid/list
- Loading and error states
- Footer with navigation

### Key Sections

#### 1. Search and Filter
```html
<aside class="papers-filters">
  <h2>Refine Results</h2>
  
  <div class="filter-group">
    <label for="searchInput">Search Papers:</label>
    <input 
      type="text" 
      id="searchInput" 
      class="search-input"
      placeholder="Enter keywords..."
      aria-describedby="searchHint"
    >
    <small id="searchHint">Searches titles, authors, and abstracts</small>
  </div>
  
  <div class="filter-group">
    <label>Categories:</label>
    <div id="categoryFilters" class="category-list">
      <!-- Dynamically populated -->
    </div>
  </div>
  
  <div class="sort-group">
    <label for="sortSelect">Sort by:</label>
    <select id="sortSelect" class="sort-select">
      <option value="date-desc">Newest First</option>
      <option value="date-asc">Oldest First</option>
      <option value="title">Title (A-Z)</option>
    </select>
  </div>
</aside>
```

#### 2. Papers Container
```html
<main class="papers-container">
  <!-- Loading state -->
  <div id="loadingState" class="state-message" style="display: none;">
    <p>Loading papers...</p>
  </div>
  
  <!-- Error state -->
  <div id="errorState" class="state-message error" style="display: none;">
    <p>Unable to load papers. Please refresh or try again later.</p>
  </div>
  
  <!-- Empty state -->
  <div id="emptyState" class="state-message" style="display: none;">
    <p>No papers found matching your filters.</p>
  </div>
  
  <!-- Papers grid -->
  <section id="papersList" class="papers-grid" role="feed" aria-label="Research papers">
    <!-- Paper cards populated here -->
  </section>
</main>
```

#### 3. Paper Card Component
```html
<article class="paper-card" role="article" aria-labelledby="paper-{id}-title">
  <div class="paper-card__header">
    <h3 id="paper-{id}-title" class="paper-card__title">
      <a href="https://arxiv.org/abs/{id}" target="_blank" rel="noopener noreferrer">
        {title}
      </a>
    </h3>
    <span class="paper-card__arxiv-id">{id}</span>
  </div>
  
  <div class="paper-card__metadata">
    <div class="paper-card__authors">
      <strong>Authors:</strong> {authors}
    </div>
    <div class="paper-card__date">
      <time datetime="{published-iso}">{published-formatted}</time>
    </div>
    <div class="paper-card__categories">
      {categories as list of tags}
    </div>
  </div>
  
  <p class="paper-card__abstract">{abstract}</p>
  
  <div class="paper-card__actions">
    <a href="https://arxiv.org/pdf/{id}.pdf" class="btn btn-pdf" target="_blank" rel="noopener noreferrer">
      📄 View PDF
    </a>
    <a href="https://arxiv.org/abs/{id}" class="btn btn-arxiv" target="_blank" rel="noopener noreferrer">
      View on arXiv
    </a>
    <button class="btn btn-copy" onclick="copyBibtex('{id}')">
      📋 Copy BibTeX
    </button>
  </div>
</article>
```

## Best Practices

### Data Attributes
Use data attributes to store information accessed by JavaScript:
```html
<button class="paper-action" data-paper-id="2301.12345" data-action="favorite">
  ♥ Save
</button>
```

### ARIA Labels and Roles
- Use `role="feed"` for dynamically updated lists
- Use `aria-label` for icon buttons
- Use `aria-describedby` for help text
- Use `aria-live="polite"` for status updates

### Link Best Practices
- Always open external links in new tabs: `target="_blank"`
- Add `rel="noopener noreferrer"` for security
- Use descriptive link text (avoid "click here")

### Forms and Inputs
```html
<label for="searchInput">Search:</label>
<input type="text" id="searchInput" name="search">
```
- Always associate labels with inputs using `for` attribute
- Use proper input types (text, email, number, etc.)
- Include helpful error messages

### Loading States
```html
<div class="skeleton-card">
  <div class="skeleton-title"></div>
  <div class="skeleton-text"></div>
  <div class="skeleton-text"></div>
</div>
```
- Use skeleton screens instead of spinners for better UX
- Show loading state immediately upon action
- Keep UI responsive even during loads

### Error States
```html
<div class="error-message" role="alert">
  <strong>Error:</strong> Failed to load papers. 
  <button onclick="retryLoad()">Try Again</button>
</div>
```
- Use semantic role="alert" for errors
- Provide actionable recovery options
- Show errors clearly without disrupting layout

## Responsive Design Considerations

### Mobile-First Approach
```html
<!-- Stack layout on mobile, adjust for larger screens with CSS -->
<div class="papers-wrapper">
  <aside class="papers-filters"><!-- Sidebar: hidden on mobile --></aside>
  <main class="papers-container"><!-- Main content --></main>
</div>
```

### Viewport Meta Tag (must include)
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### Touch-Friendly Targets
- Buttons and links should be at least 44x44 pixels
- Adequate spacing between interactive elements
- Use touch-appropriate UX patterns

## Performance Optimization

### Lazy Loading
```html
<img src="placeholder.jpg" loading="lazy" alt="Description">
```

### Critical Rendering Path
1. Place critical CSS in `<head>`
2. Defer non-critical JavaScript: `<script defer>`
3. Inline critical SVGs
4. Minimize render-blocking resources

### Image Optimization
```html
<picture>
  <source srcset="large.jpg" media="(min-width: 1024px)">
  <source srcset="medium.jpg" media="(min-width: 768px)">
  <img src="small.jpg" alt="Description">
</picture>
```

## Validation and Testing

### HTML Validation
- Run through W3C validator before deployment
- Ensure no console errors in browser DevTools
- Test in multiple browsers

### Accessibility Testing
- Use browser accessibility inspector
- Test keyboard navigation (Tab, Enter, Escape)
- Use screen reader (VoiceOver, NVDA, JAWS)
- Check color contrast ratios (WCAG AA minimum 4.5:1)
