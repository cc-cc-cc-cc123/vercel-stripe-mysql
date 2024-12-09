import { Header } from "./header";
import { Footer } from "./footer";
import "./css/blogDetail.css";
import dayjs from "dayjs";

export default function BlogDetail({
  blogDetailRes,
  blogDetailContentRes,
}: {
  blogDetailRes: any;
  blogDetailContentRes: any;
}) {
  // In a real application, you would fetch the blog post data here
  const post = {
    title: blogDetailRes?.title,
    content: blogDetailRes?.content,
    date: blogDetailRes?.create_time,
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <article>
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-500 mb-4">
            Published on {dayjs(post.date).format("YYYY-MM")}
          </p>
          <div className="prose max-w-none">
            <div
              className="blog-detail-content"
              dangerouslySetInnerHTML={{ __html: blogDetailContentRes.body }}
            ></div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}

export function generateMetadata({ params }: { params: { id: string } }) {
  return {
    title: `Blog Post ${params.id} | RecentFoLow`,
    description: `Read our latest article: Blog Post ${params.id}`,
  };
}
