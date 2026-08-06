import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { authApi } from '@/services/auth.service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Lock, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export const ResetPasswordPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState(location.state?.email || '');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !otp || !newPassword) {
      toast.error('Please fill out all fields');
      return;
    }

    try {
      setIsLoading(true);
      await authApi.resetPassword({ email, otp, newPassword });
      toast.success('Password reset successfully! Please log in.');
      navigate('/login');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Password reset failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="glass-dark border-white/10 shadow-2xl text-white backdrop-blur-2xl">
      <CardHeader className="space-y-1 text-center pb-4">
        <div className="mx-auto w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 mb-2">
          <Lock className="w-6 h-6" />
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight">Set New Password</CardTitle>
        <CardDescription className="text-slate-400 text-xs">
          Enter the OTP sent to your email along with your new password
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-slate-900/60 border-slate-800 text-white placeholder:text-slate-500"
          />

          <Input
            type="text"
            maxLength={6}
            placeholder="6-Digit Reset OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="bg-slate-900/60 border-slate-800 text-white font-mono tracking-widest placeholder:tracking-normal text-center placeholder:text-slate-500"
          />

          <Input
            type="password"
            placeholder="New Strong Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="bg-slate-900/60 border-slate-800 text-white placeholder:text-slate-500"
          />

          <Button
            type="submit"
            variant="gradient"
            size="lg"
            className="w-full mt-2 font-semibold shadow-indigo-500/25"
            isLoading={isLoading}
          >
            Update Password <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
