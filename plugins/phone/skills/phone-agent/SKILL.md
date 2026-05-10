---
name: phone-agent
description: Use Kote's hosted phone MCP to prepare and place explicitly approved outbound calls, including setup checks for identity, calendar access, API key, contacts, and service readiness.
---

# Phone Agent

Use this skill when a user asks Codex to place, prepare, inspect, reschedule, cancel, or summarize a phone call through Kote's hosted phone agent.

## Setup Checks

Before the first real call in a Codex session:

1. If the user has not completed phone setup, use the bundled `phone-setup` skill first.
2. Confirm the user-facing name the assistant should use for the caller. Prefer the hosted dashboard profile when available.
3. Confirm Google Calendar access is available when the call involves scheduling, booking, rescheduling, or availability.
4. Confirm `PHONE_AGENT_API_KEY` is configured for this Codex instance. Do not ask the user to paste keys into chat.
5. Confirm the MCP server is configured with the intended remote URL. The plugin default is `https://phone.kote.fyi/mcp`.
6. Run `list_outbound_contacts` before placing calls. Prefer configured aliases; raw E.164 numbers are allowed only when the user explicitly supplies the number for this call.
7. Confirm the hosted phone service is reachable. If tools return an auth error, direct the user to `https://phone.kote.fyi` to mint or repair their scoped API key and then restart Codex. If tools return a connection error, ask the user to verify the hosted deployment.
8. Gather only the details needed for the call. Treat medical, legal, financial, account, and identity details as sensitive and include them only when the user explicitly approves saying them.

## Call Safety

- Never place a call without explicit approval for that specific call.
- Pass `confirmed: true` only after the user clearly approves placing the call.
- Restate the destination, objective, important constraints, and any sensitive details before asking for approval.
- Use `place_task_call` for call workflows.
- After placing a call, fetch the result with `get_call_result` when a `call_id` is returned, or use `list_recent_calls` if the ID is unavailable.
- Do not create, change, or cancel calendar events until the user approves the final result.

## Calendar Handling

For scheduling calls:

1. Check the user's calendar before offering or approving times.
2. Pass preferred and fallback times as clear natural-language strings with date, time, and timezone when possible.
3. After the call, summarize the confirmed outcome and ask before writing anything to the calendar.

## MCP Tools

Expected hosted phone MCP tools:

- `list_outbound_contacts`
- `add_outbound_contact`
- `delete_outbound_contact`
- `place_task_call`
- `get_call_result`
- `list_recent_calls`
- `list_inbound_calls`
