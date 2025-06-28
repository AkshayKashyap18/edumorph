"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import "./flashcard.css";

type Flashcard = {
  question: string;
  answer: string;
};

export default function FlashcardGenerator() {
  const router = useRouter();
  const [inputText, setInputText] = useState("");
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(false);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

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
      setFlippedCards(new Set()); // reset flip state on new generation
    } catch (err) {
      console.error("Flashcard generation error:", err);
      setFlashcards([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#EBFFD8] p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow min-h-[80vh]">
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
          <div className="mt-6">
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {flashcards.map((card, i) => {
                const isFlipped = flippedCards.has(i);
                return (
                  <div
                    key={i}
                    className={`flip-card ${isFlipped ? "flipped" : ""}`}
                    onClick={() => {
                      const newFlipped = new Set(flippedCards);
                      newFlipped.has(i)
                        ? newFlipped.delete(i)
                        : newFlipped.add(i);
                      setFlippedCards(newFlipped);
                    }}
                  >
                    <div className="flip-card-inner">
                      <div className="flip-card-front">
                        <h3>Q: {card.question}</h3>
                      </div>
                      <div className="flip-card-back">
                        <p>A: {card.answer}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
