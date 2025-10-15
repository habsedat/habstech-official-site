import { Suspense } from 'react';
import AdminContacts from '@/screens/admin/contacts';

export default function ContactsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminContacts />
    </Suspense>
  );
}

