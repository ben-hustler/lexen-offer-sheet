// Copies the built lexen-offer-sheet web component bundle into
// lexen-bubble-web-comp, alongside the other webcomp bundles it hosts, the same
// way build-lambda.js lands the printout-offer Lambda source there.
import { existsSync, mkdirSync, copyFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoDir = path.join(__dirname, '..', '..', '..', 'lxn-gh', 'lexen-bubble-web-comp');
const src = path.join(__dirname, '..', 'dist', 'lexen-offer-sheet.js');
const destDir = path.join(repoDir, 'web-app', 'dist', 'webcomp');

if (!existsSync(repoDir)) {
  console.log('lexen-bubble-web-comp not found, skipping');
  process.exit(0);
}

mkdirSync(destDir, { recursive: true });
copyFileSync(src, path.join(destDir, 'lexen-offer-sheet.js'));

console.log('copied lexen-offer-sheet.js to lexen-bubble-web-comp');
