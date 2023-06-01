import Image from "next/image";
import Link from "next/link";
import styles from "./blog-logo.module.scss";

interface BlogLogo {
  link: string;
  label: string;
}

export default function BlogLogo({ link, label }: BlogLogo) {
  return (
    <>
      <div className={styles.details}>
        <Link href={link}>
          <Image
            className={`${styles.logo}  ${styles.shimmer} `}
            priority={true}
            src="/IntrepidNomadsLogo.png"
            height={60}
            width={60}
            alt="Intrepid Nomads Logo"
          />
        </Link>
        <div className={styles.text}>
          <Link href={link}>Intrepid Nomads™</Link>
          <label>{label}</label>
        </div>
      </div>
    </>
  );
}
