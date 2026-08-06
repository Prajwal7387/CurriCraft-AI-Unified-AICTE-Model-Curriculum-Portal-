import crypto from 'crypto';

/**
 * Generate a secure numeric OTP of the specified length.
 * Uses crypto.randomInt for cryptographically secure randomness.
 */
export const generateOtp = (length: number = 6): string => {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  return crypto.randomInt(min, max + 1).toString();
};

/**
 * Generate a secure random token (hex string).
 * Used for email verification tokens, password reset tokens, etc.
 */
export const generateToken = (bytes: number = 32): string => {
  return crypto.randomBytes(bytes).toString('hex');
};
