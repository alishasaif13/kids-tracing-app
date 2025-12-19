import React from 'react';
import AlphabetCard from '../components/AlphabetsCard'; 
import { TRACING_ITEMS } from '../data/TracingData'; 
import NavBar from '../components/Navbar';

const URDU_AUDIO_MAP = {
    "ا": "alif", "ب": "ba", "ت": "taa", "ث": "tha", "ج": "jeem", 
    "ح": "haa", "خ": "khaa", "د": "dal", "ذ": "dhal", "ر": "raa", 
    "ز": "jaa", "س": "seen", "ش": "sheen", "ص": "saad", "ض": "dhaad", 
    "ط": "toa", "ظ": "dhaa", "ع": "ain", "غ": "ghain", "ف": "faa", 
    "ق": "qaaf", "ک": "kaaf", "ل": "laam", "م": "meem", "ن": "noon", 
    "و": "waw", "ھ": "ha", "ء": "hamza", "ی": "yaa",
};

export default function UrduPage() {
    const categoryId = 'urdu';
    const items = TRACING_ITEMS[categoryId].items; 

    const handleItemClick = (item) => {
        const fileName = URDU_AUDIO_MAP[item];
        if (fileName) {
            const audio = new Audio(`/sounds/${fileName}.mp3`);
            audio.play().catch((err) => {
                console.error("Voice play failed. Check if file exists in public/sounds/", err);
            });
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-indigo-200 via-cyan-100 to-purple-200 p-4 md:p-8">
            <NavBar themeColor="text-indigo-900" />
            
            <header className="text-center mt-5 mb-8">
                <h1 className="text-4xl md:text-6xl font-extrabold text-indigo-900 tracking-tight drop-shadow-md">
                    حروف تہجی سیکھیں
                </h1>
                <p className="text-lg text-indigo-700 font-semibold mt-2">
                    کسی بھی حرف پر کلک کریں اور آواز سنیں!
                </p>
            </header>
            <div className="bg-white/30 backdrop-blur-xl p-6 md:p-10 rounded-[40px] shadow-2xl max-w-6xl w-full border border-white/40 mb-10" dir="rtl">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                    {items.map((item) => (
                        <AlphabetCard
                            key={item}
                            letter={item} 
                            onClick={() => handleItemClick(item)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}