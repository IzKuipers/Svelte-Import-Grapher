# Svelte Import Grapher

This is a simple utility to generate a dependency graph of **Svelte+TS** projects. Before getting started, please read the **[warnings](#warnings)**

## Getting started

### Prerequisites

- A Linux system (sorry Windows/Mac users)
- NodeJS 18+
- Access to the Git repository you want to graph (use VSCode's integrated terminal if unsure)
- Svelte and ONLY Typescript in your project.

### Do the thing

Open [start.sh](./start.sh) and change variables `repo` and `name` to the full URL of the repository and the name of the output image. By my testing, `png`, `pdf` and `svg` are supported, but more that I don't know about could work, that's up to you to test out.

## How does it work?

1. It clones the GitHub repository you specified in `start.sh` over HTTP to the `temp` directory
2. Next it gets the paths of all Svelte files in your project
3. It runs over these files, splitting each into their LoCs.
   1. It iterates over the lines. If the trimmed line starts with `import`, it saves it to an array for later use
   2. After it's done iterating over the file, it writes all of the `import` statements to a file of the same name, but with `.ts` added to it. This makes sure that the graphing library actually captures and processes the svelte files' imports.
4. Next it returns back to the Bash script, which calls [Madge](https://github.com/pahen/madge) to generate a graph and output it to the filename you specified.

## WARNINGS

- Generating a graph for a large Svelte codebase **can generate huge files** if the file type is set to a binary format like PNG. If you're graphing a large codebase, it's advised to use SVG or PDF instead.
- The code that remains in the `temp` folder is no longer usable. The original svelte code has been replaced with only the import statements of the original file. There's no point in trying anything with the temporary clone.
- The script does not account for existing files! If the filename already exists, it _will_ overwrite it. Beware of this.
- RAM consumption might be **really** high on larger codebase. I have experienced multiple RAM crashes during testing.
- The script does NOT run through CSS or JS files. If this is a Javascript codebase, this utility might not be for you.

## License

None. Do whatever you want.
