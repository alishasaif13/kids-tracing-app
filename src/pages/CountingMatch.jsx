import React from 'react';
import MatchingEngine from "./MatchingEngine";
import NavBar from "../components/Navbar";

export default function CountingMatch() {
    const leftData = [
        { id: 1, content: '1' }, { id: 2, content: '2' }, { id: 3, content: '3' }, { id: 4, content: '4' }
    ];
    const rightData = [
        { id: 1, match: 'One' }, { id: 2, match: 'Two' }, { id: 3, match: 'Three' }, { id: 4, match: 'Four' }
    ];
    return (
        <div className="min-h-screen bg-green-50">
            <NavBar backPath="/matching-hub" />
            <h1 className="text-center text-4xl font-black py-8 text-green-900">Match Counting</h1>
            <MatchingEngine leftItems={leftData} rightItems={rightData} />
        </div>
    );
}