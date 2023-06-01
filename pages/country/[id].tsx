import { GetStaticProps, GetStaticPaths } from "next";
import CountryData from "../../lib/orm/country-dao";
import Layout from "../../components/layout";
import Head from "next/head";
import { HtmlImage, loadImages } from "../../lib/image-util";
import BlogLogo from "../../components/blog-logo";
import BlogContent from "../../components/blog-content";
import FixedPagination from "../../components/blog-pagination-fixed";
import { Country } from "@prisma/client";

export const getStaticProps: GetStaticProps = async (context) => {
  let countryData = new CountryData();

  const postData = await countryData.getCountry(context.params.id.toString());

  if (!postData) {
    return {
      props: {
        data: null,
        images: null,
      },
    };
  }

  const imagesArr: HtmlImage[] = await loadImages(postData.countryInformation);

  return {
    props: {
      data: JSON.parse(JSON.stringify(postData)),
      images: imagesArr,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  let countryData = new CountryData();
  const paths = await countryData.getCountryIds();
  return {
    paths,
    fallback: false,
  };
};

export default function Country(data: { data: Country; images: HtmlImage[] }) {
  if (!data.data) return null;

  let country = data.data;

  //Hack to combine canada and USA - dont care blog is frozen
  let link = `/#${country.countryDescription.toLowerCase()}`;
  if (country.countryDescription == "USA") {
    link = `/#canadaandusa`;
  }

  return (
    <>
      <Layout home={false}>
        <Head>
          <title>{country.countryDescription}</title>
        </Head>
        <BlogLogo link={link} label={country.seoTitle}></BlogLogo>
        <BlogContent
          post={country.countryInformation}
          images={data.images}
        ></BlogContent>
        <FixedPagination homeLink={link}></FixedPagination>
      </Layout>
    </>
  );
}
