/**
 * HABS TECHNOLOGIES GROUP
 * Admin Notifications Component
 */

'use client';

import { useEffect, useState } from 'react';
import { subscribeToCollection, updateDocument, COLLECTIONS } from '@/lib/firestore';
import './notifications.css';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Subscribe to applications
    const unsubscribeApplications = subscribeToCollection(
      COLLECTIONS.APPLICATIONS,
      (apps) => {
        const appNotifications = apps
          .filter(app => !app.read)
          .map(app => ({
            id: app.id,
            type: 'application',
            title: 'New Application',
            message: `${app.fullName || app.name || 'Someone'} submitted a project application`,
            data: app,
            createdAt: app.createdAt?.toDate?.() || app.createdAt || new Date(),
          }));

        // Subscribe to contacts
        const unsubscribeContacts = subscribeToCollection(
          COLLECTIONS.CONTACTS,
          (contacts) => {
            const contactNotifications = contacts
              .filter(contact => !contact.read)
              .map(contact => ({
                id: contact.id,
                type: 'contact',
                title: 'New Contact Inquiry',
                message: `${contact.name || 'Someone'} sent a message`,
                data: contact,
                createdAt: contact.createdAt?.toDate?.() || contact.createdAt || new Date(),
              }));

            // Combine and sort by date
            const allNotifications = [...appNotifications, ...contactNotifications]
              .sort((a, b) => b.createdAt - a.createdAt);

            setNotifications(allNotifications);
            setUnreadCount(allNotifications.length);
          },
          { orderBy: ['createdAt', 'desc'] }
        );

        return () => unsubscribeContacts();
      },
      { orderBy: ['createdAt', 'desc'] }
    );

    return () => unsubscribeApplications();
  }, []);

  const handleNotificationClick = async (notification) => {
    // Mark as read
    try {
      await updateDocument(
        notification.type === 'application' ? COLLECTIONS.APPLICATIONS : COLLECTIONS.CONTACTS,
        notification.id,
        { read: true }
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }

    // Close dropdown
    setIsOpen(false);

    // Navigate to the detail page with the item ID
    if (notification.type === 'application') {
      window.location.href = `/admin/applications?open=${notification.id}`;
    } else {
      window.location.href = `/admin/contacts?open=${notification.id}`;
    }
  };

  const handleMarkAllRead = async () => {
    try {
      for (const notification of notifications) {
        await updateDocument(
          notification.type === 'application' ? COLLECTIONS.APPLICATIONS : COLLECTIONS.CONTACTS,
          notification.id,
          { read: true }
        );
      }
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  return (
    <div className="notifications">
      <button
        className="notifications__trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Notifications"
      >
        <span className="notifications__icon">🔔</span>
        {unreadCount > 0 && (
          <span className="notifications__badge">{unreadCount}</span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="notifications__overlay" onClick={() => setIsOpen(false)}></div>
          <div className="notifications__dropdown">
            <div className="notifications__header">
              <h3 className="notifications__title">Notifications</h3>
              {notifications.length > 0 && (
                <button
                  className="notifications__mark-all"
                  onClick={handleMarkAllRead}
                >
                  Mark all as read
                </button>
              )}
            </div>

            <div className="notifications__list">
              {notifications.length === 0 ? (
                <div className="notifications__empty">
                  <span className="notifications__empty-icon">🔔</span>
                  <p className="notifications__empty-text">No new notifications</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="notifications__item"
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="notifications__item-icon">
                      {notification.type === 'application' ? '📋' : '📧'}
                    </div>
                    <div className="notifications__item-content">
                      <div className="notifications__item-title">{notification.title}</div>
                      <div className="notifications__item-message">{notification.message}</div>
                      <div className="notifications__item-time">
                        {new Date(notification.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

