import React from 'react';
import MatchingEngine from "./MatchingEngine";
import NavBar from "../components/Navbar";

export default function ShapeMatch() {
    const leftData = [
        { id: 1, label: 'Square', content: '方形' }, // Ya visual shape icon
        { id: 2, label: 'Circle', content: '圆形' },
    ];
    // rightItems mein matching text ya icon
    const rightData = [
        { id: 1, match: 'Square' },
        { id: 2, match: 'Circle' },
    ];

    return (
        <div className="min-h-screen bg-pink-50">
            <NavBar backPath="/matching-hub" />
            <h1 className="text-center text-5xl font-black py-10 text-pink-900">Shapes Matching</h1>
            <MatchingEngine leftItems={leftData} rightItems={rightData} type="en" />
        </div>
    );
}