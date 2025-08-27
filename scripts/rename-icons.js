const { join, extname, basename } = require('node:path');
const fs = require('fs');
const fsp = fs.promises;

const dirWithIcons = join(__dirname, '../src/shared/assets/icons/svg');

// helper: в kebab-case
function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2') // handle camelCase → camel-case
    .replace(/[\s_]+/g, '-') // пробелы и _ → -
    .replace(/[^a-zA-Z0-9-]/g, '') // убираем всё лишнее ((),#,@,и т.п.)
    .replace(/--+/g, '-') // двойные дефисы → один
    .toLowerCase();
}

async function main() {
  const files = await fsp.readdir(dirWithIcons);

  await Promise.all(
    files.map(async (file) => {
      const ext = extname(file);
      if (ext !== '.svg') return; // обрабатываем только svg

      const base = basename(file, ext);
      const newName = toKebabCase(base) + ext;
      if (newName !== file) {
        await fsp.rename(join(dirWithIcons, file), join(dirWithIcons, newName));
        console.log(`✅ ${file} → ${newName}`);
      }
    })
  );
}

main().catch((e) => {
  console.error('❌ Ошибка при переименовании:', e);
  process.exit(1);
});

//   command for manual start:
// node scripts/rename-icons.js

/// for create react components!!!  <-------
// npx @svgr/cli \
//   --out-dir src/shared/assets/icons/components \
//   --jsx-runtime automatic \
//   --typescript \
//   --ref \
//   --memo \
//   --icon \
//   --replace-attr-values "#000=currentColor" \
//   --replace-attr-values "#fff=currentColor" \
//   src/shared/assets/icons/svg
