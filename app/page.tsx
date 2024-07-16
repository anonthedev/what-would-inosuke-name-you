"use client";

import { useState, useEffect } from "react";

export default function AiPrompt() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/inosuke", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch response");
      }

      const data = await res.json();
      setResponse(data.response);
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred while fetching the response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative mx-auto p-4 w-screen h-screen flex flex-col items-center justify-center bg-[url(https://imgix.ranker.com/list_img_v2/13045/2853045/original/2853045?fit=crop&fm=pjpg&q=80&dpr=2&w=1200&h=720)] bg-no-repeat bg-center bg-cover">
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black opacity-70"></div>
      
      {/* Content */}
      <div className="relative z-10 text-white w-full flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          What would Inosuke Hashibira name you?
        </h1>
        <form
          onSubmit={handleSubmit}
          className="mb-4 w-full flex flex-col items-center justify-center"
        >
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your name"
            className="w-1/3 md:w-full p-2 border rounded bg-transparent text-white"
          />
          <button
            type="submit"
            disabled={loading}
            className="mt-2 px-4 py-2 bg-white text-black rounded hover:bg-gray-200 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Send request to Bush Imosuke"}
          </button>
        </form>
        {error && <p className="text-red-500">{error}</p>}
        {response && (
          <div className="text-center mt-2">
            <h3 className="text-gray-400">King of the mountains has named you:</h3>
            <p className="p-1 rounded text-lg font-medium">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}
