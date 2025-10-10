/**
 * HABS TECHNOLOGIES GROUP
 * Card Component
 */

import './card.css';
import clsx from 'clsx';

export default function Card({
  children,
  variant = 'default',
  padding = 'md',
  hover = false,
  className,
  ...props
}) {
  return (
    <div
      className={clsx(
        'card',
        `card--${variant}`,
        `card--padding-${padding}`,
        hover && 'card--hover',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className, ...props }) {
  return (
    <div className={clsx('card-header', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className, ...props }) {
  return (
    <h3 className={clsx('card-title', className)} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className, ...props }) {
  return (
    <p className={clsx('card-description', className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ children, className, ...props }) {
  return (
    <div className={clsx('card-content', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className, ...props }) {
  return (
    <div className={clsx('card-footer', className)} {...props}>
      {children}
    </div>
  );
}


