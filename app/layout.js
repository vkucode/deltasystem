import { Inter } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "./components/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Delta | Real Estate Company Dubai",
  description: "Delta Real Estate Company Dubai",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <GoogleAnalytics trackingId="G-4QDVYCZYLH" />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
