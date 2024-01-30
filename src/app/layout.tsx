import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tech Radar",
  description: "Tech Radar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-mono">{children}</body>
    </html>
  );
}
