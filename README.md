This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# EduMorph 🎓🤖

**Personalized AI-Powered Learning Platform**

EduMorph is a dynamic AI-driven educational platform that adapts to each learner’s unique style. Featuring intelligent flashcard generation, interactive quizzes, and an AI-powered chatbot tutor — all beautifully crafted in a modern Next.js application.

---

## 🚀 Features

- ✍️ **Flashcard Generator** – Instantly convert text or notes into interactive flashcards
- 🧠 **Quiz Mode** – Test your knowledge with quizzes built from generated flashcards
- 🤖 **AI Chatbot Tutor** – Ask academic questions and receive real-time AI responses
- ⚙️ **Customizable Settings** – Adjust theme, font size, and chatbot behavior
- 🔐 **Authentication** – Secure email/password login with Firebase
- 🎨 **Responsive Design** – Elegant UI using Tailwind CSS and a custom theme
- ☁️ **Live Deployment** – Fully deployed and hosted on Vercel

---

## 🛠️ Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/YOUR_USERNAME/edumorph.git
   cd edumorph

   ```

2. **Install dependencies**
   ```
   npm install
   ```
3. **Set up environment variables**

   ```
   Create a .env.local file in the root directory and add the following:
   env
   Copy
   Edit
   NEXT_PUBLIC_FIREBASE_API_KEY=your_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   GROQ_API_KEY=your_groq_api_key
   ```

4. **Run the development server**

   ```
   npm run dev
   ```

5. **Open in your browser**

   ```
   Visit: http://localhost:3000
   ```

6. **📁 Project Structure**

   ```
   src/
   ├── app/
   │   ├── login/
   │   ├── signup/
   │   ├── dashboard/
   │   ├── flashcards/
   │   ├── chat/
   │   └── setting/
   │   └── api/groq/route.ts
   ├── components/
   │   └── Navbar.tsx
   ├── lib/
   │   └── firebase.ts
   ├── styles/
   │   └── globals.css

   ```

7. **🧠 Tech Stack**

   ```
   Next.js 14 (App Router)
   Tailwind CSS
   Firebase Auth
   Groq LLM API
   Framer Motion (optional – UI animations)
   PDF.js (optional – document summarization)

   ```

8. **📦 Deployment**

   ```
   The app is live and hosted on Vercel.

   ```

9. **Made by Akshay Kashyap M**
