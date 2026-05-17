"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

export default function Navbar() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/");
    router.refresh();
  };

  return (
    <nav className="bg-white border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-slate-900">
          Service Request Board
        </Link>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm text-slate-600 hidden sm:block">
                Hi, {user.name}
              </span>

              <Link
                href="/jobs/new"
                className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-slate-700"
              >
                Post Service Request
              </Link>

              <button
                onClick={handleLogout}
                className="border border-slate-300 px-4 py-2 rounded-lg text-sm hover:bg-slate-50"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="border border-slate-300 px-4 py-2 rounded-lg text-sm hover:bg-slate-50"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-slate-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}