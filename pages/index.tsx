import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import { GetStaticProps } from "next";
import PostDao, { GroupedPosts } from "../lib/orm/post-dao";
import styles from "../styles/home.module.scss";
import CountryTitle from "../components/card-country";
import Card from "../components/list-post";
import Landing from "../components/landing";
import StringUtils from "../lib/string-util";

export const getStaticProps: GetStaticProps = async () => {
  const postDao = new PostDao();
  const groupedPosts = await postDao.getGroupedPostsForHome();
  return {
    props: {
      //JSON functions ensure the dates can be serialized by next js
      dbPosts: JSON.parse(JSON.stringify(groupedPosts)),
    },
  };
};

interface Home {
  dbPosts: GroupedPosts[];
}

export default function Home({ dbPosts }: Home) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <div className={styles.container}>
        <Landing data={dbPosts}></Landing>
        {dbPosts.map(({ group, posts }) => (
          <CountrySection
            group={group}
            posts={posts}
            key={group.id}
          ></CountrySection>
        ))}
      </div>
    </Layout>
  );
}

export function CountrySection({ group, posts }) {
  const path = StringUtils.cleanForHashAnchor(group.name);
  return (
    <>
      <section className={styles.country} key={group.id} id={path}>
        <CountryTitle group={group}></CountryTitle>
        <Card posts={posts}></Card>
      </section>
    </>
  );
}
