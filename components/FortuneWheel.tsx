"use client";

import React, { useMemo, useState, useCallback } from "react";

interface FortuneWheelProps {
  isVisible: boolean;
  onSpinEnd?: (prize: string) => void;
}

const FortuneWheel: React.FC<FortuneWheelProps> = ({ isVisible, onSpinEnd }) => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const segments = 24;
  const colors = ["#FFC0CB", "#FFF44F"]; // Baby Pink and Light Limoncelo Yellow
  
  const randomTexts = useMemo(() => {
    const texts = [
      "INNA concert tickets", "Mega Prize", "Gold Medal", "Mystery Box", "Super Star",
      "Bonus Spin", "Jackpot!", "Lucky Charm", "Grand Prize", "Diamond",
      "Ruby Jewel", "Emerald", "Platinum", "Silver Coin", "Secret Gift",
      "Mega Deal", "Rare Loot", "Shiny Gem", "Big Fortune", "Treasure",
      "Vortex", "Nebula", "Cosmic", "Galactic"
    ];
    // Fill up to 24 segments
    const fullList = Array.from({ length: segments }, (_, i) => texts[i % texts.length]);
    // Shuffle the list to make "INNA" (and others) appear in a random tile
    return fullList.sort(() => Math.random() - 0.5);
  }, []);

  const innaIndex = useMemo(() => randomTexts.indexOf("INNA concert tickets"), [randomTexts]);

  const handleSpin = useCallback(() => {
    if (isSpinning) return;

    // We don't need to manually set isSpinning for the transition to work anymore,
    // but it's still useful to prevent multiple clicks and potentially for UI state.
    setIsSpinning(true);
    
    const segmentAngle = 360 / segments;
    const targetOffset = 360 - (innaIndex * segmentAngle + segmentAngle / 2);
    
    // Add 5-10 full rotations for effect
    const extraRotations = (5 + Math.floor(Math.random() * 5)) * 360;
    const newRotation = rotation + extraRotations + targetOffset - (rotation % 360);
    
    setRotation(newRotation);

    // After animation duration (5s), allow spinning again
    setTimeout(() => {
      setIsSpinning(false);
      if (onSpinEnd) {
        onSpinEnd("INNA concert tickets");
      }
    }, 5000);
  }, [isSpinning, innaIndex, rotation, onSpinEnd]);

  if (!isVisible) return null;
  
  return (
    <div className="relative w-[80vmin] h-[80vmin] sm:w-[85vmin] sm:h-[85vmin] max-w-full max-h-full flex items-center justify-center transition-transform duration-500 ease-out">
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full rounded-full shadow-2xl border-4 border-white/20 animate-wheel-in"
      >
        <defs>
          <filter id="inset-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feComponentTransfer in="SourceAlpha">
              <feFuncA type="table" tableValues="1 0" />
            </feComponentTransfer>
            <feGaussianBlur stdDeviation="1.5" />
            <feOffset dx="0" dy="1.5" result="offsetblur" />
            <feFlood floodColor="black" floodOpacity="0.6" result="color" />
            <feComposite in2="offsetblur" operator="in" />
            <feComposite in2="SourceAlpha" operator="in" />
            <feMerge>
              <feMergeNode in="SourceGraphic" />
              <feMergeNode />
            </feMerge>
          </filter>
        </defs>
        <g 
          className="transition-transform duration-[5s] ease-[cubic-bezier(0.1,0,0,1)]"
          style={{ 
            transform: `rotate(${-90 + rotation}deg)`,
            transformOrigin: "50px 50px" 
          }}
        >
          {Array.from({ length: segments }).map((_, i) => {
            const angle = 360 / segments;
            const startAngle = i * angle;
            const endAngle = (i + 1) * angle;
            
            // Convert polar to cartesian
            const x1 = 50 + 50 * Math.cos((startAngle * Math.PI) / 180);
            const y1 = 50 + 50 * Math.sin((startAngle * Math.PI) / 180);
            const x2 = 50 + 50 * Math.cos((endAngle * Math.PI) / 180);
            const y2 = 50 + 50 * Math.sin((endAngle * Math.PI) / 180);
            
            const largeArcFlag = angle > 180 ? 1 : 0;
            const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
            
            return (
              <g key={i}>
                <path
                  d={pathData}
                  fill={colors[i % 2]}
                  stroke="rgba(0,0,0,0.1)"
                  strokeWidth="0.2"
                />
                <g transform={`rotate(${startAngle + angle / 2} 50 50)`}>
                  <text
                    x="94"
                    y="50"
                    fill="rgba(0,0,0,0.5)"
                    fontSize="5"
                    fontWeight="bold"
                    textAnchor="end"
                    alignmentBaseline="middle"
                    className="blur-[0.8px] select-none"
                    transform={`rotate(0 94 50)`}
                  >
                    {randomTexts[i]}
                  </text>
                </g>
              </g>
            );
          })}
        </g>
        {/* Center SPIN Button */}
        <g 
          className={`transition-transform duration-150 ${isSpinning ? 'pointer-events-none opacity-80' : 'cursor-pointer hover:scale-110 active:scale-95'}`}
          style={{ 
            transformOrigin: "50px 50px", 
            filter: "url(#inset-shadow)" 
          }}
          onClick={handleSpin}
        >
          <circle 
            cx="50" 
            cy="50" 
            r="9" 
            fill="#A52A2A" 
            stroke="white" 
            strokeWidth="1.2"
          />
          <text
            x="50"
            y="50.5"
            fill="white"
            fontSize="3.5"
            stroke="white"
            strokeWidth="0.1"
            fontWeight="900"
            textAnchor="middle"
            alignmentBaseline="central"
            className="select-none font-sans"
          >
            SPIN
          </text>
        </g>
      </svg>
      {/* Pointer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 z-10">
        <svg viewBox="0 0 24 24" fill="white" className="drop-shadow-md">
          <path d="M12 21l-8-14h16l-8 14z" />
        </svg>
      </div>
    </div>
  );
};

export default FortuneWheel;
