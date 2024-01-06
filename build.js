const fs = require("fs");
const terser = require("terser");

const sourceDir = "source";
const distDir = "dist";
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
}

fs.readdirSync(sourceDir).forEach((file) => {

    const filename = file.split(".")[0];

    const extension = file.split(".")[1];

    if (extension === "js") {
        const content = fs.readFileSync(`${sourceDir}/${file}`, "utf-8");
        const compressed = terser.minify(content, {
            output: {
                comments: false
            },
            toplevel: true,
            compress: true,
            mangle: true
        });
        compressed.then((res)=>{
            fs.writeFileSync(`${distDir}/${filename}.js`, res.code);
        });
    } else {
        fs.copyFileSync(`${sourceDir}/${file}`, `${distDir}/${file}`);
    }
});
