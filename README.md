This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# EduMorph – Personalized AI-Powered Learning Platform 🎓🤖

EduMorph is an AI-driven education platform that adapts to individual learning needs. It integrates flashcard generation, quizzes, and a chatbot tutor powered by LLMs – all in a beautifully styled Next.js application.

---

## 🚀 Features

- ✍️ **Flashcard Generator** – Turn text or notes into interactive flashcards
- 🧠 **Quiz Mode** – Practice memory recall with generated flashcards
- 🤖 **AI Chatbot Tutor** – Ask questions and get real-time answers
- ⚙️ **Settings Page** – Customize theme, font size, and AI behavior
- 🔐 **Authentication** – Email/password login with Firebase
- 🎨 **Responsive Design** – Clean UI with TailwindCSS and custom theme
- ☁️ **Live Deployment** – Hosted on Vercel

---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/edumorph.git
cd edumorph

```

2. Install dependencies
   npm install

3. Add environment variables
   Create a .env.local file in the root with your Firebase and Groq API keys:

   NEXT_PUBLIC_FIREBASE_API_KEY=your_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

GROQ_API_KEY=your_groq_api_key

4. Run the development server
   npm run dev
   Visit http://localhost:3000

5. 📁 Project Structure
   src/
   ├── app/
   │ ├── login, signup, dashboard/
   │ ├── flashcards, chat, setting/
   │ └── api/groq/route.ts
   ├── components/
   │ └── Navbar.tsx
   ├── lib/
   │ └── firebase.ts
   ├── styles/
   │ └── globals.css

6. 🧠 Tech Stack

Next.js 14 (App Router)
Tailwind CSS
Firebase Auth
Groq LLM API
Framer Motion (optional UI animation)
PDF.js (optional summarizer)

7. 📦 Deployment
   Hosted on Vercel

8. Contributors
   Made By Akshay Kashyap M
