// Lists published English posts that have no Korean version yet.
// Run: npm run check
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

const missing = files
  .filter((f) => !/\.ko\.mdx?$/.test(f))
  .map((f) => f.replace(/\.mdx?$/, ""))
  .filter((slug) => !ko.has(slug));

if (missing.length === 0) {
  console.log("All posts have a Korean version.");
} else {
  console.log("Missing Korean translation:");
  for (const slug of missing) console.log(`  content/${slug}.ko.mdx`);
  process.exitCode = 1;
}
