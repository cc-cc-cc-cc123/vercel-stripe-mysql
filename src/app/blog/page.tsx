import BlogList from "@/app/components/blogList";
import { getArticleListData } from "@/lib/service/blog";

export default async function Page() {
  // Fetch data from external API
  const blogListRes = await getArticleListData({ page_no: 1, page_size: 100 });
  return <BlogList blogListRes={blogListRes}></BlogList>;
}
