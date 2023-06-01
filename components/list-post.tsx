import Link from "next/link";
import UrlUtils from "../lib/url-util";
import styles from "./list-post.module.scss";
import { Blog } from "@prisma/client";

interface Card {
  posts: Blog[];
}

export default function Card({ posts }: Card) {
  return (
    <>
      <div className={styles.list}>
        {posts.map(({ id, title, niceDescription, seoDescription }) => (
          <Link
            className={styles.item}
            key={id}
            href={`/posts/${UrlUtils.formatLink(title)}`}
          >
            <label>{niceDescription ? niceDescription : title}</label>
            <p>{seoDescription}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
