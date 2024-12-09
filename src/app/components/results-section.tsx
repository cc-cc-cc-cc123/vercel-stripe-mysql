"use client";

import { useEffect, useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import UpgradeModal from "./upgrade-modal";
import { useAuthStore } from "@/lib/auth";
import { getHomeCheckApi } from "@/lib/service/blog";

// 添加用户数据接口
interface UserData {
  media_name: string;
  media_avatar: string;
  full_name: string;
}

export function ResultsSection({
  username,
  isLoading,
  followingList,
  followerList,
}: {
  username: string;
  isLoading: boolean;
  followingList: any;
  followerList: any;
}) {

  const { isLoggedIn } = useAuthStore((state) => state);
  const [isInnerLoading, setIsInnerLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"follows" | "followers">(
    "follows"
  );
  const [showPopup, setShowPopup] = useState(false);
  const [followerPageNo, setFollowerPageNo] = useState(1);
  const [followingPageNo, setFollowingPageNo] = useState(1);
  const [innerFollowingList, setInnerFollowingList] = useState<UserData[]>([]);
  const [innerFollowerList, setInnerFollowerList] = useState<UserData[]>([]);

  useEffect(() => {
    setInnerFollowingList(followingList);
    setInnerFollowerList(followerList);
    setFollowingPageNo(1);
    setFollowerPageNo(1);
  }, [followerList, followingList]);

  const showlist = useMemo(() => {
    return activeTab === "follows" ? innerFollowingList : innerFollowerList;
  }, [activeTab, innerFollowingList, innerFollowerList]);

  const loadMore = () => {
    const operate = activeTab === "follows" ? "following" : "followers";
    let pageNo = 1;
    if (operate === "followers") {
      pageNo = followerPageNo + 1;
    } else {
      pageNo = followingPageNo + 1;
    }

    if (pageNo > 3 && !isLoggedIn) {
      setShowPopup(true);
      return;
    }
    setIsInnerLoading(true);
    getHomeCheckApi({
      username,
      pageNo,
      operate,
    }).then((res) => {
      setIsInnerLoading(false);
      if (res.code == 0) {
        if (operate === "followers") {
          setInnerFollowerList((prevList: UserData[]) => [
            ...prevList,
            ...res.data,
          ]);
          setFollowerPageNo(pageNo);
        } else {
          setInnerFollowingList((prevList: UserData[]) => [
            ...prevList,
            ...res.data,
          ]);
          setFollowingPageNo(pageNo);
        }
      } else {
        setShowPopup(true);
      }
    });
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto mt-8 p-8 mb-16">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-lg text-gray-600">Analyzing profile data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 mb-16">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex rounded-t-lg overflow-hidden">
          <button
            onClick={() => {
              setActiveTab("follows");
            }}
            className={cn(
              "flex-1 py-3 text-center transition-colors",
              activeTab === "follows"
                ? "bg-purple-600 text-white font-medium"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
          >
            Recent Follows
          </button>
          <button
            onClick={() => {
              setActiveTab("followers");
            }}
            className={cn(
              "flex-1 py-3 text-center transition-colors",
              activeTab === "followers"
                ? "bg-purple-600 text-white font-medium"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
          >
            Recent Followers
          </button>
        </div>

        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">
            @{username} recently{" "}
            {activeTab === "follows" ? "followed" : "followed by"}...
          </h2>

          <div className="space-y-4">
            {Array.isArray(showlist) &&
              showlist.map((user: any, index: number) => (
                <div
                  key={activeTab + "-" + user.media_name}
                  className="flex items-center justify-between group hover:bg-gray-50 p-2 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-4 flex-grow">
                    <span
                      className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full ${
                        index < 3
                          ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white"
                          : "bg-gray-100 text-gray-600"
                      } font-bold text-sm`}
                    >
                      {index < 3 ? ["🥇", "🥈", "🥉"][index] : index + 1}
                    </span>

                    <Avatar className="w-12 h-12">
                      <AvatarImage
                        alt={user.full_name}
                        src={
                          "/api/img?url=" +
                          encodeURIComponent(user.media_avatar)
                        }
                      />
                      <AvatarFallback>
                        {user.full_name.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">@{user.media_name}</p>
                      <p className="text-sm text-gray-500">
                        {user.full_name || "-"}
                      </p>
                    </div>
                  </div>
                  <ArrowRight
                    className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    onClick={() =>
                      window.open(
                        "https://www.instagram.com/" + user.media_name,
                        "_blank"
                      )
                    }
                  />
                </div>
              ))}
          </div>
          <div className="text-center mt-4">
            <Button
              disabled={isInnerLoading}
              onClick={loadMore}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-4 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              {isInnerLoading ? "Loading..." : "Load More Truth"}
            </Button>
          </div>
          {/* )} */}
          {showPopup && (
            <UpgradeModal
              isOpen={showPopup}
              onClose={() => setShowPopup(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
