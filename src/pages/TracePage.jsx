import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import TracingCanvas from "../components/TracingCanvas";
import { getTracingData } from "../data/TracingData";
import NavBar from "../components/Navbar";

export default function TracePage() {
    const { categoryId, item } = useParams();
    const navigate = useNavigate();
    const tracingData = getTracingData(categoryId, item);

    if (!tracingData) {
        return (
            <div className="min-h-screen flex items-center justify-center font-bold text-indigo-900">
                Item Not Found!
            </div>
        );
    }

    const { categoryTitle, currentItem, nextItem, prevItem, backPath } = tracingData;

    // 🔊 SIMPLE VOICE HANDLER
    const speak = (text) => {
        if (!("speechSynthesis" in window)) return;

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US";
        utterance.rate = 0.9;
        utterance.pitch = 1.1;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
    };

    return (
        <div className="h-screen max-h-screen flex flex-col items-center bg-gradient-to-br from-indigo-200 via-cyan-100 to-purple-200 p-2 md:p-4 overflow-hidden">
            <NavBar themeColor="text-indigo-900" backPath={backPath} />

            {/* HEADER */}
            <header className="text-center mt-5 mb-2">
                <h1 className="text-indigo-900  text-2xl md:text-4xl font-black text-indigo-900 drop-shadow-sm ">
                    Tracing {categoryTitle}  {currentItem}
                </h1>
            </header>

            {/* TRACING AREA */}
            <div className="bg-white/30 backdrop-blur-xl p-3 md:p-5 rounded-[30px] shadow-2xl max-w-lg w-full border border-white/40 flex flex-col items-center flex-shrink min-h-0">
                <TracingCanvas
                    item={currentItem}
                    categoryId={categoryId}
                    height={350}
                    prevItem={prevItem}
                    nextItem={nextItem}
                    onSuccess={() => speak("Great job! Well done")}
                    onFail={() => speak("Try again")}
                />
            </div>

            {/* BOTTOM NAV */}
            <div className="flex justify-between w-full max-w-lg mt-4 gap-4 mb-2">
                <button
                    disabled={!prevItem}
                    onClick={() => navigate(`/trace/${categoryId}/${prevItem}`)}
                    className="flex-1 bg-white/50 backdrop-blur-md border-2 border-white py-3 rounded-2xl font-black text-indigo-900 hover:bg-white transition-all shadow-md flex items-center justify-center gap-2 text-sm disabled:opacity-40"
                >
                    ◀ {prevItem}
                </button>

                <button
                    disabled={!nextItem}
                    onClick={() => navigate(`/trace/${categoryId}/${nextItem}`)}
                    className="flex-1 bg-indigo-900 py-3 rounded-2xl font-black text-white hover:bg-indigo-800 transition-all shadow-lg flex items-center justify-center gap-2 text-sm disabled:opacity-40"
                >
                    {nextItem} ▶
                </button>
            </div>
        </div>
    );
}
