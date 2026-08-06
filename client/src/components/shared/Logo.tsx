import React from 'react';

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
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-purple-500 font-bold text-white shadow-lg shadow-indigo-500/25 ${sizeMap[size]}`}>
        <svg
          className="w-3/5 h-3/5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
          <path d="m9 9.5 2 2 4-4" />
        </svg>
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
        </span>
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className="font-bold tracking-tight text-foreground flex items-center gap-1">
            CurriCraft <span className="gradient-text font-black">AI</span>
          </span>
          <span className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase -mt-1">
            AICTE Model Portal
          </span>
        </div>
      )}
    </div>
  );
};
