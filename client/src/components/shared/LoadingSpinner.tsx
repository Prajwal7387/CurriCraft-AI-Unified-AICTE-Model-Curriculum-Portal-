import React from 'react';
import { Logo } from './Logo';

interface LoadingSpinnerProps {
  fullScreen?: boolean;
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  fullScreen = false,
  message = 'Loading CurriCraft AI...',
}) => {
  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      <Logo size="lg" showText={false} />
      <div className="relative flex items-center justify-center">
        <div className="h-10 w-10 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
      </div>
      {message && <p className="text-sm font-medium text-muted-foreground animate-pulse">{message}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md">
        {content}
      </div>
    );
  }

  return <div className="p-8 flex justify-center">{content}</div>;
};
