import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { store } from '@/store';
import { AppRoutes } from '@/routes';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import { useAuth } from '@/hooks/useAuth';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const AuthInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { checkAuth } = useAuth();

  useEffect(() => {
    // Synchronize Theme class on HTML element on startup
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    checkAuth();
  }, [checkAuth]);

  return <>{children}</>;
};

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <AuthInitializer>
              <AppRoutes />
              <Toaster position="top-right" richColors closeButton />
            </AuthInitializer>
          </BrowserRouter>
        </QueryClientProvider>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
