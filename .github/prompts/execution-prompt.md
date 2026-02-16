---
name: Execute Valentine's Pac-Man Project
type: prompt
model: claude-opus-4.6
instructions: >
  You are the Project Orchestrator for building a Valentine's Pac-Man game with an 
  arXiv papers display page on GitHub Pages. Execute the complete project based on the 
  agents, skills, and coding standards defined in this repository.
---

# Project Execution Prompt

## Mission
Build and deploy a complete Valentine's themed Pac-Man game with an auto-updating arXiv papers page to GitHub Pages at **rithika-u/rithika-u.github.io**.

## Deliverables

### 1. Pac-Man Game Page
**File**: `pacman-valentine.html`

Create an interactive, browser-based Pac-Man game with:
- **Classic Pac-Man Mechanics**: Maze layout with pellets, ghosts with AI, collision detection
- **Valentine Power-Up**: Rose 🌹 that appears randomly, when eaten grants temporary ability
- **Heart Projectiles**: 💕 shoot in Pac-Man's facing direction when powered-up, eliminate ghosts on hit
- **Game Loop**: Score tracking, lives (3 default), game over/win conditions, 60 FPS rendering
- **Responsive UI**: Works on desktop browsers, canvas scales appropriately
- **Styling**: Valentine's themed with hearts, roses, red/pink color scheme

### 2. ArXiv Papers Page
**File**: `papers.html`

Create a dynamically populated papers page with:
- **Paper Listing**: Display latest arXiv papers matching keywords
- **Paper Details**: Show title, authors, abstract, publication date, direct PDF link
- **Search/Filter**: Client-side filtering by keywords and category
- **Responsive Design**: Mobile-friendly grid or list layout
- **Last Updated**: Display timestamp of last data refresh
- **Auto-Sync**: GitHub Actions workflow updates papers at midnight UTC daily

### 3. GitHub Actions Workflow
**File**: `.github/workflows/update-papers.yml`

Set up automated workflow that:
- Triggers daily at midnight UTC
- Fetches latest papers from arXiv API
- Generates updated `papers.html` with paper data
- Commits changes to repository
- Deploys to GitHub Pages

### 4. Data Management
**File**: `data/papers.json`

Maintain JSON file with:
- Array of paper objects with id, title, authors, summary, published date, URL
- Last update timestamp
- Cache for quick regeneration

### 5. Homepage Integration
**File**: `index.html` (updated)

Add links to:
- New Pac-Man game page with emoji: 💕 Play Pac-Man Valentine's Game
- New papers page with emoji: 📚 Latest Research Papers
- Maintain existing content

## Technical Requirements

### JavaScript
- Vanilla JavaScript (no frameworks required)
- HTML5 Canvas for game rendering
- Fetch API for arXiv data and paper updates
- RequestAnimationFrame for smooth game loop
- Follow coding standards in `.github/prompts/coding-standards.md`

### HTML
- Semantic HTML5 structure
- Accessibility best practices (ARIA labels, semantic tags)
- Mobile-responsive meta viewport tags
- Follow HTML guidelines in `.github/prompts/html-instructions.md`

### CSS
- BEM naming convention for classes
- Mobile-first responsive design
- Flexbox/Grid for layouts
- CSS transitions and animations for game effects

### GitHub Pages Deployment
- All files in repository root or `docs/` folder
- Automatic deployment on push to main branch
- SSL/HTTPS enabled by default

## Game Specifications

### Pac-Man Game

**Maze Design**:
- 20x15 grid layout (adjustable)
- Walls and open corridors
- Pellets distributed throughout
- 4 Ghosts (Blinky, Pinky, Inky, Clyde style)

**Pac-Man Controls**:
- Arrow keys or WASD for movement
- Space to start/pause
- P key to toggle pause

**Ghost AI**:
- Chase behavior: Move toward Pac-Man using A* or BFS
- Each ghost has different behavior (one chases directly, one predicts movement, etc.)
- Respawn after elimination or timer

**Rose Power-Up (Valentine Special)**:
- Appears randomly every 30-45 seconds on a random pellet
- Visual: Large rose emoji or sprite
- Duration: 5-8 seconds when eaten
- Indicator: Show countdown timer on screen

**Heart Projectiles**:
- Launch continuously in Pac-Man's facing direction while powered
- Speed: Moderate (not too fast)
- Direction: Only in current facing direction, not omnidirectional
- Effect: Eliminate any ghost they hit
- Animation: Small heart sprite with rotation

**Scoring**:
- Pellet: 10 points
- Ghost (with heart): 200 points
- Rose power-up: 50 points
- Bonus for clearing entire maze: 500 points

**Difficulty Levels** (optional):
- Level 1: Slow ghosts, short pellet resets
- Level 2: Medium speed
- Level 3: Fast ghosts, challenging pathfinding

### ArXiv Papers Page

**Data Source**:
- ArXiv API (free, no auth required)
- Search categories: cs.AI, cs.LG, stat.ML (Machine Learning, AI, Data Science)
- Retrieve last 24 hours of papers

**Display Format**:
- Card-based layout with: Title as link, Authors list, Publication date, Category tags, Abstract preview, PDF and arXiv links
- Clean typography and spacing
- Consistent with gaming website aesthetic

**Features**:
- **Search**: Filter papers by title/author keywords
- **Sort**: By date (newest first) or title
- **Categories**: Filter by research category
- **Pagination**: Show 10 papers per page or lazy load on scroll
- **Copy BibTeX**: Button to copy citation in BibTeX format

## Integration Checklist

- [ ] Game page created with all mechanics functional
- [ ] Papers page created with dynamic data loading
- [ ] GitHub Actions workflow configured for midnight updates
- [ ] ArXiv API integration working with error handling
- [ ] Data caching implemented to avoid rate limits
- [ ] Homepage updated with links to both new pages
- [ ] All pages follow coding standards and HTML guidelines
- [ ] Responsive design tested on mobile and desktop
- [ ] No console errors or accessibility warnings
- [ ] GitHub Pages deployment successful
- [ ] Workflow runs successfully at scheduled time

## Deployment Steps

1. **Create all HTML files**: `pacman-valentine.html`, `papers.html`, supporting scripts
2. **Create JavaScript files**: `js/game.js`, `js/papers.js`, `js/fetch-papers.js`
3. **Create CSS files**: `css/game.css`, `css/papers.css` with Valentine's theme
4. **Create GitHub Actions workflow**: `.github/workflows/update-papers.yml`
5. **Update homepage**: Add links to new pages
6. **Commit and push**: All changes to main branch
7. **Verify deployment**: Check GitHub Pages and workflow runs
8. **Test game**: Play game and verify all mechanics
9. **Verify papers**: Check papers page updates and search functionality

## Success Criteria

✅ Game is playable directly on webpage  
✅ All game mechanics work (movement, ghosts, power-ups, projectiles)  
✅ Papers page displays latest arXiv papers with all metadata  
✅ Search and filtering works smoothly  
✅ GitHub Actions workflow runs daily at midnight  
✅ Papers auto-update without manual intervention  
✅ Homepage has working links to both pages  
✅ No console errors or warnings  
✅ Responsive on mobile and desktop  
✅ Deployed to rithika-u.github.io successfully  

## Notes

- Use semantic, accessible HTML5
- Keep game code modular and maintainable
- Implement error handling for API calls
- Cache paper data to avoid API rate limits
- Test thoroughly before pushing to main branch
- Follow all guidelines in coding-standards.md and html-instructions.md
