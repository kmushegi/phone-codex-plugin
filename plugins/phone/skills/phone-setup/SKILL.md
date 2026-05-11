---
name: phone-setup
description: Guide a user through setting up Kote's hosted phone plugin, including marketplace enablement, dashboard sign-in, caller name, billing or number setup, API-key minting, environment configuration, and MCP verification.
---

# phone setup

Use this skill when a user asks to install, configure, onboard, repair, or get started with the phone plugin.

## Setup Flow

Guide the user through setup without asking them to paste secrets into chat:

1. If the plugin is not enabled yet, have them run `codex plugin marketplace add kmushegi/phone-codex-plugin`, then enable `phone` from the Codex app plugin UI.
2. Send the user to `https://phone.kote.fyi`.
3. Tell them to sign in with the email they want tied to their phone account.
4. If prompted, have them enter their invite code.
5. Have them set the name the assistant should use on calls.
6. If the dashboard prompts for billing or phone-number setup, have them complete it there. The website is the source of truth for payment, number ownership, and account state.
7. Have them open the dashboard API-key area, mint a key labeled `codex`, and copy it locally without posting it in chat.
8. Help them set `PHONE_AGENT_API_KEY` in the environment Codex can read, then restart Codex or reload the plugin if the MCP cannot see it.
9. Verify the setup by calling `list_outbound_contacts`.

If the user needs a terminal command, suggest:

```bash
export PHONE_AGENT_API_KEY=<api-key-from-phone-dashboard>
```

For persistence, suggest their normal local environment manager, shell profile, or an ignored private environment file. Do not make shell profile editing the default path, and do not ask them to reveal the key.

## Recovery

If MCP tools fail with missing or invalid authentication:

- Do not ask the user to paste the raw API key into chat.
- Ask them to revisit `https://phone.kote.fyi`, mint or revoke and re-mint a scoped API key, update `PHONE_AGENT_API_KEY`, and restart Codex.
- If the dashboard works but MCP still fails, verify the MCP URL is `https://phone.kote.fyi/mcp`.
- If the marketplace is missing, have them run `codex plugin marketplace add kmushegi/phone-codex-plugin` and enable `phone` in the Codex app.

If MCP tools connect but the user has no contacts:

- Use `add_outbound_contact` only when the user gives an alias and number.
- Raw E.164 numbers are allowed for a specific call only when the user explicitly provides the number for that call.

## Completion Criteria

Setup is complete when:

- The user has signed in at `https://phone.kote.fyi`.
- The user has a caller display name in the hosted profile.
- Billing or number setup is complete if the dashboard requires it.
- `PHONE_AGENT_API_KEY` is configured outside chat.
- The `phone` plugin is enabled in Codex.
- `list_outbound_contacts` succeeds through the hosted MCP.
