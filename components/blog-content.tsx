import parse from "html-react-parser";
import Image, { StaticImageData } from "next/image";
import styles from "./blog-content.module.scss";

interface BlogContent {
  post: string;
  images: StaticImageData[];
}

export default function BlogContent({ post, images }) {
  const replaceImage = {
    replace: ({ name, attribs }) => {
      if (name === "img") {
        //Find image in content field, then swith from image tag to nextJS component.
        //We are using images loaded form the file system.
        const pathArray = attribs.src.split("/");
        let path = "/images/" + pathArray[pathArray.length - 1];
        let image = images.find((i) => i.src === path);

        if (image) {
          return (
            <Image
              src={image}
              alt={attribs.alt ? attribs.alt : "Blog post image"}
              priority={image.priority}
              sizes="(max-width: 612px) 400px, 612px"
            />
          );
        }
      }
    },
  };

  return (
    <article className={styles.content}>{parse(post, replaceImage)}</article>
  );
}
