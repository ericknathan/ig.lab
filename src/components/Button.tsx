import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'default' | 'ghost';
  href?: string;
  onClick?: () => void;
  tag?: 'anchor' | 'button';
  type?: 'submit' | 'reset' | 'button';
}

export function Button({
  children,
  variant = 'default',
  href,
  onClick = () => {},
  tag = 'anchor',
  type = 'submit',
  ...props
}: ButtonProps) {
  const styles = `${
    variant === 'ghost'
      ? 'border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-gray-900'
      : 'bg-green-500 hover:bg-green-700'
  } p-4 text-sm flex items-center justify-center rounded font-bold uppercase gap-2 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-default ${
    props.className
  }`;

  delete props.className;

  return (
    <>
      {tag === 'anchor' ? (
        <a
          href={href}
          target='_blank'
          className={styles}
          onClick={onClick}
        >
          {children}
        </a>
      ) : (
        <button className={styles} onClick={onClick} type={type} {...props}>
          {children}
        </button>
      )}
    </>
  );
}
