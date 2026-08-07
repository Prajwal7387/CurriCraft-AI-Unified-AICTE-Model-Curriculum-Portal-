import React from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { Logo } from '@/components/shared/Logo';
import MagicRings from '@/components/ui/MagicRings';

export const AuthLayout: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background text-foreground selection:bg-orange-500 selection:text-white">
      {/* Background Animated Rings */}
      <div className="absolute inset-0 z-0 opacity-50 dark:opacity-80">
        <MagicRings
          color="#ea580c"
          colorTwo="#eab308"
          ringCount={8}
          speed={0.8}
          attenuation={12}
          lineThickness={1.5}
          baseRadius={0.15}
          radiusStep={0.12}
          scaleRate={0.05}
          opacity={1}
          blur={0}
          noiseAmount={0.03}
          rotation={0}
          ringGap={1.3}
          followMouse={true}
          mouseInfluence={0.15}
          hoverScale={1.05}
        />
      </div>

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
      <footer className="absolute bottom-4 text-center text-xs text-muted-foreground z-10">
        © {new Date().getFullYear()} AICTE Model Curriculum Portal — Powered by CurriCraft AI
      </footer>
    </div>
  );
};
