"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import SocialButtons from "@/components/SocialButtons";
import { signUp } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fail = (msg) => {
    setError(msg);
    toast.error(msg);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const form = new FormData(e.currentTarget);
    const name = form.get("name").trim();
    const email = form.get("email").trim();
    const password = form.get("password");
    const confirm = form.get("confirm");

    if (!name) return fail("নাম দিন");
    if (password.length < 8) return fail("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
    if (password !== confirm) return fail("দুটি পাসওয়ার্ড মিলছে না");

    setLoading(true);
    const { error } = await signUp.email({ name, email, password });
    setLoading(false);
    if (error) return fail(error.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে");

    toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এখন সাইন ইন করুন");
    router.push("/signin");
  };

  return (
    <div className="mx-auto max-w-md py-6">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold">অ্যাকাউন্ট তৈরি করুন</h1>
        <p className="mt-1 text-sm text-gray-500">বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>
      </div>
      <div className="rounded-2xl border border-base-300 bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="mb-1 block text-sm font-medium">নাম</span>
            <input name="name" placeholder="যেমন: রহিম উদ্দিন" className="input w-full bg-white" required />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">ইমেইল</span>
            <input name="email" type="email" placeholder="you@example.com" className="input w-full bg-white" required />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">পাসওয়ার্ড</span>
            <input name="password" type="password" placeholder="কমপক্ষে ৮ অক্ষর" className="input w-full bg-white" required />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">পাসওয়ার্ড নিশ্চিত করুন</span>
            <input name="confirm" type="password" placeholder="আবার লিখুন" className="input w-full bg-white" required />
          </label>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button disabled={loading} className="btn btn-primary w-full">
            {loading && <span className="loading loading-spinner loading-sm" />} অ্যাকাউন্ট তৈরি করুন
          </button>
        </form>
        <SocialButtons callbackURL="/" />
        <p className="mt-5 text-center text-sm">
          অ্যাকাউন্ট আছে? <Link href="/signin" className="font-medium text-primary">সাইন ইন করুন</Link>
        </p>
      </div>
      <p className="mt-6 text-center text-sm"><Link href="/" className="text-gray-500 hover:text-primary">← হোম পেজে ফিরে যান</Link></p>
    </div>
  );
}
