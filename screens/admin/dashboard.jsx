/**
 * HABS TECHNOLOGIES GROUP
 * Admin Dashboard Screen
 */

'use client';

import { useEffect, useState } from 'react';
import './dashboard.css';
import Topbar from '@/components/admin/topbar';
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { subscribeToCollection, COLLECTIONS } from '@/lib/firestore';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    applications: 0,
    contacts: 0,
    caseStudies: 0,
    media: 0,
  });

  // Fetch real-time stats from Firebase
  useEffect(() => {
    // Subscribe to applications
    const unsubscribeApplications = subscribeToCollection(
      COLLECTIONS.APPLICATIONS,
      (applications) => {
        setStats(prev => ({ ...prev, applications: applications.length }));
      }
    );

    // Subscribe to contacts
    const unsubscribeContacts = subscribeToCollection(
      COLLECTIONS.CONTACTS,
      (contacts) => {
        setStats(prev => ({ ...prev, contacts: contacts.length }));
      }
    );

    // Subscribe to case studies
    const unsubscribeCaseStudies = subscribeToCollection(
      COLLECTIONS.CASE_STUDIES,
      (caseStudies) => {
        setStats(prev => ({ ...prev, caseStudies: caseStudies.length }));
      }
    );

    // Subscribe to media
    const unsubscribeMedia = subscribeToCollection(
      COLLECTIONS.MEDIA,
      (media) => {
        setStats(prev => ({ ...prev, media: media.length }));
      }
    );

    // Cleanup subscriptions on unmount
    return () => {
      unsubscribeApplications();
      unsubscribeContacts();
      unsubscribeCaseStudies();
      unsubscribeMedia();
    };
  }, []);

  return (
    <>
      <Topbar title="Dashboard" subtitle="Overview of your admin portal" />
      <div className="admin-content">
        <div className="admin-page">
          {/* Stats Grid */}
          <div className="admin-stats">
            <div className="admin-stat">
              <div className="admin-stat__label">Applications</div>
              <div className="admin-stat__value">{stats.applications}</div>
              <div className="admin-stat__change">Pending review</div>
            </div>

            <div className="admin-stat">
              <div className="admin-stat__label">Contacts</div>
              <div className="admin-stat__value">{stats.contacts}</div>
              <div className="admin-stat__change">New inquiries</div>
            </div>

            <div className="admin-stat">
              <div className="admin-stat__label">Case Studies</div>
              <div className="admin-stat__value">{stats.caseStudies}</div>
              <div className="admin-stat__change">Published</div>
            </div>

            <div className="admin-stat">
              <div className="admin-stat__label">Media Files</div>
              <div className="admin-stat__value">{stats.media}</div>
              <div className="admin-stat__change">In library</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="admin-section">
            <div className="admin-section__header">
              <h2 className="admin-section__title">Quick Actions</h2>
            </div>
            <div className="dashboard-actions">
              <Card hover padding="md" className="dashboard-action">
                <CardHeader>
                  <div className="dashboard-action__icon">📋</div>
                  <CardTitle>Review Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="dashboard-action__text">
                    View and respond to new project applications
                  </p>
                </CardContent>
              </Card>

              <Card hover padding="md" className="dashboard-action">
                <CardHeader>
                  <div className="dashboard-action__icon">📝</div>
                  <CardTitle>Manage Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="dashboard-action__text">
                    Edit pages, services, and site content
                  </p>
                </CardContent>
              </Card>

              <Card hover padding="md" className="dashboard-action">
                <CardHeader>
                  <div className="dashboard-action__icon">🖼️</div>
                  <CardTitle>Upload Media</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="dashboard-action__text">
                    Add images and assets to media library
                  </p>
                </CardContent>
              </Card>

              <Card hover padding="md" className="dashboard-action">
                <CardHeader>
                  <div className="dashboard-action__icon">👥</div>
                  <CardTitle>Manage Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="dashboard-action__text">
                    Add or remove admin users and roles
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="admin-section">
            <div className="admin-section__header">
              <h2 className="admin-section__title">Recent Activity</h2>
            </div>
            <div className="dashboard-activity">
              <p className="dashboard-activity__empty">
                Activity log will appear here once you start managing content.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}















