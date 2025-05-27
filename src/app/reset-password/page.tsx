'use client';

import { AuthLayout } from '@/domains/auth';
import { ResetPasswordForm } from '@/domains/auth/components/forms/reset-password-form';
import { useSearchParams } from 'next/navigation';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const backgroundContent = (
    <>
      <h1 className="text-4xl lg:text-5xl font-bold mb-4">Set New Password</h1>
      <p className="text-lg lg:text-xl opacity-90">
        Please enter your new password below. Make sure it&apos;s strong and secure to protect your account.
      </p>
    </>
  );

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Create a new password for your account."
      backgroundContent={backgroundContent}
    >
      <ResetPasswordForm token={token} />
    </AuthLayout>
  );
}
