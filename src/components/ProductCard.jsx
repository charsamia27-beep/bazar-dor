import Link from "next/link";
import ChangeBadge from "./ChangeBadge";
import { bnPrice, unitBn } from "@/lib/utils";

export default function ProductCard({ product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block rounded-2xl border border-base-300 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-base-200 text-2xl">
          {product.image}
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-lg font-bold group-hover:text-primary">{product.nameBn}</h3>
          <p className="text-sm text-gray-500">প্রতি {unitBn(product.unit)}</p>
        </div>
      </div>
      <p className="mt-5 text-xs text-gray-500">আজকের দাম</p>
      <div className="flex items-end justify-between">
        <p className="text-xl font-bold">
          {bnPrice(product.today)} <span className="text-base font-medium">টাকা</span>
        </p>
        <ChangeBadge change={product.change} />
      </div>
    </Link>
  );
}
