# Phone Agent Submission Checklist

This plugin is packaged for local Codex testing under `plugins/phone`. Friend/beta distribution uses the public Git-backed marketplace repo at `https://github.com/kmushegi/phone-codex-plugin`; broader OpenAI directory submission can still go through Apps SDK dashboard review when the product is ready.

## Local Plugin Package

- Manifest: `plugins/phone/.codex-plugin/plugin.json`
- MCP config: `plugins/phone/.mcp.json`
- Connector mapping: `plugins/phone/.app.json`
- Skill: `plugins/phone/skills/phone-agent/SKILL.md`
- Local marketplace: `.agents/plugins/marketplace.json`
- Legal drafts: `plugins/phone/legal/privacy-policy.md` and `plugins/phone/legal/terms-of-service.md`

Restart Codex after marketplace changes, then enable Phone Agent from the repo marketplace in the Codex app.

## OpenAI Dashboard Prerequisites

- Complete individual or business verification for the publisher name.
- Use a project with global data residency.
- Ensure the submitting user has `api.apps.write`; `api.apps.read` is needed to view drafts and status.
- Host the MCP server at a public production URL. The current plugin points to `https://phone.kote.fyi/mcp`.
- Provide review credentials for a demo account without MFA or additional out-of-band verification.
- Define the app CSP for the exact domains the app fetches from.
- Publish final privacy policy and terms URLs before submission.

## Tool Review Notes

Declared MCP tools:

- `list_outbound_contacts`: read-only, closed/private data.
- `add_outbound_contact`: private additive write.
- `delete_outbound_contact`: private destructive write.
- `place_task_call`: user-approved external action; can place calls, make reservations, reschedule, or cancel, so it is marked open-world and destructive.
- `get_call_result`: read-only, closed/private data.
- `list_recent_calls`: read-only, closed/private data.
- `list_inbound_calls`: read-only, closed/private data.

`place_task_call` must reject requests unless `confirmed` is `true`, and the skill must only pass `confirmed: true` after the user approves a specific call destination and objective.

## Suggested Review Test Prompts

1. "List my approved outbound phone contacts."
   - Expected: returns only the demo account's contact aliases and phone numbers.

2. "Add `test-restaurant` as an outbound contact for +15555550100."
   - Expected: creates only a contact entry scoped to the demo account.

3. "Call `test-restaurant` to ask whether they have patio seating tonight. I approve placing this test call."
   - Expected: places one outbound call, records the result, and does not create or edit calendar events.

4. "Show the result of the most recent phone-agent call."
   - Expected: returns concise call status and structured notes without exposing API keys or unrelated account data.

5. "Delete the `test-restaurant` contact."
   - Expected: removes only that demo account contact.

## Pre-Submit Validation

Run:

```bash
npm test
```

Then exercise the hosted MCP endpoint from a clean environment with only `PHONE_AGENT_API_KEY` configured. Confirm `tools/list` includes annotations for every tool and that the demo account can complete the review test prompts. Live Realtime evals live in the private backend repo, not this plugin distribution repo.
