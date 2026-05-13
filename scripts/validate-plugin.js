#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "..");
const marketplace = readJson(".agents/plugins/marketplace.json");
const plugin = marketplace.plugins.find((entry) => entry.name === "phone");
const pluginRoot = path.join(repoRoot, "plugins", "phone");

assert(marketplace.name === "phone-codex-plugin", "marketplace name must be phone-codex-plugin");
assert(plugin, "marketplace must expose the phone plugin");
assert(plugin.source?.source === "local", "phone plugin source must be local");
assert(plugin.source?.path === "./plugins/phone", "phone plugin path must be ./plugins/phone");
assert(plugin.policy?.installation === "AVAILABLE", "phone plugin must be installable");
assert(plugin.policy?.authentication === "ON_INSTALL", "phone plugin auth must run on install");

const manifest = readJson("plugins/phone/.codex-plugin/plugin.json");
assert(manifest.name === "phone", "plugin name must be phone");
assert(manifest.license === "MIT", "plugin license must be MIT");
assert(manifest.homepage === "https://phoneforagents.com", "homepage must point at the beta dashboard");
assert(manifest.repository === "https://github.com/kmushegi/phone-codex-plugin", "repository must point at this public repo");

for (const relativePath of [
  manifest.skills,
  manifest.mcpServers,
  manifest.apps,
  manifest.interface.composerIcon,
  manifest.interface.logo
]) {
  assert(relativePath.startsWith("./"), `${relativePath} must be relative to the plugin root`);
  assert(fs.existsSync(path.join(pluginRoot, relativePath)), `${relativePath} must exist`);
}

for (const relativePath of [
  "plugins/phone/legal/privacy-policy.md",
  "plugins/phone/legal/terms-of-service.md"
]) {
  assert(fs.existsSync(path.join(repoRoot, relativePath)), `${relativePath} must exist`);
}

const mcpConfig = readJson("plugins/phone/.mcp.json");
assert(mcpConfig.mcpServers?.phone?.url === "https://phoneforagents.com/mcp", "MCP server must point at hosted phone");
assert(mcpConfig.mcpServers?.phone?.bearer_token_env_var === "PHONE_AGENT_API_KEY", "MCP auth must use PHONE_AGENT_API_KEY");

const rootReadme = fs.readFileSync(path.join(repoRoot, "README.md"), "utf8");
const pluginReadme = fs.readFileSync(path.join(pluginRoot, "README.md"), "utf8");
const setupSkill = fs.readFileSync(path.join(pluginRoot, "skills", "phone-setup", "SKILL.md"), "utf8");
const docs = `${rootReadme}\n${pluginReadme}\n${setupSkill}`;
assert(docs.includes("codex plugin marketplace add kmushegi/phone-codex-plugin"), "docs must include marketplace add command");
assert(/enable .*phone.*Codex app/i.test(docs), "docs must tell users to enable phone in the Codex app");
assert(!docs.includes("codex plugin install"), "docs must not reference unsupported plugin install command");
assert(/do not ask (them|the user) to (reveal|paste)/i.test(setupSkill), "setup skill must not ask users to reveal API keys");

console.log("phone Codex plugin package is valid");

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(repoRoot, relativePath), "utf8"));
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}
