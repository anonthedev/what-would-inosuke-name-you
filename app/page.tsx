"use client";
import { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";

const ShareableImage = ({ response }: { response: string }) => (
  <div className="relative w-[800px] h-[400px] bg-[url(/bg.png)] bg-no-repeat bg-center bg-cover flex items-center justify-center">
    <div className="absolute inset-0 bg-black opacity-40"></div>
    <p className="relative text-white text-4xl font-bold z-10">{response}</p>
  </div>
);

export default function AiPrompt() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const shareableImageRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse("");
    setImageUrl(null);
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

  const handleShare = async () => {
    if (shareableImageRef.current) {
      try {
        const canvas = await html2canvas(shareableImageRef.current, {
          backgroundColor: null,
        });
        const url = canvas.toDataURL("image/png");
        setImageUrl(url);
        shareableImageRef.current.scrollIntoView();
      } catch (err) {
        console.error("Error creating image:", err);
        setError("An error occurred while creating the image.");
      }
    }
  };

  const handleDownload = () => {
    if (imageUrl) {
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = "inosuke_name.png";
      link.click();
    }
  };

  useEffect(() => {
    handleShare();
  }, [response]);

  return (
    <section className="relative min-w-screen min-h-screen flex flex-col items-center justify-center bg-[url(/bg.png)] bg-no-repeat bg-center bg-cover md:px-5">
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <div className="w-full h-full flex flex-col items-center justify-center md:px-5">
        <div className="mt-20 relative z-10 text-white w-full flex flex-col items-center justify-center">
          <h1 className="text-2xl font-semibold mb-4 text-center">
            What would Inosuke Hashibira name you?
          </h1>
          <form
            onSubmit={handleSubmit}
            className="mb-4 w-full flex flex-col items-center justify-center"
          >
            <input
              value={prompt}
maxLength={20}
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
              <h3 className="text-gray-400">
                King of the mountains has named you:
              </h3>
              <p className="p-1 rounded text-lg font-medium">{response}</p>
            </div>
          )}
          {response && (
            <div
              ref={shareableImageRef}
              className="mt-4"
              style={{ display: imageUrl ? "none" : "block" }}
            >
              <ShareableImage response={response} />
            </div>
          )}
          {imageUrl && (
            <div className="mt-5 flex flex-col items-center gap-5 z-10">
              <img
                src={imageUrl}
                alt="Shareable response"
                className="mb-2 max-w-full"
                width={500}
                // height={60}
              />
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200"
              >
                Download Image
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
