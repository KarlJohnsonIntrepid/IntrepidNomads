import { getAttrFromString } from "./html-util";
import probe from "probe-image-size";
import fs from "fs";
import path from "path";
import { Constants } from "./constants";
import { StaticImageData } from "next/image";

export interface HtmlImage {
  width: string;
  height: string;
  src: string;
  priority: boolean;
}

//Given html text, load images from the file system and probes them to get the correct height, width.
export async function loadImages(postContent: string): Promise<HtmlImage[]> {
  let pathArray = getAttrFromString(postContent, "img", "src");

  let imagesArr: HtmlImage[] = [];

  let priority = true;
  for (const src of pathArray) {
    //Convert image stored in the blog db to file path
    const pathArray = src.split("/");
    let imagePath = Constants.IMAGE_PATH + pathArray[pathArray.length - 1];

    //Load the image
    const img = fs.createReadStream(path.join(process.cwd(), imagePath));
    const probedImg = await probe(img);

    imagePath = imagePath.replace(Constants.PUBLIC_PATH, "");

    //Get height and width
    let image: HtmlImage = {
      width: probedImg.width,
      height: probedImg.height,
      src: imagePath,
      priority: priority,
    };

    priority = false;

    imagesArr.push(image);
  }
  return imagesArr;
}

export async function loadRelatedImages(
  imagePaths: string[]
): Promise<StaticImageData[]> {
  let imageDetails: StaticImageData[] = [];

  for (const fileName of imagePaths) {
    //Convert image stored in the blog db to file path
    let imagePath = Constants.IMAGE_PATH + fileName;

    //Load the image
    try {
      const img = fs.createReadStream(path.join(process.cwd(), imagePath));
      const probedImg = await probe(img);

      //Get height and width
      let image: StaticImageData = {
        width: probedImg.width,
        height: probedImg.height,
        src: imagePath.replace(Constants.PUBLIC_PATH, ""),
      };

      imageDetails.push(image);
    } catch {
      //Just continue, image doesnt exist and wont be able to get it
    }
  }
  return imageDetails;
}
