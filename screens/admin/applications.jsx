/**
 * HABS TECHNOLOGIES GROUP
 * Admin Applications Screen
 */

'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import './applications.css';
import Topbar from '@/components/admin/topbar';
import Table, { TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/admin/table';
import StatusChip from '@/components/admin/status-chip';
import Select from '@/components/ui/select';
import { subscribeToCollection, COLLECTIONS } from '@/lib/firestore';

export default function AdminApplications() {
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const searchParams = useSearchParams();

  // Fetch real-time applications from Firebase
  useEffect(() => {
    const unsubscribe = subscribeToCollection(
      COLLECTIONS.APPLICATIONS,
      (apps) => {
        // Transform Firestore data to match the expected format
        const formattedApps = apps.map(app => ({
          id: app.id,
          name: app.fullName || app.name || 'N/A',
          email: app.email || 'N/A',
          phone: app.phone || '—',
          company: app.companyName || app.company || '—',
          projectType: app.projectType || 'N/A',
          budget: app.budget || 'Not specified',
          timeline: app.timeline || 'Not specified',
          brief: app.brief || 'No brief provided',
          status: app.status || 'new',
          submittedAt: app.createdAt?.toDate?.() || app.createdAt || new Date(),
        }));
        setApplications(formattedApps);
      },
      { orderBy: ['createdAt', 'desc'] }
    );

    return () => unsubscribe();
  }, []);

  // Auto-open modal from notification
  useEffect(() => {
    const openId = searchParams.get('open');
    if (openId && applications.length > 0) {
      const app = applications.find(a => a.id === openId);
      if (app) {
        setSelectedApplication(app);
        // Clean up URL
        window.history.replaceState({}, '', '/admin/applications');
      }
    }
  }, [searchParams, applications]);

  const handleViewApplication = (app) => {
    setSelectedApplication(app);
  };

  const handleCloseModal = () => {
    setSelectedApplication(null);
  };

  const filteredApplications =
    filter === 'all'
      ? applications
      : applications.filter((app) => app.status === filter);

  return (
    <>
      <Topbar title="Applications" subtitle="Manage project applications" />
      <div className="admin-content">
        <div className="admin-page">
          {/* Filters */}
          <div className="admin-section">
            <div className="applications-filters">
              <Select
                label="Filter by Status"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                options={[
                  { value: 'all', label: 'All Applications' },
                  { value: 'new', label: 'New' },
                  { value: 'in-review', label: 'In Review' },
                  { value: 'approved', label: 'Approved' },
                  { value: 'declined', label: 'Declined' },
                  { value: 'archived', label: 'Archived' },
                ]}
              />
            </div>
          </div>

          {/* Applications Table */}
          <div className="admin-section">
            {filteredApplications.length === 0 ? (
              <div className="table-empty">
                <div className="table-empty__icon">📋</div>
                <p className="table-empty__text">
                  No applications found. Applications will appear here when users submit project requests.
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Project Type</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Timeline</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell>{app.name}</TableCell>
                      <TableCell>{app.company || '—'}</TableCell>
                      <TableCell>{app.projectType}</TableCell>
                      <TableCell>{app.budget}</TableCell>
                      <TableCell>{app.timeline}</TableCell>
                      <TableCell>
                        <StatusChip status={app.status} />
                      </TableCell>
                      <TableCell>{new Date(app.submittedAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <button 
                          className="table-action-button"
                          onClick={() => handleViewApplication(app)}
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

      {/* Application Detail Modal */}
      {selectedApplication && (
        <div className="contact-modal-overlay" onClick={handleCloseModal}>
          <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
            <div className="contact-modal__header">
              <h2 className="contact-modal__title">Application Details</h2>
              <button className="contact-modal__close" onClick={handleCloseModal}>
                ×
              </button>
            </div>
            <div className="contact-modal__content">
              <div className="contact-detail">
                <div className="contact-detail__label">Name</div>
                <div className="contact-detail__value">{selectedApplication.name}</div>
              </div>
              <div className="contact-detail">
                <div className="contact-detail__label">Email</div>
                <div className="contact-detail__value">
                  <a href={`mailto:${selectedApplication.email}`}>{selectedApplication.email}</a>
                </div>
              </div>
              <div className="contact-detail">
                <div className="contact-detail__label">Phone</div>
                <div className="contact-detail__value">{selectedApplication.phone}</div>
              </div>
              <div className="contact-detail">
                <div className="contact-detail__label">Company</div>
                <div className="contact-detail__value">{selectedApplication.company}</div>
              </div>
              <div className="contact-detail">
                <div className="contact-detail__label">Project Type</div>
                <div className="contact-detail__value">{selectedApplication.projectType}</div>
              </div>
              <div className="contact-detail">
                <div className="contact-detail__label">Budget</div>
                <div className="contact-detail__value">{selectedApplication.budget}</div>
              </div>
              <div className="contact-detail">
                <div className="contact-detail__label">Timeline</div>
                <div className="contact-detail__value">{selectedApplication.timeline}</div>
              </div>
              <div className="contact-detail">
                <div className="contact-detail__label">Project Brief</div>
                <div className="contact-detail__value">{selectedApplication.brief}</div>
              </div>
              <div className="contact-detail">
                <div className="contact-detail__label">Status</div>
                <div className="contact-detail__value">
                  <StatusChip status={selectedApplication.status} />
                </div>
              </div>
              <div className="contact-detail">
                <div className="contact-detail__label">Submitted</div>
                <div className="contact-detail__value">
                  {new Date(selectedApplication.submittedAt).toLocaleString()}
                </div>
              </div>
            </div>
            <div className="contact-modal__footer">
              <button className="button button--secondary" onClick={handleCloseModal}>
                Close
              </button>
              <a 
                href={`mailto:${selectedApplication.email}?subject=Re: Project Application`}
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















