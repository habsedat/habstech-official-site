/**
 * HABS TECHNOLOGIES GROUP
 * Admin Applications Screen
 */

'use client';

import { useEffect, useState } from 'react';
import './applications.css';
import Topbar from '@/components/admin/topbar';
import Table, { TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/admin/table';
import StatusChip from '@/components/admin/status-chip';
import Select from '@/components/ui/select';

export default function AdminApplications() {
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState('all');

  // Fetch applications from Firebase
  useEffect(() => {
    // TODO: Implement Firebase data fetching
    setApplications([
      {
        id: '1',
        name: 'John Doe',
        company: 'Tech Corp',
        projectType: 'Multi-Page Site',
        budget: '€3,000 - €7,000',
        timeline: '2-4 weeks',
        status: 'new',
        submittedAt: '2024-01-15',
      },
      {
        id: '2',
        name: 'Jane Smith',
        company: 'Startup Inc',
        projectType: 'Online Store',
        budget: '€7,000 - €15,000',
        timeline: 'Flexible',
        status: 'in-review',
        submittedAt: '2024-01-14',
      },
      {
        id: '3',
        name: 'Mike Johnson',
        company: 'Agency XYZ',
        projectType: 'Site with Backend',
        budget: '€15,000+',
        timeline: '1-2 months',
        status: 'approved',
        submittedAt: '2024-01-12',
      },
    ]);
  }, []);

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
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.map((app) => (
                    <TableRow key={app.id} onClick={() => console.log('View', app.id)}>
                      <TableCell>{app.name}</TableCell>
                      <TableCell>{app.company || '—'}</TableCell>
                      <TableCell>{app.projectType}</TableCell>
                      <TableCell>{app.budget}</TableCell>
                      <TableCell>{app.timeline}</TableCell>
                      <TableCell>
                        <StatusChip status={app.status} />
                      </TableCell>
                      <TableCell>{new Date(app.submittedAt).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </>
  );
}





