/**
 * HABS TECHNOLOGIES GROUP
 * Button Component
 */

import './button.css';
import clsx from 'clsx';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  className,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={clsx(
        'button',
        `button--${variant}`,
        `button--${size}`,
        fullWidth && 'button--full',
        loading && 'button--loading',
        className
      )}
      {...props}
    >
      {loading ? (
        <span className="button__spinner">
          <svg className="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" strokeWidth="3" strokeLinecap="round" strokeDasharray="32" strokeDashoffset="32">
              <animate attributeName="stroke-dashoffset" values="32;0" dur="1s" repeatCount="indefinite" />
            </circle>
          </svg>
        </span>
      ) : null}
      <span className={clsx('button__content', loading && 'button__content--hidden')}>
        {children}
      </span>
    </button>
  );
}


