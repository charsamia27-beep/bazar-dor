import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Ticker from "@/components/Ticker";
import Providers from "@/components/Providers";
import { getCategories, getProducts } from "@/lib/api";
import { bnDate } from "@/lib/utils";

const hind = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "বাজার দর — আজকের বাজারের দাম",
  description: "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম এক নজরে।",
  icons: { icon: "/logo-icon.png" },
};

export default async function RootLayout({ children }) {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);
  return (
    <html lang="bn" data-theme="bazar">
      <body className={`${hind.className} flex min-h-screen flex-col antialiased`}>
        <Providers>
          <Navbar categories={categories} today={bnDate()} />
          <Ticker products={products} />
          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
