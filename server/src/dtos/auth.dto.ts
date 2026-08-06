/**
 * Data Transfer Objects for authentication operations.
 * Define the shape of data flowing between layers.
 */

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
  department?: string;
  designation?: string;
  institution?: string;
  phone?: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface VerifyEmailDto {
  email: string;
  otp: string;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  email: string;
  otp: string;
  newPassword: string;
}

export interface RefreshTokenDto {
  refreshToken: string;
}

export interface AuthTokensDto {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
}

export interface GoogleAuthDto {
  googleId: string;
  email: string;
  name: string;
  avatar?: string;
}
