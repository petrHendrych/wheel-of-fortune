"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import FortuneWheel from "@/components/FortuneWheel";

export default function Home() {
  const [isPartyActive, setIsPartyActive] = useState(true);
  const [showWheel, setShowWheel] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [winResult, setWinResult] = useState<string | null>(null);

  const sparkles = [
    { top: "10%", left: "10%", delay: "0s" },
    { top: "20%", left: "80%", delay: "0.5s" },
    { top: "80%", left: "15%", delay: "1.2s" },
    { top: "70%", left: "85%", delay: "0.8s" },
    { top: "40%", left: "5%", delay: "1.5s" },
    { top: "30%", left: "95%", delay: "0.2s" },
  ];

  useEffect(() => {
    if (!isPartyActive && !winResult) return;

    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0, gravity: 0.5 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval: any = setInterval(function () {
      // pastel colors
      const colors = ["#FFD1DC", "#FFB6C1", "#FFC0CB", "#E6E6FA", "#B0E0E6", "#F0FFF0"];

      // random fireworks across the whole screen
      confetti({
        ...defaults,
        particleCount: 40,
        origin: { x: Math.random(), y: Math.random() },
        colors: colors,
      });
    }, 250);

    return () => clearInterval(interval);
  }, [isPartyActive, winResult]);

  const handleClaimClick = () => {
    setIsTransitioning(true);
    setIsPartyActive(false);
    
    // 300ms transition as requested
    setTimeout(() => {
      setShowWheel(true);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div className="flex min-h-screen h-screen flex-col items-center justify-center bg-slate-950 px-4 text-center overflow-hidden">
      {!showWheel ? (
        <main className={`flex flex-col items-center justify-center mb-24 max-w-[90vw] relative transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          <div className="relative">
            {isPartyActive && sparkles.map((s, i) => (
              <div
                key={i}
                className="absolute animate-sparkle pointer-events-none"
                style={{
                  top: s.top,
                  left: s.left,
                  animationDelay: s.delay,
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="#FFC0CB" />
                </svg>
              </div>
            ))}
            <h1 className="font-playfair text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white mb-6 drop-shadow-[0_0_20px_rgba(255,182,193,0.7)] bg-clip-text text-transparent bg-gradient-to-r from-pink-100 via-white to-pink-100 leading-tight">
              Congratulations you won!
            </h1>
          </div>
          <p className="text-lg md:text-2xl text-pink-50/80 mb-12 max-w-2xl font-light">
            Click the button below to collect your prize!
          </p>
          <button
            onClick={handleClaimClick}
            className="bg-[#FFC0CB] hover:bg-[#FFB6C1] hover:cursor-pointer text-slate-950 font-bold py-4 px-10 rounded-full text-xl md:text-2xl shadow-[0_0_20px_rgba(255,192,203,0.3)] animate-bounce transition-transform hover:scale-105 active:scale-95"
          >
            Claim now
          </button>
        </main>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full max-h-screen p-4 overflow-hidden gap-8">
          <div className="w-full text-center hidden portrait:block animate-wheel-in">
            <h2 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 drop-shadow-[0_0_15px_rgba(255,182,193,0.5)] bg-clip-text text-transparent bg-gradient-to-r from-pink-100 via-white to-pink-100 sm:whitespace-nowrap">
              Welcome to fortune wheel!
            </h2>
            <p className="text-lg md:text-2xl lg:text-3xl text-pink-50/80 font-light sm:whitespace-nowrap">
              Click the button in the middle to spin the wheel to see your prize.
            </p>
          </div>
          <div className="flex-shrink-0 flex items-center justify-center pb-8 max-h-full">
            <FortuneWheel isVisible={showWheel} onSpinEnd={setWinResult} />
          </div>
        </div>
      )}

      {winResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-4 md:p-10">
          <div className="bg-slate-900/90 backdrop-blur-md border-2 border-pink-500/50 p-10 md:p-20 rounded-[3rem] shadow-[0_0_50px_rgba(236,72,153,0.3)] animate-win-popup pointer-events-auto w-fit max-w-full text-center mx-auto">
            <h3 className="font-playfair text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 drop-shadow-[0_0_15px_rgba(255,182,193,0.8)] bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-white to-pink-300 leading-tight whitespace-nowrap">
              {winResult}
            </h3>
            <p className="text-pink-100 text-xl md:text-2xl mt-4 font-medium opacity-80">
              Congratulations on your amazing prize! Tickets will be handed to you shortly.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
