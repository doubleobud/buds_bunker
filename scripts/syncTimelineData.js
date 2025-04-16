const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const entriesDir = path.join(__dirname, '../src/pages/timeline/entries');
const outputDir = path.join(__dirname, '../src/data/timeline');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const entryFiles = fs
  .readdirSync(entriesDir)
  .filter((file) => file.endsWith('.md'));

entryFiles.forEach((filename) => {
  const fullPath = path.join(entriesDir, filename);
  const content = fs.readFileSync(fullPath, 'utf8');
  const { data: frontmatter } = matter(content);

  if (!frontmatter || !frontmatter.title || !frontmatter.timestamp) {
    console.warn(`⚠️ Skipped "${filename}" — missing required frontmatter.`);
    return;
  }

  const outputPath = path.join(outputDir, filename);

  const minimalFrontmatter = {
    ...frontmatter,
  };

  const output = `---\n${Object.entries(minimalFrontmatter)
    .map(([key, value]) => `${key}: ${Array.isArray(value) ? `[${value.map(v => `"${v}"`).join(', ')}]` : JSON.stringify(value)}`)
    .join('\n')}\n---\n`;

  fs.writeFileSync(outputPath, output, 'utf8');
  console.log(`✅ Synced: ${filename}`);
});
