import styles from "./blog-images.module.scss";
import Image, { StaticImageData } from "next/image";
import { MouseEvent, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";

interface Images {
  images: StaticImageData[];
}

export default function Images({ images }: Images) {
  const [selected, setSelected] = useState(null);

  function showFull(src: string, e) {
    e.preventDefault();
    setSelected(images.find((i) => i.src === src));
  }

  function close() {
    setSelected(null);
  }

  //On router change
  const router = useRouter();
  useEffect(() => {
    close();
  }, [router.asPath]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.inner}>
          <ul className={styles.images}>
            {images.map((image) => (
              <li key={image.src}>
                <Image
                  src={image}
                  alt="Intrepid Nomads"
                  onClick={(e) => showFull(image.src, e)}
                  quality={100}
                ></Image>
              </li>
            ))}
          </ul>
        </div>
        {selected && (
          <div className={styles.full} onClick={() => close()}>
            <Image
              src={selected.src}
              width={selected.width}
              height={selected.height}
              alt="Intrepid Nomads"
              quality={100}
            ></Image>
          </div>
        )}
      </div>
    </>
  );
}
