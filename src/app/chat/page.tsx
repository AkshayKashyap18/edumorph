"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function ChatbotTutor() {
  const router = useRouter();
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm your AI Tutor. Ask me anything." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // ✅ Redirect if not logged in
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) router.replace("/login");
    });
    return () => unsub();
  }, [router]);

  // ✅ Scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/groq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#EBFFD8] to-[#C4E1E6] p-4">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-xl p-6 flex flex-col h-[90vh]">
        <h1 className="text-3xl font-bold text-center text-[#8DBCC7] mb-4">
          AI Chatbot Tutor
        </h1>

        <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div className="flex items-end gap-2 max-w-[80%]">
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 bg-[#8DBCC7] text-white rounded-full flex items-center justify-center text-sm font-bold">
                    🤖
                  </div>
                )}
                <div
                  className={`p-3 rounded-lg shadow text-sm whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-[#8DBCC7] text-white rounded-br-none"
                      : "bg-gray-100 text-black rounded-bl-none"
                  }`}
                >
                  {msg.content}
                </div>
                {msg.role === "user" && (
                  <div className="w-8 h-8 bg-[#6faab6] text-white rounded-full flex items-center justify-center text-sm font-bold">
                    🧑‍🎓
                  </div>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start items-center gap-2 text-sm text-gray-500 pl-10">
              <span className="animate-pulse">🤖 Typing...</span>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="flex gap-2 mt-auto">
          <input
            className="flex-1 border border-[#8DBCC7] rounded-lg px-4 py-2 focus:outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-[#8DBCC7] text-white px-4 py-2 rounded-lg hover:bg-[#6faab6] transition"
            disabled={loading}
          >
            {loading ? "..." : "Send"}
          </button>
        </div>
      </div>
    </main>
  );
}
