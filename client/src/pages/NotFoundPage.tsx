import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, AlertCircle } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-background">
      <div className="mx-auto w-16 h-16 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mb-4">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight mb-2">404 - Page Not Found</h1>
      <p className="text-muted-foreground text-sm max-w-md mb-6">
        The curriculum resource or portal section you requested could not be located.
      </p>
      <Link to="/dashboard">
        <Button variant="gradient" className="gap-2">
          <Home className="w-4 h-4" /> Return to Dashboard
        </Button>
      </Link>
    </div>
  );
};
