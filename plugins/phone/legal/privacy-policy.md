# Phone Agent Privacy Policy

Effective date: April 27, 2026

Phone Agent connects Codex to a hosted phone-agent MCP service so users can manage outbound contacts, place explicitly approved phone calls, and review call results.

## Data processed

Phone Agent may process:

- Account display name and scoped API key metadata.
- Outbound contact aliases and phone numbers that a user adds.
- Call destination, task objective, scheduling preferences, questions, constraints, and user-approved sensitive context included for a specific call.
- Call status, timestamps, call identifiers, structured call results, and call notes.
- Calendar availability only when the user has connected Google Calendar and asks to use availability for scheduling. Calendar events are used for availability checks and are not changed unless the user separately approves a calendar write outside this plugin's phone-call flow.

Phone Agent should not be used to provide secrets, passwords, government identifiers, payment-card data, or other sensitive account credentials to third parties unless the user explicitly approves the exact information for a specific call.

## Use of data

Data is used to authenticate the user, enforce per-user access, restrict calls to approved destinations or user-provided E.164 numbers, place approved calls, summarize outcomes, and support abuse prevention and reliability monitoring.

## Sharing

Phone Agent shares call content with the called party during the approved phone call. Telephony providers and model providers may process call audio, transcripts, and related metadata to deliver the service. Phone Agent does not sell user data.

## Retention and deletion

Phone Agent stores contact entries and call records so users can inspect results and audit recent activity. Users or administrators may delete outbound contact entries. Call-record deletion and retention controls depend on the hosted deployment configuration.

## Security

API keys are scoped to one hosted user. Raw API keys are shown once at creation time; the service stores hashes and prefixes for verification. Users should keep API keys out of chat transcripts and source control.

## Contact

For privacy requests, contact the operator of the hosted Phone Agent deployment.
