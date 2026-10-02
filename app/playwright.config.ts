import { defineConfig, devices } from "@playwright/test";

// Click-through tests at phone size, using the Microsoft Edge already on this PC
// (no extra browser download).
export default defineConfig({
  testDir: "e2e",
  timeout: 30_000,
  fullyParallel: true,
  reporter: [["list"]],
  use: {
    baseURL: "http://localhost:4173",
    channel: "msedge",
    ...devices["Pixel 7"],
    browserName: "chromium"
  },
  webServer: {
    command: "npm run preview",
    url: "http://localhost:4173",
    reuseExistingServer: true,
    timeout: 60_000
  }
});
