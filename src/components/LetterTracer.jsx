import { useRef, useState } from "react";

const distance = (a, b) => {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
};

const calculateAccuracy = (drawnPoints, targetPoints) => {
    if (!drawnPoints.length) return 0;

    let matched = 0;

    drawnPoints.forEach((p) => {
        targetPoints.forEach((t) => {
            if (distance(p, t) < 10) {
                matched++;
            }
        });
    });

    return Math.min(
        100,
        Math.round((matched / drawnPoints.length) * 100)
    );
};

const evaluateTrace = (
    drawnPoints,
    targetPoints,
    threshold = 10
) => {
    if (!drawnPoints.length) {
        return { coverage: 0, offPath: 100, pass: false };
    }

    let coveredTarget = 0;
    let offPathPoints = 0;

    // 1️⃣ Coverage: how many target points were hit
    targetPoints.forEach((t) => {
        const hit = drawnPoints.some(
            (p) => distance(p, t) < threshold
        );
        if (hit) coveredTarget++;
    });

    // 2️⃣ Off-path detection
    drawnPoints.forEach((p) => {
        const nearPath = targetPoints.some(
            (t) => distance(p, t) < threshold
        );
        if (!nearPath) offPathPoints++;
    });

    const coverage =
        (coveredTarget / targetPoints.length) * 100;

    const offPath =
        (offPathPoints / drawnPoints.length) * 100;

    return { coverage, offPath };
};

const LETTER_PATH = "M50 150 L100 50 L150 150 M75 100 L125 100";

const TARGET_POINTS = [
    { x: 50, y: 150 },
    { x: 60, y: 125 },
    { x: 70, y: 100 },
    { x: 80, y: 75 },
    { x: 90, y: 60 },
    { x: 100, y: 50 },
    { x: 110, y: 60 },
    { x: 120, y: 75 },
    { x: 130, y: 100 },
    { x: 140, y: 125 },
    { x: 150, y: 150 },
    { x: 75, y: 100 },
    { x: 125, y: 100 },
];

const DISTANCE_THRESHOLD = 20;   // allowed distance from path
const MIN_COVERAGE = 20;         // % of path must be covered
const MAX_OFF_PATH = 10;         // % drawing allowed off-path

export default function LetterTracer() {
    const svgRef = useRef(null);
    const [drawing, setDrawing] = useState(false);
    const [strokes, setStrokes] = useState([]);
    const [currentPoints, setCurrentPoints] = useState([]);
    const [accuracy, setAccuracy] = useState(null);
    const [result, setResult] = useState(null);

    const getPoint = (e) => {
        const svg = svgRef.current;
        const rect = svg.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
    };

    const handleDown = (e) => {
        setDrawing(true);
        setCurrentPoints([getPoint(e)]); // new stroke starts
    };

    const handleMove = (e) => {
        if (!drawing) return;
        setCurrentPoints((prev) => [...prev, getPoint(e)]);
    };

    const handleUp = () => {
        setDrawing(false);
        setStrokes((prev) => [...prev, currentPoints]); // save stroke
        setCurrentPoints([]); // reset current stroke
    };

    const checkResult = () => {
        const allPoints = strokes.flat().concat(currentPoints);
        if (!allPoints.length) return;

        const accuracyScore = calculateAccuracy(allPoints, TARGET_POINTS);
        const { coverage, offPath } = evaluateTrace(
            allPoints,
            TARGET_POINTS,
            DISTANCE_THRESHOLD
        );

        const pass =
            coverage >= MIN_COVERAGE &&
            offPath <= MAX_OFF_PATH;

        setAccuracy(accuracyScore);
        setResult({
            coverage: Math.round(coverage),
            offPath: Math.round(offPath),
            pass,
        });
        if (allPoints.length > 800) {
            setResult({
                coverage: 0,
                offPath: 100,
                pass: false,
            });
            return;
        }
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <svg
                ref={svgRef}
                width="200"
                height="200"
                className="border bg-white"
                onMouseDown={handleDown}
                onMouseMove={handleMove}
                onMouseUp={handleUp}
            >
                {/* Dotted Letter */}
                <path
                    d={LETTER_PATH}
                    fill="none"
                    stroke="#aaa"
                    strokeWidth="6"
                    strokeDasharray="5 8"
                />

                {/* Draw all previous strokes */}
                {strokes.map((stroke, i) => (
                    <polyline
                        key={i}
                        points={stroke.map((p) => `${p.x},${p.y}`).join(" ")}
                        fill="none"
                        stroke="blue"
                        strokeWidth="5"
                        strokeLinecap="round"
                    />
                ))}

                {/* Draw current stroke */}
                {currentPoints.length > 0 && (
                    <polyline
                        points={currentPoints.map((p) => `${p.x},${p.y}`).join(" ")}
                        fill="none"
                        stroke="blue"
                        strokeWidth="5"
                        strokeLinecap="round"
                    />
                )}
            </svg>

            {accuracy !== null && (
                <p className="text-lg font-semibold">
                    Accuracy: <span className="text-green-600">{accuracy}%</span>
                </p>
            )}
            {result && (
                <div className="text-center">
                    <p>Coverage: {result.coverage}%</p>
                    <p>Off Path: {result.offPath}%</p>

                    {result.pass ? (
                        <p className="text-green-600 font-bold">
                            ✅ Passed!
                        </p>
                    ) : (
                        <p className="text-red-600 font-bold">
                            ❌ Try Again
                        </p>
                    )}
                </div>
            )}

            <button
                onClick={checkResult}
                className="px-4 py-2 bg-green-600 text-white rounded"
            >
                Check Accuracy
            </button>

            <button
                onClick={() => {
                    setStrokes([]);
                    setCurrentPoints([]);
                    setAccuracy(null);
                    setResult(null);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded"
            >
                Reset
            </button>

        </div>
    );
}
