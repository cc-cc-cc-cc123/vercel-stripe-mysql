"use client";

import { CreditCard, Infinity, Users, Shield, Heart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import axios from "axios";
// 支付
import { loadStripe } from "@stripe/stripe-js";
import { useStripe, Elements } from "@stripe/react-stripe-js";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

// interface UpgradeModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }
function UpgradeModal({ isOpen, onClose }: any) {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const client_secret = useRef("");
  const router = useRouter();
  if (!isOpen) return null;

  const loadScripePay = async () => {
    await stripe?.redirectToCheckout({
      sessionId: client_secret.current,
    });
  };

  const handlePay = () => {
    // TODO: Implement payment logic
    setLoading(true);
    axios.post("/api/stripe").then((res) => {
      if (res.data.code === 0) {
        const { sessionId } = res.data.data;
        client_secret.current = sessionId;
        setLoading(false);
        loadScripePay();
      } else {
        router.push("/login");
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="relative w-full max-w-md mx-4 p-6 bg-white rounded-xl shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
            Unlock Premium Features
          </h2>

          <ul className="text-left space-y-2 my-4">
            <li className="flex items-center">
              <CreditCard className="h-5 w-5 text-purple-500 mr-2" />
              <span className="text-gray-700">
                <span className="font-bold text-purple-600">ONE-TIME</span>{" "}
                payment, no subscription pressure
              </span>
            </li>
            <li className="flex items-center">
              <Infinity className="h-5 w-5 text-purple-500 mr-2" />
              <span className="text-gray-700">
                <span className="font-bold text-purple-600">Unlimited</span>{" "}
                queries for up to{" "}
                <span className="font-bold text-purple-600">20</span> accounts
              </span>
            </li>
            <li className="flex items-center">
              <Users className="h-5 w-5 text-purple-500 mr-2" />
              <span className="text-gray-700">
                Access full recently follower/following lists
              </span>
            </li>
            <li className="flex items-center">
              <Shield className="h-5 w-5 text-purple-500 mr-2" />
              <span className="text-gray-700">
                <span className="font-bold text-purple-600">Absolutely</span>{" "}
                anonymous, secure, and legal
              </span>
            </li>
            <li className="flex items-center">
              <Heart className="h-5 w-5 text-purple-500 mr-2" />
              <span className="text-gray-700">
                Immediate{" "}
                <span className="font-bold text-purple-600">peace of mind</span>
              </span>
            </li>
          </ul>

          <Button
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105"
            onClick={handlePay}
          >
            Upgrade Now for{" "}
            <span className="text-yellow-300 font-bold">$6</span> - No
            subscription
          </Button>

          <div className="pt-4 text-sm text-gray-500">
            Already a premium member?{" "}
            <Link href="/login" className="text-purple-600 hover:underline">
              Log in here
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function payUpgradeModal(data: any) {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLICK_KEY || ""
  );
  return (
    <Elements stripe={stripePromise}>
      <UpgradeModal {...data} />
    </Elements>
  );
}
