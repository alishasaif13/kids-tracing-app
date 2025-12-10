import React, { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function TracePage() {
  const { letter } = useParams();
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [points, setPoints] = useState([]);

  // --- Drawing Logic ---
  useEffect(() => {
    drawDottedLetter();
  }, [letter]);

  const getPosition = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    if (e.touches) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const startDrawing = (e) => {
    setIsDrawing(true);
    const pos = getPosition(e);
    setPoints([{ x: pos.x, y: pos.y }]);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#4F46E5"; 

    const newPos = getPosition(e);
    const newPoints = [...points, newPos];
    setPoints(newPoints);

    ctx.beginPath();
    ctx.moveTo(points[points.length - 1].x, points[points.length - 1].y);
    ctx.lineTo(newPos.x, newPos.y);
    ctx.stroke();
  };

  const drawDottedLetter = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = "250px Arial";
    ctx.lineWidth = 4;
    ctx.setLineDash([12, 20]);
    ctx.strokeStyle = "gray";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.strokeText(letter.toUpperCase(), canvas.width / 2, canvas.height / 2);
    ctx.setLineDash([]);
  };

  const checkDrawing = () => {
    if (points.length < 50) {
      Swal.fire({
        title: "Too Short!",
        text: "Please try to trace the letter properly.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
      drawDottedLetter();
      setPoints([]);
      return;
    }

    Swal.fire({
      title: "Fantastic Job!",
      text: `You successfully traced '${letter.toUpperCase()}'!`,
      icon: "success",
      confirmButtonText: "Continue",
    });
  };

  const handleClear = () => {
    drawDottedLetter();
    setPoints([]);
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'info',
      title: 'Cleared!',
      showConfirmButton: false,
      timer: 1500
    })
  }

  // --- UI START (Themed) ---

  return (
    // Background: Deep Indigo/Violet for better focus contrast
    <div className="min-h-screen  bg-gradient-to-br from-[#d3c8ff] via-[#d8f3ff] to-[#e8e1ff]  p-4 sm:p-8 flex flex-col items-center">
      
      <header className="text-center mb-8">
        <h1 className="text-6xl font-extrabold text-indigo-900 tracking-wider drop-shadow-lg">
          Trace the Letter 
          <span className="text-cyan-400 ml-3">
             {letter.toUpperCase()}!
          </span>
        </h1>
        <p className="text-xl text-violet-700 opacity-80 mt-2">
          Use your finger or mouse to follow the dots.
        </p>
      </header>
      
      {/* Canvas Area: Warm White Canvas with Soft Cyan Border */}
      <div className="relative bg-white shadow-3xl rounded-3xl overflow-hidden border-8 border-cyan-400">
          <canvas
            ref={canvasRef}
            width={350}
            height={300}
            className="touch-none"
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
            onMouseMove={draw}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
      </div>

      {/* Control Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mt-8 w-full max-w-lg">
        
        {/* Clear Button (Emoji Removed) */}
        <button
          onClick={handleClear}
          className="flex-1 px-6 py-3 bg-red-500 text-white font-bold rounded-xl shadow-lg 
                     hover:bg-red-600 transition duration-300 transform hover:scale-105"
        >
          Clear
        </button>

        {/* Check Button: Soft Cyan Accent (Emoji Removed) */}
        <button
          onClick={checkDrawing}
          className="flex-1 px-6 py-3 bg-cyan-400 text-indigo-900 font-bold rounded-xl shadow-lg 
                     hover:bg-cyan-300 transition duration-300 transform hover:scale-105"
        >
          Check My Trace
        </button>
      </div>

      {/* Navigation Button */}
      <div className="mt-6">
        <button
          onClick={() => navigate("/letters")}
          className="px-6 py-3 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600 transition font-medium"
        >
          ← Back to Alphabets
        </button>
      </div>

    </div>
  );
}