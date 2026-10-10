import Link from "next/link";

export default function EmptyState({ code = "৪০৪", title = "পেজটি পাওয়া যায়নি", text = "আপনি যে পেজটি খুঁজছেন সেটি নেই বা সরিয়ে ফেলা হয়েছে।" }) {
  return (
    <div className="mx-auto my-16 max-w-md rounded-2xl border border-base-300 bg-white p-10 text-center shadow-sm">
      <p className="text-6xl font-bold text-primary">{code}</p>
      <h2 className="mt-3 text-2xl font-bold">{title}</h2>
      <p className="mt-2 text-gray-500">{text}</p>
      <Link href="/" className="btn btn-primary btn-sm sm:btn-md mt-6">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
