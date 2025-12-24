import React, { useEffect } from 'react'; // useEffect add kiya
import AlphabetCard from '../components/AlphabetsCard';
export default function LearningAlphabets() {
    const alphabets = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

    const playSound = (letter) => {
        // 1. Pehle se chalti hui ya queue mein mojud sari awazon ko khatam karo
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(letter);
        utterance.lang = 'en-US';
        utterance.rate = 0.7; 
        
        // 2. Ab nayi awaz play karo
        window.speechSynthesis.speak(utterance);
    };

    // Keyboard Support Logic
    useEffect(() => {
        const handleKeyDown = (event) => {
            const key = event.key.toUpperCase(); // Takki 'a' aur 'A' dono se sound chale
            
            // Check karein ke dabi hui key A-Z ke darmiyan hai ya nahi
            if (key >= 'A' && key <= 'Z' && key.length === 1) {
                playSound(key);
            }
        };

        // Window par listener lagaya
        window.addEventListener('keydown', handleKeyDown);

        // Cleanup: Jab user page se jaye toh listener khatam ho jaye
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []); // Empty array ka matlab hai ye sirf page load hone pe chalega

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-indigo-200 via-cyan-100 to-purple-200 p-4 md:p-8">
            <header className="text-center mt-3 mb-8">
                <h1 className="text-4xl md:text-6xl font-extrabold text-indigo-900 tracking-tight drop-shadow-md">
                    Learn Alphabets
                </h1>
                <p className="text-lg text-indigo-700 font-medium mt-2">
                    Click a letter or press your keyboard to hear its sound! 
                </p>
            </header>

            <div className="bg-white/30 backdrop-blur-xl p-6 md:p-10 rounded-[40px] shadow-2xl max-w-6xl w-full border border-white/40 mb-10">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                    {alphabets.map(letter => (
                        <AlphabetCard 
                            key={letter} 
                            letter={letter} 
                            onClick={() => playSound(letter)} 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}