import React from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryCard from '../components/CategoryCard'; 

export default function Categories() {
  const navigate = useNavigate();

  const categories = [
    {
      id: 'letters',
      title: 'Alphabet Tracing',
      description: 'Trace letters A to Z.',
      icon: '🅰️', 
      route: '/letters',
    },
    // Future cards yahaan add honge
  ];

  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    // Main Container: Blue Violet Gradient Background
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 to-violet-800 p-8">
      <header className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-white tracking-tight drop-shadow-md">
          Select a Tracing Mode
        </h1>
        <p className="text-xl text-cyan-300 mt-2">
          Start with Alphabets, Numbers coming soon!
        </p>
      </header>
      
      {/* Cards Grid */}
      <div className="flex flex-wrap justify-center items-center gap-8">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            title={category.title}
            description={category.description}
            icon={category.icon}
            onClick={() => handleCardClick(category.route)}
          />
        ))}
      </div>

      {/* Back Button */}
      <div className="text-center mt-12">
         <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600 transition font-medium"
          >
            ← Back to Home
          </button>
      </div>
    </div>
  );
}