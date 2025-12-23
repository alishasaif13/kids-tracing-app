import React from 'react';
import MatchingEngine from "./MatchingEngine";
import NavBar from "../components/Navbar";

export default function UrduMatch() {
    const leftData = [
        { id: 1, content: 'ا' }, { id: 2, content: 'ب' }, { id: 3, content: 'پ' }, { id: 4, content: 'ت' }
    ];
    const rightData = [
        { id: 1, match: 'انگور' }, { id: 2, match: 'بلی' }, { id: 3, match: 'پنکھا' }, { id: 4, match: 'تتلی' }
    ];
    return (
        <div className="min-h-screen bg-orange-50 font-urdu">
            <NavBar backPath="/matching-hub" />
            <h1 className="text-center text-4xl font-black py-8 text-orange-900">حروف تہجی ملائیں</h1>
            <MatchingEngine leftItems={leftData} rightItems={rightData} />
        </div>
    );
}