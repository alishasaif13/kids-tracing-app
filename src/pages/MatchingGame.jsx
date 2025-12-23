import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const MatchingGame = ({ data, type, onComplete }) => {
    const [leftItems, setLeftItems] = useState([]);
    const [rightItems, setRightItems] = useState([]);
    const [selectedLeft, setSelectedLeft] = useState(null);
    const [matches, setMatches] = useState({}); // {leftId: rightId}
    const [feedback, setFeedback] = useState(null); // 'success' or 'fail'

    useEffect(() => {
        // Shuffle and set items
        const shuffledLeft = [...data].sort(() => Math.random() - 0.5);
        const shuffledRight = [...data].sort(() => Math.random() - 0.5);
        setLeftItems(shuffledLeft);
        setRightItems(shuffledRight);
    }, [data]);

    const playSound = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = type === 'urdu' ? 'ur-PK' : 'en-US';
        window.speechSynthesis.speak(utterance);
    };

    const handleMatch = (rightItem) => {
        if (!selectedLeft) return;

        if (selectedLeft.id === rightItem.id) {
            // Success Case
            setMatches(prev => ({ ...prev, [selectedLeft.id]: rightItem.id }));
            setFeedback('success');
            playSound(selectedLeft.label);
            if (Object.keys(matches).length + 1 === data.length) {
                confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
            }
        } else {
            // Fail Case
            setFeedback('fail');
        }

        setTimeout(() => {
            setFeedback(null);
            setSelectedLeft(null);
        }, 800);
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-4 relative">
            {/* Feedback Animations */}
            <AnimatePresence>
                {feedback && (
                    <motion.div 
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1.2, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
                    >
                        <span className="text-9xl">
                            {feedback === 'success' ? '🌟' : '❌'}
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-2 gap-20 md:gap-40 items-center justify-center">
                {/* Left Column */}
                <div className="flex flex-col gap-6">
                    {leftItems.map((item) => (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            key={item.id}
                            disabled={matches[item.id]}
                            onClick={() => { setSelectedLeft(item); playSound(item.label); }}
                            className={`p-6 rounded-3xl text-3xl font-bold shadow-xl border-4 transition-all
                                ${matches[item.id] ? 'bg-green-100 border-green-500 opacity-50' : 
                                selectedLeft?.id === item.id ? 'bg-indigo-500 text-white border-white scale-110' : 'bg-white border-indigo-200'}`}
                        >
                            {item.content}
                        </motion.button>
                    ))}
                </div>

                {/* Right Column */}
                <div className="flex flex-col gap-6">
                    {rightItems.map((item) => (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            key={item.id}
                            disabled={Object.values(matches).includes(item.id)}
                            onClick={() => handleMatch(item)}
                            className={`p-6 rounded-3xl text-3xl font-bold shadow-xl border-4 transition-all
                                ${Object.values(matches).includes(item.id) ? 'bg-green-100 border-green-500 opacity-50' : 'bg-white border-indigo-200'}`}
                        >
                            {item.matchContent}
                        </motion.button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MatchingGame;