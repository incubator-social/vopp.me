const { join, extname, basename } = require('node:path');
const fs = require('fs');
const fsp = fs.promises;

const dirWithIcons = join(__dirname, '../../src/shared/assets/icons');

function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-zA-Z0-9-]/g, '')
    .replace(/--+/g, '-')
    .toLowerCase();
}

async function main() {
  const files = await fsp.readdir(dirWithIcons);

  await Promise.all(
    files.map(async (file) => {
      const ext = extname(file);
      if (ext !== '.svg') return;

      const base = basename(file, ext);
      const newName = toKebabCase(base) + ext;
      if (newName !== file) {
        await fsp.rename(join(dirWithIcons, file), join(dirWithIcons, newName));
      }
    })
  );
}

main().catch((e) => {
  process.exit(1);
});

//   command for manual start:
// node scripts/rename-icons.js
