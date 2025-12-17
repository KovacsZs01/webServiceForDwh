import esbuild from "esbuild";

const watch = process.argv.includes("--watch");

esbuild.build({
    entryPoints: ["src/server.ts"],
    bundle: true,
    platform: "node",
    target: "node22", // or your Node version
    format: "esm",
    outdir: "dist",
    sourcemap: true,
    external: ["express", "pg", "dotenv"],
    watch
}).then(() => {
    console.log("✅ Build complete");
});
