import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

/**
 * 統一されたButtonコンポーネント
 * デザインシステムに基づいた一貫性のあるボタンUI
 * 
 * @example
 * <Button 
 *   title="送信" 
 *   onClick={handleSubmit} 
 *   variant="primary" 
 *   isLoading={isSubmitting}
 * />
 */
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
}) => {
  const getButtonClasses = () => {
    const baseClasses = 'btn';
    const variantClass = `btn-${variant}`;
    const sizeClass = size !== 'medium' ? `btn-${size}` : '';
    const loadingClass = isLoading ? 'btn-loading' : '';
    const disabledClass = disabled ? 'btn-disabled' : '';
    const fullWidthClass = fullWidth ? 'btn-full' : '';
    
    return [
      baseClasses,
      variantClass,
      sizeClass,
      loadingClass,
      disabledClass,
      fullWidthClass,
      className
    ].filter(Boolean).join(' ');
  };

  const getTextColor = () => {
    switch (variant) {
      case 'primary':
      case 'success':
      case 'warning':
        return '#FFFFFF';
      case 'secondary':
        return 'var(--color-primary-main)';
      case 'danger':
        return 'var(--color-status-error)';
      default:
        return '#FFFFFF';
    }
  };

  return (
    <button
      type={type}
      className={getButtonClasses()}
      onClick={onClick}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      aria-disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="btn-loading-spinner" aria-label="読み込み中">
          <span className="spinner" style={{ borderColor: getTextColor() }}></span>
        </span>
      ) : (
        <span className="btn-text">{title}</span>
      )}
    </button>
  );
};

Button.propTypes = {
  /** ボタンに表示するテキスト */
  title: PropTypes.string.isRequired,
  /** クリック時のハンドラ関数 */
  onClick: PropTypes.func,
  /** ボタンのバリアント（primary, secondary, danger, success, warning） */
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'success', 'warning']),
  /** ローディング状態 */
  isLoading: PropTypes.bool,
  /** 無効状態 */
  disabled: PropTypes.bool,
  /** ボタンのタイプ */
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  /** ボタンのサイズ（small, medium, large） */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /** フル幅表示 */
  fullWidth: PropTypes.bool,
  /** 追加のCSSクラス */
  className: PropTypes.string,
};

export default Button;
