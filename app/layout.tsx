import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ReadMate — The reading coach for your first-grader.",
  description:
    "Kids read aloud. ReadMate listens, gently corrects, and celebrates. Parents get a progress report every week.",
  openGraph: {
    title: "ReadMate — The reading coach for your first-grader.",
    description:
      "Kids read aloud. ReadMate listens, gently corrects, and celebrates. Parents get a progress report every week.",
    images: [
      {
        url: "https://waitlist-api-sigma.vercel.app/api/og?title=ReadMate&accent=rose&category=Education",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      "https://waitlist-api-sigma.vercel.app/api/og?title=ReadMate&accent=rose&category=Education",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-neutral-900 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
