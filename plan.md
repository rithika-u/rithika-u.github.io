% Pac-Man Valentine's Special + arXiv Page — Project Plan

## Overview

This plan covers two related deliverables derived from your updated `.github/prompts/prompts.md`:

- A Valentine's-themed Pac‑Man playable page (design only; agents produce prompts and specs).
- A dynamic arXiv papers page that auto-updates nightly via GitHub Actions and appears on the site homepage.

All agent manifests, skill descriptors, and prompts will live under the `.github/` directory per your constraint. No runtime application code will be committed by agents — only prompts, agent manifests, and skills.

## Goals

- Implement an agent ecosystem that designs and orchestrates the Pac‑Man page and the arXiv papers page.
- Ensure the arXiv page auto-refreshes nightly using a GitHub Actions workflow produced as a deploy plan (automation instructions only).

## Deliverables

- `plan.md` (this file): project plan and artifacts mapping.
- Agent manifests: `.github/agents/*.agent.md`.
- Skill descriptors: `.github/skills/*.skill.md`.
- Prompt templates: `.github/prompts/*.prompt.md` (including updated `prompts.md`).

## Constraints & Rules

- Only create agents in `.github/agents/`, skills in `.github/skills/`, and prompts in `.github/prompts/`.
- Agents produce prompts/specs and Copilot CLI manifests; they must not generate playable game code directly in the repository.

## High-level Architecture (Agents & Interactions)

1. **Product Architect Agent** (`product-architect.agent.md`)
   - Role: Convert the combined Pac‑Man and arXiv requirements into prioritized tasks, acceptance criteria, and assign responsibilities to other agents.

2. **Design Agent** (`design.agent.md`)
   - Role: UX and visual specs for the Pac‑Man page (maze variants, sprites), and layout suggestions for the arXiv page.

3. **arXiv Fetcher Agent** (`arxiv-fetcher.agent.md`)
   - Role: Design the data pipeline for fetching latest arXiv papers for chosen keywords, specify data schema, caching, and error handling. Will output a GitHub Actions workflow spec as a prompt (not as committed YAML unless the user authorizes code generation).

4. **Implementation Planner Agent** (`impl-planner.agent.md`)
   - Role: Produce file manifests (HTML/CSS/JS, assets) for both pages, and a step-by-step Copilot CLI plan for publishing to `rithika-u/rithika-u.github.io`.

5. **HTML Specialist Agent** (`html-specialist.agent.md`)
   - Role: Produce strict HTML/CSS/JS guidelines and example scaffolding snippets for the pages (as prompts/excerpts only). Include accessibility, canvas guidance, and arXiv list semantics.

6. **QA & Acceptance Agent** (`qa.agent.md`)
   - Role: Create test suites and manual QA flows for both interactive gameplay behaviors and for the arXiv page (data correctness, refresh behavior, links to PDFs).

7. **Deployment Agent** (`deployment.agent.md`)
   - Role: Produce Copilot CLI deployment instructions and GitHub Actions workflow outline to automate nightly updates; will confirm `owner` and `repo` before generating exact commands.

## Skills (per agent)

- **Requirements Analysis** — translate briefs into tasks and acceptance criteria.
- **UX / Maze Design** — maze variants, sprite metadata, animation timing.
- **arXiv Data Pipeline** — design API fetching, parsing arXiv XML/ATOM, filtering by keywords, output schema.
- **HTML/CSS/JS Specialist** — scaffolding guidance, canvas and list rendering guidelines.
- **Test Authoring** — unit and integration test plans for gameplay and the data pipeline.
- **Copilot CLI Orchestration** — craft agent manifests and Copilot-compatible command sequences.

## Prompts (outline)

Prompts to be placed under `.github/prompts/` (examples):

- `product-architect.prompt.md` — translate combined features to tasks and acceptance criteria.
- `design.prompt.md` — produce maze variants and arXiv page layout options.
- `arxiv-fetcher.prompt.md` — design data pipeline for fetching and parsing arXiv papers and specify cron schedule for nightly updates.
- `impl-planner.prompt.md` — produce file manifests and Copilot CLI deployment steps.
- `html-specialist.prompt.md` — provide HTML/CSS/JS guidelines and example scaffolding snippets.
- `qa.prompt.md` — produce QA checklists and test cases.
- `deployment.prompt.md` — produce Copilot CLI deployment steps and prompt for `owner`/`repo` inputs.

## Copilot Agent File Format & Example

Agent manifests must use `.agent.md` filenames and YAML front matter indicating `type`, `name`, `model`, and `tools` per Copilot CLI guidance.

Refer to: https://code.visualstudio.com/docs/copilot/customization/custom-agents

## Coding Style & General Instructions

- HTML5 semantic elements for the arXiv list; use `<article>` for each paper entry and `<a>` for PDF links.
- Use CSS variables for consistent Valentine theming across pages.
- JavaScript should be modular and expose testable functions for game logic and for parsing arXiv responses.
- Accessibility: keyboard controls for game, proper headings and ARIA labels for the arXiv list.

## arXiv Page Specifics

- Paper Listing: structured entries showing title, authors, abstract (truncated with "read more"), and PDF link.
- Auto-Update: schedule a GitHub Actions workflow (cron: `0 0 * * *`) to run nightly; the workflow should fetch, transform, and commit a generated JSON or markdown file used by the site.
- Keywords: the Product Architect will select default keywords and allow overrides via prompt parameters.

## Deployment & Questions for the User

- Confirmed target from you: `owner=rithika-u`, `repo=rithika-u.github.io`.
- The Deployment Agent will prompt for `branch` (default `main`) when generating exact Copilot CLI commands.

Please confirm you want me to: (choose)
1. Generate the `.agent.md` and `.skill.md` files and the new prompt templates under `.github/prompts/` now (I will commit them as artifacts), or
2. Only produce the prompts and plan and wait for your approval before writing agent/skill files.

---
_Plan updated from `.github/prompts/prompts.md` on Feb 13, 2026._
