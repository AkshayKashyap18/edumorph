"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#A4CCD9] via-[#C4E1E6] to-[#EBFFD8] text-gray-800 font-sans">
      {/* Hero Section */}
      <section className="text-center py-20 px-6 relative">
        {/* Branding Title */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-6xl font-bold text-black mb-4"
        >
          EduMorph
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-700"
        >
          AI-powered learning tailored to your journey.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex justify-center gap-4"
        >
          <Link
            href="/signup"
            className="bg-[#8DBCC7] text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-[#6faab6] transition"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="border border-[#8DBCC7] text-[#8DBCC7] px-6 py-3 rounded-full font-semibold hover:bg-[#EBFFD8] transition"
          >
            Log In
          </Link>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-16 px-6 text-center bg-white">
        <h2 className="text-3xl font-bold mb-4 text-[#8DBCC7]">
          What is EduMorph?
        </h2>
        <p className="max-w-3xl mx-auto text-lg text-gray-700">
          EduMorph is an AI-powered platform that adapts your learning
          experience to your pace, goals, and style. Whether you're summarizing
          textbooks, practicing quizzes, or chatting with an AI tutor, we’ve got
          you covered.
        </p>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-[#F0F9F8]">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#8DBCC7]">
          Key Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-700">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="text-center py-20 px-6 bg-white">
        <h2 className="text-2xl font-semibold mb-4 text-[#8DBCC7]">
          Ready to personalize your learning path?
        </h2>
        <Link
          href="/signup"
          className="inline-block bg-[#8DBCC7] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#6faab6] transition"
        >
          Create Free Account
        </Link>
      </section>
    </main>
  );
}

const features = [
  {
    title: "📄 PDF Summarizer",
    desc: "Upload study materials and receive AI-generated summaries instantly.",
  },
  {
    title: "🧠 Quiz Generator",
    desc: "Convert content into dynamic quizzes to reinforce learning.",
  },
  {
    title: "🤖 AI Chatbot Tutor",
    desc: "Ask questions and get explanations 24/7 from your AI assistant.",
  },
  {
    title: "🗂 Personalized Dashboard",
    desc: "Track progress, revisit topics, and stay organized.",
  },
  {
    title: "🌐 Multilingual Support",
    desc: "Understand content in your preferred language.",
  },
  {
    title: "🔒 Secure & Synced",
    desc: "Your data is private, secure, and synced across devices.",
  },
];
