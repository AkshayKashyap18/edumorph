"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <main
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: "linear-gradient(135deg, #A4CCD9, #EBFFD8)",
      }}
    >
      <div
        className="w-full max-w-md shadow-lg rounded-xl p-8"
        style={{
          backgroundColor: "#C4E1E6",
        }}
      >
        <h1
          className="text-3xl font-bold text-center mb-6"
          style={{ color: "#8DBCC7" }}
        >
          Welcome Back
        </h1>

        {error && (
          <p className="text-red-500 text-center mb-4 font-medium">{error}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-[#8DBCC7] rounded focus:outline-none focus:ring-2"
            style={{
              backgroundColor: "#EBFFD8",
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-[#8DBCC7] rounded focus:outline-none focus:ring-2"
            style={{
              backgroundColor: "#EBFFD8",
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full py-3 rounded font-semibold transition"
            style={{
              backgroundColor: "#8DBCC7",
              color: "white",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#A4CCD9")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#8DBCC7")
            }
          >
            Log In
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-gray-700">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="underline font-semibold"
            style={{ color: "#8DBCC7" }}
          >
            Sign up
          </a>
        </p>
      </div>
    </main>
  );
}
