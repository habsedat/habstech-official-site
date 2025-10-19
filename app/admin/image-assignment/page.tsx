/**
 * HABS TECHNOLOGIES GROUP
 * Visual Image Assignment Page
 */

'use client';

import ImageAssignmentManager from '@/components/admin/image-assignment-manager';

export default function ImageAssignmentPage() {
  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <h1 className="admin-page__title">Visual Image Assignment</h1>
        <p className="admin-page__subtitle">Click on website sections to assign uploaded images</p>
      </div>

      <div className="admin-page__content">
        <ImageAssignmentManager />
      </div>
    </div>
  );
}



