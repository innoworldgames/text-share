"use client";
import { useState, useEffect, FormEvent } from "react";
import { database } from "@/firebase";
import { ref, set, onValue } from "firebase/database";

export default function Home() {
  const [text, setText] = useState("");
  const [lastMessage, setLastMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const messageRef = ref(database, "data/text");
    onValue(messageRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setLastMessage(data);
      }
      setIsLoading(false);
    });
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await set(ref(database, "data/text"), text);
      setText("");
    } catch (error) {
      console.error("Error sending text:", error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Text Share
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-black"
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to share..."
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Send Text
          </button>
        </form>
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Last Shared Message:
          </h2>
          {isLoading ? (
            <div className="bg-gray-50 p-3 rounded-md animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ) : lastMessage ? (
            <p className="bg-gray-50 p-3 rounded-md text-gray-600">
              {lastMessage}
            </p>
          ) : (
            <p className="bg-gray-50 p-3 rounded-md text-gray-400">
              No message shared yet.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
