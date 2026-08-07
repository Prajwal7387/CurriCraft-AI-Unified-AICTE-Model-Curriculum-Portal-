import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showText = true }) => {
  const sizeMap = {
    sm: 'h-7 w-7 text-sm',
    md: 'h-9 w-9 text-base',
    lg: 'h-12 w-12 text-xl',
  };

  return (
    <Link to="/" className={`flex items-center gap-2.5 hover:opacity-80 transition-opacity ${className}`}>
      <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-tr from-orange-600 via-amber-500 to-yellow-400 font-bold text-white shadow-lg shadow-orange-500/25 ${sizeMap[size]}`}>
        <svg
          className="w-3/5 h-3/5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Sun/Gear Rays representing the AICTE outer gear */}
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
          {/* Inner Flame representing the AICTE Diya */}
          <path d="M12 18a4 4 0 0 0 4-4c0-3-4-6-4-8-4 2-4 5-4 8a4 4 0 0 0 4 4Z" />
        </svg>
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400"></span>
        </span>
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className="font-bold tracking-tight text-foreground flex items-center gap-1">
            CurriCraft <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent font-black">AI</span>
          </span>
          <span className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase -mt-1">
            AICTE Model Portal
          </span>
        </div>
      )}
    </Link>
  );
};
