import React from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { Logo } from '@/components/shared/Logo';
import { motion } from 'framer-motion';

export const AuthLayout: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-950 text-slate-100 gradient-mesh selection:bg-indigo-500 selection:text-white">
      {/* Background Animated Floating Orbs */}
      <motion.div
        className="orb w-96 h-96 bg-violet-600/30 top-[-10%] left-[-10%]"
        animate={{
          x: [0, 40, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="orb w-96 h-96 bg-indigo-600/30 bottom-[-10%] right-[-10%]"
        animate={{
          x: [0, -30, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Header Bar */}
      <header className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-20 max-w-7xl mx-auto w-full">
        <Logo size="md" />
        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </header>

      {/* Main Form Slot */}
      <div className="relative z-10 w-full max-w-md p-4">
        <Outlet />
      </div>

      {/* Footer Branding */}
      <footer className="absolute bottom-4 text-center text-xs text-slate-400 z-10">
        © {new Date().getFullYear()} AICTE Model Curriculum Portal — Powered by CurriCraft AI
      </footer>
    </div>
  );
};
