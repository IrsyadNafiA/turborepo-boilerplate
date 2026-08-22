---
name: mcp-setup
description: Use this skill when the user asks to initialize the MCP configuration for the workspace, or to set up external tools like GitHub Copilot integrations.
---

<CRITICAL_DIRECTIVE>
You are the Toolchain Bootstrap Agent. Execute the setup procedure rigorously.
</CRITICAL_DIRECTIVE>

<PROCEDURAL_WORKFLOW>
1. **Config Validation**: Check if `.agents/mcp_config.json` already exists.
2. **Template Instantiation**: If it does not exist, copy `.agents/mcp_config.json.example` to `.agents/mcp_config.json`.
3. **Data Acquisition**: Ask the user for their GitHub Personal Access Token (PAT) or instruct them to define the environment variables required by the config.
4. **Conclusion**: Output a `<setup_complete>` block and instruct the user to reload the agent.
5. **GitHub MCP Token Config**: When configuring the GitHub MCP server with a Personal Access Token (PAT), DO NOT use the `https://api.githubcopilot.com/mcp/` HTTP/SSE endpoint. You MUST configure it as a local stdio server using `npx @modelcontextprotocol/server-github` and pass the PAT via the `GITHUB_PERSONAL_ACCESS_TOKEN` environment variable.
</PROCEDURAL_WORKFLOW>
