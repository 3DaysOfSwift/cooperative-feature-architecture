# Privacy and data handling

CFA’s installer and dashboard do not send telemetry, upload source, fetch packages,
or contact a developer server. The installer writes only the selected installation
and personal marketplace locations, then optionally invokes the installed Codex CLI.
That host may perform its own operations under its own policies.

An AI-guided review uses the chosen agent and model provider. Source may be processed
by that provider. Local scanner execution must not be described as an entirely local
AI workflow. Review your host’s data controls before analysing a private project.

HTML and JSON reports include source excerpts and file paths. Keep them local unless
you intend to share those details. Historical Trend reports are not shipped.

No authentication credentials, model API keys, simulator images, Xcode installation
or user datasets are included in the toolkit. The plugin has no MCP server, hooks or
network connector.
