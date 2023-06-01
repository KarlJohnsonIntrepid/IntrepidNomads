import styles from "./landing.module.scss";
import BlogLogo from "./blog-logo";
import { useState } from "react";

export default function Landing({ data }) {
  const [open, setOpen] = useState("");

  function showMenu(e) {
    if (e.target.className !== "link") {
      e.preventDefault();
      setOpen(open === "open" ? "" : "open");
    }
  }

  return (
    <>
      <div
        className={styles.landing}
        onClick={(e) => {
          showMenu(e);
        }}
      >
        <div className={styles.fixed}>
          <BlogLogo link="" label="2015/16"></BlogLogo>
          <div className={`${styles.menu} ${styles[open]}`}>
            <ul>
              {data.map(({ group }) => (
                <li key={group.id}>
                  <a
                    className="link"
                    href={`/#${group.name.toLowerCase().replaceAll(" ", "")}`}
                  >
                    {group.short ? group.short : group.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
