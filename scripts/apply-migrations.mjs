#!/usr/bin/env node
// Apply Supabase migrations via Management API.
// Reads supabase/migrations/*.sql in lexical order, POSTs each to
// https://api.supabase.com/v1/projects/{ref}/database/query
//
// Required env vars:
//   SUPABASE_ACCESS_TOKEN  (sbp_*)
//   SUPABASE_PROJECT_REF   (e.g. rwjznqahxdlqbdqavahx)

import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const TOKEN = process.env.SUPABASE_ACCESS_TOKEN;
const REF = process.env.SUPABASE_PROJECT_REF;

if (!TOKEN || !REF) {
  console.error("Missing SUPABASE_ACCESS_TOKEN or SUPABASE_PROJECT_REF");
  process.exit(1);
}

const MIGRATIONS_DIR = join(process.cwd(), "supabase", "migrations");
const files = readdirSync(MIGRATIONS_DIR)
  .filter((f) => f.endsWith(".sql"))
  .sort();

if (files.length === 0) {
  console.error("No .sql files found in supabase/migrations/");
  process.exit(1);
}

console.log(`Applying ${files.length} migration(s) to project ${REF}...`);

const endpoint = `https://api.supabase.com/v1/projects/${REF}/database/query`;

let failed = 0;
for (const file of files) {
  const path = join(MIGRATIONS_DIR, file);
  const sql = readFileSync(path, "utf8");
  process.stdout.write(`  [${file}] (${sql.length} bytes) ... `);
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: sql }),
  });
  if (res.status >= 200 && res.status < 300) {
    console.log("OK");
  } else {
    failed++;
    const text = await res.text();
    console.log(`FAIL (${res.status})`);
    console.log("    " + text.slice(0, 500).replace(/\n/g, "\n    "));
  }
}

if (failed > 0) {
  console.error(`\n${failed}/${files.length} migration(s) failed.`);
  process.exit(1);
}
console.log(`\nAll ${files.length} migration(s) applied successfully.`);
