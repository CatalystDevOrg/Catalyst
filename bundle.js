const { sassPlugin } = require("esbuild-sass-plugin");

const esbuild = require("esbuild");
const fsp = require("fs/promises");
const path = require("path");

async function findRecurse(dirname) {
    const directoryEntries = await fsp.readdir(dirname);
    const foundFiles = [];

    for (const entry of directoryEntries) {
       if ((await fsp.lstat(path.join(dirname, entry))).isDirectory()) {
           foundFiles.push(...(await findRecurse(path.join(dirname, entry))));
       } else {
           foundFiles.push(path.join(dirname, entry));
       }
    }

    return foundFiles;
}

async function build() {
    const commonOptions = {
        logLevel: "info",
        sourcemap: true,
        minify: true,
        watch: process.argv.includes("--watch") ? {

        } : false
    };

    const sourceFiles = await findRecurse(path.join(__dirname, "src/main"));

    await Promise.all([
        esbuild.build({
            ...commonOptions,
            entryPoints: [ "src/renderer/index.tsx" ],
            bundle: true,
            outdir: "build/renderer",
            external: [ "electron" ],
            plugins: [ sassPlugin() ],
            loader: {
                ".otf": "file",
                ".ttf": "file",
                ".woff2": "file"
            },
        }),
        esbuild.build({
            ...commonOptions,
            entryPoints: [ "src/preload/index.ts" ],
            bundle: true,
            outdir: "build/preload",
            external: [ "electron" ]
        }),
        fsp.cp(path.join(__dirname, "src/renderer/index.htm"), path.join(__dirname, "build/renderer/index.htm"))
    ]).catch(error => {
        console.error(error);
        process.exit(1);
    });

    await esbuild.build({
        ...commonOptions,
        entryPoints: sourceFiles,
        bundle: false,
        platform: "node",
        format: "cjs",
        outdir: "build/main"
    }).catch(error => {
        console.error(error);
        process.exit(1);
    });

    const style = await fsp.readFile(path.join(__dirname, "build/renderer/index.css"), { encoding: "utf8" });
    const height = /--total-height:\s*(\d+)px;/gm.exec(style)[1];

    await fsp.appendFile(path.join(__dirname, "build/main/constants.js"), `module.exports = { ...module.exports, TOP_VIEW_PADDING: ${height} };`);
}

void build();