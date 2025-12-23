import React from 'react';
import MatchingEngine from "./MatchingEngine";
import NavBar from "../components/Navbar";

export default function AlphabetMatch() {
    const leftData = [
        { id: 1, content: 'A' }, { id: 2, content: 'B' }, { id: 3, content: 'C' }, { id: 4, content: 'D' }
    ];
    const rightData = [
        { id: 1, match: 'a' }, { id: 2, match: 'b' }, { id: 3, match: 'c' }, { id: 4, match: 'd' }
    ];
    return (
        <div className="min-h-screen bg-sky-50">
            <NavBar backPath="/matching-hub" />
            <h1 className="text-center text-4xl font-black py-8 text-indigo-900">Match Alphabets</h1>
            <MatchingEngine leftItems={leftData} rightItems={rightData} />
        </div>
    );
}