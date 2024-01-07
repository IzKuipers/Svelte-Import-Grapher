const { readFile, writeFile, rm } = require("fs/promises");
const { Glob } = require("glob");
const { resolve } = require("path");

async function start() {
  const total = await replaceSvelteFiles();

  console.log(
    `Captured ${total[0]} svelte-imports across ${total[1]} Svelte files.`
  );
}

async function replaceSvelteFiles() {
  const files = await new Glob("**/*.svelte", {}).walk();

  let total = [0, 0];

  for (let i = 0; i < files.length; i++) {
    const path = resolve(files[i]);
    const contents = await readFile(path, { encoding: "utf-8" });
    const lines = contents.split("\n");
    const imports = [];

    for (let j = 0; j < lines.length; j++) {
      const line = lines[j].trim();

      if (line.startsWith("import")) imports.push(line);
    }

    total[0] += imports.length;

    const newPath = path.replace(".svelte", ".svelte.ts");

    await writeFile(newPath, imports.join("\n"), { encoding: "utf-8" });
    await rm(path);
  }

  total[1] += files.length;

  return total;
}

start();
