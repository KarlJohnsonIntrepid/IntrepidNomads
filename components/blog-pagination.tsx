import Link from "next/link";
import styles from "./blog-pagination.module.scss";
import UrlUtils from "../lib/url-util";
import { Blog } from "@prisma/client";

interface Pagination {
  currPost: Blog;
  posts: Blog[];
}

export default function Pagination({ currPost, posts }: Pagination) {
  const currIndex = posts.findIndex((p) => p.id === currPost.id);
  const prev = currIndex > 0 ? posts[currIndex - 1] : null;
  const next = currIndex <= posts.length - 1 ? posts[currIndex + 1] : null;

  return (
    <div className={styles.pagination}>
      {prev && (
        <Link href={`/posts/${UrlUtils.formatLink(prev.title)}`}>← </Link>
      )}
      <Link href={`/#${currPost["group"].name.toLowerCase()}`}> ⌂</Link>
      {next && (
        <Link href={`/posts/${UrlUtils.formatLink(next.title)}`}> → </Link>
      )}
    </div>
  );
}
