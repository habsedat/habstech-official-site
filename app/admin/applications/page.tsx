/**
 * HABS TECHNOLOGIES GROUP
 * Admin Applications Route
 */

import { Suspense } from 'react';
import AdminApplications from '@/screens/admin/applications';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminApplications />
    </Suspense>
  );
}















