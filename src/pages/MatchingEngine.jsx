import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function MatchingEngine({ leftItems = [], rightItems = [] }) {
    const [matches, setMatches] = useState({});
    const [isDragging, setIsDragging] = useState(false);
    const [currentLine, setCurrentLine] = useState(null);
    const [completedLines, setCompletedLines] = useState([]);
    const [shuffledRight, setShuffledRight] = useState([]);
    const [feedback, setFeedback] = useState(null);
    
    const containerRef = useRef(null);
    const canvasRef = useRef(null);

    const playSound = (isSuccess) => {
        try {
            const audio = new Audio(isSuccess ? "/sounds/success.mp3" : "/sounds/tryagain.mp3");
            audio.play().catch(() => {});
        } catch (e) {}
    };

    useEffect(() => {
        setShuffledRight([...rightItems].sort(() => Math.random() - 0.5));
    }, [rightItems]);

    useEffect(() => {
        const resizeCanvas = () => {
            if (canvasRef.current && containerRef.current) {
                canvasRef.current.width = containerRef.current.offsetWidth;
                canvasRef.current.height = containerRef.current.offsetHeight;
                drawAll();
            }
        };
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        return () => window.removeEventListener('resize', resizeCanvas);
    }, [currentLine, completedLines, matches]);

    const drawAll = () => {
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.lineCap = 'round';
        ctx.lineWidth = 6;

        // Perfect Accurate Lines for Completed Matches
        completedLines.forEach(line => {
            ctx.strokeStyle = '#22c55e';
            ctx.shadowBlur = 5; ctx.shadowColor = '#22c55e';
            ctx.beginPath();
            ctx.moveTo(line.x1, line.y1);
            ctx.lineTo(line.x2, line.y2);
            ctx.stroke();
        });

        // Dynamic Line while dragging
        if (currentLine) {
            ctx.strokeStyle = '#6366f1';
            ctx.shadowBlur = 10; ctx.shadowColor = '#6366f1';
            ctx.beginPath();
            ctx.moveTo(currentLine.startX, currentLine.startY);
            ctx.lineTo(currentLine.endX, currentLine.endY);
            ctx.stroke();
        }
    };

    const getElementCenter = (el) => {
        const rect = el.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        return {
            x: (rect.left + rect.width / 2) - containerRect.left,
            y: (rect.top + rect.height / 2) - containerRect.top
        };
    };

    const handleStart = (item, e) => {
        if (matches[item.id]) return;
        const dotEl = e.currentTarget.nextSibling; // Gets the dot element
        const coords = getElementCenter(dotEl);
        setCurrentLine({ id: item.id, startX: coords.x, startY: coords.y, endX: coords.x, endY: coords.y });
        setIsDragging(true);
    };

    const handleMove = (e) => {
        if (!isDragging || !currentLine) return;
        const rect = containerRef.current.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        setCurrentLine(prev => ({ 
            ...prev, 
            endX: clientX - rect.left, 
            endY: clientY - rect.top 
        }));
        drawAll();
    };

    const handleEnd = (targetItem, e) => {
        if (!isDragging || !currentLine) return;

        if (targetItem && currentLine.id === targetItem.id) {
            // SNAP LOGIC: Get exact center of the target dot
            const targetDot = e.currentTarget.previousSibling;
            const targetCoords = getElementCenter(targetDot);

            setCompletedLines(prev => [...prev, { 
                x1: currentLine.startX, y1: currentLine.startY, 
                x2: targetCoords.x, y2: targetCoords.y 
            }]);
            
            setMatches(prev => ({ ...prev, [currentLine.id]: true }));
            setFeedback('success');
            playSound(true);
            if (Object.keys(matches).length + 1 === leftItems.length) confetti();
        } else {
            setFeedback('fail');
            playSound(false);
        }

        setCurrentLine(null);
        setIsDragging(false);
        setTimeout(() => setFeedback(null), 1000);
    };

    return (
        <div className="w-full max-w-2xl flex flex-col items-center">
            <AnimatePresence>
                {feedback && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="fixed top-1/4 z-50">
                        <div className={`px-8 py-3 rounded-2xl shadow-xl border-4 bg-white font-black text-2xl ${feedback === 'success' ? 'border-green-400 text-green-500' : 'border-red-400 text-red-500'}`}>
                            {feedback === 'success' ? 'EXCELLENT! 🌟' : 'TRY AGAIN! ❌'}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div ref={containerRef} onMouseMove={handleMove} onTouchMove={handleMove}
                className="relative w-full bg-white/70 backdrop-blur-md rounded-[40px] border-4 border-white shadow-2xl p-8 md:p-10 min-h-[400px] flex items-center touch-none overflow-hidden">
                
                <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-20" />

                <div className="grid grid-cols-2 w-full gap-x-20 md:gap-x-32 relative z-10">
                    <div className="flex flex-col justify-center gap-5">
                        {leftItems.map(item => (
                            <div key={item.id} className="relative flex items-center">
                                <div onMouseDown={(e) => handleStart(item, e)} onTouchStart={(e) => handleStart(item, e)}
                                    className={`h-14 flex-1 flex items-center justify-center text-2xl font-black rounded-2xl border-b-4 transition-all cursor-pointer select-none
                                    ${matches[item.id] ? 'bg-green-500 border-green-700 text-white' : 'bg-white border-indigo-100 text-indigo-900 shadow-sm'}`}>
                                    {item.content}
                                </div>
                                <div className={`w-4 h-4 rounded-full absolute -right-2 top-1/2 -translate-y-1/2 border-2 border-white shadow-sm z-30 ${matches[item.id] ? 'bg-green-600' : 'bg-indigo-400 pulse'}`} />
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col justify-center gap-5">
                        {shuffledRight.map(item => (
                            <div key={item.id} className="relative flex items-center">
                                <div className={`w-4 h-4 rounded-full absolute -left-2 top-1/2 -translate-y-1/2 border-2 border-white shadow-sm z-30 ${matches[item.id] ? 'bg-green-600' : 'bg-indigo-400 pulse'}`} />
                                <div onMouseUp={(e) => handleEnd(item, e)} onTouchEnd={(e) => handleEnd(item, e)}
                                    className={`h-14 flex-1 flex items-center justify-center text-2xl font-black rounded-2xl border-b-4 transition-all select-none
                                    ${matches[item.id] ? 'bg-green-50 text-green-200 border-green-100' : 'bg-white border-indigo-100 text-indigo-900 shadow-sm'}`}>
                                    {item.match}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}