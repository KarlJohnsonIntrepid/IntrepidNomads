import StringUtils from "../lib/string-util";
import styles from "./card-country.module.scss";
import Link from "next/link";

export default function CountryTitle({ group }) {
  if (group.hasCountry) {
    const link = group.link
      ? group.link
      : StringUtils.cleanForHashAnchor(group.name);

    return (
      <>
        <a href={`/#`} className={styles.start}>
          <div> </div>
        </a>
        <Link
          href={`/country/${link}`}
          className={`${styles.title} ${styles.hover}`}
        >
          <h2>{group.name}</h2>
        </Link>
      </>
    );
  } else {
    return (
      <>
        <a href={`/#`} className={styles.start}>
          <div> </div>
        </a>
        <div className={styles.title}>
          <div className={styles.start}> </div>
          <h2>{group.name}</h2>
        </div>
      </>
    );
  }
}
