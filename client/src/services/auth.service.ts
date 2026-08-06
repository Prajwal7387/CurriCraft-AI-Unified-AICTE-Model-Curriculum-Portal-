import api from '@/lib/axios';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  department?: string;
  designation?: string;
  institution?: string;
  phone?: string;
}

export interface VerifyEmailPayload {
  email: string;
  otp: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  email: string;
  otp: string;
  newPassword: string;
}

/**
 * Auth API service — all auth-related HTTP calls.
 */
export const authApi = {
  register: (data: RegisterPayload) =>
    api.post('/auth/register', data),

  verifyEmail: (data: VerifyEmailPayload) =>
    api.post('/auth/verify-email', data),

  resendOtp: (email: string) =>
    api.post('/auth/resend-otp', { email }),

  login: (data: LoginPayload) =>
    api.post('/auth/login', data),

  refreshToken: (refreshToken: string) =>
    api.post('/auth/refresh-token', { refreshToken }),

  forgotPassword: (data: ForgotPasswordPayload) =>
    api.post('/auth/forgot-password', data),

  resetPassword: (data: ResetPasswordPayload) =>
    api.post('/auth/reset-password', data),

  logout: () =>
    api.post('/auth/logout'),

  getProfile: () =>
    api.get('/users/me'),
};
