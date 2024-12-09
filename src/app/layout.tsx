import { Inter } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
import InitStatus from "./components/InitStatus";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RecentlyFoLowed - See Who Anyone Recently Followed on Instagram",
  description:
    "Anonymously track Instagram follows and followers. Free, secure, and easy to use. Get insights into recent Instagram activity without logging in.",
  keywords:
    "Instagram, followers, following, anonymous, social media, tracking",
  openGraph: {
    title: "RecentFoLow - Instagram Follower Tracker",
    description:
      "See who anyone recently followed on Instagram, anonymously and for free.",
    url: "https://recentfolow.com",
    siteName: "RecentFoLow",
    images: [
      {
        url: "https://recentfolow.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RecentFoLow - Instagram Follower Tracker",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RecentFoLow - Instagram Follower Tracker",
    description:
      "See who anyone recently followed on Instagram, anonymously and for free.",
    images: ["https://recentfolow.com/twitter-image.jpg"],
    creator: "@recentfolow",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification-code",
    yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <InitStatus />
      <head>
        <link rel="icon" href="/favicon.ico?v=2" type="image/x-icon" />
      </head>
      <Script
        id="clarity-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "p95ntsn5yp");
            `,
        }}
      />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
