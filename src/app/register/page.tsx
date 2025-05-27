'use client';

import { AuthLayout, RegisterForm } from '@/domains/auth';

export default function RegisterPage() {
  const backgroundContent = (
    <>
      <h1 className="text-4xl lg:text-5xl font-bold mb-4">Join MyArchery Platform</h1>
      <p className="text-lg lg:text-xl opacity-90">
        Manage your archery events, participants, and scores all in one place. Sign up now to get started!
      </p>
    </>
  );

  return (
    <AuthLayout
      title="Create Your Account"
      subtitle="Fill in the details below to get started."
      backgroundContent={backgroundContent}
    >
      <RegisterForm />
    </AuthLayout>
  );
}