import React from 'react';
import { useNavigate } from 'react-router-dom';
import AlphabetCard from '../components/AlphabetsCard'; 

// Helper function to generate A-Z array
const generateAlphabet = () => {
  return Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
};

export default function LettersPage() {
  const navigate = useNavigate();
  const alphabet = generateAlphabet();
  
  // Dummy completion logic
  const isLetterCompleted = (letter) => {
    return ['A', 'E', 'I'].includes(letter);
  };

  const handleLetterClick = (letter) => {
    navigate(`/trace/${letter.toLowerCase()}`);
  };

  return (
    // Main Container: Lighter Blue Violet Background for better card visibility
    <div className="min-h-screen bg-indigo-100 p-6">
      <header className="text-center py-6 mb-8">
        <h1 className="text-5xl md:text-6xl font-extrabold text-indigo-800 tracking-tighter drop-shadow-md">
          Trace the Alphabets!
        </h1>
        <p className="text-xl text-indigo-600 mt-2">
          Click on a letter to start tracing.
        </p>
      </header>

      {/* Grid Layout for Alphabet Cards */}
      <div className="flex flex-wrap justify-center gap-4 max-w-6xl mx-auto">
        {alphabet.map((letter) => (
          <AlphabetCard
            key={letter}
            letter={letter}
            onClick={() => handleLetterClick(letter)}
            isCompleted={isLetterCompleted(letter)}
          />
        ))}
      </div>

      {/* Back Button */}
      <div className="text-center mt-10">
         <button
            onClick={() => navigate("/categories")} // Back to Categories Page
            className="px-6 py-3 bg-violet-600 text-white rounded-lg shadow-xl hover:bg-violet-700 transition font-medium"
          >
            ← Back to Categories
          </button>
      </div>
    </div>
  );
}