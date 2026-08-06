import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

const loginSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      setIsLoading(true);
      await login(values.email, values.password);
      toast.success('Welcome back to CurriCraft AI!');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Login failed. Please check credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="glass-dark border-white/10 shadow-2xl text-white backdrop-blur-2xl">
      <CardHeader className="space-y-1 text-center pb-4">
        <div className="mx-auto w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary mb-2">
          <ShieldCheck className="w-6 h-6 text-indigo-400" />
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight">Portal Sign In</CardTitle>
        <CardDescription className="text-slate-400 text-xs">
          Access AICTE Curriculum Engine & Governance Workspace
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs text-slate-300">Official Email</Label>
            <Input
              type="email"
              placeholder="officer@aicte-india.org"
              icon={<Mail className="h-4 w-4" />}
              error={errors.email?.message}
              className="bg-slate-900/60 border-slate-800 text-white placeholder:text-slate-500"
              {...register('email')}
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-slate-300">Password</Label>
              <Link
                to="/forgot-password"
                className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              type="password"
              placeholder="••••••••"
              icon={<Lock className="h-4 w-4" />}
              error={errors.password?.message}
              className="bg-slate-900/60 border-slate-800 text-white placeholder:text-slate-500"
              {...register('password')}
            />
          </div>

          <Button
            type="submit"
            variant="gradient"
            size="lg"
            className="w-full mt-2 font-semibold shadow-indigo-500/25"
            isLoading={isLoading}
          >
            Sign In to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-3 text-center border-t border-white/5 pt-4 text-xs text-slate-400">
        <div>
          Don't have an expert account?{' '}
          <Link to="/register" className="text-indigo-400 hover:underline font-semibold">
            Register here
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};
