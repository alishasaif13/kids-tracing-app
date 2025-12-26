import React, { useMemo } from 'react';
import MatchingEngine from "./MatchingEngine";
import NavBar from "../components/Navbar";

export default function UrduMatch() {
    const leftData = [
        { id: 1, content: 'ا' }, { id: 2, content: 'ب' }, { id: 3, content: 'پ' }, 
        { id: 4, content: 'ت' }, { id: 5, content: 'ٹ' }
    ];

    // Right side data ko shuffle kiya taake mazeed fun ho
    const shuffledRightData = useMemo(() => {
        const data = [
            { id: 1, match: 'ا' }, { id: 2, match: 'ب' }, { id: 3, match: 'پ' }, 
            { id: 4, match: 'ت' }, { id: 5, match: 'ٹ' }
        ];
        return [...data].sort(() => Math.random() - 0.5);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-cyan-100 to-purple-200 p-4">
            {/* NavBar agar zaroorat ho toh yahan call karein */}
            <div className="max-w-5xl mx-auto flex flex-col items-center">
                <header className="text-center mb-8">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-indigo-900 drop-shadow-md">
                        Urdu Match
                    </h1>
                    {/* Urdu text font-size thora bara rakha hai taake saaf nazar aaye */}
                    <p className="text-2xl text-indigo-700 font-bold mt-2" dir="rtl">
                        ایک جیسے حروف ملائیں!
                    </p>
                </header>
                
                <MatchingEngine leftItems={leftData} rightItems={shuffledRightData} />
            </div>
        </div>
    );
}