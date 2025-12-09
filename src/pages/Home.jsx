import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    // Main Container: Blue Violet Gradient Background
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-700 to-violet-800 p-4">
      
      {/* App Title/Header: White text on dark background */}
      <header className="mb-12 text-center">
        <h1 className="text-7xl font-extrabold text-white mb-2 tracking-wide drop-shadow-lg">
          Fun Tracing World!
        </h1>
        <p className="text-2xl font-medium text-cyan-300">
          Let's learn and trace!
        </p>
      </header>

      {/* Main Content Card: Warm White (bg-white) */}
      <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-lg w-full text-center transform transition duration-500 hover:shadow-3xl">
        
        {/* Placeholder for an Image/Icon */}
        <div className="mb-6">
          <span className="text-8xl text-indigo-500" role="img" aria-label="Pencil and Ruler">
            ✍️
          </span>
        </div>
        
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          Ready to Start?
        </h2>
        
        {/* Start Button: Soft Cyan Accent */}
        <button
          onClick={() => navigate("/categories")}
          className="w-full px-8 py-4 text-2xl font-bold bg-cyan-400 text-indigo-900 rounded-xl shadow-lg 
                     hover:bg-cyan-300 transition duration-300 ease-in-out 
                     transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-cyan-200"
        >
          🚀 Start Tracing!
        </button>
      </div>
      
      {/* Footer */}
      <footer className="mt-8 text-white text-lg opacity-80">
        Trace Letters, Numbers, and More!
      </footer>
      
    </div>
  );
}