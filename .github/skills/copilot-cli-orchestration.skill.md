# Copilot CLI Orchestration Skill

Purpose: Craft Copilot CLI–compatible agent manifests, prompts, and command sequences to automate scaffold and deployment workflows.

Capabilities:
- Produce `.agent.md` YAML front matter and tool lists.
- Output ordered shell commands for Copilot CLI usage and Git operations.
- Validate required inputs (`owner`, `repo`, `branch`) and prompt the user when missing.

Inputs: deployment target metadata and file manifest.
Outputs: Copilot CLI command sequence and verification checklist.
