'use client';

import { AuthLayout } from '@/domains/auth';
import { ForgotPasswordForm } from '@/domains/auth/components/forms/forgot-password-form';

export default function ForgotPasswordPage() {
  const backgroundContent = (
    <>
      <h1 className="text-4xl lg:text-5xl font-bold mb-4">Reset Your Password</h1>
      <p className="text-lg lg:text-xl opacity-90">
        Don&apos;t worry! It happens to the best of us. Enter your email and we&apos;ll send you a link to reset your password.
      </p>
    </>
  );

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Enter your email address and we'll send you a password reset link."
      backgroundContent={backgroundContent}
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
