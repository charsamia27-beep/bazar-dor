import Image from "next/image";
import ProductGrid from "@/components/ProductGrid";
import { getProducts } from "@/lib/api";
import { bnDate, toBn, topFallers, topRisers } from "@/lib/utils";

export default async function Home() {
  const products = await getProducts();
  const risers = topRisers(products);
  const fallers = topFallers(products);

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="grid items-center gap-6 rounded-3xl border border-base-300 bg-white p-6 shadow-sm sm:p-10 md:grid-cols-[1.5fr_1fr]">
        <div>
          <span className="inline-block rounded-full bg-secondary px-3 py-1 text-sm font-medium text-primary">
            {bnDate()}
          </span>
          <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="mt-4 max-w-xl text-gray-600">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <a href="#সব-পণ্য" className="btn btn-primary btn-sm sm:btn-md mt-6">
            সব পণ্য দেখুন
          </a>
        </div>
        <div className="flex justify-center">
          <Image src="/bazar-hero.png" alt="বাজারের ঝুড়ি" width={320} height={260} priority className="h-auto w-56 sm:w-72" />
        </div>
      </section>

      {/* Risers */}
      <section>
        <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
          <span className="text-red-600">▲</span> আজ দাম বেড়েছে
        </h2>
        <ProductGrid products={risers} />
      </section>

      {/* Fallers */}
      <section>
        <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
          <span className="text-green-700">▼</span> আজ দাম কমেছে
        </h2>
        <ProductGrid products={fallers} />
      </section>

      {/* All */}
      <section id="সব-পণ্য" className="scroll-mt-6">
        <h2 className="text-2xl font-bold">সব পণ্য</h2>
        <p className="mb-4 mt-1 text-sm text-gray-500">মোট {toBn(products.length)}টি পণ্য দেখানো হচ্ছে</p>
        <ProductGrid products={products} />
      </section>
    </div>
  );
}
