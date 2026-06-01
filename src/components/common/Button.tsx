import React from 'react';
import './Button.css';

type Variant = 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
type Size = 'small' | 'medium' | 'large';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  variant?: Variant;
  isLoading?: boolean;
  size?: Size;
  fullWidth?: boolean;
}

const TEXT_COLORS: Record<Variant, string> = {
  primary: '#FFFFFF',
  success: '#FFFFFF',
  warning: '#FFFFFF',
  secondary: 'var(--color-primary-main)',
  danger: 'var(--color-status-error)',
};

const Button = ({
  title,
  onClick,
  variant = 'primary',
  isLoading = false,
  disabled = false,
  type = 'button',
  size = 'medium',
  fullWidth = false,
  className = '',
  ...props
}: Props) => {
  const classes = [
    'btn',
    `btn-${variant}`,
    size !== 'medium' ? `btn-${size}` : '',
    isLoading ? 'btn-loading' : '',
    disabled ? 'btn-disabled' : '',
    fullWidth ? 'btn-full' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      aria-disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="btn-loading-spinner" aria-label="読み込み中">
          <span className="spinner" style={{ borderColor: TEXT_COLORS[variant] }}></span>
        </span>
      ) : (
        <span className="btn-text">{title}</span>
      )}
    </button>
  );
};

export default Button;
