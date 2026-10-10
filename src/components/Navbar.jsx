"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signOut, useSession } from "@/lib/auth-client";

function Avatar({ user, size = 32 }) {
  if (user?.image)
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={user.image} alt={user.name} width={size} height={size} className="rounded-full object-cover" style={{ width: size, height: size }} />;
  return (
    <span
      className="grid place-items-center rounded-full bg-primary font-bold text-white"
      style={{ width: size, height: size }}
    >
      {(user?.name || "U").charAt(0).toUpperCase()}
    </span>
  );
}

export default function Navbar({ categories, today }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  };

  return (
    <header className="bg-white">
      <div className="mx-auto max-w-6xl px-4 pt-4">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary">
              <Image src="/logo-icon.png" alt="বাজার দর" width={26} height={26} />
            </span>
            <span>
              <span className="block text-xl font-bold leading-tight">বাজার দর</span>
              <span className="block text-xs text-gray-500">{today}</span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            {isPending ? (
              <div className="skeleton h-9 w-28" />
            ) : user ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-sm gap-2 px-2">
                  <Avatar user={user} />
                  <span className="hidden max-w-28 truncate sm:inline">{user.name?.split(" ")[0]}</span>
                  <span className="text-xs">▾</span>
                </div>
                <ul tabIndex={0} className="dropdown-content menu z-50 mt-2 w-60 rounded-box border border-base-300 bg-white p-2 shadow-lg">
                  <li className="pointer-events-none px-3 py-2">
                    <p className="block p-0 font-semibold">{user.name}</p>
                    <p className="block truncate p-0 text-xs text-gray-500">{user.email}</p>
                  </li>
                  <li><Link href="/profile">👤 আমার প্রোফাইল</Link></li>
                  <li><button onClick={handleSignOut} className="text-red-600">↩ সাইন আউট</button></li>
                </ul>
              </div>
            ) : (
              <>
                <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md">সাইন ইন</Link>
                <Link href="/signup" className="btn btn-primary btn-sm sm:btn-md">সাইন আপ</Link>
              </>
            )}
          </div>
        </div>

        <nav className="no-scrollbar -mx-4 mt-4 flex gap-1 overflow-x-auto px-4 pb-3">
          {categories.map((c) => {
            const active = pathname === `/category/${c.slug}`;
            return (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm transition ${
                  active ? "bg-primary font-semibold text-white" : "text-gray-700 hover:bg-base-200"
                }`}
              >
                <span>{c.icon}</span> {c.nameBn}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
