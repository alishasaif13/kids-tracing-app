import React, { useMemo } from 'react'; // useMemo add kiya taake shuffle bar bar na ho
import MatchingEngine from "./MatchingEngine";
// import NavBar from "../components/Navbar"; // Agar navbar use karni ho toh

export default function AlphabetMatch() {
    const leftData = [
        { id: 1, content: 'A' }, { id: 2, content: 'B' }, { id: 3, content: 'C' }, 
        { id: 4, content: 'D' }, { id: 5, content: 'E' }
    ];

    // Hum rightData ko shuffle kar rahe hain
    const shuffledRightData = useMemo(() => {
        const data = [
            { id: 1, match: 'A' }, { id: 2, match: 'B' }, { id: 3, id: 3, match: 'C' }, 
            { id: 4, match: 'D' }, { id: 5, match: 'E' }
        ];
        // Fisher-Yates shuffle algorithm ya simple sort
        return [...data].sort(() => Math.random() - 0.5);
    }, []); // Empty array ka matlab hai ye sirf page load pe shuffle hoga

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-cyan-100 to-purple-200 p-4">
            <div className="max-w-5xl mx-auto flex flex-col items-center">
                <header className="text-center mb-8">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-indigo-900 drop-shadow-md">
                        Alphabet Match
                    </h1>
                    <p className="text-lg text-indigo-700 font-semibold mt-2">Draw a line to match same letters!</p>
                </header>
                
                {/* Ab hum shuffledRightData bhej rahe hain */}
                <MatchingEngine leftItems={leftData} rightItems={shuffledRightData} />
            </div>
        </div>
    );
}