import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meta Integration Toolkit | Shorlah Cloud",
  description: "A secure workspace for building and managing Meta platform integrations.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}