// Copies a text file into lexen-bubble-web-comp without leaving line-ending-only
// changes behind. That repo is checked out with core.autocrlf=true (CRLF on
// disk, LF in git), while our builds emit LF; a plain copy rewrites every line
// and git flags the file as modified even when the content is identical. So
// write in whatever line endings the existing destination file already uses,
// and skip the write entirely when nothing actually changed.
import { existsSync, readFileSync, writeFileSync } from 'fs';

export function copyText(src, dest) {
  const content = readFileSync(src, 'utf8').replace(/\r\n/g, '\n');

  let eol = '\n';
  if (existsSync(dest)) {
    const existing = readFileSync(dest, 'utf8');
    if (existing.replace(/\r\n/g, '\n') === content) return false;
    if (existing.includes('\r\n')) eol = '\r\n';
  }

  writeFileSync(dest, eol === '\n' ? content : content.replace(/\n/g, eol));
  return true;
}
