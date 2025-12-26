import React, { useMemo } from 'react';
import MatchingEngine from "./MatchingEngine";
import NavBar from "../components/Navbar";

export default function ShapeMatch() {
    const leftData = [
        { id: 1, content: '⭕' }, { id: 2, content: '🟦' }, { id: 3, content: '🔺' }, 
        { id: 4, content: '⭐' }, { id: 5, content: '💎' }, { id: 6, content: '❤️' }
    ];

    // Hum rightData ko yahan shuffle kar rahe hain
    const shuffledRightData = useMemo(() => {
        const data = [
            { id: 1, match: '⭕' }, { id: 2, match: '🟦' }, { id: 3, match: '🔺' }, 
            { id: 4, match: '⭐' }, { id: 5, match: '💎' }, { id: 6, match: '❤️' }
        ];
        // Fisher-Yates shuffle algorithm logic
        return [...data].sort(() => Math.random() - 0.5);
    }, []); // Empty dependency array se ye sirf tabhi shuffle hoga jab page pehli bar load hoga

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-cyan-100 to-purple-200 p-4 flex flex-col items-center">
            {/* Navbar agar add karni ho toh yahan add kar sakti hain */}
            <header className="text-center mb-6">
                <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-900 drop-shadow-sm">
                    Shape Match
                </h1>
                <p className="text-lg text-indigo-700 font-semibold mt-2">Match the same shapes!</p>
            </header>
            
            {/* Ab hum MatchingEngine ko shuffled data bhej rahe hain */}
            <MatchingEngine leftItems={leftData} rightItems={shuffledRightData} />
        </div>
    );
}