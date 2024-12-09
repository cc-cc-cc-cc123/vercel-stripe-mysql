"use client";

import { useState, useEffect } from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Shield, Eye, GiftIcon } from "lucide-react";
import { StepsSection } from "./steps-section";
import { FAQSection } from "./faq-section";
import { ArticleCarousel } from "./article-carousel";
import { ResultsSection } from "./results-section";
import { getHomeCheckApi, getHomeCheckLocalApi } from "@/lib/service/blog";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PaymentSuccessModal } from "./PaymentSuccessModal";
import { ApiErrorCodes } from "@/types/api";
import UpgradeModal from "./upgrade-modal";

const imgList = [
  {
    url: "https://res-ins.pumpsoul.com/ins_image/1715231944765698112.jpg",
    id: 1,
  },
  {
    url: "https://res-ins.pumpsoul.com/ins_image/1715233527880123759.jpg",
    id: 2,
  },
  {
    url: "https://res-ins.pumpsoul.com/ins_image/1715271458106769031.jpg",
    id: 3,
  },
];

// Create a wrapper component for the search params logic
const SearchParamsHandler = ({
  setShowPaymentSuccessModal,
  setShowUpgradeModal,
}: {
  setShowPaymentSuccessModal: (show: boolean) => void;
  setShowUpgradeModal: (show: boolean) => void;
}) => {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("success") === "true") {
      setShowPaymentSuccessModal(true);
    } else {
      setShowPaymentSuccessModal(false);
    }
    if (searchParams.get("login") === "true") {
      setShowUpgradeModal(true);
    } else {
      setShowUpgradeModal(false);
    }
  }, [searchParams]);

  return null;
};

export default function Page({ blogListRes }: { blogListRes: any }) {
  const [isFollowed, setIsFollowed] = useState(0);
  const [color, setColor] = useState("text-purple-600");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [stage, setStage] = useState(0);
  const [followingList, setFollowingList] = useState<any>({});
  const [followerList, setFollowerList] = useState<any>({});
  const [showPaymentSuccessModal, setShowPaymentSuccessModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFollowed((prev) => (prev + 1) % 3);
      setColor((prev) => {
        if (prev === "text-purple-600") return "text-blue-500";
        if (prev === "text-blue-500") return "text-green-500";
        return "text-purple-600";
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleReveal = async () => {
    if (!username) return;

    setStage(0);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setStage(1);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setStage(2);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setShowError(false);
    setIsLoading(true);
    setShowResults(false);

    getHomeCheckApi({
      username,
      pageNo: 1,
      operate: "following",
    }).then((res) => {
      if (res.code == 0) {
        setFollowingList(res.data);
        setShowResults(true);
        getHomeCheckApi({
          username,
          pageNo: 1,
          operate: "followers",
        }).then((res) => {
          setFollowerList(res.data);
        });
      } else if (res.code == ApiErrorCodes.SERVER_ERROR) {
        setShowError(true);
      }
      setStage(0);
      setIsLoading(false);
    });
  };

  const handleTest = () => {
    getHomeCheckLocalApi({ username: "czn" }).then((res) => {
      console.log(res);
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Suspense fallback={null}>
        <SearchParamsHandler
          setShowPaymentSuccessModal={setShowPaymentSuccessModal}
          setShowUpgradeModal={setShowUpgradeModal}
        />
      </Suspense>
      <div className="w-full bg-yellow-50 py-1 text-center text-sm">
        Absolutely free 🎁, 100% Anonymous 🕵️‍♀️, and Reveal Truth YOU CARE 🔍❤️
      </div>
      <Header />
      <main className="flex-1">
        <h1 className="hidden">See Who Anyone Recently Followed</h1>
        <div className="container mx-auto px-4 py-8 md:py-16">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <div className="text-4xl md:text-6xl font-bold tracking-tight">
                See Who Anyone
                <br />
                <span className="flex items-center justify-center">
                  <span
                    style={{
                      background:
                        "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      display: "inline-block",
                      padding: "0.1em 0",
                    }}
                  >
                    Recently
                  </span>{" "}
                  <span
                    className={`${color} transition-colors duration-1000 inline-block overflow-hidden text-left`}
                    style={{
                      height: "1.1em",
                      lineHeight: "1.1em",
                      paddingLeft: "0.5em",
                    }}
                  >
                    <span
                      className={`block transition-transform duration-500 ${
                        isFollowed === 0 ? "translate-y-0" : "-translate-y-full"
                      }`}
                    >
                      Followed
                    </span>
                    <span
                      className={`block transition-transform duration-500 ${
                        isFollowed === 1
                          ? "translate-y-0"
                          : isFollowed === 0
                          ? "translate-y-full"
                          : "-translate-y-full"
                      } text-green-500`}
                      style={{ marginTop: "-1.1em" }}
                    >
                      Cared About
                    </span>
                    <span
                      className={`block transition-transform duration-500 ${
                        isFollowed === 2 ? "translate-y-0" : "translate-y-full"
                      }`}
                      style={{ marginTop: "-1.1em" }}
                    >
                      Follow
                    </span>
                  </span>
                </span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-4 text-center">
                <div
                  className="flex flex-col items-center gap-2"
                  onClick={handleTest}
                >
                  <GiftIcon className="h-6 w-6 text-purple-600" />
                  <p className="text-sm">Absolutely Free</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Eye className="h-6 w-6 text-purple-600" />
                  <p className="text-sm">View New Follows</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Users className="h-6 w-6 text-purple-600" />
                  <p className="text-sm">View New Followers</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Shield className="h-6 w-6 text-purple-600" />
                  <p className="text-sm">Completely Anonymous</p>
                </div>
              </div>

              <div className="max-w-md mx-auto w-full space-y-4">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Instagram Username (@name)"
                    value={username}
                    onChange={(e) =>
                      setUsername(e.target.value.replace("@", ""))
                    }
                    className="h-12 text-center border-2 border-gray-300 focus:border-yellow-400 transition-colors duration-200"
                  />
                </div>
                <Button
                  onClick={handleReveal}
                  className="w-full h-12 text-lg font-semibold bg-yellow-400 hover:bg-yellow-500 text-black transition-colors duration-200"
                  disabled={isLoading || stage !== 0}
                >
                  {isLoading
                    ? "Processing..."
                    : stage === 0
                    ? "Reveal Now"
                    : stage === 1
                    ? "Capturing"
                    : stage === 2
                    ? "Analyzing"
                    : "Starting Run"}
                </Button>
                {showError && (
                  <p className="text-xs text-red-500">
                    Error: This is a private account, the username is incorrect,
                    or there are no followers/following.
                  </p>
                )}
                <p className="text-sm text-gray-500">
                  <span className="font-bold text-red-500">
                    Absolutely FREE!
                  </span>{" "}
                  No Login Required — Account Must Be Public
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2">
              <div className="flex -space-x-2">
                {imgList.map((i: any) => (
                  <div
                    key={i.id}
                    className="w-8 h-8 rounded-full border-2 border-white overflow-hidden"
                  >
                    <img
                      src={i.url}
                      alt={`User ${i}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">177,144+</span> users repeatedly
                use our service
              </p>
            </div>
          </div>
        </div>
        <UpgradeModal
          isOpen={showUpgradeModal}
          onClose={() => setShowUpgradeModal(false)}
        />
        {(isLoading || showResults) && (
          <ResultsSection
            username={username}
            isLoading={isLoading}
            followingList={followingList}
            followerList={followerList}
          />
        )}

        <StepsSection />
        <FAQSection />
        <ArticleCarousel blogList={blogListRes.data} />
        <PaymentSuccessModal
          isOpen={showPaymentSuccessModal}
          onClose={() => setShowPaymentSuccessModal(false)}
        />
      </main>
      <Footer />
    </div>
  );
}
