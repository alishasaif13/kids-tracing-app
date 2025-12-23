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
            audio.play().catch(e => console.log("Audio error"));
        } catch (e) { console.log(e); }
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
    }, [currentLine, completedLines]);

    const drawAll = () => {
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.lineCap = 'round';
        ctx.lineWidth = 6;

        completedLines.forEach(line => {
            ctx.strokeStyle = '#22c55e';
            ctx.beginPath();
            ctx.moveTo(line.x1, line.y1); ctx.lineTo(line.x2, line.y2);
            ctx.stroke();
        });

        if (currentLine) {
            ctx.strokeStyle = '#6366f1';
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            ctx.moveTo(currentLine.startX, currentLine.startY); ctx.lineTo(currentLine.endX, currentLine.endY);
            ctx.stroke();
            ctx.setLineDash([]);
        }
    };

    const getCoords = (e) => {
        const rect = containerRef.current.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return { x: clientX - rect.left, y: clientY - rect.top };
    };

    const handleStart = (item, e) => {
        if (matches[item.id]) return;
        const coords = getCoords(e);
        setCurrentLine({ id: item.id, startX: coords.x, startY: coords.y, endX: coords.x, endY: coords.y });
        setIsDragging(true);
    };

    const handleMove = (e) => {
        if (!isDragging || !currentLine) return;
        const coords = getCoords(e);
        setCurrentLine(prev => ({ ...prev, endX: coords.x, endY: coords.y }));
        drawAll();
    };

    const handleEnd = (targetItem, e) => {
        if (!isDragging || !currentLine) return;
        if (targetItem && currentLine.id === targetItem.id) {
            const coords = getCoords(e);
            setCompletedLines(prev => [...prev, { x1: currentLine.startX, y1: currentLine.startY, x2: coords.x, y2: coords.y }]);
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
        setTimeout(() => setFeedback(null), 1500);
    };

    return (
        <div ref={containerRef} onMouseMove={handleMove} onTouchMove={handleMove} className="relative max-w-4xl mx-auto p-10 bg-white/50 backdrop-blur-md rounded-[40px] shadow-xl border-4 border-white overflow-hidden touch-none">
            <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
            <AnimatePresence>
                {feedback && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={`absolute inset-0 flex items-center justify-center z-50 ${feedback === 'success' ? 'bg-green-500/10' : 'bg-red-500/10'} pointer-events-none`}>
                        <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} className={`px-8 py-4 rounded-2xl shadow-2xl border-4 ${feedback === 'success' ? 'bg-white border-green-500 text-green-600' : 'bg-white border-red-500 text-red-600'} text-3xl font-black`}>
                            {feedback === 'success' ? 'Great Job! ⭐' : '❌ Oops! Try Again!'}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="grid grid-cols-2 gap-32 relative z-10">
                <div className="flex flex-col gap-4">
                    {leftItems.map(item => (
                        <div key={item.id} className="relative flex items-center">
                            <div onMouseDown={(e) => handleStart(item, e)} onTouchStart={(e) => handleStart(item, e)} className={`flex-1 h-16 flex items-center justify-center text-3xl font-black rounded-2xl border-b-4 transition-all ${matches[item.id] ? 'bg-green-400 border-green-600 text-white' : 'bg-white border-indigo-200 shadow-sm'}`}>{item.content}</div>
                            <div className={`w-3 h-3 rounded-full absolute -right-1.5 z-20 ${matches[item.id] ? 'bg-green-600' : 'bg-indigo-400'}`} />
                        </div>
                    ))}
                </div>
                <div className="flex flex-col gap-4">
                    {shuffledRight.map(item => (
                        <div key={item.id} className="relative flex items-center">
                            <div className={`w-3 h-3 rounded-full absolute -left-1.5 z-20 ${matches[item.id] ? 'bg-green-600' : 'bg-indigo-400'}`} />
                            <div onMouseUp={(e) => handleEnd(item, e)} onTouchEnd={(e) => handleEnd(item, e)} className={`flex-1 h-16 flex items-center justify-center text-3xl font-black rounded-2xl border-b-4 transition-all ${matches[item.id] ? 'bg-green-100 text-green-700 opacity-50' : 'bg-white border-indigo-200 shadow-sm'}`}>{item.match}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}