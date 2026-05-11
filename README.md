# phone Codex plugin

This repository is the public Codex plugin marketplace for `phone`.

`phone` connects Codex to the hosted phone MCP endpoint after the user signs in at the dashboard, finishes invite or billing setup, and mints a scoped API key.

## Install

```bash
codex plugin marketplace add kmushegi/phone-codex-plugin
```

Then open Codex and enable the `phone` plugin from the app plugin UI.

When prompted, use the API key minted at [phone.kote.fyi](https://phone.kote.fyi). If Codex needs a local environment variable, set:

```bash
export PHONE_AGENT_API_KEY=<api-key-from-phone-dashboard>
```

Restart Codex or reload plugins if Codex cannot see the environment variable.

## What is included

- `.agents/plugins/marketplace.json`
- `plugins/phone/.codex-plugin/plugin.json`
- hosted MCP config for `https://phone.kote.fyi/mcp`
- setup and calling skills
- draft privacy and terms documents

This repo intentionally does not include the phone backend, infrastructure, secrets, dashboards, or operational tooling.

## Validate

```bash
npm test
```
