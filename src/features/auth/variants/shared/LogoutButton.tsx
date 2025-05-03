'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, ButtonProps } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useAuthService } from '../../hooks/useAuthService';

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
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { logout } = useAuthService();
  const router = useRouter();

  const handleLogout = async () => {
    if (confirmLogout && !window.confirm('Apakah Anda yakin ingin keluar?')) {
      return;
    }

    try {
      setIsLoggingOut(true);
      await logout();
      router.push(redirectTo);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <Button
      variant="ghost"
      onClick={handleLogout}
      disabled={isLoggingOut}
      {...props}
    >
      {showIcon && (
        <LogOut className="mr-2 h-4 w-4" />
      )}
      {isLoggingOut ? 'Logging out...' : children}
    </Button>
  );
}