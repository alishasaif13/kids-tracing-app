import React, { useRef, useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function TracingCanvas({ width = 350, height = 450 }) {
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [strokes, setStrokes] = useState([]);
  const [currentStroke, setCurrentStroke] = useState([]);
  const [targetPoints, setTargetPoints] = useState([]);
  const [completed, setCompleted] = useState(false);

  const tolerance = 18;
  const successThreshold = 0.75;

  // *** CLEAN SINGLE LINE A ***
  const letterPath = "M90 360 L175 60 L260 360";

  useEffect(() => {
    const svg = svgRef.current;
    const pathEl = pathRef.current;
    if (!svg || !pathEl) return;

    const length = pathEl.getTotalLength();
    const samples = 150;

    const pts = [];
    for (let i = 0; i <= samples; i++) {
      const p = pathEl.getPointAtLength((i / samples) * length);
      pts.push({ x: p.x, y: p.y, hit: false });
    }

    setTargetPoints(pts);
    setStrokes([]);
    setCurrentStroke([]);
    setCompleted(false);
  }, []);

  const getPointer = (e) => {
    const svg = svgRef.current;
    const pt = svg.createSVGPoint();

    if (e.touches) {
      pt.x = e.touches[0].clientX;
      pt.y = e.touches[0].clientY;
    } else {
      pt.x = e.clientX;
      pt.y = e.clientY;
    }

    return pt.matrixTransform(svg.getScreenCTM().inverse());
  };

  const startDraw = (e) => {
    if (completed) return;
    e.preventDefault();
    const p = getPointer(e);
    setCurrentStroke([{ x: p.x, y: p.y }]);
    setDrawing(true);
  };

  const moveDraw = (e) => {
    if (!drawing) return;
    e.preventDefault();
    const p = getPointer(e);
    setCurrentStroke((prev) => [...prev, { x: p.x, y: p.y }]);
  };

  const endDraw = () => {
    if (!drawing) return;

    setDrawing(false);
    const updated = [...strokes, currentStroke];
    setStrokes(updated);
    checkAccuracy(updated);
    setCurrentStroke([]);
  };

  const checkAccuracy = (allStrokes) => {
    const updated = targetPoints.map((p) => ({ ...p, hit: false }));

    allStrokes.forEach((stroke) => {
      stroke.forEach((pt) => {
        updated.forEach((t) => {
          const dx = t.x - pt.x;
          const dy = t.y - pt.y;
          if (dx * dx + dy * dy <= tolerance * tolerance) t.hit = true;
        });
      });
    });

    const hitCount = updated.filter((p) => p.hit).length;
    const accuracy = hitCount / updated.length;

    if (accuracy >= successThreshold) {
      Swal.fire({
        icon: "success",
        title: "Nice work!",
        text: `${Math.round(accuracy * 100)}% completed`,
      });
      setCompleted(true);
    } else {
      Swal.fire({
        icon: "error",
        title: "Try again",
        text: `You traced ${Math.round(accuracy * 100)}%`,
      });
    }

    setTargetPoints(updated);
  };

  return (
    <div className="max-w-sm mx-auto p-4 bg-white rounded-2xl shadow-xl">
      <h2 className="text-center text-2xl font-bold mb-4 text-indigo-900">Trace Letter A</h2>

      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full border-4 border-cyan-400 rounded-lg bg-white"
        onMouseDown={startDraw}
        onMouseMove={moveDraw}
        onMouseUp={endDraw}
        onMouseLeave={endDraw}
        onTouchStart={startDraw}
        onTouchMove={moveDraw}
        onTouchEnd={endDraw}
      >
        {/* Dotted clean guide */}
        <path
          d={letterPath}
          fill="none"
          stroke="#67e8f9"
          strokeWidth={5}
          strokeDasharray="6,10"
          strokeLinecap="round"
        />

        {/* Invisible path used for accuracy */}
        <path ref={pathRef} d={letterPath} fill="none" stroke="transparent" strokeWidth={5} />

        {/* Completed strokes */}
        {strokes.map((s, i) => (
          <polyline
            key={i}
            points={s.map((p) => `${p.x},${p.y}`).join(" ")}
            fill="none"
            stroke="#4F46E5"
            strokeWidth={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}

        {/* Live stroke */}
        {currentStroke.length > 0 && (
          <polyline
            points={currentStroke.map((p) => `${p.x},${p.y}`).join(" ")}
            fill="none"
            stroke="#4F46E5"
            strokeWidth={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </div>
  );
}
