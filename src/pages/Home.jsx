import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-200 via-cyan-100 to-purple-200 p-4">
      
      <header className="text-center mb-8 relative z-10">
        <h1 className="text-5xl md:text-7xl font-extrabold text-indigo-900 tracking-tight drop-shadow-md">
          Fun Tracing World!
        </h1>
        <p className="text-xl text-indigo-700 font-semibold mt-3">
          Let's learn and trace!
        </p>
      </header>

      <div className="bg-white/60 backdrop-blur-lg p-8 rounded-[40px] shadow-xl max-w-sm w-full flex flex-col items-center border border-white/60">
        
        <div className="mb-6">
          <span className="text-7xl drop-shadow-lg inline-block hover:scale-110 transition-transform">
            ✏️
          </span>
        </div>
        
        <h2 className="text-2xl font-bold text-indigo-900 mb-6">
          Ready to Start?
        </h2>
        
        <button
          onClick={() => navigate("/categories")}
          className="w-full py-4 bg-gradient-to-r from-indigo-700 to-indigo-900 text-white font-bold text-lg rounded-2xl shadow-lg 
                     hover:shadow-indigo-300/50 transition-all duration-300 transform hover:scale-[1.02] active:scale-95 
                     border-b-4 border-black/20"
        >
          START TRACING
        </button>
        
        <p className="text-xs text-indigo-900/60 mt-6 font-medium tracking-wider uppercase">
          Letters Numbers  Shapes 
        </p>
      </div>
    </div>
  );
}