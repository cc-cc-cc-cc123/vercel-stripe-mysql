import RelationshipTips from "@/app/components/relationship-tips";
import { getArticleListData } from "@/lib/service/blog";
export const revalidate = 60; // 页面每 60 秒重新生成一次
export default async function Page() {
  // Fetch data from external API
  const blogListRes = await getArticleListData({ page_no: 1, page_size: 100 });

  return (
    <RelationshipTips RelationshipTipsRes={blogListRes}></RelationshipTips>
  );
}
