import React from "react";

export default function Footer() {
  return (
    <footer className="mt-auto w-full bg-gradient-to-r from-purple-500 via-cyan-400 to-indigo-500">
      <div className="max-w-7xl mx-auto px-4 py-4 text-center">
        <p className="text-white font-semibold text-sm md:text-base">
          © {new Date().getFullYear()} Kids Fun Hub • Learn • Trace • Match
        </p>
      </div>
    </footer>
  );
}
