import Head from "next/head";
import styles from "./layout.module.scss";

const name = "Intrepid Nomads";
export const siteTitle = "Intrepid Nomads";

export default function Layout({ children, home }) {
  return (
    <div className={home ? styles.containerFull : styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="Intrepid Nomads" content="Intrepid Nomads 2015/2016" />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <main>{children}</main>
    </div>
  );
}
