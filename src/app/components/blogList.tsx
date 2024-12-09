"use client";

import React, { useRef, useState } from "react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getArticleListData } from "@/lib/service/blog";
import dayjs from "dayjs";

const Index: React.FC<any> = ({ blogListRes }) => {
  const page_no = useRef(1);

  const [displayedArticles, setDisplayedArticles] = useState<any>(blogListRes);
  const [hasMore, setHasMore] = useState(blogListRes.has_next);

  const [isLoading, setIsLoading] = useState(false); // Added loading state

  const getData = async () => {
    const res: any = await getArticleListData({
      page_no: page_no.current,
      page_size: 10,
    });
    displayedArticles.data.push(...res.data);
    setDisplayedArticles(displayedArticles);
    setHasMore(res.has_next);
    page_no.current++;
    setIsLoading(false);
  };

  const loadMore = () => {
    setIsLoading(true);
    getData();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
          Blog Articles
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedArticles?.data.map((article: any) => (
            <Link key={article.title_id} href={`/blog/${article.title_id}`}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 pt-6">
                <CardContent className="p-0 flex flex-col h-full">
                  <div className="relative h-48 w-full">
                    <Image
                      src={article.cover_image}
                      alt={article.title}
                      fill
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
                      <span>
                        {dayjs(article.create_time).format("YYYY-MM")}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        {displayedArticles?.data.length < blogListRes?.data.length && (
          <div className="text-center mt-8">
            <Button
              onClick={loadMore}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-4 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Loading...
                </>
              ) : (
                "Load More Articles"
              )}
            </Button>
          </div>
        )}
      </main>
      {hasMore && (
        <div className="text-center mt-8">
          <Button
            onClick={loadMore}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-4 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Load More
          </Button>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Index;
