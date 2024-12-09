"use client";

// import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { GoogleLoginButton } from "@/app/components/GoogleLoginButton";
// import { AppleLoginButton } from "@/app/components/AppleLoginButton";
import { Home } from "lucide-react";
// import { useAuthStore } from "@/lib/auth";

export default function Login() {
  // const [username, setUsername] = useState("");
  // const router = useRouter();
  // const login = useAuthStore((state) => state.login);

  // const handleLogin = (e: React.FormEvent) => {
  //   // e.preventDefault();
  //   // login(username);
  //   router.push("/profile");
  // };

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
            Log in to your account
          </CardTitle>
          <CardDescription className="text-center bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
            Welcome back to RecentlyfoLowed
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* <form onSubmit={() => {}} className="space-y-4">
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-gray-800 transition-colors duration-300"
            >
              Log In
            </Button>
          </form> */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            {/* <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">
                Or continue with
              </span>
            </div> */}
          </div>
          <GoogleLoginButton />
          {/* <AppleLoginButton /> */}
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            {`Don't have an account?`}
            <Link href="/register" className="text-purple-600 hover:underline">
              {" "}
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
