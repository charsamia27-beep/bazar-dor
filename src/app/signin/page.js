"use client";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import SocialButtons from "@/components/SocialButtons";
import { signIn } from "@/lib/auth-client";

function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const redirectTo = params.get("redirect") || "/";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (params.get("reason") === "protected")
      toast.error("এই পেজ দেখতে আগে সাইন ইন করুন", { id: "protected" });
  }, [params]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const form = new FormData(e.currentTarget);
    const email = form.get("email").trim();
    const password = form.get("password");
    if (!email || !password) {
      setError("ইমেইল ও পাসওয়ার্ড দিন");
      return toast.error("ইমেইল ও পাসওয়ার্ড দিন");
    }
    setLoading(true);
    const { error } = await signIn.email({ email, password });
    setLoading(false);
    if (error) {
      const msg = error.message || "ইমেইল বা পাসওয়ার্ড ভুল";
      setError(msg);
      return toast.error(msg);
    }
    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push(redirectTo);
    router.refresh();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="mb-1 block text-sm font-medium">ইমেইল</span>
          <input name="email" type="email" placeholder="you@example.com" className="input w-full bg-white" required />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">পাসওয়ার্ড</span>
          <input name="password" type="password" placeholder="কমপক্ষে ৮ অক্ষর" className="input w-full bg-white" required />
        </label>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button disabled={loading} className="btn btn-primary w-full">
          {loading && <span className="loading loading-spinner loading-sm" />} সাইন ইন
        </button>
      </form>
      <SocialButtons callbackURL={redirectTo} />
    </>
  );
}

export default function SignInPage() {
  return (
    <div className="mx-auto max-w-md py-6">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold">সাইন ইন</h1>
        <p className="mt-1 text-sm text-gray-500">বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।</p>
      </div>
      <div className="rounded-2xl border border-base-300 bg-white p-6 shadow-sm">
        <Suspense fallback={<div className="skeleton h-64 w-full" />}>
          <SignInForm />
        </Suspense>
        <p className="mt-5 text-center text-sm">
          অ্যাকাউন্ট নেই? <Link href="/signup" className="font-medium text-primary">সাইন আপ করুন</Link>
        </p>
      </div>
      <p className="mt-6 text-center text-sm"><Link href="/" className="text-gray-500 hover:text-primary">← হোম পেজে ফিরে যান</Link></p>
    </div>
  );
}
