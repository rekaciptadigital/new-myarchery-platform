'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, ButtonProps } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth-context';
import { LogOut } from 'lucide-react';

interface LogoutButtonProps extends Omit<ButtonProps, 'onClick'> {
  redirectTo?: string;
  showIcon?: boolean;
  confirmLogout?: boolean;
}

export function LogoutButton({
  children = 'Logout',
  redirectTo = '/',
  showIcon = true,
  confirmLogout = false,
  ...props
}: Readonly<LogoutButtonProps>) {
  const [isLoading, setIsLoading] = useState(false);
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    if (confirmLogout && !window.confirm('Apakah Anda yakin ingin keluar?')) {
      return;
    }

    try {
      setIsLoading(true);
      await logout();
      router.push(redirectTo);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      onClick={handleLogout}
      disabled={isLoading}
      {...props}
    >
      {showIcon && (
        <LogOut className="mr-2 h-4 w-4" />
      )}
      {isLoading ? 'Logging out...' : children}
    </Button>
  );
}