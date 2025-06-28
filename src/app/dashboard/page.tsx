"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/login");
      } else {
        setLoading(false);
      }
    });
    return () => unsub();
  }, [router]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    else if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#EBFFD8]">
        <p className="text-lg text-[#8DBCC7] font-medium">
          Loading your dashboard...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#EBFFD8] to-[#C4E1E6] p-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-[#8DBCC7] mb-2">
          {getGreeting()} 👋
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Welcome to <strong>EduMorph</strong>. Your personalized AI learning
          assistant.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            title="✍️ Flashcard Generator"
            description="Generate flashcards from notes or content."
            href="/flashcards"
          />
          <FeatureCard
            title="🤖 AI Chatbot Tutor"
            description="Ask your AI tutor anything."
            href="/chat"
          />
          <FeatureCard
            title="🧪 Quiz Mode"
            description="Test your memory with flashcards."
            href="/flashcards/quiz"
          />
          <FeatureCard
            title="⚙️ Settings"
            description="Customize your experience."
            href="/settings"
          />
        </div>
      </div>
    </main>
  );
}

function FeatureCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition block"
    >
      <h2 className="text-xl font-semibold text-[#8DBCC7] mb-2">{title}</h2>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <span className="text-sm font-semibold text-[#8DBCC7] underline">
        Explore
      </span>
    </a>
  );
}
