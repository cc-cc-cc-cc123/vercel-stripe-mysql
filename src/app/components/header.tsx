"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/lib/auth";
import Cookies from "js-cookie";
import { FirebaseLogOut } from "@/lib/firebaseConfig/init";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, username, logout, avatar } = useAuthStore();

  return (
    <header className="w-full border-b bg-white/80 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center gap-3">
            <svg
              className="w-8 h-8"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="5"
                cy="12"
                r="3"
                fill="currentColor"
                className="text-purple-600"
              />
              <circle
                cx="19"
                cy="12"
                r="3"
                fill="currentColor"
                className="text-purple-600"
              />
              <path
                d="M11 7V17H13V13H15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-pink-500"
              />
            </svg>
            <span className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
                Recently
              </span>
              <span className="bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
                F
              </span>
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-transparent bg-clip-text font-extrabold">
                o
              </span>
              <span className="bg-gradient-to-r from-gray-700 to-gray-900 text-transparent bg-clip-text font-extrabold">
                L
              </span>
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-transparent bg-clip-text font-extrabold">
                o
              </span>
              <span className="bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
                wed
              </span>
            </span>
          </div>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link
            className="text-sm font-medium hover:text-purple-600 transition-colors"
            href="/relationship-tips"
          >
            Relationship Tips
          </Link>
          <Link
            className="text-sm font-medium hover:text-purple-600 transition-colors"
            href="/faq"
          >
            FAQ
          </Link>
          <Link
            className="text-sm font-medium hover:text-purple-600 transition-colors"
            href="/about-us"
          >
            About Us
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={avatar} alt={username} />
                    <AvatarFallback>
                      {username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 bg-white"
                align="end"
                forceMount
              >
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={async () => {
                    // Clear cookies
                    Cookies.remove("accessToken");
                    Cookies.remove("firebaseToken");
                    Cookies.remove("firebaseUser");
                    logout();
                    await FirebaseLogOut();
                    localStorage.removeItem("user");
                    window.location.href = "/login";
                  }}
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login" className="hidden md:inline-block">
              <Button
                variant="outline"
                className="bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-800"
              >
                Log In
              </Button>
            </Link>
          )}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4">
                <Link
                  className="text-lg font-medium hover:text-purple-600 transition-colors"
                  href="/relationship-tips"
                  onClick={() => setIsOpen(false)}
                >
                  Relationship Tips
                </Link>
                <Link
                  className="text-lg font-medium hover:text-purple-600 transition-colors"
                  href="/faq"
                  onClick={() => setIsOpen(false)}
                >
                  FAQ
                </Link>
                <Link
                  className="text-lg font-medium hover:text-purple-600 transition-colors"
                  href="/about-us"
                  onClick={() => setIsOpen(false)}
                >
                  About Us
                </Link>
                {isLoggedIn ? (
                  <>
                    <Link
                      className="text-lg font-medium hover:text-purple-600 transition-colors"
                      href="/profile"
                      onClick={() => setIsOpen(false)}
                    >
                      Profile
                    </Link>
                    <Button
                      variant="outline"
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                    >
                      Log out
                    </Button>
                  </>
                ) : (
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                    >
                      Log In
                    </Button>
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
