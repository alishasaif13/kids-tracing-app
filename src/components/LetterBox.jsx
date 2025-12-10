import React from "react";

export default function LetterBox({ letter }) {
  return (
    <div className="w-20 h-20 flex items-center justify-center bg-white border-2 border-cyan-400 rounded-xl shadow-md transition cursor-pointer">
      <span
        className="text-4xl font-bold text-indigo-700"
        style={{
          fontFamily: "Arial",
          // Repeating gradient for the dotted/lined effect (Deep Violet/Indigo tone)
          background: "repeating-linear-gradient(90deg, transparent 0 8px, rgba(79, 70, 229, 0.3) 8px 10px)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        {letter}
      </span>
    </div>
  );
}