// Domain: Auth - Password Strength Indicator Component
// filepath: /Users/ltmoerdani/RCD/github/new-myarchery-platform/src/domains/auth/components/ui/password-strength.tsx

import React from 'react';
import { usePasswordStrength } from '../../hooks';

interface PasswordStrengthProps {
  password: string;
  showText?: boolean;
  className?: string;
}

/**
 * Password Strength Indicator Component
 */
export const PasswordStrength: React.FC<PasswordStrengthProps> = ({
  password,
  showText = true,
  className = '',
}) => {
  const { strength, strengthColor, strengthPercentage } = usePasswordStrength(password);

  if (!password) return null;

  return (
    <div className={`space-y-1 ${className}`}>
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-1.5">
        <div
          className={`h-1.5 rounded-full transition-all duration-300 ${
            strength === 'weak' ? 'bg-red-500' :
            strength === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
          }`}
          style={{ width: `${strengthPercentage}%` }}
        />
      </div>
      
      {/* Strength Text */}
      {showText && (
        <div className={`text-xs ${strengthColor}`}>
          Password strength: {strength === 'weak' ? 'Lemah' : strength === 'medium' ? 'Sedang' : 'Kuat'}
        </div>
      )}
    </div>
  );
};
