"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GoogleLoginButton } from "@/app/components/GoogleLoginButton";
// import { AppleLoginButton } from "@/app/components/AppleLoginButton";
import { Home } from "lucide-react";

export default function Register() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm relative">
        <Link
          href="/"
          className="absolute top-4 left-4 text-gray-600 hover:text-purple-600 transition-colors"
        >
          <Home size={24} />
          <span className="sr-only">Return to home</span>
        </Link>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
            Create an account
          </CardTitle>
          <CardDescription className="text-center bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
            Sign up for RecentlyfoLowed
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-sm text-gray-600">
            Create an account using your Google or Apple account for a seamless
            experience.
          </p>
          <GoogleLoginButton />
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            {/* <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-muted-foreground">Or</span>
                </div> */}
          </div>
          {/* <AppleLoginButton /> */}
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-purple-600 hover:underline">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
