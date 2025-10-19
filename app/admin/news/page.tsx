/**
 * HABS TECHNOLOGIES GROUP
 * Admin News Route
 */

'use client';

import { Suspense } from 'react';
import NewsManager from '@/components/admin/news-manager';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewsManager />
    </Suspense>
  );
}


