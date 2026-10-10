"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signOut, useSession } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  };

  if (isPending)
    return <div className="mx-auto max-w-2xl space-y-4"><div className="skeleton h-28 w-full" /><div className="skeleton h-40 w-full" /></div>;
  if (!user) return null;

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
      <p className="mb-5 text-sm text-gray-500">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>

      <div className="flex flex-col gap-4 rounded-2xl border border-base-300 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.image} alt={user.name} className="h-16 w-16 rounded-full object-cover" />
          ) : (
            <span className="grid h-16 w-16 place-items-center rounded-full bg-primary text-2xl font-bold text-white">
              {user.name?.charAt(0).toUpperCase()}
            </span>
          )}
          <div className="min-w-0">
            <p className="truncate text-lg font-semibold">{user.name}</p>
            <p className="truncate text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
        <button onClick={handleSignOut} className="btn btn-outline btn-error btn-sm">↩ সাইন আউট</button>
      </div>

      <div className="mt-5 rounded-2xl border border-base-300 bg-white p-6 shadow-sm">
        <h2 className="mb-3 font-bold">তথ্য</h2>
        <div className="space-y-2 text-sm">
          <p><span className="text-gray-500">নাম:</span> {user.name}</p>
          <p><span className="text-gray-500">ইমেইল:</span> {user.email}</p>
        </div>
        <Link href="/profile/update" className="btn btn-primary mt-5 w-full">আপডেট</Link>
      </div>
    </div>
  );
}
