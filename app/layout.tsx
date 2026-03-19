import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Vision — AI Fashion Analysis",
  description:
    "Instantly identify fashion items, brands, colors, and style vibes with AI.",
  openGraph: {
    title: "The Vision — AI Fashion Analysis",
    description:
      "Drop a photo. Get instant style analysis powered by Google Gemini.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
