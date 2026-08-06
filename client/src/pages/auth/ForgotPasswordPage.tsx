import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '@/services/auth.service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { KeyRound, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    try {
      setIsLoading(true);
      await authApi.forgotPassword({ email });
      toast.success('If an account exists, a reset code was sent.');
      navigate('/reset-password', { state: { email } });
    } catch (err: any) {
      toast.error('Request failed. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="glass-dark border-white/10 shadow-2xl text-white backdrop-blur-2xl">
      <CardHeader className="space-y-1 text-center pb-4">
        <div className="mx-auto w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 mb-2">
          <KeyRound className="w-6 h-6" />
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight">Forgot Password?</CardTitle>
        <CardDescription className="text-slate-400 text-xs">
          Enter your registered email to receive a password reset code
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="officer@aicte-india.org"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-slate-900/60 border-slate-800 text-white placeholder:text-slate-500"
          />

          <Button
            type="submit"
            variant="gradient"
            size="lg"
            className="w-full font-semibold shadow-indigo-500/25"
            isLoading={isLoading}
          >
            Send Reset Code <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <div className="text-center pt-2">
            <Link to="/login" className="text-xs text-slate-400 hover:text-white transition-colors">
              Back to Sign In
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
