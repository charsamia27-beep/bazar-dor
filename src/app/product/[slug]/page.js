import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import ChangeBadge from "@/components/ChangeBadge";
import { auth } from "@/lib/auth";
import { getProductBySlug } from "@/lib/api";
import { bnPrice, unitBn } from "@/lib/utils";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = await getProductBySlug(slug);
  return { title: p ? `${p.nameBn} — বাজার দর` : "পাওয়া যায়নি — বাজার দর" };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect(`/signin?redirect=/product/${slug}&reason=protected`);

  const p = await getProductBySlug(slug);
  if (!p) notFound();

  const markets = p.markets || [];
  const minPrice = markets.length ? Math.min(...markets.map((m) => m.min)) : p.today;
  const maxPrice = markets.length ? Math.max(...markets.map((m) => m.max)) : p.today;
  const unit = unitBn(p.unit);
  const diff = p.today - p.yesterday;
  const summary =
    diff > 0
      ? `গতকালের তুলনায় আজ দাম বেড়েছে · ${bnPrice(diff)} টাকা`
      : diff < 0
      ? `গতকালের তুলনায় আজ দাম কমেছে · ${bnPrice(Math.abs(diff))} টাকা`
      : "গতকালের তুলনায় আজ দাম অপরিবর্তিত";

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="breadcrumbs text-sm text-gray-500">
        <ul>
          <li><Link href="/">হোম</Link></li>
          <li><Link href={`/category/${p.category}`}>{p.categoryNameBn}</Link></li>
          <li>{p.nameBn}</li>
        </ul>
      </div>

      {/* Summary */}
      <section className="flex flex-col gap-5 rounded-2xl border border-base-300 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-base-200 text-4xl">{p.image}</span>
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">{p.nameBn}</h1>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-gray-500">
              <span>প্রতি {unit}</span>
              <Link href={`/category/${p.category}`} className="badge badge-sm border-0 bg-secondary text-primary">
                {p.categoryIcon} {p.categoryNameBn}
              </Link>
            </div>
            <p className="mt-2 text-sm text-gray-600">{summary}</p>
          </div>
        </div>
        <div className="rounded-xl bg-base-200 px-6 py-4 text-center">
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="text-3xl font-bold">{bnPrice(p.today)}</p>
          <p className="text-xs text-gray-500">টাকা / {unit}</p>
          <ChangeBadge change={p.change} />
        </div>
      </section>

      {/* Price summary */}
      <section className="rounded-2xl border border-base-300 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-bold">দামের সারসংক্ষেপ</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-base-200 p-4">
            <p className="text-sm text-gray-500">সর্বনিম্ন দাম</p>
            <p className="text-2xl font-bold text-green-700">{bnPrice(minPrice)} টাকা</p>
            <p className="text-xs text-gray-500">সবচেয়ে কম দামের বাজার</p>
          </div>
          <div className="rounded-xl bg-base-200 p-4">
            <p className="text-sm text-gray-500">সর্বাধিক দাম</p>
            <p className="text-2xl font-bold text-red-600">{bnPrice(maxPrice)} টাকা</p>
            <p className="text-xs text-gray-500">সবচেয়ে বেশি দামের বাজার</p>
          </div>
          <div className="rounded-xl bg-base-200 p-4">
            <p className="text-sm text-gray-500">গড় দাম</p>
            <p className="text-2xl font-bold text-primary">{bnPrice(p.today)} টাকা</p>
            <p className="text-xs text-gray-500">প্রতি {unit}-এর হিসাবে</p>
          </div>
        </div>
      </section>

      {/* Market table */}
      <section className="rounded-2xl border border-base-300 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-bold">বাজারভিত্তিক আজকের দাম</h2>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>বাজার</th>
                <th>বিভাগ</th>
                <th className="text-right">সর্বনিম্ন</th>
                <th className="text-right">সর্বাধিক</th>
                <th className="text-right">গড়</th>
              </tr>
            </thead>
            <tbody>
              {[...markets]
                .sort((a, b) => a.min - b.min)
                .map((m) => (
                  <tr key={m.market} className="hover:bg-base-200/60">
                    <td className="font-medium">{m.market}</td>
                    <td>{m.division}</td>
                    <td className="text-right">{bnPrice(m.min)} টাকা</td>
                    <td className="text-right">{bnPrice(m.max)} টাকা</td>
                    <td className="text-right font-semibold">{bnPrice((m.min + m.max) / 2)} টাকা</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
