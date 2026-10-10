"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { updateUser, useSession } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = new FormData(e.currentTarget).get("name").trim();
    if (!name) return toast.error("নাম খালি রাখা যাবে না");
    setLoading(true);
    const { error } = await updateUser({ name });
    setLoading(false);
    if (error) return toast.error(error.message || "আপডেট ব্যর্থ হয়েছে");
    toast.success("তথ্য আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  };

  if (isPending) return <div className="skeleton mx-auto h-48 max-w-md" />;

  return (
    <div className="mx-auto max-w-md py-6">
      <h1 className="text-center text-2xl font-bold">তথ্য আপডেট করুন</h1>
      <form onSubmit={handleSubmit} className="mt-5 space-y-4 rounded-2xl border border-base-300 bg-white p-6 shadow-sm">
        <label className="block">
          <span className="mb-1 block text-sm font-medium">নাম</span>
          <input name="name" defaultValue={session?.user?.name || ""} className="input w-full bg-white" required />
        </label>
        <button disabled={loading} className="btn btn-primary w-full">
          {loading && <span className="loading loading-spinner loading-sm" />} Update Information
        </button>
        <Link href="/profile" className="btn btn-ghost w-full">বাতিল</Link>
      </form>
    </div>
  );
}
