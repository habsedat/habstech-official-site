/**
 * HABS TECHNOLOGIES GROUP
 * User Manager Component
 */

'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { getDocuments, addDocument, updateDocument, deleteDocument, COLLECTIONS } from '@/lib/firestore';
import { ROLES } from '@/lib/auth';
import { createUserInBothProjects, getAuthErrorMessage } from '@/lib/auth-service';
import Button from '../ui/button';
import Input from '../ui/input';
import Select from '../ui/select';
import StatusChip from './status-chip';
import './user-manager.css';
import '../../screens/admin/contacts.css';

const USER_ROLES = [
  { value: ROLES.SUPER_ADMIN, label: 'Super Admin', description: 'Ultimate system control - add/remove admins, assign roles, see visitors' },
  { value: ROLES.ADMIN, label: 'Admin', description: 'Specific rules and permissions management' },
  { value: ROLES.EDITOR, label: 'Editor', description: 'Content editing and news writing only' },
];

const USER_STATUSES = [
  { value: 'active', label: 'Active', color: 'green' },
  { value: 'inactive', label: 'Inactive', color: 'gray' },
  { value: 'suspended', label: 'Suspended', color: 'red' },
  { value: 'pending', label: 'Pending', color: 'yellow' },
];

export default function UserManager({ userType = 'admin' }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: ROLES.EDITOR,
    status: 'active',
    phone: '',
    department: '',
    notes: ''
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const userData = await getDocuments(COLLECTIONS.USERS, {
        orderBy: ['createdAt', 'desc']
      });
      
      // Filter by user type (admin vs client)
      const filteredUsers = userData.filter(user => {
        if (userType === 'admin') {
          return [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.EDITOR].includes(user.role);
        } else {
          return user.role === ROLES.CLIENT;
        }
      });
      
      setUsers(filteredUsers);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = () => {
    setEditingUser(null);
    setFormData({
      name: '',
      email: '',
      password: '',
      role: userType === 'admin' ? ROLES.EDITOR : 'client',
      status: 'active',
      phone: '',
      department: '',
      notes: ''
    });
    setShowModal(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name || '',
      email: user.email || '',
      password: '', // Don't show existing password
      role: user.role || ROLES.EDITOR,
      status: user.status || 'active',
      phone: user.phone || '',
      department: user.department || '',
      notes: user.notes || ''
    });
    setShowModal(true);
  };

  const handleSaveUser = async () => {
    setLoading(true);
    try {
      if (editingUser) {
        // For editing, just update the Firestore document
        const userData = {
          ...formData,
          updatedAt: new Date(),
          updatedBy: 'current-user-id' // TODO: Get from auth context
        };
        // Remove password from update data
        delete userData.password;
        
        await updateDocument(COLLECTIONS.USERS, editingUser.id, userData);
      } else {
        // For new users, create in Firebase Authentication first
        if (!formData.password) {
          alert('Password is required for new users');
          setLoading(false);
          return;
        }

        // Note: We'll let Firebase handle email validation instead of pre-checking

        // Create user in both Firebase projects
        const authResult = await createUserInBothProjects({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          role: formData.role
        });

        if (!authResult.success) {
          const errorMessage = getAuthErrorMessage(authResult.code);
          alert(`Failed to create user: ${errorMessage}\n\nError Code: ${authResult.code}`);
          console.error('User creation failed:', authResult);
          setLoading(false);
          return;
        }

        // Create Firestore document with proper role assignment
        const userData = {
          name: formData.name,
          email: formData.email,
          role: formData.role, // Ensure role is properly set
          status: formData.status,
          phone: formData.phone || '',
          department: formData.department || '',
          notes: formData.notes || '',
          devUid: authResult.devUid,
          prodUid: authResult.prodUid || null,
          createdAt: new Date(),
          createdBy: 'current-user-id', // TODO: Get from auth context
          updatedAt: new Date(),
          updatedBy: 'current-user-id' // TODO: Get from auth context
        };
        
        console.log('Creating user document with data:', userData);
        await addDocument(COLLECTIONS.USERS, userData);
        console.log('User document created successfully');
        
        // Show success message for new users
        alert(`User created successfully!\n\nEmail: ${formData.email}\nName: ${formData.name}\nRole: ${formData.role}\n\nUser can now login with these credentials.`);
      }

      setShowModal(false);
      setEditingUser(null);
      setFormData({
        name: '',
        email: '',
        password: '',
        role: ROLES.EDITOR,
        status: 'active',
        phone: '',
        department: '',
        notes: ''
      });
      loadUsers();
    } catch (error) {
      console.error('Error saving user:', error);
      alert('Failed to save user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (user) => {
    if (!confirm(`Are you sure you want to delete ${user.name}? This action cannot be undone.`)) {
      return;
    }

    try {
      await deleteDocument(COLLECTIONS.USERS, user.id);
      loadUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user. Please try again.');
    }
  };

  const handleStatusChange = async (user, newStatus) => {
    try {
      await updateDocument(COLLECTIONS.USERS, user.id, {
        status: newStatus,
        updatedAt: new Date(),
        updatedBy: 'current-user-id' // TODO: Get from auth context
      });
      loadUsers();
    } catch (error) {
      console.error('Error updating user status:', error);
      alert('Failed to update user status. Please try again.');
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = !searchTerm || 
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleDisplayName = (role) => {
    const roleObj = USER_ROLES.find(r => r.value === role);
    return roleObj ? roleObj.label : role;
  };

  return (
    <div className="user-manager">
      {/* Header */}
      <div className="user-manager__header">
        <div className="user-manager__title-section">
          <h2>{userType === 'admin' ? 'Admin Users' : 'Client Users'}</h2>
          <p>Manage {userType} user accounts and permissions</p>
        </div>
        <Button onClick={handleCreateUser} className="user-manager__create-btn">
          + Add {userType === 'admin' ? 'Admin' : 'Client'}
        </Button>
      </div>

      {/* Filters */}
      <div className="user-manager__filters">
        <div className="user-manager__filters-left">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="user-manager__search"
          />
        </div>
        
        <div className="user-manager__filters-right">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="user-manager__filter"
          >
            <option value="all">All Roles</option>
            {USER_ROLES.map(role => (
              <option key={role.value} value={role.value}>{role.label}</option>
            ))}
          </select>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="user-manager__filter"
          >
            <option value="all">All Statuses</option>
            {USER_STATUSES.map(status => (
              <option key={status.value} value={status.value}>{status.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="user-manager__table">
        {loading ? (
          <div className="user-manager__loading">Loading users...</div>
        ) : filteredUsers.length === 0 ? (
          <div className="user-manager__empty">
            <div className="user-manager__empty-icon">👥</div>
            <h3>No {userType} users found</h3>
            <p>Create your first {userType} user to get started</p>
            <Button onClick={handleCreateUser}>Add {userType === 'admin' ? 'Admin' : 'Client'}</Button>
          </div>
        ) : (
          <div className="user-manager__table-content">
            <div className="user-manager__table-header">
              <div className="user-manager__table-cell">Name</div>
              <div className="user-manager__table-cell">Email</div>
              <div className="user-manager__table-cell">Role</div>
              <div className="user-manager__table-cell">Status</div>
              <div className="user-manager__table-cell">Last Login</div>
              <div className="user-manager__table-cell">Actions</div>
            </div>
            
            {filteredUsers.map((user) => (
              <div key={user.id} className="user-manager__table-row">
                <div className="user-manager__table-cell">
                  <div className="user-manager__user-info">
                    <div className="user-manager__user-avatar">
                      {user.name?.charAt(0)?.toUpperCase() || '?'}
                    </div>
                    <div>
                      <div className="user-manager__user-name">{user.name || 'No name'}</div>
                      <div className="user-manager__user-department">{user.department || 'No department'}</div>
                    </div>
                  </div>
                </div>
                
                <div className="user-manager__table-cell">
                  <div className="user-manager__user-email">{user.email}</div>
                </div>
                
                <div className="user-manager__table-cell">
                  <StatusChip 
                    status={user.role} 
                    label={getRoleDisplayName(user.role)}
                    className="user-manager__role-chip"
                  />
                </div>
                
                <div className="user-manager__table-cell">
                  <StatusChip 
                    status={user.status} 
                    label={user.status}
                    className="user-manager__status-chip"
                  />
                </div>
                
                <div className="user-manager__table-cell">
                  <div className="user-manager__last-login">
                    {user.lastLogin ? 
                      new Date(user.lastLogin).toLocaleDateString() : 
                      'Never'
                    }
                  </div>
                </div>
                
                <div className="user-manager__table-cell">
                  <div className="user-manager__actions">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleEditUser(user)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDeleteUser(user)}
                      className="user-manager__delete-btn"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {/* User Form Modal */}
      {showModal && createPortal(
        <div className="contact-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
            <div className="contact-modal__header">
              <h2 className="contact-modal__title">
                {editingUser ? 'Edit User' : `Add ${userType === 'admin' ? 'Admin' : 'Client'} User`}
              </h2>
              <button className="contact-modal__close" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>
            <div className="contact-modal__content">
              <div className="user-manager__form admin-section">
                <Input
                  label="Full Name"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
                
                <Input
                  label="Email"
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
                
                {!editingUser && (
                  <Input
                    label="Password"
                    type="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                  />
                )}
                
                <Input
                  label="Phone"
                  type="tel"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
                
                <Input
                  label="Department"
                  placeholder="Enter department"
                  value={formData.department}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                />
                
                <Select
                  label="Role"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  options={userType === 'admin' ? USER_ROLES : [{ value: 'client', label: 'Client' }]}
                  placeholder="Select a role"
                />
                
                <Select
                  label="Status"
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  options={USER_STATUSES}
                  placeholder="Select status"
                />
              </div>
            </div>
            <div className="contact-modal__footer">
              <button className="button button--secondary" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button 
                className="button button--primary" 
                onClick={handleSaveUser}
                disabled={loading}
              >
                {loading ? 'Creating...' : (editingUser ? 'Update User' : 'Create User')}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
