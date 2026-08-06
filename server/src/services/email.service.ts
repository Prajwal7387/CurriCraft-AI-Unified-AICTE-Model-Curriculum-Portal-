import nodemailer from 'nodemailer';
import { config } from '../config';
import { logger } from '../config/logger';

/**
 * Email service using Nodemailer with SMTP.
 * Sends OTP verification, password reset, and notification emails.
 */
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: config.smtp.port === 465,
      auth: {
        user: config.smtp.user,
        pass: config.smtp.pass,
      },
    });
  }

  /**
   * Send an email.
   */
  private async sendMail(
    to: string,
    subject: string,
    html: string
  ): Promise<void> {
    try {
      if (!config.smtp.user || !config.smtp.pass) {
        logger.warn(`📧 Email not configured. Would send to ${to}: ${subject}`);
        logger.info(`📧 Email body (dev mode):\n${html}`);
        return;
      }

      await this.transporter.sendMail({
        from: config.smtp.from,
        to,
        subject,
        html,
      });

      logger.info(`📧 Email sent to ${to}: ${subject}`);
    } catch (error) {
      logger.error(`Failed to send email to ${to}:`, error);
      // Don't throw — email failure should not block auth flow
    }
  }

  /**
   * Send email verification OTP.
   */
  async sendVerificationOtp(email: string, name: string, otp: string): Promise<void> {
    const html = `
      <div style="font-family: 'Inter', -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <div style="text-align: center; margin-bottom: 40px;">
          <h1 style="font-size: 28px; font-weight: 700; color: #1a1a2e; margin: 0;">
            CurriCraft AI
          </h1>
          <p style="color: #6b7280; margin-top: 8px;">Unified AICTE Model Curriculum Portal</p>
        </div>

        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 16px; padding: 32px; color: white; text-align: center; margin-bottom: 32px;">
          <h2 style="margin: 0 0 16px 0; font-size: 22px;">Verify Your Email</h2>
          <p style="margin: 0 0 24px 0; opacity: 0.9;">Hi ${name}, use the code below to verify your email address</p>
          <div style="background: rgba(255,255,255,0.2); border-radius: 12px; padding: 20px; font-size: 36px; letter-spacing: 8px; font-weight: 700;">
            ${otp}
          </div>
          <p style="margin: 24px 0 0 0; font-size: 14px; opacity: 0.7;">This code expires in ${config.otpExpiryMinutes} minutes</p>
        </div>

        <p style="color: #6b7280; font-size: 14px; text-align: center;">
          If you didn't request this verification, please ignore this email.
        </p>
      </div>
    `;

    await this.sendMail(email, 'Verify Your Email – CurriCraft AI', html);
  }

  /**
   * Send password reset OTP.
   */
  async sendPasswordResetOtp(email: string, name: string, otp: string): Promise<void> {
    const html = `
      <div style="font-family: 'Inter', -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <div style="text-align: center; margin-bottom: 40px;">
          <h1 style="font-size: 28px; font-weight: 700; color: #1a1a2e; margin: 0;">
            CurriCraft AI
          </h1>
          <p style="color: #6b7280; margin-top: 8px;">Unified AICTE Model Curriculum Portal</p>
        </div>

        <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); border-radius: 16px; padding: 32px; color: white; text-align: center; margin-bottom: 32px;">
          <h2 style="margin: 0 0 16px 0; font-size: 22px;">Reset Your Password</h2>
          <p style="margin: 0 0 24px 0; opacity: 0.9;">Hi ${name}, use the code below to reset your password</p>
          <div style="background: rgba(255,255,255,0.2); border-radius: 12px; padding: 20px; font-size: 36px; letter-spacing: 8px; font-weight: 700;">
            ${otp}
          </div>
          <p style="margin: 24px 0 0 0; font-size: 14px; opacity: 0.7;">This code expires in ${config.otpExpiryMinutes} minutes</p>
        </div>

        <p style="color: #6b7280; font-size: 14px; text-align: center;">
          If you didn't request a password reset, please secure your account immediately.
        </p>
      </div>
    `;

    await this.sendMail(email, 'Reset Your Password – CurriCraft AI', html);
  }

  /**
   * Send welcome email after successful verification.
   */
  async sendWelcomeEmail(email: string, name: string): Promise<void> {
    const html = `
      <div style="font-family: 'Inter', -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <div style="text-align: center; margin-bottom: 40px;">
          <h1 style="font-size: 28px; font-weight: 700; color: #1a1a2e; margin: 0;">
            CurriCraft AI
          </h1>
        </div>

        <div style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); border-radius: 16px; padding: 32px; color: white; text-align: center; margin-bottom: 32px;">
          <h2 style="margin: 0 0 16px 0; font-size: 22px;">Welcome, ${name}! 🎉</h2>
          <p style="margin: 0; opacity: 0.9;">Your account has been verified successfully. You can now start using CurriCraft AI to build and review AICTE model curriculum.</p>
        </div>

        <div style="text-align: center;">
          <a href="${config.clientUrl}" style="display: inline-block; background: #1a1a2e; color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600;">
            Go to Dashboard →
          </a>
        </div>
      </div>
    `;

    await this.sendMail(email, 'Welcome to CurriCraft AI!', html);
  }
}

export const emailService = new EmailService();
