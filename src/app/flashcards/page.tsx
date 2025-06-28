"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import "./flashcard.css";

export default function FlashcardGenerator() {
  const router = useRouter();

  const [inputText, setInputText] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Redirect to login if user is not authenticated
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) router.replace("/login");
    });
    return () => unsub();
  }, [router]);

  const generateFlashcards = async () => {
    if (!inputText.trim()) return;
    setLoading(true);

    try {
      const res = await fetch("/api/groq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content:
                "You are an AI assistant that creates educational flashcards. For the given input text, generate a JSON array of flashcards in the format: [{question: '', answer: ''}]. Return only valid JSON.",
            },
            {
              role: "user",
              content: inputText,
            },
          ],
        }),
      });

      const data = await res.json();
      const parsed = JSON.parse(data.reply);
      setFlashcards(parsed);
    } catch (err) {
      console.error("Flashcard generation error:", err);
      setFlashcards([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#EBFFD8] p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-3xl font-bold text-[#8DBCC7] mb-4 text-center">
          Flashcard Generator
        </h1>

        <textarea
          rows={6}
          placeholder="Paste your text or chatbot answer here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="w-full p-4 border border-[#8DBCC7] rounded mb-4 focus:outline-none"
        />

        <button
          onClick={generateFlashcards}
          disabled={loading}
          className="bg-[#8DBCC7] text-white px-6 py-2 rounded hover:bg-[#6faab6] font-semibold mb-6"
        >
          {loading ? "Generating..." : "Generate Flashcards"}
        </button>

        {flashcards.length > 0 && (
          <div className="grid md:grid-cols-2 gap-4">
            {flashcards.map((card: any, i: number) => (
              <div key={i} className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front bg-[#C4E1E6] p-4 rounded shadow">
                    <h3 className="font-bold">Q: {card.question}</h3>
                  </div>
                  <div className="flip-card-back bg-[#A4CCD9] p-4 rounded shadow">
                    <p className="text-sm">A: {card.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
