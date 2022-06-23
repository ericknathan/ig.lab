import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'default' | 'ghost';
  href?: string;
  onClick?: () => void;
}

export function Button({ children, variant = 'default', href, onClick = () => {} }: ButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      className={`${
        variant === 'ghost'
          ? 'border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-gray-900'
          : 'bg-green-500 hover:bg-green-700'
      } p-4 text-sm flex items-center justify-center rounded font-bold uppercase gap-2 transition-colors cursor-pointer`}
      onClick={onClick}
    >
      {children}
    </a>
  );
}
