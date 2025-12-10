import React from 'react';

// Card for individual alphabet letters
export default function AlphabetCard({ letter, onClick, isCompleted }) {
  // Determine color based on the letter for visual variety (Deep/Vibrant Tones)
  const colors = [
    'bg-indigo-500', 
    'bg-teal-500', 
    'bg-pink-500', 
    'bg-amber-500', 
    'bg-purple-500'
  ];
  const colorClass = colors[letter.charCodeAt(0) % colors.length];
  
  // Style for completion status (Cyan accent)
  const completionClass = isCompleted 
    ? 'border-4 border-cyan-400 shadow-inner' 
    : 'border-2 border-gray-200';

  return (
    <div
      onClick={onClick}
      className={`relative w-22 h-32 md:w-40 md:h-40 flex flex-col items-center justify-center 
                  ${colorClass} text-white rounded-2xl shadow-xl m-2 
                  transform transition-all duration-300 ease-in-out 
                  hover:scale-105 hover:shadow-2xl active:scale-95 cursor-pointer ${completionClass}`}
    >
      
      <span className="text-5xl md:text-8xl font-black drop-shadow-md">
        {letter}
      </span>
      
      {isCompleted && (
        <span className="absolute top-2 right-2 text-3xl" role="img" aria-label="Completed">
          ⭐
        </span>
      )}
    </div>
  );
}