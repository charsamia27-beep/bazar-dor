import { notFound } from "next/navigation";
import SortableProducts from "@/components/SortableProducts";
import EmptyState from "@/components/EmptyState";
import { getCategories, getProductsByCategory } from "@/lib/api";
import { toBn } from "@/lib/utils";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cat = (await getCategories()).find((c) => c.slug === slug);
  return { title: cat ? `${cat.nameBn} — বাজার দর` : "পাওয়া যায়নি — বাজার দর" };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  const products = await getProductsByCategory(slug);

  return (
    <div>
      <div className="mb-6 flex items-center gap-4 rounded-2xl border border-base-300 bg-white p-6 shadow-sm">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-base-200 text-3xl">{category.icon}</span>
        <div>
          <h1 className="text-3xl font-bold">{category.nameBn}</h1>
          <p className="text-sm text-gray-500">{toBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
        </div>
      </div>

      {products.length ? (
        <SortableProducts products={products} />
      ) : (
        <EmptyState code="😕" title="কোনো পণ্য পাওয়া যায়নি" text="এই ক্যাটাগরিতে এখন কোনো পণ্য নেই।" />
      )}
    </div>
  );
}
