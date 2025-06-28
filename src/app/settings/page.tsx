"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();

  const [theme, setTheme] = useState("light");
  const [fontSize, setFontSize] = useState("base");
  const [responseStyle, setResponseStyle] = useState("concise");

  // ✅ Protect route (only for logged-in users)
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) router.replace("/login");
    });
    return () => unsub();
  }, [router]);

  // ✅ Apply theme/font/responseStyle changes
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");

    document.documentElement.style.fontSize =
      fontSize === "sm" ? "14px" : fontSize === "lg" ? "18px" : "16px";

    localStorage.setItem("theme", theme);
    localStorage.setItem("fontSize", fontSize);
    localStorage.setItem("responseStyle", responseStyle);
  }, [theme, fontSize, responseStyle]);

  return (
    <main className="min-h-screen bg-[#EBFFD8] dark:bg-[#1a1a1a] text-black dark:text-white p-6">
      <div className="max-w-3xl mx-auto bg-white dark:bg-[#2c2c2c] p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6 text-[#8DBCC7] dark:text-[#A4CCD9] text-center">
          Settings & Customization
        </h1>

        {/* Theme */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Theme</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full p-2 border border-[#8DBCC7] rounded"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        {/* Font Size */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Font Size</label>
          <select
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className="w-full p-2 border border-[#8DBCC7] rounded"
          >
            <option value="sm">Small</option>
            <option value="base">Medium</option>
            <option value="lg">Large</option>
          </select>
        </div>

        {/* AI Behavior */}
        <div>
          <label className="block font-semibold mb-2">AI Response Style</label>
          <select
            value={responseStyle}
            onChange={(e) => setResponseStyle(e.target.value)}
            className="w-full p-2 border border-[#8DBCC7] rounded"
          >
            <option value="concise">Concise</option>
            <option value="detailed">Detailed</option>
          </select>
        </div>
      </div>
    </main>
  );
}
