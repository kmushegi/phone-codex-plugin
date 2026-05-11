# Phone Agent Plugin

Phone Agent connects Codex directly to the hosted `local-phone-agent` remote MCP endpoint after the user finishes setup on the phone dashboard.

## Configuration

The plugin defaults to:

```text
https://phone.kote.fyi/mcp
```

New users should start at:

```text
https://phone.kote.fyi
```

The dashboard is the source of truth for sign-in, invite codes, caller display name, billing or number setup when enabled, and API-key minting. Each installer must provide the resulting scoped `PHONE_AGENT_API_KEY` in the environment Codex can read; Codex should never ask the user to paste the raw key into chat.

If Codex needs a local environment variable, set:

```bash
export PHONE_AGENT_API_KEY=<api-key-from-phone-dashboard>
```

Then restart Codex or reload the plugin so the hosted MCP can read the environment variable.

## Local Marketplace Testing

This repo includes `.agents/plugins/marketplace.json`, which points Codex at `plugins/phone` for local testing. Restart Codex after changing plugin files, then enable Phone Agent from the repo marketplace in the Codex app.

## Public Marketplace Install

The public plugin package is distributed from:

```text
https://github.com/kmushegi/phone-codex-plugin
```

Add the marketplace from Codex with:

```bash
codex plugin marketplace add kmushegi/phone-codex-plugin
```

Then open Codex and enable the `phone` plugin from the app plugin UI.

## Setup Expectations

Before placing real calls, the Phone Agent skill should verify:

- the user's name for outbound call introductions
- the dashboard account is set up at `https://phone.kote.fyi`
- Google Calendar access for scheduling calls
- a configured `PHONE_AGENT_API_KEY`
- the intended remote MCP URL, `https://phone.kote.fyi/mcp`
- outbound contacts and allowlist entries
- explicit user approval for the specific call

## Submission

See `SUBMISSION.md` for the OpenAI dashboard checklist, review test prompts, legal-link requirements, and tool annotation notes.
