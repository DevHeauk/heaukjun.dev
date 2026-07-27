// Korean is the source language; English is the translation.
// Reports posts that exist in only one language. Run: npm run check
import fs from "fs";
import path from "path";

const COLLECTIONS = ["writing", "notes"];
let problems = 0;
let total = 0;

for (const collection of COLLECTIONS) {
  const dir = path.join(process.cwd(), "content", collection);
  if (!fs.existsSync(dir)) continue;

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
  total += ko.size;

  const needsEnglish = [...ko].filter((s) => !en.has(s));
  const needsKorean = [...en].filter((s) => !ko.has(s));

  if (needsEnglish.length) {
    console.log(`${collection}: written in Korean, no English yet`);
    for (const s of needsEnglish) console.log(`  content/${collection}/${s}.mdx`);
    problems += needsEnglish.length;
  }
  if (needsKorean.length) {
    console.log(`${collection}: English only — Korean is the source, so this is backwards`);
    for (const s of needsKorean) console.log(`  content/${collection}/${s}.ko.mdx`);
    problems += needsKorean.length;
  }
}

if (problems === 0) console.log(`All ${total} entries exist in both languages.`);
else process.exitCode = 1;
