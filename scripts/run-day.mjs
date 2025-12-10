import { execSync } from "node:child_process";

const day = process.argv[2];

if (!day) {
  console.error("❌ Please provide a day number: npm run day 3");
  process.exit(1);
}

const file = `src/day${day}.ts`;

console.log(`▶️  Running ${file}...\n`);

execSync(`npx ts-node-esm ${file}`, { stdio: "inherit" });
