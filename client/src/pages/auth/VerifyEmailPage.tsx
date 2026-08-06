import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { authApi } from '@/services/auth.service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { MailCheck, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export const VerifyEmailPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const emailFromState = location.state?.email || '';

  const [email, setEmail] = useState(emailFromState);
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !otp) {
      toast.error('Please fill both Email and OTP fields');
      return;
    }

    try {
      setIsLoading(true);
      await authApi.verifyEmail({ email, otp });
      toast.success('Email verified successfully! You can now log in.');
      navigate('/login');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      toast.error('Please enter your email to resend OTP');
      return;
    }
    try {
      await authApi.resendOtp(email);
      toast.success('New OTP sent to your email.');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to resend OTP');
    }
  };

  return (
    <Card className="glass-dark border-white/10 shadow-2xl text-white backdrop-blur-2xl">
      <CardHeader className="space-y-1 text-center pb-4">
        <div className="mx-auto w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-2">
          <MailCheck className="w-6 h-6" />
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight">Verify Your Email</CardTitle>
        <CardDescription className="text-slate-400 text-xs">
          Enter the 6-digit OTP code sent to your registered email
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleVerify} className="space-y-4">
          <div className="space-y-1.5">
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-slate-900/60 border-slate-800 text-white placeholder:text-slate-500"
            />
          </div>

          <div className="space-y-1.5">
            <Input
              type="text"
              maxLength={6}
              placeholder="Enter 6-Digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="bg-slate-900/60 border-slate-800 text-white text-center text-lg font-mono tracking-widest placeholder:tracking-normal placeholder:text-sm placeholder:text-slate-500"
            />
          </div>

          <Button
            type="submit"
            variant="gradient"
            size="lg"
            className="w-full font-semibold shadow-indigo-500/25"
            isLoading={isLoading}
          >
            Verify Email <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={handleResend}
              className="text-xs text-indigo-400 hover:underline"
            >
              Didn't receive code? Resend OTP
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
