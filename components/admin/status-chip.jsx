/**
 * HABS TECHNOLOGIES GROUP
 * Status Chip Component
 */

import './status-chip.css';
import clsx from 'clsx';

const statusStyles = {
  new: 'status-chip--new',
  'in-review': 'status-chip--in-review',
  approved: 'status-chip--approved',
  declined: 'status-chip--declined',
  pending: 'status-chip--pending',
  completed: 'status-chip--completed',
  archived: 'status-chip--archived',
  published: 'status-chip--published',
  draft: 'status-chip--draft',
  active: 'status-chip--active',
  inactive: 'status-chip--inactive',
};

export default function StatusChip({ status, label, className }) {
  const displayLabel = label || status;

  return (
    <span className={clsx('status-chip', statusStyles[status], className)}>
      {displayLabel}
    </span>
  );
}















