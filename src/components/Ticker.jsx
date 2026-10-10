import Link from "next/link";
import ChangeBadge from "./ChangeBadge";
import { bnPrice, unitBn } from "@/lib/utils";

export default function Ticker({ products }) {
  if (!products?.length) return null;
  const items = [...products, ...products];
  return (
    <div className="overflow-hidden border-y border-base-300 bg-base-200/60 py-2">
      <div className="ticker-track flex w-max gap-8">
        {items.map((p, i) => (
          <Link
            key={i}
            href={`/product/${p.slug}`}
            className="flex shrink-0 items-center gap-2 whitespace-nowrap text-sm"
          >
            <span>{p.image}</span>
            <span className="font-semibold">{p.nameBn}</span>
            <span className="text-gray-600">
              {bnPrice(p.today)} টাকা/{unitBn(p.unit)}
            </span>
            <ChangeBadge change={p.change} />
          </Link>
        ))}
      </div>
    </div>
  );
}
