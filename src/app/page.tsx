"use client";
import { useState } from "react";
import { database } from "@/firebase";
import { ref, set } from "firebase/database";

export default function Home() {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await set(ref(database, "data/text"), text);
      alert("Text sent successfully!");
      setText("");
    } catch (error) {
      console.error("Error sending text:", error);
      alert("Failed to send text. Please try again.");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Text Share</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <textarea
          className="w-full p-2 border border-gray-300 rounded mb-4"
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to share..."
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Send Text
        </button>
      </form>
    </main>
  );
}
