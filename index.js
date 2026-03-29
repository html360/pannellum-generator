import path from 'path';
import fs from 'node:fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getBinaryPath() {
    const platform = process.platform;

    let binaryName;
    if (platform === 'win32') binaryName = 'html360-gen.exe';
    if (platform === 'darwin') binaryName = 'html360-gen';
    if (platform === "linux") binaryName = 'html360-gen';
    if (!binaryName){
      throw new Error(`[html360-gen] Platform ${process.platform} is not supported.`);
    }

    const result = path.join(__dirname, 'bin', binaryName);

    if (!fs.existsSync(result)) {
      throw new Error(
        `[html360-gen] Binary not found! Try reinstalling the package.`,
      );
    }    

    return result;
}

export const html360Gen = {
  getBinaryPath
}