import { client } from "@/app/lib/sanity";
import BlogHero from "@/components/Blogs/BlogHero/BlogHero";
import LatestBlogs from "@/components/Blogs/LatestBlogs/LatestBlogs";
import Container from "@/components/shared/Container/Container";

export const revalidate = 30;
const getBlogData = async () => {
  const query = `*[_type == 'blog']{
  title,smallDescription,slug,blogImage
} `;
  const blogData = await client.fetch(query);

  return blogData;
};
const page = async () => {
  const blogData = await getBlogData();

  console.log(blogData, "blog from sanity");

  return (
    <div>
      <Container>
        <BlogHero />
        <LatestBlogs blogData={blogData} />
      </Container>
    </div>
  );
};

export default page;
