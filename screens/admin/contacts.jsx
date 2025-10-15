/**
 * HABS TECHNOLOGIES GROUP
 * Admin Contacts Screen
 */

'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import './contacts.css';
import Topbar from '@/components/admin/topbar';
import Table, { TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/admin/table';
import { subscribeToCollection, COLLECTIONS } from '@/lib/firestore';

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const searchParams = useSearchParams();

  // Fetch real-time contacts from Firebase
  useEffect(() => {
    const unsubscribe = subscribeToCollection(
      COLLECTIONS.CONTACTS,
      (contactsData) => {
        // Transform Firestore data to match the expected format
        const formattedContacts = contactsData.map(contact => ({
          id: contact.id,
          name: contact.name || 'N/A',
          email: contact.email || 'N/A',
          phone: contact.phone || '—',
          company: contact.company || '—',
          subject: contact.subject || 'No subject',
          message: contact.message || 'No message',
          submittedAt: contact.createdAt?.toDate?.() || contact.createdAt || new Date(),
        }));
        setContacts(formattedContacts);
      },
      { orderBy: ['createdAt', 'desc'] }
    );

    return () => unsubscribe();
  }, []);

  // Auto-open modal from notification
  useEffect(() => {
    const openId = searchParams.get('open');
    if (openId && contacts.length > 0) {
      const contact = contacts.find(c => c.id === openId);
      if (contact) {
        setSelectedContact(contact);
        // Clean up URL
        window.history.replaceState({}, '', '/admin/contacts');
      }
    }
  }, [searchParams, contacts]);

  const handleViewContact = (contact) => {
    setSelectedContact(contact);
  };

  const handleCloseModal = () => {
    setSelectedContact(null);
  };

  return (
    <>
      <Topbar title="Contact Inquiries" subtitle="View and manage contact submissions" />
      <div className="admin-content">
        <div className="admin-page">
          {/* Contacts Table */}
          <div className="admin-section">
            {contacts.length === 0 ? (
              <div className="table-empty">
                <div className="table-empty__icon">📧</div>
                <p className="table-empty__text">
                  No contact inquiries yet. Contact submissions will appear here when users submit inquiries through the contact form.
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contacts.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell>{contact.name}</TableCell>
                      <TableCell>{contact.email}</TableCell>
                      <TableCell>{contact.phone}</TableCell>
                      <TableCell>{contact.company}</TableCell>
                      <TableCell>{contact.subject}</TableCell>
                      <TableCell>{new Date(contact.submittedAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <button 
                          className="table-action-button"
                          onClick={() => handleViewContact(contact)}
                        >
                          View
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </div>

      {/* Contact Detail Modal */}
      {selectedContact && (
        <div className="contact-modal-overlay" onClick={handleCloseModal}>
          <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
            <div className="contact-modal__header">
              <h2 className="contact-modal__title">Contact Details</h2>
              <button className="contact-modal__close" onClick={handleCloseModal}>
                ×
              </button>
            </div>
            <div className="contact-modal__content">
              <div className="contact-detail">
                <div className="contact-detail__label">Name</div>
                <div className="contact-detail__value">{selectedContact.name}</div>
              </div>
              <div className="contact-detail">
                <div className="contact-detail__label">Email</div>
                <div className="contact-detail__value">
                  <a href={`mailto:${selectedContact.email}`}>{selectedContact.email}</a>
                </div>
              </div>
              <div className="contact-detail">
                <div className="contact-detail__label">Phone</div>
                <div className="contact-detail__value">{selectedContact.phone}</div>
              </div>
              <div className="contact-detail">
                <div className="contact-detail__label">Company</div>
                <div className="contact-detail__value">{selectedContact.company}</div>
              </div>
              <div className="contact-detail">
                <div className="contact-detail__label">Subject</div>
                <div className="contact-detail__value">{selectedContact.subject}</div>
              </div>
              <div className="contact-detail">
                <div className="contact-detail__label">Message</div>
                <div className="contact-detail__value">{selectedContact.message}</div>
              </div>
              <div className="contact-detail">
                <div className="contact-detail__label">Submitted</div>
                <div className="contact-detail__value">
                  {new Date(selectedContact.submittedAt).toLocaleString()}
                </div>
              </div>
            </div>
            <div className="contact-modal__footer">
              <button className="button button--secondary" onClick={handleCloseModal}>
                Close
              </button>
              <a 
                href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`}
                className="button button--primary"
              >
                Reply via Email
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

