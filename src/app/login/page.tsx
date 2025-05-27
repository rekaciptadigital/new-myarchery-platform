'use client';

import { AuthLayout, LoginForm } from '@/domains/auth';

export default function LoginPage() {
  return (
    <AuthLayout
      title="Sign In To Your Account"
      subtitle="Welcome back"
    >
      <LoginForm />
    </AuthLayout>
  );
}