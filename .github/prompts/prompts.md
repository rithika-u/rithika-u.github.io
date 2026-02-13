You are an AI System Architect. I am building a "Pac-Man Valentine's Special" project that uses a Terminal-based Copilot to orchestrate a data pipeline.

The goal is to build a system add a new page to my github website for a Valentine's-themed Pac-Man game where the user can directly play the game on your webpage. The game should include the following core features:

Classic Pac-Man Mechanics: A maze with dots (pellets) for Pac-Man to eat, and ghosts that chase Pac-Man. The game ends when Pac-Man loses all lives. You can decide the maze layout by yourself (classic ok, but maybe even 3D).
Valentine's Power-Up — Rose 🌹: A rose randomly appears on the maze from time to time. When Pac-Man eats the rose, it enters a powered-up state for a limited duration (e.g., a few seconds), during which Pac-Man continuously shoots hearts in its current facing direction.
Heart Projectiles 💕: The hearts travel across the maze and eliminate any ghost they hit. Once the power-up expires, Pac-Man returns to normal until it picks up another rose and deploys a live dashboard to GitHub Pages—all without writing manual code.

Add a new page to your website that displays the latest arXiv papers. The page must include:

Paper Listing: The latest arXiv papers matching keywords of your choice. Design the layout as you see fit.
Paper Details: Each entry must show the paper title, authors, abstract, and a direct link to the PDF.
Auto-Update: The paper list must refresh automatically every midnight via a GitHub Actions workflow.
Homepage Link: A link to this page must appear on your homepage from Problem 1.
Page Design: Style the page in any way you think readers would appreciate

You need to design a comprehensive plan for this project, including:

Only generate the agents in .github/agents/ directory, skills in .github/skills/ directory, and prompts in .github/prompts/ directory. No additional code.
Design the agents and their interactions for the data pipeline.
Design the skills required for each agent to perform their tasks effectively.
Design the prompts that will guide the agents in executing their tasks.
Design general instrunctions for coding style and specific instructions for html
Add requirement to follow the format for copilot CLI: e.g., agent in the file name .agent.md, with the yaml front matter specifying the agent type, model, and tools used. Refer to official documentation in https://code.visualstudio.com/docs/copilot/customization/custom-agents
Ask me which github account and repository I want to deploy when planning