import React, { useRef, useState, useEffect, useCallback } from "react";
const PATH_DATA = {
  // --- ALPHABETS (Reference Size: 55 to 315) ---
  A: "M85 315 L150 55 L215 315 M105 215 L195 215",
  B: "M75 55 L75 315 M75 55 L165 55 A80 85 0 0 1 165 185 L75 185 M165 185 A80 85 0 0 1 165 315 L75 315",
  C: "M215 95 C215 55 165 55 135 55 C85 55 85 95 85 185 C85 275 85 315 135 315 C165 315 215 315 215 275",
  D: "M75 55 L75 315 M75 55 L135 55 C195 55 215 85 215 185 C215 285 195 315 135 315 L75 315",
  E: "M215 55 L75 55 L75 315 L215 315 M75 185 L185 185",
  F: "M75 55 L75 315 M215 55 L75 55 M75 185 L185 185",
  G: "M215 95 C215 55 165 55 135 55 C85 55 85 95 85 185 C85 275 85 315 135 315 C165 315 215 315 215 255 L215 185 L165 185",
  H: "M75 55 L75 315 M225 55 L225 315 M75 185 L225 185",
  I: "M85 55 L215 55 M150 55 L150 315 M85 315 L215 315",
  J: "M75 275 C75 315 105 315 135 315 C185 315 215 285 215 245 L215 55",
  K: "M75 55 L75 315 M215 55 L95 185 L215 315",
  L: "M75 55 L75 315 L215 315",
  M: "M75 315 L75 55 L150 185 L225 55 L225 315",
  N: "M75 315 L75 55 L225 315 L225 55",
  O: "M160 55 C100 55 80 120 80 185 C80 250 100 315 160 315 C220 315 240 250 240 185 C240 120 220 55 160 55 Z",
  P: "M75 315 L75 55 L165 55 C215 55 215 155 165 155 L75 155",
  Q: "M150 55 C85 55 85 185 85 185 C85 315 150 315 150 315 C215 315 215 185 215 185 C215 55 150 55 150 55 Z M175 255 L225 315",
  R: "M75 315 L75 55 L165 55 C215 55 215 155 165 155 L75 155 M75 155 L225 315",
  S: "M220 95 C220 55 100 55 100 135 C100 185 220 185 220 235 C220 315 100 315 100 275",
  T: "M75 55 L225 55 M150 55 L150 315",
  U: "M75 55 L75 265 C75 315 135 315 150 315 C165 315 225 315 225 265 L225 55",
  V: "M75 55 L150 315 L225 55",
  W: "M75 55 L105 315 L150 135 L195 315 L225 55",
  X: "M75 55 L225 315 M225 55 L75 315",
  Y: "M75 55 L150 185 L225 55 M150 185 L150 315",
  Z: "M75 55 L225 55 L75 315 L225 315",

  // --- NUMBERS (Scaled to 55-315 range to match Alphabets) ---
  1: "M150 55 L150 315 M120 85 L150 55",
  2: "M90 100 C90 55 230 55 230 130 C230 190 170 240 90 315 L230 315",
  3: "M100 85 C100 45 220 45 220 125 C220 155 190 185 160 185 M160 185 C200 185 230 215 230 265 C230 325 100 325 100 275",
  4: "M200 55 L80 230 L240 230 M200 55 L200 315",
  5: "M220 55 L100 55 L100 170 C100 170 230 155 230 240 C230 325 90 325 80 265",
  6: "M210 80 C150 50 90 120 90 200 C90 290 230 290 230 215 C230 155 90 160 90 215",
  7: "M90 55 L230 55 L150 315",
  8: "M160 185 C110 185 100 135 100 105 C100 65 130 55 160 55 C190 55 220 65 220 105 C220 135 210 185 160 185 Z M160 185 C110 185 85 235 85 265 C85 315 120 325 160 325 C200 325 235 315 235 265 C235 235 210 185 160 185 Z",
  9: "M200 135 C200 65 110 65 110 135 C110 195 200 195 200 135 L200 315",

  // --- Double Digits (Narrow & Re-balanced for spacing) ---
  10: "M95 55 L95 315 M210 55 C165 55 155 110 155 185 C155 260 165 315 210 315 C255 315 265 260 265 185 C265 110 255 55 210 55 Z",
  11: "M110 55 L110 315 M200 55 L200 315",
  12: "M90 55 L90 315 M160 100 C160 55 240 55 240 130 C240 185 200 235 160 315 L250 315",
  13: "M85 55 L85 315 M150 85 C150 45 230 45 230 115 C230 145 210 165 180 170 M180 170 C220 175 240 200 240 250 C240 310 150 310 150 265",
  14: "M90 55 L90 315 M230 55 L145 235 L260 235 M225 55 L225 315",
  15: "M90 55 L90 315 M250 60 L160 60 L160 165 C160 165 250 155 250 240 C250 325 155 325 145 270",
  16: "M90 55 L90 315 M240 80 C200 55 160 120 160 195 C160 270 250 270 250 215 C250 160 160 165 160 215",
  17: "M100 55 L100 315 M160 55 L260 55 L200 315",
  18: "M90 55 L90 315 M200 180 C175 180 165 145 165 115 C165 80 180 70 200 70 C220 70 235 80 235 115 C235 145 225 180 200 180 Z M200 180 C175 180 160 215 160 245 C160 290 180 305 200 305 C220 305 240 290 240 245 C240 215 225 180 200 180 Z",
  19: "M90 55 L90 315 M235 145 C235 70 155 70 155 125 C155 175 235 175 235 145 L235 315",
  20: "M80 100 C80 55 160 55 160 130 C160 185 125 235 80 315 L170 315 M225 55 C190 55 180 110 180 185 C180 260 190 315 225 315 C260 315 270 260 270 185 C270 110 260 55 225 55 Z",
  // --- SHAPES (Enlarged and Centered to match A-Z scale) ---
  Circle:
    "M160 55 C250 55 260 185 260 185 C260 315 160 315 160 315 C70 315 60 185 60 185 C60 55 160 55 160 55 Z",
  Square: "M80 85 L240 85 L240 245 L80 245 Z",
  Triangle: "M160 55 L270 315 L50 315 Z",
  Star: "M160 45 L195 145 L285 145 L215 210 L240 315 L160 250 L80 315 L105 210 L35 145 L125 145 Z",
  Diamond: "M160 55 L270 185 L160 315 L50 185 Z",
  Rectangle: "M40 90 L280 90 L280 280 L40 280 Z",
  Oval: "M160 55 C230 55 230 315 160 315 C90 315 90 55 160 55 Z",
  Arrow: "M60 185 L260 185 M180 105 L260 185 L180 265",
  Heart:
    "M160 315 C100 315 50 255 50 195 C50 145 90 125 125 145 C145 155 160 185 160 185 C160 185 175 155 195 145 C230 125 270 145 270 195 C270 255 220 315 160 315 Z",
};

// --- GET PATH FUNCTION ---
const getPathForItem = (item, categoryId) => {
  if (!item || !categoryId) return null;

  let key;
  if (categoryId === "letters") {
    key = item.toUpperCase();
  } else if (categoryId === "numbers") {
    key = item;
  } else if (categoryId === "shapes") {
    key = item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
  } else {
    return null;
  }
  return PATH_DATA[key] || null;
};

// --- SOUND FUNCTIONS ---
const playSuccessSound = () => {
  try {
    const audio = new Audio("/sounds/success.mp3");
    audio.play().catch((e) => console.error("Success audio failed:", e));
  } catch (e) {
    console.error("Success audio API failed:", e);
  }
};

const playFailureSound = () => {
  try {
    const audio = new Audio("/sounds/tryagain.mp3");
    audio.play().catch((e) => console.error("Failure audio failed:", e));
  } catch (e) {
    console.error("Failure audio API failed:", e);
  }
};

// --- TRACING CANVAS COMPONENT ---
export default function TracingCanvas({
  width = 360,
  height = 360,
  item = "A",
  categoryId = "letters",
}) {
  const currentPath = getPathForItem(item, categoryId);

  if (!currentPath) {
    return (
      <div
        className="max-w-sm mx-auto p-4 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl shadow-red-300 w-full"
        style={{ maxWidth: `${width + 40}px` }}
      >
        <h2 className="text-center text-3xl font-bold mb-6 text-red-700 drop-shadow-sm">
          404: Tracing Path Not Found!
        </h2>
        <div className="text-center p-10 border-4 border-red-400 rounded-lg bg-red-50">
          <span className="text-9xl font-black text-red-300">
            {item.toUpperCase()}
          </span>
          <p className="mt-4 text-lg font-semibold text-red-600">
            Path data is missing for {item} in the '{categoryId}' category.
          </p>
        </div>
      </div>
    );
  }

  // --- State and Refs ---
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [strokes, setStrokes] = useState([]);
  const [currentStroke, setCurrentStroke] = useState([]);
  const [targetPoints, setTargetPoints] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [showFailureAnimation, setShowFailureAnimation] = useState(false);

  // --- RESET FUNCTION ---
  const resetCanvas = useCallback(() => {
    const pathEl = pathRef.current;
    if (!pathEl) return;

    const length = pathEl.getTotalLength();
    const samples = 300;
    const pts = [];
    for (let i = 0; i <= samples; i++) {
      const p = pathEl.getPointAtLength((i / samples) * length);
      pts.push({ x: p.x, y: p.y, hit: false });
    }

    setTargetPoints(pts);
    setStrokes([]);
    setCurrentStroke([]);
    setCompleted(false);
    setShowSuccessAnimation(false);
    setShowFailureAnimation(false);
  }, [currentPath]);

  useEffect(() => {
    if (pathRef.current) {
      resetCanvas();
    }
  }, [currentPath, resetCanvas]);

  // --- POINTER/COORDINATE LOGIC ---
  const getPointer = (e) => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };

    const pt = svg.createSVGPoint();

    if (e.touches && e.touches.length > 0) {
      pt.x = e.touches[0].clientX;
      pt.y = e.touches[0].clientY;
    } else {
      pt.x = e.clientX;
      pt.y = e.clientY;
    }

    const ctm = svg.getScreenCTM();
    if (ctm) return pt.matrixTransform(ctm.inverse());
    return pt;
  };

  // --- DRAWING HANDLERS ---
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

    const updatedStrokes =
      currentStroke.length > 0 ? [...strokes, currentStroke] : strokes;
    setStrokes(updatedStrokes);
    setCurrentStroke([]);
  };

  // --- CHECK ACCURACY LOGIC (WITH SHAPE VERIFICATION) ---
  const checkAccuracy = (allStrokes) => {
    if (allStrokes.length === 0) {
      playFailureSound();
      setShowFailureAnimation(true);
      setTimeout(() => setShowFailureAnimation(false), 2500);
      return;
    }

    const updatedTargetPoints = targetPoints.map((p) => ({ ...p }));
    let totalUserPoints = 0;
    let messyPoints = 0;
    let shapeMatchCount = 0;
    let shapeCheckCount = 0;

    // --- CALIBRATION SETTINGS ---
   // --- STRICT TRACING SETTINGS ---
const hitTolerance = 15;       // Dots ke liye sakht (user ko dots ke kaafi qareeb rehna hoga)
const messThreshold = 35;      // Agar line raste se thora sa bhi bahar nikli (35px), to usay 'Mess' maana jaye
const requiredCoverage = 0.95; // 95% coverage (Shuru se aakhir tak poora trace karna lazmi hai)
const allowedMessRatio = 0.05; // SIRF 5% extra lines allow hain (Extra lines par foran fail karega)
const requiredShapeMatch = 0.90; // Shape asli template se 85% milni chahiye

    

    allStrokes.forEach((stroke) => {
      for (let i = 0; i < stroke.length; i += 2) {
        const userPt = stroke[i];
        totalUserPoints++;

        let minDistanceToLetter = Infinity;
        let closestTargetIndex = -1;

        for (let t = 0; t < updatedTargetPoints.length; t++) {
          const targetPt = updatedTargetPoints[t];
          const dx = targetPt.x - userPt.x;
          const dy = targetPt.y - userPt.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < minDistanceToLetter) {
            minDistanceToLetter = dist;
            closestTargetIndex = t;
          }

          if (dist <= hitTolerance) {
            targetPt.hit = true;
          }
        }

        if (minDistanceToLetter > messThreshold) {
          messyPoints++;
        }

        // --- SHAPE DIRECTION CHECK ---
        if (
          i > 0 &&
          closestTargetIndex >= 0 &&
          closestTargetIndex < updatedTargetPoints.length - 5
        ) {
          const prevUserPt = stroke[i - 2] || stroke[i - 1] || userPt;

          const userDx = userPt.x - prevUserPt.x;
          const userDy = userPt.y - prevUserPt.y;
          const userAngle = Math.atan2(userDy, userDx);

          const nextTargetPt = updatedTargetPoints[closestTargetIndex + 5];
          const targetDx =
            nextTargetPt.x - updatedTargetPoints[closestTargetIndex].x;
          const targetDy =
            nextTargetPt.y - updatedTargetPoints[closestTargetIndex].y;
          const targetAngle = Math.atan2(targetDy, targetDx);

          let angleDiff = Math.abs(userAngle - targetAngle);
          if (angleDiff > Math.PI) angleDiff = 2 * Math.PI - angleDiff;

          shapeCheckCount++;
          if (angleDiff < 1.8) {
            shapeMatchCount++;
          }
        }
      }
    });

    const hitCount = updatedTargetPoints.filter((p) => p.hit).length;
    const coverage = hitCount / updatedTargetPoints.length;
    const messRatio = messyPoints / totalUserPoints;
    const shapeMatchRatio =
      shapeCheckCount > 0 ? shapeMatchCount / shapeCheckCount : 1;

    console.log(
      `Coverage: ${(coverage * 100).toFixed(1)}% | Mess: ${(
        messRatio * 100
      ).toFixed(1)}% | Shape Match: ${(shapeMatchRatio * 100).toFixed(1)}%`
    );

    const isCovered = coverage >= requiredCoverage;
    const isClean = messRatio <= allowedMessRatio;
    const isShapeCorrect = shapeMatchRatio >= requiredShapeMatch;

    if (isCovered && isClean && isShapeCorrect) {
      playSuccessSound();
      setShowSuccessAnimation(true);
      setCompleted(true);
      setTimeout(() => setShowSuccessAnimation(false), 2500);
    } else {
      playFailureSound();
      setShowFailureAnimation(true);

      // Auto clear after 2 seconds on failure
      setTimeout(() => {
        setShowFailureAnimation(false);
        resetCanvas();
      }, 2000);

      if (!isCovered) console.log("Try to trace the whole letter!");
      if (!isClean) console.log("Too much scribbling outside the lines!");
      if (!isShapeCorrect)
        console.log("Shape doesn't match! Follow the direction.");
    }

    setTargetPoints(updatedTargetPoints);
  };

  const checkMyTrace = () => {
    checkAccuracy(strokes);
  };

  const getDisplayItem = () => {
    if (categoryId === "shapes") {
      return item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
    }
    return item.toUpperCase();
  };

  const getTitle = () => {
    if (categoryId === "letters") return "Letter";
    if (categoryId === "numbers") return "Number";
    if (categoryId === "shapes") return "Shape";
    return "Item";
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-10 mx-auto flex flex-col items-center">
      <div
        className={`relative w-full mx-auto bg-white/90 rounded-3xl overflow-hidden transition-all duration-300 ${
          completed
            ? "border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.4)] border-8"
            : "border-cyan-400 border-4 shadow-xl"
        }`}
        style={{
          aspectRatio: "300 / 330",
          width: "min(95%, 55vh * (300/330))",
          maxWidth: "500px",
          margin: "0 auto",
        }}
      >
        <svg
          ref={svgRef}
          viewBox="30 30 260 330"
          className="absolute inset-0 w-full h-full cursor-crosshair"
          onMouseDown={startDraw}
          onMouseMove={moveDraw}
          onMouseUp={endDraw}
          onMouseLeave={endDraw}
          onTouchStart={startDraw}
          onTouchMove={moveDraw}
          onTouchEnd={endDraw}
          onTouchCancel={endDraw}
        >
          <path
            d={currentPath}
            fill="none"
            stroke="#67e8f9"
            strokeWidth={5}
            strokeDasharray="6,10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            ref={pathRef}
            d={currentPath}
            fill="none"
            stroke="transparent"
            strokeWidth={20}
          />

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

        {showSuccessAnimation && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 bg-white/70">
            <div className="text-3xl text-green-500 font-extrabold drop-shadow-lg animate-pop">
              Great Job! ⭐
            </div>
          </div>
        )}

        {showFailureAnimation && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 bg-white/70">
            <div className="text-2xl text-red-500 font-extrabold drop-shadow-lg animate-pop">
              ❌ Oops! Try Again!
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between w-full mt-4 mb-2">
        <button
          onClick={resetCanvas}
          className="flex items-center justify-center px-4 py-3 bg-red-500 text-white font-bold rounded-xl shadow-lg shadow-red-300/70 hover:bg-red-600 transition duration-150 transform hover:scale-[1.03] flex-grow mr-2 active:scale-[0.98]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          Clear
        </button>
        <button
          onClick={checkMyTrace}
          className="flex items-center justify-center px-4 py-3 bg-green-500 text-white font-bold rounded-xl shadow-lg shadow-green-300/70 hover:bg-green-600 transition duration-150 transform hover:scale-[1.03] flex-grow ml-2 active:scale-[0.98]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          Check
        </button>
      </div>
    </div>
  );
}
