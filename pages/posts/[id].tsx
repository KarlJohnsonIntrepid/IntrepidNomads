import Layout from "../../components/layout";
import PostDao, { PageablePost } from "../../lib/orm/post-dao";
import { GetStaticProps, GetStaticPaths } from "next";
import { format } from "date-fns";
import Head from "next/head";
import { loadImages, loadRelatedImages, HtmlImage } from "../../lib/image-util";
import BlogLogo from "../../components/blog-logo";
import BlogContent from "../../components/blog-content";
import Pagination from "../../components/blog-pagination";
import FixedPagination from "../../components/blog-pagination-fixed";
import Images from "../../components/blog-images";
import UploadedImageData from "../../lib/orm/images-dao";
import { UploadedImages } from "@prisma/client";
import { StaticImageData } from "next/image";
import StringUtils from "../../lib/string-util";

//Load blog post data (server side) based on the route parameter in the URL
export const getStaticProps: GetStaticProps = async (context) => {
  const postDao = new PostDao();
  const postData = await postDao.getPostData(context.params.id);

  let imagesArr: HtmlImage[] = await loadImages(postData.post.content);

  const uploadedImageData = new UploadedImageData();
  const relatedImages: UploadedImages[] =
    await uploadedImageData.getImagesPerBlog(postData.post.id);

  const nextJsImages: StaticImageData[] = await loadRelatedImages(
    relatedImages.map((i) => i.imageDescription)
  );

  return {
    props: {
      postData: JSON.parse(JSON.stringify(postData)),
      images: imagesArr,
      relatedImages: nextJsImages,
    },
  };
};

//Load all dynamic blog paths (server side)
export const getStaticPaths: GetStaticPaths = async () => {
  const postDao = new PostDao();
  const paths = await postDao.getPostIds();
  return {
    paths,
    fallback: false,
  };
};

interface Post {
  postData: PageablePost;
  images: HtmlImage[];
  relatedImages: StaticImageData[];
}

export default function Post({ postData, images, relatedImages }: Post) {
  let post = postData.post;
  let homeLink = StringUtils.cleanForHashAnchor(`/#${post["group"].name}`);

  const formattedDate = format(new Date(post.date), "EEEE do MMMM yyyy");
  const label = `${post["group"].name} / ${formattedDate}`;
  return (
    <>
      <Layout home={false}>
        <Head>
          <title>{post.title}</title>
        </Head>
        <h1>{post.title}</h1>
        <BlogLogo link={homeLink} label={label}></BlogLogo>
        <BlogContent post={post.content} images={images}></BlogContent>
        <Pagination currPost={post} posts={postData.posts}></Pagination>
        <FixedPagination
          currPost={post}
          posts={postData.posts}
          homeLink={homeLink}
        ></FixedPagination>
        <Images images={relatedImages}></Images>
      </Layout>
    </>
  );
}
