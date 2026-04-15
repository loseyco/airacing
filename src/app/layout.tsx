import type { Metadata } from "next";
import { AuthProvider } from "@/lib/auth-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Racing Manager | Build. Race. Dominate.",
  description:
    "Create virtual racing drivers, compete in real iRacing AI simulations, and build your motorsport empire. Real physics. Real strategy. Real results.",
  keywords: ["racing", "motorsport", "manager", "iRacing", "AI", "simulation", "game"],
  openGraph: {
    title: "AI Racing Manager",
    description: "Build your racing empire powered by real iRacing AI simulations",
    siteName: "AI Racing Manager",
    type: "website",
  },
};

import { DiscussionBanner } from "@/components/discussion-banner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-grid min-h-screen antialiased flex flex-col">
        <DiscussionBanner />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
