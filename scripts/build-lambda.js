// Copies the printout-offer Python Lambda source into lexen-bubble-web-comp,
// the deployment repo — mirrors how lxn-customizer's `npm run build` and
// lexen-offer-link's `bundle:lambdas` land their output there. No compile step;
// Python Lambdas ship as plain source, so this is a straight file copy.
import { existsSync, mkdirSync, copyFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(__dirname, '..', 'lambda', 'printout-offer');
const destDir = path.join(__dirname, '..', '..', 'lexen-bubble-web-comp', 'lambda', 'printout', 'printout-offer');

if (!existsSync(path.join(__dirname, '..', '..', 'lexen-bubble-web-comp'))) {
  console.log('lexen-bubble-web-comp not found, skipping');
  process.exit(0);
}

mkdirSync(destDir, { recursive: true });

for (const file of ['index.py', 'render.py', 'requirements.txt']) {
  copyFileSync(path.join(srcDir, file), path.join(destDir, file));
}

console.log('copied printout-offer lambda to lexen-bubble-web-comp');
