---
name: phone-setup
description: Guide a user through setting up Kote's hosted phone plugin, including dashboard sign-in, caller name, billing or number setup, API-key minting, environment configuration, and MCP verification.
---

# phone setup

Use this skill when a user asks to install, configure, onboard, repair, or get started with the phone plugin.

## Setup Flow

Guide the user through setup without asking them to paste secrets into chat:

1. Send the user to `https://phone.kote.fyi`.
2. Tell them to sign in with the email they want tied to their phone account.
3. If prompted, have them enter their invite code.
4. Have them set the caller display name the assistant should use on calls.
5. If the dashboard prompts for billing or phone-number setup, have them complete it there. The website is the source of truth for payment, number ownership, and account state.
6. Have them open the dashboard API-key area, mint a key labeled `codex`, and copy it locally without posting it in chat.
7. Help them set `PHONE_AGENT_API_KEY` in their local environment, then restart Codex or reload the plugin.
8. Verify the setup by calling `list_outbound_contacts`.

For macOS/zsh, suggest:

```bash
export PHONE_AGENT_API_KEY=<api-key-from-phone-dashboard>
```

If they want the key to persist across terminal sessions, suggest adding that export to their local shell profile or an ignored private environment file. Do not ask them to reveal the key.

## Recovery

If MCP tools fail with missing or invalid authentication:

- Do not ask the user to paste the raw API key into chat.
- Ask them to revisit `https://phone.kote.fyi`, mint or revoke and re-mint a scoped API key, update `PHONE_AGENT_API_KEY`, and restart Codex.
- If the dashboard works but MCP still fails, verify the MCP URL is `https://phone.kote.fyi/mcp`.

If MCP tools connect but the user has no contacts:

- Use `add_outbound_contact` only when the user gives an alias and number.
- Raw E.164 numbers are allowed for a specific call only when the user explicitly provides the number for that call.

## Completion Criteria

Setup is complete when:

- The user has signed in at `https://phone.kote.fyi`.
- The user has a caller display name in the hosted profile.
- Billing or number setup is complete if the dashboard requires it.
- `PHONE_AGENT_API_KEY` is configured outside chat.
- `list_outbound_contacts` succeeds through the hosted MCP.
