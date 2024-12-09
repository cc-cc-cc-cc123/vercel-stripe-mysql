"use client";

import { useState } from "react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
// This would typically come from a CMS or API

export default function RelationshipTipsPage({
  RelationshipTipsRes,
}: {
  RelationshipTipsRes: any;
}) {
  console.log(RelationshipTipsRes.data.length);

  const [displayedArticles, setDisplayedArticles] = useState(
    RelationshipTipsRes.data.slice(0, 6)
  );

  const loadMore = () => {
    const currentLength = displayedArticles.length;
    const newArticles = RelationshipTipsRes.data.slice(
      currentLength,
      currentLength + 3
    );
    setDisplayedArticles([...displayedArticles, ...newArticles]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
          Relationship Tips
        </h1>
        <div className="mb-8 text-center">
          <p className="text-gray-600 mb-4">Filter by topic:</p>
          <div className="flex flex-wrap justify-center gap-2">
            <Button
              variant="outline"
              className="bg-white hover:bg-purple-50 text-purple-600 border-purple-200"
            >
              Trust
            </Button>
            <Button
              variant="outline"
              className="bg-white hover:bg-pink-50 text-pink-600 border-pink-200"
            >
              Communication
            </Button>
            <Button
              variant="outline"
              className="bg-white hover:bg-yellow-50 text-yellow-600 border-yellow-200"
            >
              Boundaries
            </Button>
            <Button
              variant="outline"
              className="bg-white hover:bg-green-50 text-green-600 border-green-200"
            >
              Growth
            </Button>
            <Button
              variant="outline"
              className="bg-white hover:bg-blue-50 text-blue-600 border-blue-200"
            >
              Long-distance
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedArticles.map((article: any) => (
            <ArticleCard key={article.article_id} article={article} />
          ))}
        </div>
        {displayedArticles.length < RelationshipTipsRes.data.length && (
          <div className="text-center mt-8">
            <Button
              onClick={loadMore}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
            >
              Load More
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

function ArticleCard({ article }: { article: any }) {
  return (
    <Link href={`/blog/${article.title_id}`}>
      <Card className="h-full hover:shadow-lg transition-shadow duration-300 pt-6">
        <CardContent className="p-0 flex flex-col h-full">
          <div className="relative h-48 w-full">
            <Image
              src={article.cover_image}
              alt={article.article_id}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
              className="rounded-t-lg"
            />
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <h2 className="text-xl font-semibold mb-2 line-clamp-2 bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
              {article.title}
            </h2>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
              {article.description}
            </p>
            <div className="text-sm text-gray-500">
              <span>{dayjs(article.create_time).format("YYYY-MM")}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

// Add metadata for SEO
// export const metadata: Metadata = {
//   title: 'Relationship Tips | RecentlyfoLowed',
//   description: 'Discover valuable insights and advice on maintaining healthy relationships in the age of social media.',
//   openGraph: {
//     title: 'Relationship Tips | RecentlyfoLowed',
//     description: 'Discover valuable insights and advice on maintaining healthy relationships in the age of social media.',
//     images: [
//       {
//         url: 'https://recentlyfolowed.com/og-image-relationship-tips.jpg',
//         width: 1200,
//         height: 630,
//         alt: 'RecentlyfoLowed Relationship Tips',
//       },
//     ],
//   },
// }
