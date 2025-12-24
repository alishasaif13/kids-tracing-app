import React, { useEffect } from 'react'; // useEffect add kiya
import { useNavigate } from 'react-router-dom';
import AlphabetCard from '../components/AlphabetsCard'; 
import { TRACING_ITEMS } from '../data/TracingData';


export default function LettersPage() {
    const navigate = useNavigate();
    const categoryId = 'letters';
    const items = TRACING_ITEMS[categoryId]?.items || []; 

    // Keyboard Support: Direct Navigation
    useEffect(() => {
        const handleKeyDown = (event) => {
            const key = event.key.toUpperCase();
            
            // Check karein ke dabi hui key letters ki list (items) mein mojud hai ya nahi
            if (items.includes(key)) {
                navigate(`/trace/letters/${key}`);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [items, navigate]); // Dependencies add ki hain safety ke liye

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-indigo-200 via-cyan-100 to-purple-200 p-4 md:p-8">
            
            <header className="text-center mt-3 mb-8">
                <h1 className="text-4xl md:text-6xl font-extrabold text-indigo-900 tracking-tight drop-shadow-md">
                    Trace Alphabets
                </h1>
                <p className="text-lg text-indigo-700 font-medium mt-2">
                    Pick a letter or press it on your keyboard to start tracing! 
                </p>
            </header>
            
            <div className="bg-white/30 backdrop-blur-xl p-6 md:p-10 rounded-[40px] shadow-2xl max-w-6xl w-full border border-white/40 mb-10">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                    {items.map((item) => (
                        <AlphabetCard
                            key={item}
                            letter={item} 
                            onClick={() => navigate(`/trace/letters/${item}`)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}