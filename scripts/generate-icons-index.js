const { join, extname, basename } = require('node:path');
const fsp = require('fs').promises;

const baseDir = join(__dirname, '../src/shared/assets/icons/components');

// создаём index.ts с экспортами
async function generateIndex() {
  const files = await fsp.readdir(baseDir);

  const icons = files
    .filter((file) => extname(file) === '.tsx' && file !== 'index.ts' && file !== 'icons-map.ts')
    .map((file) => basename(file, '.tsx'));

  const exports = icons.map((name) => `export { default as ${name} } from "./${name}";`).join('\n');

  await fsp.writeFile(join(baseDir, 'index.ts'), exports + '\n', 'utf8');
  console.log('✅ index.ts сгенерирован');

  return icons;
}

// создаём icons-map.ts
async function generateIconsMap(icons) {
  const content = `// ⚡ Автогенерация, не редактируй вручную!

export const ICONS = ${JSON.stringify(icons, null, 2)};
`;

  await fsp.writeFile(join(baseDir, 'icons-map.ts'), content, 'utf8');
  console.log('✅ icons-map.ts сгенерирован');
}

async function main() {
  const icons = await generateIndex();
  await generateIconsMap(icons);
}

main().catch((e) => {
  console.error('❌ Ошибка:', e);
  process.exit(1);
});

//    command for manual start:
//   node scripts/generate-icons-index.js
