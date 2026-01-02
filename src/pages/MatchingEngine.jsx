import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function MatchingEngine({ leftItems, rightItems }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  const [lines, setLines] = useState([]);
  const [active, setActive] = useState(null);
  const [result, setResult] = useState(null);

  /* ---------- CANVAS RESIZE & DRAW ---------- */
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

  /* ---------- INTERACTION LOGIC ---------- */
  const start = (item, side, e) => {
    const dot = e.currentTarget.querySelector(".dot");
    const { x, y } = center(dot);
    setActive({ from: item.id, fromSide: side, x1: x, y1: y, x2: x, y2: y });
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
    // Mouse users ke liye standard end logic
    if (!active || active.fromSide === side) {
      setActive(null);
      return;
    }
    completeConnection(item, side);
  };

  const handleTouchEnd = (e) => {
    if (!active) return;
    
    // Mobile fix: Finger jahan ruki wahan ka element dhoondna
    const touch = e.changedTouches[0];
    const targetEl = document.elementFromPoint(touch.clientX, touch.clientY);
    const itemEl = targetEl?.closest(".match-item");

    if (itemEl) {
      const side = itemEl.getAttribute("data-side");
      const id = parseInt(itemEl.getAttribute("data-id"));
      
      if (side !== active.fromSide) {
        completeConnection({ id }, side);
      }
    }
    setActive(null);
  };

  const completeConnection = (item, side) => {
    const targetDot = document.querySelector(`[data-id="${item.id}"][data-side="${side}"] .dot`);
    const { x, y } = center(targetDot);

    setLines((prev) => [
      ...prev,
      {
        from: active.fromSide === "left" ? active.from : item.id,
        to: active.fromSide === "left" ? item.id : active.from,
        x1: active.x1, y1: active.y1, x2: x, y2: y,
      },
    ]);
  };

  const checkResult = () => {
    let correct = 0;
    lines.forEach((l) => { if (l.from === l.to) correct++; });
    setResult({ correct, total: leftItems.length });
    if (correct === leftItems.length) {
      new Audio("/sounds/success.mp3").play().catch(() => {});
      confetti({ particleCount: 120, spread: 70 });
    }
  };

  const clearLines = () => {
    setLines([]);
    setResult(null);
  };

  return (
    <div className="w-full flex flex-col items-center select-none">
      <div
        ref={containerRef}
        onMouseMove={move}
        onTouchMove={move}
        onTouchEnd={handleTouchEnd}
        onMouseUp={() => setActive(null)}
        className="relative w-full max-w-5xl bg-white rounded-[40px] p-6 md:p-10 shadow-2xl overflow-hidden"
      >
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

        <div className="grid grid-cols-2 gap-12 md:gap-24 relative z-10">
          {/* LEFT */}
          <div className="flex flex-col gap-6">
            {leftItems.map((i) => (
              <div
                key={i.id}
                data-id={i.id}
                data-side="left"
                onMouseDown={(e) => start(i, "left", e)}
                onMouseUp={(e) => end(i, "left", e)}
                onTouchStart={(e) => start(i, "left", e)}
                className="match-item relative bg-indigo-100 rounded-xl p-4 text-center font-black text-xl cursor-pointer hover:bg-indigo-200 transition-colors"
              >
                {i.content}
                <span className="dot absolute right-[-10px] top-1/2 -translate-y-1/2 w-4 h-4 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(79,70,229,0.5)]" />
              </div>
            ))}
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-6">
            {rightItems.map((i) => (
              <div
                key={i.id}
                data-id={i.id}
                data-side="right"
                onMouseDown={(e) => start(i, "right", e)}
                onMouseUp={(e) => end(i, "right", e)}
                onTouchStart={(e) => start(i, "right", e)}
                className="match-item relative bg-pink-100 rounded-xl p-4 text-center font-black text-xl cursor-pointer hover:bg-pink-200 transition-colors"
              >
                <span className="dot absolute left-[-10px] top-1/2 -translate-y-1/2 w-4 h-4 bg-pink-500 rounded-full shadow-[0_0_10px_rgba(236,72,153,0.5)]" />
                {i.match}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BUTTONS CONTAINER */}
      <div className="flex gap-4 mt-8">
        <button
          onClick={clearLines}
          className="px-8 py-3 bg-gray-200 text-gray-700 text-lg font-bold rounded-2xl shadow-md hover:bg-gray-300 transition active:scale-95"
        >
          Clear
        </button>
        <button
          onClick={checkResult}
          className="px-10 py-3 bg-green-500 text-white text-lg font-black rounded-2xl shadow-lg hover:bg-green-600 transition active:scale-95"
        >
          Check Result
        </button>
      </div>

      {/* RESULT */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mt-6 text-3xl font-black text-indigo-700"
          >
            Correct: {result.correct} / {result.total}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}