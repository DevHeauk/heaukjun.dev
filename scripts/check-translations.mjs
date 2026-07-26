// Korean is the source language; English is the translation.
// Reports posts that exist in only one language. Run: npm run check
import fs from "fs";
import path from "path";

const dir = path.join(process.cwd(), "content");
if (!fs.existsSync(dir)) {
  console.log("No content/ directory yet.");
  process.exit(0);
}

const files = fs
  .readdirSync(dir)
  .filter((f) => /\.mdx?$/.test(f))
  .filter((f) => !f.startsWith("_"));

const ko = new Set(
  files.filter((f) => /\.ko\.mdx?$/.test(f)).map((f) => f.replace(/\.ko\.mdx?$/, ""))
);
const en = new Set(
  files.filter((f) => !/\.ko\.mdx?$/.test(f)).map((f) => f.replace(/\.mdx?$/, ""))
);

const needsEnglish = [...ko].filter((s) => !en.has(s));
const needsKorean = [...en].filter((s) => !ko.has(s));

if (needsEnglish.length === 0 && needsKorean.length === 0) {
  console.log(`All ${ko.size} posts exist in both languages.`);
  process.exit(0);
}

if (needsEnglish.length) {
  console.log("Written in Korean, no English yet:");
  for (const s of needsEnglish) console.log(`  content/${s}.mdx`);
}
if (needsKorean.length) {
  console.log("English only — Korean is the source, so this is backwards:");
  for (const s of needsKorean) console.log(`  content/${s}.ko.mdx`);
}
process.exitCode = 1;
