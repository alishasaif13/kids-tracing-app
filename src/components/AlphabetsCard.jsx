import React from 'react';

// Card for individual alphabet letters
export default function AlphabetCard({ letter, onClick, isCompleted }) {
  // Determine color based on the letter (for visual variety)
  const colors = ['bg-red-400', 'bg-yellow-400', 'bg-green-400', 'bg-blue-400', 'bg-pink-400'];
  const colorClass = colors[letter.charCodeAt(0) % colors.length];
  
  // Style for completion status
  const completionClass = isCompleted 
    ? 'border-4 border-green-700 shadow-inner' 
    : 'border-2 border-gray-200';

  return (
    <div
      onClick={onClick}
      // Card Styling: Vibrant background, big size, interactive hover
      className={`relative w-32 h-32 md:w-40 md:h-40 flex flex-col items-center justify-center 
                  ${colorClass} text-white rounded-2xl shadow-xl m-2 
                  transform transition-all duration-300 ease-in-out 
                  hover:scale-105 hover:shadow-2xl active:scale-95 cursor-pointer ${completionClass}`}
    >
      
      {/* The Letter */}
      <span className="text-7xl md:text-8xl font-black drop-shadow-md">
        {letter}
      </span>
      
      {/* Completion Badge (if completed) */}
      {isCompleted && (
        <span className="absolute top-2 right-2 text-3xl" role="img" aria-label="Completed">
          ⭐
        </span>
      )}
    </div>
  );
}