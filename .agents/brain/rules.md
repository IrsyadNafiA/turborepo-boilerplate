---
name: rules
description: Long-term memory for the agent. Contains learned architectural lessons and user corrections.
---

# Learned Lessons

This file acts as the agent's persistent memory. If the agent makes a mistake, the user corrects it, or a deeply nested framework bug is solved, the solution MUST be appended here to prevent future regressions.

## Rules

- **Package Manager**: Always use `npm` (not pnpm or yarn) for managing Turborepo workspaces in this project.
- **Dynamic Database Config**: Database configurations (e.g., NestJS TypeORM) MUST be dynamically driven by `.env` variables.
- **Default Database**: Use PostgreSQL as the default database system unless otherwise specified.
- **GitHub CLI**: Always prioritize using the GitHub CLI (`gh`) for remote interactions with GitHub (e.g., creating repos, managing PRs) instead of using the API directly or manual remote git configurations where applicable.
- **Task Tracking**: Selalu gunakan GitHub Issues (`gh issue create` & `close`) untuk mencatat ide *brainstorming*, merencanakan fitur baru, dan melacak penyelesaian tugas (terutama pada proyek berskala besar atau boilerplate).
- **Git Feature Branching**: NEVER push feature changes directly to the `main` branch. For every new task or issue, you MUST create a dedicated, descriptively named branch (e.g., `feat/issue-8-auth-store`) before writing code.
