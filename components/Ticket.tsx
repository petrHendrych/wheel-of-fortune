"use client";

import React from "react";

interface TicketProps {
  title: string;
  subtitle?: string;
  date: string;
  location: string;
  type: string;
  id: string;
  className?: string;
  onClose?: () => void;
}

const Ticket: React.FC<TicketProps> = ({
  title,
  subtitle = "Live in Concert",
  date,
  location,
  type,
  id,
  className = "",
}) => {
  const qrPattern = React.useMemo(() => {
    // eslint-disable-next-line react-hooks/purity
    return Array.from({ length: 36 }).map(() => Math.random() > 0.4);
  }, []);

  return (
    <div className={`relative animate-win-popup pointer-events-auto w-full max-w-[95vw] md:max-w-none flex flex-col md:landscape:flex-row shadow-[0_0_50px_rgba(236,72,153,0.3)] ${className}`}>
      {/* Main Info Section (80%) */}
      <div className="relative bg-white text-slate-900 p-6 md:p-10 rounded-t-3xl md:landscape:rounded-tr-none md:landscape:rounded-l-3xl flex-grow flex flex-col items-center text-center justify-between min-w-0 md:landscape:min-w-[700px] lg:landscape:min-w-[800px] overflow-hidden group">
        {/* Half circle cutouts (right side - divider counterpart) */}
        <div className="absolute top-0 -right-4 w-8 h-8 bg-slate-950 rounded-full hidden md:landscape:block z-20"></div>
        <div className="absolute bottom-0 -right-4 w-8 h-8 bg-slate-950 rounded-full hidden md:landscape:block z-20"></div>
        
        <div className="relative z-10 w-full">
          <div className="flex justify-between items-start mb-6">
            <span className="text-xs font-black uppercase tracking-[0.3em] text-pink-600">Concert Ticket</span>
            <span className="text-xs font-mono text-slate-400">#{id}</span>
          </div>
          
          <h3 className="font-playfair text-5xl sm:text-7xl md:text-9xl font-black text-slate-900 mb-2 leading-none">
            {title}
          </h3>
          <p className="text-lg md:text-2xl font-bold text-pink-500 uppercase tracking-widest mb-6">
            {subtitle}
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap justify-center gap-12 md:gap-20 pt-6 border-t border-slate-100 w-full">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">Date</span>
            <span className="text-lg md:text-xl font-bold font-mono">{date}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">Place</span>
            <span className="text-lg md:text-xl font-bold font-mono">{location}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">Type</span>
            <span className="text-lg md:text-xl font-bold font-mono">{type}</span>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-pink-100 rounded-full opacity-50 blur-3xl"></div>
      </div>

      {/* Divider with dashed line (visual only) */}
      <div className="relative hidden md:landscape:flex flex-col items-center justify-between py-4 bg-white border-l-2 border-dashed border-slate-200 w-0">
      </div>

      {/* Scanning Section (20%) */}
      <div className="relative bg-slate-50 p-8 md:landscape:w-80 rounded-b-3xl md:landscape:rounded-bl-none md:landscape:rounded-r-3xl flex flex-col items-center justify-center border-t-2 border-dashed border-slate-200 md:landscape:border-t-0 overflow-hidden">
        {/* Half circle cutouts (top side - mobile) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 w-8 h-8 bg-slate-950 rounded-full md:landscape:hidden z-20"></div>
        
        {/* Half circle cutouts (left side - desktop divider counterpart) */}
        <div className="absolute top-0 -left-4 w-8 h-8 bg-slate-950 rounded-full hidden md:landscape:block z-20"></div>
        <div className="absolute bottom-0 -left-4 w-8 h-8 bg-slate-950 rounded-full hidden md:landscape:block z-20"></div>

        <div className="w-full aspect-square bg-white p-4 shadow-inner mb-6 flex items-center justify-center border border-slate-200 rounded-xl">
          {/* Mock QR Code */}
          <div className="grid grid-cols-6 grid-rows-6 gap-0.5 w-full h-full opacity-80">
            {qrPattern.map((isDark, i) => (
              <div key={i} className={`w-full h-full ${isDark ? 'bg-slate-900' : 'bg-transparent'}`}></div>
            ))}
          </div>
        </div>
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] font-bold">SCAN FOR ENTRY</span>
      </div>
    </div>
  );
};

export default Ticket;
