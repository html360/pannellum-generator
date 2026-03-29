const os = require("os");
const fs = require("fs");
const path = require("path");
const https = require("https");
const pkg = require("./package.json");

const platform = os.platform();

let binaryName;
if (platform === "win32") binaryName = "html360-gen-win.exe";
if (platform === "linux") binaryName = "html360-gen-linux";
if (platform === "darwin") binaryName = "html360-gen-macos";

if (!binaryName) {
  console.error("❌ Error: Your operating system is not supported.");
  process.exit(0); // Завершаем без ошибки, чтобы не ломать npm install (сломает установку html360)
}

const binDir = path.join(__dirname, "bin");
const dest = path.join(
  binDir,
  platform === "win32" ? "html360-gen.exe" : "html360-gen",
);

if (!fs.existsSync(binDir)) {
  fs.mkdirSync(binDir, { recursive: true });
}

const url = `https://github.com/html360/html360-gen/releases/download/v${pkg.version}/${binaryName}`;

function download(fileUrl) {
  console.log(`Downloading binary for ${platform}...`);

  https
    .get(fileUrl, (res) => {
      // Handle GitHub Redirects (301 or 302)
      if (res.statusCode === 301 || res.statusCode === 302) {
        return download(res.headers.location);
      }

      if (res.statusCode !== 200) {
        console.error(`❌ Download failed: Server returned ${res.statusCode}`);
        process.exit(1);
      }

      const file = fs.createWriteStream(dest);
      res.pipe(file);

      file.on("finish", () => {
        file.close();
        // Grant execution permissions for Linux/Mac
        if (platform !== "win32") {
          fs.chmodSync(dest, 0o755);
        }
        console.log("✅ Binary downloaded and ready to use!");
        process.exit(0);
      });
      file.on("error", () => {
        console.error("❌ Write file error:", err.message);
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        process.exit(1);
      });
    })
    .on("error", (err) => {
      console.error("❌ Network error:", err.message);
      process.exit(1);
    });
}

download(url);
