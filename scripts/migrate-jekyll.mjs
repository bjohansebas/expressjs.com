import { existsSync, readFileSync } from "node:fs";
import { mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const OUT_FOLDER = path.join(process.cwd(), "out");
if (!existsSync(OUT_FOLDER)) {
  await mkdir(OUT_FOLDER);
}

const args = process.argv.slice(2);

if (args.length === 0) {
  throw new Error("migrate-jekyll.mjs: requires a least one parameter");
}

for (const arg of args) {
  const SCAN_FOLDER = path.join(process.cwd(), arg);

  const INCLUDE_FORMAT = /\{\%\sinclude\s[\w\/\-]+\.\w+(\.\w+)?\s\%\}/;

  try {
    const files = await readdir(SCAN_FOLDER);

    for (const file of files) {
      const contentFile = readFileSync(path.join(SCAN_FOLDER, file), "utf8");

      const linesForLine = contentFile.split("\n");

      const newFile = linesForLine
        .map((line) => {
          if (INCLUDE_FORMAT.test(line)) {
            const pathOfFile = line.trim().split(" ")[2];

            const newContentLine = readFileSync(path.join(process.cwd(), pathOfFile), "utf8");

            return newContentLine;
          }
          return line;
        })
        .join("\n");

      const newName = file.replace(/\.\w{1,4}/, ".mdx");

      const dirname = arg.split("/");
      if (!existsSync(path.join(OUT_FOLDER, dirname[dirname.length - 1]))) {
        await mkdir(path.join(OUT_FOLDER, dirname[dirname.length - 1]));
      }

      await writeFile(path.join(OUT_FOLDER, dirname[dirname.length - 1], newName), newFile);
    }
  } catch (e) {
    console.log(e);
  }
}
