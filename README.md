# html360-gen

**Standalone, zero-dependency binaries** for the original [Pannellum](https://github.com/mpetroff/pannellum/blob/a5e2f25d960270b6cdd6136d2c18c21f745bba0e/utils/multires/generate.py) multiresolution generator.

## Overview

The original Pannellum processing script `generate.py` is powerful but requires a Python environment with `Pillow` and depends on `nona` (from Hugin). 

This project provides a **pre-compiled, portable version** of that script. It includes all necessary C++ dependencies (`nona`, `zlib`, etc.) inside a single executable for **Windows**, **Linux**, and **macOS**.

## Installation

```bash
npm install html360-gen
```

## Usage
### Node.js 
```javascript
import { html360Gen } from 'html360-gen';
import { execFile } from 'child_process';

const genPath = html360Gen.getBinaryPath();

// Example: Slice a 360° panorama into tiles
const args = ['input.jpg', '--output', './tiles_output'];

execFile(genPath, args, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error: ${error.message}`);
        return;
    }
    console.log('✅ Success! Tiles generated.');
});
```

### Command Line Interface (CLI)
If installed locally, run via npx:

```
npx html360-gen input.jpg
```
If installed globally, run directly:
```
html360-gen input.jpg
```
### Note
The binary supports all original Pannellum flags like --bin, --levels, etc. Run with --help to see all options.

## Technical Details
- **Core**: Fork of the official Pannellum generate.py.
- **Engine**: Bundled nona utility for mathematically accurate cube projection.
- **Packaging**: Compiled using PyInstaller with custom library path patching for macOS portability.

### Versioning Policy
This project follows a **mirror versioning** strategy relative to the official [Pannellum](https://www.npmjs.com/package/pannellum) releases:
- The **Major** and **Minor** versions match the corresponding Pannellum version (e.g., `2.5.x`).
- The **Patch** version reflects updates, bug fixes, or binary improvements specific to this generator project.


## Credits
- **Pannellum** — the core 360° viewer engine by Matthew Petroff.
- **Hugin** — for the nona stitching engine.
- **Google Gemini** — for co-authoring the entire project architecture and CI/CD pipelines.