import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/common/Navbar";
import Footer from "@/components/ui/common/Footer";
import { Web3Provider } from "@/components/providers/web3";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Eth Marketplace",
  description: "Course Marketplace using Ethereum and Web3",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Web3Provider>
          <div className="bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
              <Navbar />
              <div className="fit">
                {children}
              </div>
            </div>
            <Footer />
          </div>
        </Web3Provider>
      </body>
    </html>
  );
}
