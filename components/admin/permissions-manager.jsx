/**
 * HABS TECHNOLOGIES GROUP
 * Permissions Manager Component
 */

'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { getDocuments, updateDocument, addDocument, COLLECTIONS } from '@/lib/firestore';
import { ROLES } from '@/lib/auth';
import Button from '../ui/button';
import Input from '../ui/input';
import Select from '../ui/select';
import StatusChip from './status-chip';
import './permissions-manager.css';
import '../../screens/admin/contacts.css';

const PERMISSIONS = {
  // Super Admin Permissions
  'super_admin.all': { name: 'Super Admin Access', description: 'Full system control - ultimate power' },
  'users.manage_all': { name: 'Manage All Users', description: 'Add, remove, and assign roles to all users' },
  'roles.assign': { name: 'Assign Roles', description: 'Assign and change user roles and permissions' },
  'visitors.view': { name: 'View Visitors', description: 'See visitor analytics and tracking data' },
  
  // Content Management
  'content.read': { name: 'Read Content', description: 'View pages, services, divisions' },
  'content.write': { name: 'Write Content', description: 'Create and edit content' },
  'content.publish': { name: 'Publish Content', description: 'Publish content to live site' },
  'content.delete': { name: 'Delete Content', description: 'Delete pages and content' },
  
  // News Management (Editor specific)
  'news.read': { name: 'Read News', description: 'View news articles' },
  'news.write': { name: 'Write News', description: 'Create and edit news articles' },
  'news.publish': { name: 'Publish News', description: 'Publish news to public site' },
  'news.delete': { name: 'Delete News', description: 'Remove news articles' },
  
  // Media Management
  'media.read': { name: 'Read Media', description: 'View media library' },
  'media.upload': { name: 'Upload Media', description: 'Upload new media files (Admin only)' },
  'media.use': { name: 'Use Media', description: 'Use existing media in content (Editor)' },
  'media.edit': { name: 'Edit Media', description: 'Edit media metadata' },
  'media.delete': { name: 'Delete Media', description: 'Delete media files' },
  
  // User Management
  'users.read': { name: 'Read Users', description: 'View user accounts' },
  'users.create': { name: 'Create Users', description: 'Create new user accounts' },
  'users.edit': { name: 'Edit Users', description: 'Edit user information' },
  'users.delete': { name: 'Delete Users', description: 'Delete user accounts' },
  
  // Applications Management (Admin only - Editors cannot see)
  'applications.read': { name: 'Read Applications', description: 'View project applications' },
  'applications.edit': { name: 'Edit Applications', description: 'Update application status' },
  'applications.delete': { name: 'Delete Applications', description: 'Delete applications' },
  
  // Contacts Management (Admin only - Editors cannot see)
  'contacts.read': { name: 'Read Contacts', description: 'View contact inquiries' },
  'contacts.edit': { name: 'Edit Contacts', description: 'Update contact status' },
  'contacts.delete': { name: 'Delete Contacts', description: 'Delete contact records' },
  
  // System Settings
  'settings.read': { name: 'Read Settings', description: 'View system settings' },
  'settings.write': { name: 'Write Settings', description: 'Update system settings' },
  
  // Analytics
  'analytics.read': { name: 'Read Analytics', description: 'View analytics and reports' },
};

const ROLE_PERMISSIONS = {
  [ROLES.SUPER_ADMIN]: Object.keys(PERMISSIONS), // All permissions - ultimate power
  [ROLES.ADMIN]: [
    'content.read', 'content.write', 'content.publish', 'content.delete',
    'media.read', 'media.upload', 'media.edit', 'media.delete',
    'users.read', 'users.create', 'users.edit', 'users.delete',
    'applications.read', 'applications.edit', 'applications.delete',
    'contacts.read', 'contacts.edit', 'contacts.delete',
    'settings.read', 'settings.write',
    'analytics.read'
  ],
  [ROLES.EDITOR]: [
    'content.read', 'content.write', 'content.publish',
    'news.read', 'news.write', 'news.publish', 'news.delete',
    'media.read', 'media.use', // Can use existing media but not upload
    'analytics.read'
    // NO access to applications, contacts, users, or settings
  ],
  [ROLES.CLIENT]: [
    'content.read',
    'applications.read'
  ]
};

export default function PermissionsManager() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: []
  });

  useEffect(() => {
    loadRoles();
  }, []);

  const loadRoles = async () => {
    setLoading(true);
    try {
      const roleData = await getDocuments(COLLECTIONS.ROLES, {
        orderBy: ['createdAt', 'desc']
      });
      setRoles(roleData);
    } catch (error) {
      console.error('Error loading roles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRole = () => {
    setEditingRole(null);
    setFormData({
      name: '',
      description: '',
      permissions: []
    });
    setSelectedPermissions([]);
    setShowModal(true);
  };

  const handleEditRole = (role) => {
    setEditingRole(role);
    setFormData({
      name: role.name || '',
      description: role.description || '',
      permissions: role.permissions || []
    });
    setSelectedPermissions(role.permissions || []);
    setShowModal(true);
  };

  const handleSaveRole = async () => {
    try {
      const roleData = {
        ...formData,
        permissions: selectedPermissions,
        updatedAt: new Date(),
        updatedBy: 'current-user-id' // TODO: Get from auth context
      };

      if (editingRole) {
        await updateDocument(COLLECTIONS.ROLES, editingRole.id, roleData);
      } else {
        roleData.createdAt = new Date();
        roleData.createdBy = 'current-user-id'; // TODO: Get from auth context
        await addDocument(COLLECTIONS.ROLES, roleData);
      }

      setShowModal(false);
      loadRoles();
    } catch (error) {
      console.error('Error saving role:', error);
      alert('Failed to save role. Please try again.');
    }
  };

  const handlePermissionToggle = (permission) => {
    setSelectedPermissions(prev => {
      if (prev.includes(permission)) {
        return prev.filter(p => p !== permission);
      } else {
        return [...prev, permission];
      }
    });
  };

  const handleSelectAll = (category) => {
    const categoryPermissions = Object.keys(PERMISSIONS).filter(perm => 
      perm.startsWith(category)
    );
    
    setSelectedPermissions(prev => {
      const hasAllCategory = categoryPermissions.every(perm => prev.includes(perm));
      
      if (hasAllCategory) {
        // Remove all category permissions
        return prev.filter(perm => !categoryPermissions.includes(perm));
      } else {
        // Add all category permissions
        const newPermissions = [...prev];
        categoryPermissions.forEach(perm => {
          if (!newPermissions.includes(perm)) {
            newPermissions.push(perm);
          }
        });
        return newPermissions;
      }
    });
  };

  const getPermissionCategory = (permission) => {
    return permission.split('.')[0];
  };

  const getCategoryPermissions = (category) => {
    return Object.keys(PERMISSIONS).filter(perm => perm.startsWith(category));
  };

  const getCategories = () => {
    const categories = new Set();
    Object.keys(PERMISSIONS).forEach(perm => {
      categories.add(getPermissionCategory(perm));
    });
    return Array.from(categories);
  };

  const getDefaultRolePermissions = (roleName) => {
    return ROLE_PERMISSIONS[roleName] || [];
  };

  const applyDefaultPermissions = (roleName) => {
    const defaultPermissions = getDefaultRolePermissions(roleName);
    setSelectedPermissions(defaultPermissions);
  };

  return (
    <div className="permissions-manager">
      {/* Header */}
      <div className="permissions-manager__header">
        <div className="permissions-manager__title-section">
          <h2>Role & Permissions Management</h2>
          <p>Define user roles and their access permissions</p>
        </div>
        <Button onClick={handleCreateRole} className="permissions-manager__create-btn">
          + Add Custom Role
        </Button>
      </div>

      {/* Default Roles */}
      <div className="permissions-manager__default-roles">
        <h3>Default Roles</h3>
        <div className="permissions-manager__roles-grid">
          {Object.entries(ROLE_PERMISSIONS).map(([roleName, permissions]) => (
            <div key={roleName} className="permissions-manager__role-card">
              <div className="permissions-manager__role-header">
                <h4>{roleName.charAt(0).toUpperCase() + roleName.slice(1)}</h4>
                <StatusChip 
                  status={roleName === ROLES.OWNER ? 'owner' : roleName === ROLES.ADMIN ? 'admin' : 'editor'}
                  label={roleName}
                />
              </div>
              <div className="permissions-manager__role-permissions">
                <p>{permissions.length} permissions</p>
                <div className="permissions-manager__permission-list">
                  {permissions.slice(0, 3).map(permission => (
                    <span key={permission} className="permissions-manager__permission-tag">
                      {PERMISSIONS[permission]?.name || permission}
                    </span>
                  ))}
                  {permissions.length > 3 && (
                    <span className="permissions-manager__permission-more">
                      +{permissions.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Roles */}
      <div className="permissions-manager__custom-roles">
        <h3>Custom Roles</h3>
        {loading ? (
          <div className="permissions-manager__loading">Loading custom roles...</div>
        ) : roles.length === 0 ? (
          <div className="permissions-manager__empty">
            <div className="permissions-manager__empty-icon">🔐</div>
            <h4>No custom roles created</h4>
            <p>Create custom roles for specific permission sets</p>
            <Button onClick={handleCreateRole}>Create Custom Role</Button>
          </div>
        ) : (
          <div className="permissions-manager__roles-grid">
            {roles.map((role) => (
              <div key={role.id} className="permissions-manager__role-card">
                <div className="permissions-manager__role-header">
                  <h4>{role.name}</h4>
                  <div className="permissions-manager__role-actions">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleEditRole(role)}
                    >
                      Edit
                    </Button>
                  </div>
                </div>
                <div className="permissions-manager__role-description">
                  <p>{role.description}</p>
                </div>
                <div className="permissions-manager__role-permissions">
                  <p>{role.permissions?.length || 0} permissions</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showModal && createPortal(
        <div className="contact-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
            <div className="contact-modal__header">
              <h2 className="contact-modal__title">
                {editingRole ? 'Edit Role' : 'Create Custom Role'}
              </h2>
              <button className="contact-modal__close" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>
            <div className="contact-modal__content">
              <div className="permissions-manager__form admin-section">
                <div className="permissions-manager__form-basic">
                  <Input
                    label="Role Name"
                    placeholder="Enter role name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                  
                  <Input
                    label="Description"
                    placeholder="Describe what this role can do"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>

                <div className="permissions-manager__permissions-section">
                  <div className="permissions-manager__permissions-header">
                    <h4>Permissions</h4>
                    <div className="permissions-manager__quick-actions">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setSelectedPermissions(Object.keys(PERMISSIONS))}
                      >
                        Select All
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setSelectedPermissions([])}
                      >
                        Clear All
                      </Button>
                    </div>
                  </div>

                  {getCategories().map(category => {
                    const categoryPermissions = getCategoryPermissions(category);
                    const hasAllCategory = categoryPermissions.every(perm => selectedPermissions.includes(perm));
                    
                    return (
                      <div key={category} className="permissions-manager__permission-category">
                        <div className="permissions-manager__category-header">
                          <h5>{category.charAt(0).toUpperCase() + category.slice(1)}</h5>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleSelectAll(category)}
                          >
                            {hasAllCategory ? 'Deselect All' : 'Select All'}
                          </Button>
                        </div>
                        
                        <div className="permissions-manager__permission-grid">
                          {categoryPermissions.map(permission => (
                            <div 
                              key={permission} 
                              className={`permissions-manager__permission-item ${selectedPermissions.includes(permission) ? 'selected' : ''}`}
                              onClick={() => handlePermissionToggle(permission)}
                            >
                              <div className="permissions-manager__permission-checkbox">
                                <input
                                  type="checkbox"
                                  checked={selectedPermissions.includes(permission)}
                                  onChange={() => handlePermissionToggle(permission)}
                                />
                              </div>
                              <div className="permissions-manager__permission-info">
                                <div className="permissions-manager__permission-name">
                                  {PERMISSIONS[permission]?.name || permission}
                                </div>
                                <div className="permissions-manager__permission-description">
                                  {PERMISSIONS[permission]?.description || 'No description'}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="contact-modal__footer">
              <button className="button button--secondary" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="button button--primary" onClick={handleSaveRole}>
                {editingRole ? 'Update Role' : 'Create Role'}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
