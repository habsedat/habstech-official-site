/**
 * HABS TECHNOLOGIES GROUP
 * Textarea Component
 */

import './textarea.css';
import clsx from 'clsx';

export default function Textarea({
  label,
  name,
  id,
  placeholder,
  value,
  onChange,
  onBlur,
  rows = 4,
  error,
  required = false,
  disabled = false,
  className,
  ...props
}) {
  const textareaId = id || name;

  return (
    <div className={clsx('textarea-wrapper', className)}>
      {label && (
        <label htmlFor={textareaId} className="textarea-label">
          {label}
          {required && <span className="textarea-required">*</span>}
        </label>
      )}
      <textarea
        id={textareaId}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        rows={rows}
        disabled={disabled}
        required={required}
        className={clsx('textarea', error && 'textarea--error')}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${textareaId}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${textareaId}-error`} className="textarea-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}


