"use client";
import { useMemo, useState } from "react";
import ProductGrid from "./ProductGrid";
import { toBn } from "@/lib/utils";

const toNumber = (v) =>
  Number(String(v).replace(/[০-৯]/g, (d) => "০১২৩৪৫৬৭৮৯".indexOf(d)).replace(/,/g, ""));

export default function SortableProducts({ products }) {
  const [sort, setSort] = useState("default");

  const sorted = useMemo(() => {
    const list = [...products];
    if (sort === "asc") list.sort((a, b) => toNumber(a.today) - toNumber(b.today));
    if (sort === "desc") list.sort((a, b) => toNumber(b.today) - toNumber(a.today));
    return list;
  }, [products, sort]);

  return (
    <>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-500">মোট {toBn(products.length)}টি পণ্য দেখানো হচ্ছে</p>
        <label className="flex items-center gap-2 text-sm text-gray-600">
          সাজান
          <select
            className="select select-sm w-52 bg-white"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি</option>
            <option value="desc">দাম: বেশি থেকে কম</option>
          </select>
        </label>
      </div>
      <ProductGrid products={sorted} />
    </>
  );
}
