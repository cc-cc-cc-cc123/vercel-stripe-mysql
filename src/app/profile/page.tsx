"use client";

import { useState, useEffect } from "react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/lib/auth";
import UpgradeModal from "../components/upgrade-modal";
import { UsageHistoryItem } from "@/types/search"; // You'll need to create this type
import { ApiErrorCodes } from "@/types/api";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const {
    isLoggedIn,
    username: storedUsername,
    email: storedEmail,
  } = useAuthStore();
  const username = storedUsername; // Added as per update 3
  const email = storedEmail; // Added as per update 3
  const [showAllHistory, setShowAllHistory] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [usageHistory, setUsageHistory] = useState<UsageHistoryItem[]>([]);
  const [orders, setOrders] = useState<
    Array<{
      orderId: string;
      date: string;
      amount: string;
      status: string;
    }>
  >([]);
  const [isOrdersLoading, setIsOrdersLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    console.log(isLoggedIn, "=isLoggedIn");
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    const fetchUsageHistory = async () => {
      try {
        const response = await axios.get("/api/search/history");
        if (response.data.code === ApiErrorCodes.SUCCESS) {
          setUsageHistory(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch usage history:", error);
      }
    };

    if (isLoggedIn) {
      fetchUsageHistory();
    }
  }, [isLoggedIn, storedUsername]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/order");
        if (response.data.code === ApiErrorCodes.SUCCESS) {
          setOrders(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setIsOrdersLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchOrders();
    }
  }, [isLoggedIn, storedUsername]);

  if (!isLoggedIn) {
    return null; // or a loading spinner
  }

  const displayedHistory = showAllHistory
    ? usageHistory
    : usageHistory.slice(0, 5);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
          Dashboard
        </h1>
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl"></CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {/* Update 1: Replaced Account Information section */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Account Information</h2>
                  <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <span className="font-medium">Username:</span>
                      <span>{username}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="font-medium">Email:</span>
                      <span>{email}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Usage History</h2>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-sm font-medium text-gray-500">
                          <th className="pb-2">Target Account</th>
                          <th className="pb-2">Date</th>
                          <th className="pb-2">Type</th>
                          <th className="pb-2">Remaining Searches</th>
                        </tr>
                      </thead>
                      <tbody>
                        {displayedHistory.map((item, index) => (
                          <tr key={index} className="text-sm text-gray-700">
                            <td className="py-1">{item.targetAccount}</td>
                            <td className="py-1">{item.date}</td>
                            <td className="py-1">{item.type}</td>
                            <td className="py-1">{item.remainingSearches}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {!showAllHistory && usageHistory.length > 5 && (
                    <Button
                      className="w-full bg-black text-white"
                      onClick={() => setShowAllHistory(true)}
                    >
                      View All History
                    </Button>
                  )}
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Order History</h2>
                    <Button
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                      onClick={() => setShowUpgradeModal(true)}
                    >
                      Get Usage Credits
                    </Button>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    {isOrdersLoading ? (
                      <div className="text-center py-4">Loading orders...</div>
                    ) : orders.length > 0 ? (
                      <table className="w-full table-fixed">
                        <thead>
                          <tr className="text-left text-sm font-medium text-gray-500">
                            <th className="pb-2 w-1/4">
                              <div className="truncate">Order ID</div>
                            </th>
                            <th className="pb-2 w-1/4">Date</th>
                            <th className="pb-2 w-1/4">Amount</th>
                            <th className="pb-2 w-1/4">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map((order) => (
                            <tr
                              key={order.orderId}
                              className="text-sm text-gray-700"
                            >
                              <td className="py-1">
                                <div
                                  className="truncate"
                                  title={`#${order.orderId}`}
                                >
                                  #{order.orderId}
                                </div>
                              </td>
                              <td className="py-1">
                                {new Date(order.date).toLocaleDateString()}
                              </td>
                              <td className="py-1">{order.amount}</td>
                              <td className="py-1">{order.status}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div className="text-center py-4 text-gray-500">
                        No orders found
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      {showUpgradeModal && (
        <UpgradeModal
          isOpen={showUpgradeModal}
          onClose={() => setShowUpgradeModal(false)}
        />
      )}
      <Footer />
    </div>
  );
}
