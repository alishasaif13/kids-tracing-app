import React from 'react';

export default function CategoryCard({ title, description, icon, onClick }) {
  return (
    <div
      onClick={onClick}
      // Card Styling: Warm White background, Blue Violet border
      className="cursor-pointer bg-white border-b-8 border-cyan-400 rounded-3xl p-6 shadow-2xl 
                 max-w-xs w-full text-center 
                 transform transition-all duration-300 ease-in-out 
                 hover:scale-105 hover:shadow-3xl hover:border-cyan-300 active:scale-100"
    >
      
      <div className="mb-4 text-7xl text-indigo-600">
        {icon}
      </div>

      <h2 className="text-3xl font-extrabold text-indigo-800 mb-2">
        {title}
      </h2>

      <p className="text-gray-500 font-medium">
        {description}
      </p>
    </div>
  );
}