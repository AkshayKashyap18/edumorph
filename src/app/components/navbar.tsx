"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { auth } from "../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth); // End Firebase session
      localStorage.clear(); // Optional: clear user settings
      router.push("/login"); // Redirect
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const NavLink = ({ href, label }: { href: string; label: string }) => (
    <Link
      href={href}
      className={`text-sm font-medium ${
        pathname === href
          ? "text-[#8DBCC7] underline"
          : "text-gray-700 hover:text-[#8DBCC7]"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <Link href="/">
        <span className="text-2xl font-bold text-black">EduMorph</span>
      </Link>

      <div className="flex gap-4 items-center">
        {!user ? (
          <>
            <NavLink href="/signup" label="Sign Up" />
            <NavLink href="/login" label="Log In" />
          </>
        ) : (
          <>
            <NavLink href="/dashboard" label="Dashboard" />
            <span className="text-sm text-[#8DBCC7] hidden md:inline">
              {user.email}
            </span>
            <button
              onClick={handleLogout}
              className="text-sm text-red-500 hover:underline"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
