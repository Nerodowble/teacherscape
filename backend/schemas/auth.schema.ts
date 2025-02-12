// backend/schemas/auth.schema.ts

export interface LoginSchema {
  email: string;
  passwordPlain: string;
}

export interface ResetPasswordSchema {
  email: string;
  resetToken: string;
  newPasswordPlain: string;
}

export interface ForgotPasswordSchema {
  email: string;
}

export interface VerifyEmailSchema {
  email: string;
  verificationCode: string;
}
