import React from 'react';
import { useParams } from 'react-router-dom';
import MatchingGame from '../components/MatchingGame';
import NavBar from '../components/Navbar';

const dataSets = {
    alphabets: [
        { id: 1, label: 'A', content: 'A', matchContent: 'a' },
        { id: 2, label: 'B', content: 'B', matchContent: 'b' },
        { id: 3, label: 'C', content: 'C', matchContent: 'c' },
    ],
    urdu: [
        { id: 1, label: 'Alif', content: 'ا', matchContent: 'ا' },
        { id: 2, label: 'Bay', content: 'ب', matchContent: 'ب' },
    ],
    numbers: [
        { id: 1, label: 'One', content: '1', matchContent: 'One' },
        { id: 2, label: 'Two', content: '2', matchContent: 'Two' },
    ],
    shapes: [
        { id: 1, label: 'Circle', content: '🔴', matchContent: 'Circle' },
        { id: 2, label: 'Square', content: '🟦', matchContent: 'Square' },
    ]
};

export default function GamePage() {
    const { category } = useParams();
    const gameData = dataSets[category] || [];

    return (
        <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-blue-100">
            <NavBar backPath="/matching" />
            <div className="pt-20">
                <h1 className="text-center text-4xl font-bold text-indigo-900 capitalize mb-10">
                    Match the {category}
                </h1>
                <MatchingGame data={gameData} type={category} />
            </div>
        </div>
    );
}