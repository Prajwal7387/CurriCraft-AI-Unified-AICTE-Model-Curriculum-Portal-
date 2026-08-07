import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { User, Mail, Lock, Building, UserCheck, Phone, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email address'),
  password: z
    .string()
    .min(8, 'Minimum 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Must contain uppercase, lowercase, number & special char'
    ),
  institution: z.string().optional(),
  department: z.string().optional(),
  designation: z.string().optional(),
  phone: z.string().optional(),
  role: z.string().optional(),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export const RegisterPage: React.FC = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      setIsLoading(true);
      await registerUser(values);
      toast.success('Registration successful! You can now log in.');
      navigate('/login', { state: { email: values.email } });
    } catch (err: any) {
      const responseData = err.response?.data;
      if (responseData?.errors && Array.isArray(responseData.errors)) {
        // Handle Zod validation errors from backend
        toast.error(`Validation error: ${responseData.errors[0].message}`);
      } else {
        toast.error(responseData?.message || 'Registration failed. Try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="glass-dark border-border/50 shadow-2xl backdrop-blur-2xl max-w-lg mx-auto">
      <CardHeader className="space-y-1 text-center pb-4">
        <CardTitle className="text-2xl font-bold tracking-tight">Expert Registration</CardTitle>
        <CardDescription className="text-muted-foreground text-xs">
          Join AICTE Model Curriculum Development Panel
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground" required>Full Name</Label>
            <Input
              placeholder="Dr. Rajesh Sharma"
              icon={<User className="h-4 w-4" />}
              error={errors.name?.message}
              className="bg-muted/60 border-border text-foreground placeholder:text-muted-foreground/60"
              {...register('name')}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground" required>Official Email</Label>
              <Input
                type="email"
                placeholder="rajesh@iit.ac.in"
                icon={<Mail className="h-4 w-4" />}
                error={errors.email?.message}
                className="bg-muted/60 border-border text-foreground placeholder:text-muted-foreground/60"
                {...register('email')}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground" required>Password</Label>
              <Input
                type="password"
                placeholder="••••••••"
                icon={<Lock className="h-4 w-4" />}
                error={errors.password?.message}
                className="bg-muted/60 border-border text-foreground placeholder:text-muted-foreground/60"
                {...register('password')}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Institution / University</Label>
              <Input
                placeholder="IIT Delhi"
                icon={<Building className="h-4 w-4" />}
                className="bg-muted/60 border-border text-foreground placeholder:text-muted-foreground/60"
                {...register('institution')}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Department</Label>
              <Input
                placeholder="Computer Science"
                icon={<UserCheck className="h-4 w-4" />}
                className="bg-muted/60 border-border text-foreground placeholder:text-muted-foreground/60"
                {...register('department')}
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Account Role (Demo Only)</Label>
            <select
              className="flex h-10 w-full rounded-md border bg-muted/60 border-border text-foreground px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
              {...register('role')}
            >
              <option value="CURRICULUM_EXPERT">Curriculum Expert</option>
              <option value="AICTE_ADMIN">AICTE Admin</option>
              <option value="BUREAU_HEAD">Bureau Head</option>
              <option value="REVIEWER">Reviewer</option>
              <option value="PUBLIC_VIEWER">Public Viewer</option>
            </select>
          </div>

          <Button
            type="submit"
            variant="gradient"
            size="lg"
            className="w-full mt-4 font-semibold shadow-indigo-500/25"
            isLoading={isLoading}
          >
            Create Account <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </CardContent>

      <CardFooter className="justify-center border-t border-border/50 pt-4 text-xs text-muted-foreground">
        Already registered?{' '}
        <Link to="/login" className="text-primary hover:underline font-semibold ml-1">
          Sign In
        </Link>
      </CardFooter>
    </Card>
  );
};
