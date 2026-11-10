import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { defineConfig, devices } from "@playwright/test";

const port = 3100;

// macOS 27 blocks Firefox from its app-data folder when a terminal starts it ("Could not find profile
// folder", Mozilla bug 2060476). An empty fake home folder sidesteps it. shortcut: drop once fixed upstream.
const firefoxEnv =
  process.platform === "darwin"
    ? { ...process.env, CFFIXED_USER_HOME: mkdtempSync(join(tmpdir(), "pw-firefox-")) }
    : undefined;

/** End-to-end checks against the production build, in the three engines visitors use. */
export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env["CI"]),
  reporter: process.env["CI"] ? "github" : "list",
  use: { baseURL: `http://localhost:${port}` },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        ...(firefoxEnv ? { launchOptions: { env: firefoxEnv } } : {}),
      },
    },
  ],
  // Tests run against `next start`, so they see the real production output. Locally an already
  // running server on the port is reused; build first with `bun run build`.
  webServer: {
    command: `bun run build && bun --bun next start -p ${port}`,
    url: `http://localhost:${port}/yank`,
    reuseExistingServer: !process.env["CI"],
    timeout: 120_000,
  },
});
