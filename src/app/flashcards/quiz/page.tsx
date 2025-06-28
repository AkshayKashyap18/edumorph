"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../lib/firebase";

const sampleFlashcards = [
  { question: "What is AI?", answer: "Artificial Intelligence" },
  { question: "What is the capital of France?", answer: "Paris" },
  {
    question: "What does HTML stand for?",
    answer: "HyperText Markup Language",
  },
];

export default function QuizPage() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // ✅ Redirect to login if not authenticated
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) router.replace("/login");
    });
    return () => unsub();
  }, [router]);

  const handleSubmit = () => {
    const correctAnswer = sampleFlashcards[current].answer.toLowerCase().trim();
    const isCorrect = userAnswer.toLowerCase().trim() === correctAnswer;
    if (isCorrect) setScore((prev) => prev + 1);

    if (current < sampleFlashcards.length - 1) {
      setCurrent((prev) => prev + 1);
      setUserAnswer("");
    } else {
      setShowResult(true);
    }
  };

  return (
    <main className="min-h-screen bg-[#EBFFD8] p-6 flex justify-center items-center">
      <div className="max-w-xl w-full bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-[#8DBCC7] mb-4 text-center">
          Quiz Mode
        </h1>

        {showResult ? (
          <div className="text-center">
            <h2 className="text-xl font-semibold text-[#8DBCC7] mb-2">
              Quiz Complete!
            </h2>
            <p className="text-lg text-gray-700">
              Your score: {score} / {sampleFlashcards.length}
            </p>
            <button
              onClick={() => {
                setCurrent(0);
                setScore(0);
                setUserAnswer("");
                setShowResult(false);
              }}
              className="mt-4 bg-[#8DBCC7] text-white px-4 py-2 rounded hover:bg-[#6faab6]"
            >
              Restart Quiz
            </button>
          </div>
        ) : (
          <>
            <p className="mb-2 text-gray-700 font-medium">
              Question {current + 1} of {sampleFlashcards.length}
            </p>
            <div className="mb-4">
              <p className="font-semibold text-lg mb-2 text-[#8DBCC7]">
                {sampleFlashcards[current].question}
              </p>
              <input
                type="text"
                className="w-full border border-[#8DBCC7] rounded p-2 focus:outline-none"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Your answer..."
              />
            </div>
            <button
              onClick={handleSubmit}
              className="bg-[#8DBCC7] text-white px-4 py-2 rounded hover:bg-[#6faab6]"
            >
              Submit
            </button>
          </>
        )}
      </div>
    </main>
  );
}
