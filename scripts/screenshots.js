// Saves phone-size screenshots of the main screens, for the session report.
// Usage: node scripts/screenshots.js <output-folder> <file-prefix>
// Needs the local server running (node scripts/serve.js) and Microsoft Edge or Chrome.
const { execFileSync } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");

const [outDir, prefix] = process.argv.slice(2);
if (!outDir || !prefix) { console.error("Usage: node scripts/screenshots.js <output-folder> <file-prefix>"); process.exit(1); }

const browsers = [
  path.join(process.env["ProgramFiles(x86)"] || "", "Microsoft/Edge/Application/msedge.exe"),
  path.join(process.env.ProgramFiles || "", "Microsoft/Edge/Application/msedge.exe"),
  path.join(process.env.ProgramFiles || "", "Google/Chrome/Application/chrome.exe")
];
const browser = browsers.find((b) => fs.existsSync(b));
if (!browser) { console.error("No Edge or Chrome found."); process.exit(1); }

// Main screens, in report order. Edit this list as screens are added.
const shots = [
  "?style=o",                                         // 1. Who is using this?
  "?style=o&screen=child-road",                       // 2. Child: road to Heart doctor
  "?style=o&screen=parent-about",                     // 3. Parent: About you
  "?style=o&screen=parent-plan"                       // 4. Parent: one big number
];

// Headless browsers on Windows will not make a window narrower than about 500px,
// so each screen is shown in a 390px frame (shot.html) and the picture is cropped to 390px.
const profile = fs.mkdtempSync(path.join(os.tmpdir(), "cgps-shot-"));
const crop = (file) => execFileSync("powershell.exe", ["-NoProfile", "-Command",
  "Add-Type -AssemblyName System.Drawing; $src=[Drawing.Image]::FromFile('" + file + "'); " +
  "$bmp=New-Object Drawing.Bitmap 390,844; $g=[Drawing.Graphics]::FromImage($bmp); " +
  "$g.DrawImage($src,(New-Object Drawing.Rectangle 0,0,390,844),(New-Object Drawing.Rectangle 0,0,390,844),[Drawing.GraphicsUnit]::Pixel); " +
  "$src.Dispose(); $bmp.Save('" + file + "',[Drawing.Imaging.ImageFormat]::Png); $g.Dispose(); $bmp.Dispose()"]);
shots.forEach((q, i) => {
  const file = path.resolve(outDir, `${prefix}-${i + 1}.png`);
  execFileSync(browser, [
    "--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run",
    `--user-data-dir=${profile}`, "--window-size=600,844", "--force-device-scale-factor=1", "--virtual-time-budget=3000",
    `--screenshot=${file}`, `http://localhost:4321/shot.html${q}&embed=1`
  ], { stdio: "ignore", timeout: 60000 });
  if (fs.existsSync(file)) crop(file);
  console.log(fs.existsSync(file) ? "saved " + file : "FAILED " + file);
});
fs.rmSync(profile, { recursive: true, force: true });
