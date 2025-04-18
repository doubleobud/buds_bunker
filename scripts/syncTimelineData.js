const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Path to timeline markdown entries
const entriesDir = path.join(__dirname, '../src/pages/timeline');
// Path to output generated JSON data
const outputDir = path.join(__dirname, '../src/data/timeline');

// Make sure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Clear old .json files
fs.readdirSync(outputDir)
  .filter(file => file.endsWith('.json'))
  .forEach(file => fs.unlinkSync(path.join(outputDir, file)));

// Process each .mdx or .md entry
fs.readdirSync(entriesDir)
  .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
  .forEach((filename) => {
    const fullPath = path.join(entriesDir, filename);
    const content = fs.readFileSync(fullPath, 'utf8');
    const { data: frontmatter } = matter(content);

    const requiredFields = ['title', 'description', 'order', 'date', 'slug'];
    const missing = requiredFields.filter((f) => frontmatter[f] == null);

    if (missing.length > 0) {
      console.warn(`⚠️ Skipped "${filename}" — missing: ${missing.join(', ')}`);
      return;
    }

    const minimal = {
      title: frontmatter.title,
      description: frontmatter.description,
      order: frontmatter.order,
      date: frontmatter.date,
      slug: frontmatter.slug
    };

    const outPath = path.join(outputDir, filename.replace(/\.(mdx|md)$/, '.json'));
    fs.writeFileSync(outPath, JSON.stringify(minimal, null, 2), 'utf8');
    console.log(`✅ Synced: ${filename}`);
  });
