import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function MatchingEngine({ leftItems, rightItems }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  const [lines, setLines] = useState([]);
  const [active, setActive] = useState(null);
  const [result, setResult] = useState(null);

  // ---------- CANVAS ----------
  useEffect(() => {
    const resize = () => {
      if (!canvasRef.current || !containerRef.current) return;
      canvasRef.current.width = containerRef.current.offsetWidth;
      canvasRef.current.height = containerRef.current.offsetHeight;
      draw();
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [lines, active]);

  const draw = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    ctx.lineWidth = 6;
    ctx.lineCap = "round";

    lines.forEach((l) => {
      ctx.strokeStyle = "#4f46e5";
      ctx.beginPath();
      ctx.moveTo(l.x1, l.y1);
      ctx.lineTo(l.x2, l.y2);
      ctx.stroke();
    });

    if (active) {
      ctx.setLineDash([8, 8]);
      ctx.strokeStyle = "#6366f1";
      ctx.beginPath();
      ctx.moveTo(active.x1, active.y1);
      ctx.lineTo(active.x2, active.y2);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  };

  const center = (el) => {
    const r = el.getBoundingClientRect();
    const c = containerRef.current.getBoundingClientRect();
    return {
      x: r.left + r.width / 2 - c.left,
      y: r.top + r.height / 2 - c.top,
    };
  };

  // ---------- DRAW ----------
  const start = (item, side, e) => {
    const dot = e.currentTarget.querySelector(".dot");
    const { x, y } = center(dot);
    setActive({ from: item.id, side, x1: x, y1: y, x2: x, y2: y });
  };

  const move = (e) => {
    if (!active) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    setActive((p) => ({ ...p, x2: x, y2: y }));
    draw();
  };

  const end = (item, side, e) => {
    if (!active || active.side === side) {
      setActive(null);
      return;
    }

    const dot = e.currentTarget.querySelector(".dot");
    const { x, y } = center(dot);

    setLines((prev) => [
      ...prev,
      { from: active.from, to: item.id, x1: active.x1, y1: active.y1, x2: x, y2: y },
    ]);

    setActive(null);
  };

  // ---------- CHECK RESULT ----------
  const checkResult = () => {
    let usedLeft = new Set();
    let usedRight = new Set();
    let correct = 0;

    lines.forEach((l) => {
      if (l.from === l.to && !usedLeft.has(l.from) && !usedRight.has(l.to)) {
        correct++;
        usedLeft.add(l.from);
        usedRight.add(l.to);
      }
    });

    setResult({ correct, total: leftItems.length });

    if (correct === leftItems.length) {
      new Audio("/sounds/success.mp3").play();
      confetti({ particleCount: 120, spread: 70 });
    } else {
      new Audio("/sounds/tryagain.mp3").play();
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div
        ref={containerRef}
        onMouseMove={move}
        onTouchMove={move}
        className="relative w-full max-w-5xl bg-white rounded-[40px] p-10 shadow-2xl"
      >
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

        <div className="grid grid-cols-2 gap-24 relative z-10">
          {/* LEFT */}
          <div className="flex flex-col gap-6">
            {leftItems.map((i) => (
              <div
                key={i.id}
                onMouseDown={(e) => start(i, "left", e)}
                onTouchStart={(e) => start(i, "left", e)}
                className="relative bg-indigo-100 rounded-xl p-4 text-center font-black text-xl cursor-pointer"
              >
                {i.content}
                <span className="dot absolute right-[-10px] top-1/2 -translate-y-1/2 w-4 h-4 bg-indigo-500 rounded-full" />
              </div>
            ))}
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-6">
            {rightItems.map((i) => (
              <div
                key={i.id}
                onMouseUp={(e) => end(i, "right", e)}
                onTouchEnd={(e) => end(i, "right", e)}
                className="relative bg-pink-100 rounded-xl p-4 text-center font-black text-xl cursor-pointer"
              >
                <span className="dot absolute left-[-10px] top-1/2 -translate-y-1/2 w-4 h-4 bg-pink-500 rounded-full" />
                {i.match}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BUTTON */}
      <button
        onClick={checkResult}
        className="mt-6 px-10 py-4 bg-green-500 text-white text-xl font-extrabold rounded-2xl shadow-lg hover:scale-105 transition"
      >
        Check Result
      </button>

      {/* RESULT */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mt-6 text-3xl font-black text-indigo-700"
          >
            Correct: {result.correct} / {result.total}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
