# 🎓 HW1 Activities

A interactive web project featuring a Pac-Man game and arXiv paper finder, built entirely using **GitHub Copilot CLI** with iterative prompts and real-time feedback.

**Live Demo:** https://rithika-u.github.io/

---

## 🚀 How This Was Built with Copilot CLI

This project showcases the power of **GitHub Copilot CLI** as a collaborative development tool. Instead of writing code from scratch, we used **natural language prompts** to:

1. **Scaffold entire features** from descriptions
2. **Debug issues** in real-time
3. **Iterate and improve** based on feedback
4. **Refactor and optimize** code

### The Copilot CLI Workflow

```
User Prompt → Copilot CLI → Code Generation → Test & Feedback → Iterate
```

Every major feature was built through this conversation-driven approach.

---

## 📋 Project Features

### 🕹️ **Pac-Man Valentine's Game**
- 31×31 maze board with strategic walls
- Pac-Man controlled with arrow keys or WASD
- 4 intelligent ghosts starting in corners
- 5 golden roses (🌹) as power-ups
- Heart projectiles (💕) to disable ghosts
- 5 lives to start, 5-second grace period
- Score tracking and win/lose conditions

**Built with:** HTML5 Canvas, Vanilla JavaScript, No frameworks

### 📚 **arXiv Paper Finder**
- Search papers by keywords (title, authors, abstract)
- 10+ curated research papers in database
- Direct PDF access and arXiv links
- Clean, responsive grid layout
- Real-time search results

**Built with:** HTML5, CSS3, Vanilla JavaScript, Static JSON data

### 🎨 **Professional Homepage**
- Modern gradient hero section
- Card-based feature showcase
- Sticky navigation
- Responsive design (mobile-friendly)
- Smooth animations and hover effects

---

## 💬 Key Prompts Used to Build This

### Phase 1: Initial Requirements
```
"Create a Pac-Man game and arXiv papers finder for a website"
```

### Phase 2: Game Development
```
"Make a traditional Pac-Man game with:
- 31x31 maze board
- Ghosts starting in corners
- Pac-Man starting in center
- Smooth keyboard controls
- Roses as power-ups
- Hearts as projectiles"
```

### Phase 3: Game Balancing
```
"Make the game more playable:
- Only 1-2 ghosts
- Slower ghost movement
- Grace period before ghosts move
- More lives to start"
```

### Phase 4: Expansion
```
"Make the board bigger with:
- Larger maze (31x31 instead of 19x21)
- 4 ghosts in corners
- Pac-Man in middle
- Smaller cell size to fit"
```

### Phase 5: Papers Feature
```
"Create an arXiv papers page with:
- Search by keywords
- Load from static JSON
- Display titles, authors, abstracts
- PDF links"
```

### Phase 6: Search Enhancement
```
"Add keyword search to papers:
- Search across title, authors, abstract
- Show number of results
- Reset button"
```

### Phase 7: Homepage Redesign
```
"Make the homepage professional:
- Modern gradient hero
- Card-based layout
- Navigation menu
- Not like a README file
- Title should be HW1 Activities"
```

### Phase 8: Debugging & Fixes
```
"The game still shows old version - fix caching
Add cache busters with ?v=2.0 to script tags"
```

```
"Add roses to the game that are missing:
- 5 initial roses
- Higher spawn rate
- Allow collection for power-ups"
```

---

## 🛠️ Technical Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Game Engine** | HTML5 Canvas + RequestAnimationFrame |
| **Styling** | CSS Grid, Flexbox, Gradients, Animations |
| **Data** | Static JSON (arxiv.json) |
| **Hosting** | GitHub Pages |
| **Automation** | GitHub Actions (optional, configured) |
| **Development** | GitHub Copilot CLI |

---

## 📁 Project Structure

```
rithika-u.github.io/
├── index.html                 # Homepage
├── pacman-valentine.html      # Pac-Man game
├── papers.html                # Papers finder
├── README.md                  # This file
├── plan.md                    # Project roadmap
│
├── css/
│   ├── game.css              # Game styling
│   └── papers.css            # Papers styling
│
├── js/
│   ├── game.js               # Game logic (31x31 board, ghosts, roses)
│   ├── papers.js             # Papers filtering/sorting
│   └── fetch-papers.js       # arXiv data loading
│
├── data/
│   └── arxiv.json            # 10 research papers
│
└── .github/
    ├── agents/               # AI agent templates
    ├── prompts/              # Development guidelines
    ├── skills/               # Expertise descriptions
    └── workflows/            # GitHub Actions (auto-updates)
```

---

## 🎮 How to Play

### **Pac-Man Game**
1. Visit: https://rithika-u.github.io/pacman-valentine.html
2. Click **Start** or press **Space**
3. Use **Arrow Keys** or **WASD** to move
4. **Collect** pink dots (10 points each)
5. **Collect roses** 🌹 (50 points) to shoot hearts 💕
6. **Avoid ghosts** or use hearts to disable them (200 points)
7. Collect all pellets to win!

### **Paper Finder**
1. Visit: https://rithika-u.github.io/papers.html
2. Type keywords in the search box
3. Press **Enter** or click **Search**
4. Browse results with abstracts
5. Click **View PDF** for full paper
6. Click **View on arXiv** for paper page

---

## 🔄 Copilot CLI Benefits Used

✅ **Rapid Prototyping** - Code generated from natural language prompts
✅ **Iterative Development** - "Does this work? No? Fix it by..."
✅ **Debugging** - "The game crashes when... how do I fix it?"
✅ **Refactoring** - "Make this faster/cleaner by..."
✅ **Feature Addition** - "Add roses to the game"
✅ **Cache Busting** - Real-time troubleshooting of deployment issues
✅ **Testing Feedback** - "Game looks old in browser, force refresh"

---

## 📊 Development Timeline

| Phase | What We Built | Copilot Prompts |
|-------|---------------|-----------------|
| 1 | Scaffold game files | 1-2 |
| 2 | Working Pac-Man game | 3-4 |
| 3 | Game balancing | 2-3 |
| 4 | Bigger board | 1-2 |
| 5 | Papers page | 2-3 |
| 6 | Search feature | 1-2 |
| 7 | Homepage redesign | 1 |
| 8 | Debugging & fixes | 3-4 |

**Total Prompts Used:** ~20-25 natural language requests

---

## 🎯 Key Takeaways

### Using Copilot CLI Effectively
1. **Be Specific** - "Make the board 31x31 with ghosts in corners"
2. **Iterate** - "That worked but now fix this issue..."
3. **Provide Feedback** - "It looks old, add cache busters"
4. **Ask for Changes** - "Make this more professional"
5. **Verify Results** - Test in browser after each prompt

### What Copilot Did Well
- ✅ Generated complete, working game logic
- ✅ Created responsive HTML/CSS instantly
- ✅ Debugged caching and deployment issues
- ✅ Balanced game difficulty based on feedback
- ✅ Refactored code for better performance
- ✅ Designed professional UI from descriptions

### Human + AI Collaboration
- **You:** Decided what features to build, tested in browser, gave feedback
- **Copilot CLI:** Generated code, fixed bugs, iterated designs
- **Result:** Fully functional website in hours, not days

---

## 🚀 Running Locally

```bash
# Clone the repository
git clone https://github.com/rithika-u/rithika-u.github.io.git
cd rithika-u.github.io

# Start a local server (Python 3)
python3 -m http.server 8000

# Or with Node.js
npx http-server

# Visit http://localhost:8000
```

---

## 📚 Learning Resources

- [GitHub Copilot CLI Docs](https://github.com/github/copilot-cli)
- [Copilot CLI GitHub Discussion](https://github.com/github/copilot-cli/discussions)
- [arXiv API Documentation](https://arxiv.org/help/api)
- [HTML5 Canvas Guide](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [GitHub Pages Hosting](https://pages.github.com/)

---

## 🎓 For Harvard CS/HW1 Context

This project demonstrates:
- **Web Development** - Full-stack HTML/CSS/JS
- **Game Development** - Canvas rendering, collision detection, AI pathfinding
- **API Integration** - Fetching and caching external data
- **Responsive Design** - Works on desktop and mobile
- **Git & GitHub** - Version control and GitHub Pages deployment
- **AI-Assisted Development** - Using Copilot CLI for iterative building

All features were built using natural language prompts to Copilot CLI, showing how AI can accelerate development while maintaining code quality.

---

## 📝 License

MIT License - Feel free to use this project as reference!

---

## 🙏 Built with

- GitHub Copilot CLI (Natural language code generation)
- GitHub Pages (Hosting)
- Vanilla JavaScript (No framework dependencies)
- Your feedback and iteration!

---

**Questions? Try the game, search the papers, and explore how it was built! 🚀**
