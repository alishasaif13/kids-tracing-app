import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="w-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-purple-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-2 py-4 flex items-center justify-between">
        
        {/* Left: Back */}
        <button
          onClick={() => navigate(-1)}
          className="bg-white/90 p-3 rounded-full shadow hover:scale-105 transition"
        >
          ⬅️
        </button>

        {/* Center: Title */}
        <h1
          onClick={() => navigate("/")}
          className="text-2xl md:text-3xl font-extrabold text-white cursor-pointer tracking-wide"
        >
          Kids Fun Hub
        </h1>

        {/* Right: Home */}
        <button
          onClick={() => navigate("/")}
          className="bg-white/90 p-3 rounded-full shadow hover:scale-105 transition"
        >
          🏠
        </button>

      </div>
    </header>
  );
}
