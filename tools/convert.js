//npm install --save glob sharp
//node .\convert.js  from within tools folder

const sharp = require("sharp");
const { glob, globSync, globStream, globStreamSync, Glob } = require("glob");
const path = require("path");

const folderPath = path.resolve(process.argv[2] || __dirname);
const imageExtensions = [".png", ".jpg", ".JPG"];
//const outputFormats = ["webp", "avif"];
const outputFormats = ["webp"];

async function convertImages() {
  try {
    // const files = await glob(`../public/images/*.jpg`);
    const files = await glob(`./test/*.jpg`);

    for (const file of files) {
      const fileExt = path.extname(file);
      if (imageExtensions.includes(fileExt)) {
        for (const outputFormat of outputFormats) {
          const outputFile = path.join(
            path.dirname(file),
            path.basename(file, fileExt) + "." + outputFormat
          );
          try {
            await sharp(file).toFormat(outputFormat).toFile(outputFile);
          } catch (e) {
            console.error(file);
          }

          console.log(`${file} was converted to ${outputFile}`);
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
}

convertImages();
