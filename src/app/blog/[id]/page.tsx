import {
  getArticleDetailData,
  getArticleDetailContent,
} from "@/lib/service/blog";
import BlogDetail from "@/app/components/blogDetail";
export default async function Page({ params }: any) {
  // Fetch data from external API
  const { id } = await params;
  const blogDetailRes = await getArticleDetailData(id);
  const blogDetailContentRes = await getArticleDetailContent(
    blogDetailRes?.data?.content_url as any
  );
  return (
    <BlogDetail
      blogDetailRes={blogDetailRes.data}
      blogDetailContentRes={blogDetailContentRes.data}
    ></BlogDetail>
  );
}
