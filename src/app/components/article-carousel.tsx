"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

// interface Article {
//   id: string;
//   title: string;
//   image: string;
// }

// const articles: Article[] = [
//   {
//     id: "1",
//     title: "Understanding Instagram Algorithms",
//     image: "https://res-ins.pumpsoul.com/ins_image/1715226267021510004.jpg",
//   },
//   {
//     id: "2",
//     title: "Building Genuine Connections on Social Media",
//     image: "https://res-ins.pumpsoul.com/ins_image/1715231944765698112.jpg",
//   },
//   {
//     id: "3",
//     title: "The Psychology of Social Media Followers",
//     image: "https://res-ins.pumpsoul.com/ins_image/1715232052557283516.jpg",
//   },
//   {
//     id: "4",
//     title: "Protecting Your Privacy on Instagram",
//     image: "https://res-ins.pumpsoul.com/ins_image/1715232014132880270.jpg",
//   },
//   {
//     id: "5",
//     title: "The Impact of Social Media on Mental Health",
//     image: "https://res-ins.pumpsoul.com/ins_image/1715233472060278219.jpg",
//   },
// ];

export function ArticleCarousel({ blogList }: { blogList: any[] }) {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const scrollWidth = carousel.scrollWidth;
    const clientWidth = carousel.clientWidth;

    let scrollPosition = 0;
    const scrollSpeed = 0.5; // pixels per frame

    const animate = () => {
      scrollPosition += scrollSpeed;
      if (scrollPosition >= scrollWidth - clientWidth) {
        scrollPosition = 0;
      }
      carousel.scrollLeft = scrollPosition;
      requestAnimationFrame(animate);
    };

    const animation = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animation);
  }, []);

  return (
    <section
      className="py-16 bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50"
      aria-labelledby="latest-tips"
    >
      <div className="container mx-auto px-4">
        <h2
          id="latest-tips"
          className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text"
        >
          Latest Tips
        </h2>
        <div className="relative overflow-hidden" aria-live="polite">
          <div
            ref={carouselRef}
            className="flex gap-4 overflow-x-hidden"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {blogList.map((article, index) => (
              <Card
                key={`${article.id}-${index}`}
                className="flex-shrink-0 w-72 overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl pt-6"
              >
                <Link href={`/blog/${article.title_id}`} passHref>
                  <CardContent className="p-0">
                    <div className="relative h-40 w-full">
                      <Image
                        src={article.cover_image}
                        alt={article.title}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold line-clamp-2 bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
                        {article.title}
                      </h3>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
