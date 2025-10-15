/**
 * HABS TECHNOLOGIES GROUP
 * Admin Table Component
 */

import './table.css';
import clsx from 'clsx';

export default function Table({ children, className }) {
  return (
    <div className={clsx('table-container', className)}>
      <table className="table">{children}</table>
    </div>
  );
}

export function TableHeader({ children }) {
  return <thead className="table__header">{children}</thead>;
}

export function TableBody({ children }) {
  return <tbody className="table__body">{children}</tbody>;
}

export function TableRow({ children, onClick, className }) {
  return (
    <tr className={clsx('table__row', onClick && 'table__row--clickable', className)} onClick={onClick}>
      {children}
    </tr>
  );
}

export function TableHead({ children, className }) {
  return <th className={clsx('table__head', className)}>{children}</th>;
}

export function TableCell({ children, className }) {
  return <td className={clsx('table__cell', className)}>{children}</td>;
}













