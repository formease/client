const esbuild = require("esbuild");
const Logger = require("./src/util/logger");

const logger = new Logger("FormEase", true, true);

esbuild
  .build({
    entryPoints: ["./src/public/js/auth.js"],
    outfile: "./src/public/dist/auth.js",
    target: "es2021",
    minify: true,
    bundle: true,
    define: {
      "process.env.NODE_ENV": '"production"',
    },
  })
  .catch((error) => {
    console.error(error);
  })
  .then((d) => {
    logger.info(`Done : ${JSON.stringify(d)}`);
  });
