---
type: skill
name: GitHub Actions Automation
description: >
  Sets up and manages GitHub Actions workflows for automated testing, building,
  and deploying to GitHub Pages with midnight paper updates.
---

# GitHub Actions Automation Skill

## Workflow Structure

### Daily ArXiv Update Workflow
**File**: `.github/workflows/update-papers.yml`

```yaml
name: Update ArXiv Papers

on:
  schedule:
    - cron: '0 0 * * *'  # Midnight UTC daily
  workflow_dispatch:     # Allow manual trigger

jobs:
  fetch-papers:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Cache dependencies
        uses: actions/cache@v3
        with:
          path: ~/.npm
          key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
      
      - name: Install dependencies
        run: npm install
      
      - name: Fetch papers
        run: node scripts/fetch-papers.js
        env:
          ARXIV_KEYWORDS: "machine learning,artificial intelligence,data science"
      
      - name: Generate HTML
        run: node scripts/generate-papers-page.js
      
      - name: Commit and push changes
        run: |
          git config user.name "github-actions"
          git config user.email "github-actions@github.com"
          git add data/papers.json papers.html
          git commit -m "chore: update arxiv papers - $(date)" || exit 0
          git push
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

### Build and Test Workflow
**File**: `.github/workflows/build.yml`

```yaml
name: Build and Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Validate HTML
        run: |
          # Use html5validator or similar
          npm install --global html5validator
          html5validator *.html
      
      - name: Check Links
        run: |
          npm install --global broken-link-checker
          blc https://rithika-u.github.io -r --filter-level 3
      
      - name: Deploy to GitHub Pages
        if: github.ref == 'refs/heads/main'
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

## Key Automation Features

### Scheduled Tasks
- Run at specific times (cron expressions)
- Manual trigger capability with `workflow_dispatch`
- Automatic retry logic for failed API calls

### Secrets Management
- Use `secrets.GITHUB_TOKEN` for authentication
- Store API keys securely (if needed for arXiv)
- Never commit sensitive data

### Artifact Management
- Cache dependencies to speed up workflows
- Store paper data in JSON format
- Generate HTML artifacts

### Notifications
- Email on workflow failure
- Status badges in README
- Slack integration (optional)

## Deployment Strategy
- Use `actions/checkout@v3` for code access
- `peaceiris/actions-gh-pages@v3` for GitHub Pages deployment
- Publish entire directory or specific folder
- Automatic deployment on main branch push
