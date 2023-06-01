import Link from "next/link";
import styles from "./blog-pagination-fixed.module.scss";
import UrlUtils from "../lib/url-util";
import { Blog } from "@prisma/client";

interface FixedPagination {
  currPost?: Blog;
  posts?: Blog[];
  homeLink: string;
}

export default function FixedPagination({
  currPost = null,
  posts = [],
  homeLink,
}: FixedPagination) {
  const currIndex = posts.findIndex((p) => p.id === currPost.id);
  const prev = currIndex > 0 ? posts[currIndex - 1] : null;
  const next = currIndex <= posts.length - 1 ? posts[currIndex + 1] : null;

  return (
    <>
      <div className={styles.close}>
        <Link href={homeLink}> ✖</Link>
        {prev && (
          <Link href={`/posts/${UrlUtils.formatLink(prev.title)}`}>← </Link>
        )}
        {next && (
          <Link href={`/posts/${UrlUtils.formatLink(next.title)}`}> → </Link>
        )}
      </div>
    </>
  );
}
