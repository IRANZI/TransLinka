'use client';

import React, { useState } from 'react';
import UserDetailsModal from './UserDetailsModal';
import AddUserModal from './AddUserModal';
import EditUserModal from './EditUserModal';
import Link from 'next/link';
import {
  LayoutDashboard,
  Bus,
  Route,
  Calendar,
  Users,
  LogOut,
  Search,
  Bell,
  Eye,
  Edit,
  Trash2,
} from 'lucide-react';

export default function AdminUsersPage() {
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [activeTab, setActiveTab] = useState('All Users');

  // stats counts
  const stats = [
    { label: 'Total Users', count: 5 },
    { label: 'Active', count: 4 },
    { label: 'Admins', count: 1 },
    { label: 'Operators', count: 2 },
    { label: 'Drivers', count: 1 },
    { label: 'Passengers', count: 5 },
  ];

  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Admin',
      email: 'admin@email.com',
      phone: '+250-722-500-692',
      location: 'Kigali',
      role: 'Admin',
      status: 'confirmed',
      joined: '1/20/2025',
      lastLogin: '1/20/2025, 4:30:00 PM',
      isCompleted: true,
    },
  ]);
  const [showAddUser, setShowAddUser] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);
  const [editingUser, setEditingUser] = useState<any | null>(null);

  // Filtering logic 
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole =
      roleFilter === 'All Roles' || user.role === roleFilter;
    const matchesStatus =
      statusFilter === 'All Status' || (statusFilter === 'Active' ? user.status === 'confirmed' : user.status !== 'confirmed');
    // Tab logic 
    const matchesTab =
      activeTab === 'All Users' || user.role === activeTab.slice(0, -1); 
    return matchesSearch && matchesRole && matchesStatus && matchesTab;
  });



  return (
    <div className="min-h-screen flex font-sans bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r shadow-sm flex flex-col">
        <div className="p-6 border-b">
          <div className="flex items-center">
            <img src="/logo.png" alt="Logo" className="h-8 w-8 object-contain mr-3" />
            <span className="text-xl font-bold text-gray-900">TransLinka</span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <SidebarItem href="/admin" label="Dashboard" Icon={LayoutDashboard} />
          <SidebarItem href="/admin/bus-management" label="Bus Management" Icon={Bus} />
          <SidebarItem href="/admin/route-management" label="Route Management" Icon={Route} />
          <SidebarItem href="/admin/bookings" label="Bookings" Icon={Calendar} />
          <SidebarItem href="/admin/user-management" label="Users" Icon={Users} active />
        </nav>
        <div className="p-4 border-t">
          <button className="flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg w-full">
            <LogOut className="w-5 h-5 mr-3" /> Sign Out
          </button>
        </div>
      </div>

      {/* Main Section */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b shadow-sm z-10">
          <div className="flex justify-between items-center h-16 px-8">
            <h1 className="text-lg font-bold">User Management</h1>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">A</div>
                <div className="text-sm">
                  <div className="font-medium text-gray-900">Admin User</div>
                  <div className="text-gray-500">administrator</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="px-8 py-8 flex-1 bg-gray-50">
        
          <div className="mb-2">
            <h2 className="text-lg font-bold text-gray-900">User Management</h2>
            <p className="text-sm text-gray-500">Manage passengers, operators, and admins with role-based access</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
            {stats.map(stat => (
              <div key={stat.label} className="bg-white rounded-xl border p-4 text-center">
                <div className="text-sm text-gray-500">{stat.label}</div>
                <div className="text-2xl font-bold">{stat.count}</div>
              </div>
            ))}
          </div>

          {/* Filters and Tabs */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
            <input
              type="text"
              className="border px-4 py-2 rounded-lg w-full md:w-[350px]"
              placeholder="Search users by name, email, or phone..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <div className="flex gap-2 w-full md:w-auto">
              <select
                className="border px-4 py-2 rounded-lg"
                value={roleFilter}
                onChange={e => setRoleFilter(e.target.value)}
              >
                <option>All Roles</option>
                <option>Admin</option>
                <option>Operator</option>
                <option>Driver</option>
                <option>Passenger</option>
              </select>
              <select
                className="border px-4 py-2 rounded-lg"
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
              >
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium ml-2"
                onClick={() => setShowAddUser(true)}
              >
                + Add New User
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            {['All Users', 'Admins', 'Operators', 'Drivers', 'Passengers'].map(tab => (
              <button
                key={tab}
                className={`px-4 py-2 text-sm rounded-md font-medium border transition-all ${activeTab === tab ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100'}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* User List */}
          <div className="bg-white rounded-xl border p-6">
            <div className="font-bold text-lg mb-4">Users ({filteredUsers.length})</div>
            {filteredUsers.map(user => (
              <div key={user.id} className="flex items-center justify-between border rounded-lg p-4 mb-4 bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-blue-600 cursor-pointer hover:underline">{user.name}</div>
                    <div className="text-sm text-gray-600 flex items-center gap-2">
                      <span>{user.email}</span>
                      <span>•</span>
                      <span>{user.phone}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Joined: {user.joined} • Last Login: {user.lastLogin}
                    </div>
                    <div className="flex gap-2 mt-2">
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full border border-green-300 flex items-center">
                        <svg className="w-4 h-4 mr-1 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        confirmed
                      </span>
                      {user.isCompleted && (
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full border border-green-300 flex items-center">
                          <svg className="w-4 h-4 mr-1 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                          completed
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-3 py-2 border rounded-md text-gray-600 hover:bg-gray-100 text-sm" onClick={() => setShowUserDetails(true)}>
                    <Eye className="w-4 h-4" /> View
                  </button>
                  <button
                    className="flex items-center gap-2 px-3 py-2 border rounded-md text-gray-600 hover:bg-gray-100 text-sm"
                    onClick={() => {
                      setEditingUser(user);
                      setShowEditUser(true);
                    }}
                  >
                    <Edit className="w-4 h-4" /> Edit
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 rounded-md text-sm">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
      <UserDetailsModal open={showUserDetails} onClose={() => setShowUserDetails(false)} />
      <AddUserModal
        open={showAddUser}
        onClose={() => setShowAddUser(false)}
        onAdd={user => {
          setUsers(prev => [
            ...prev,
            {
              ...user,
              id: prev.length + 1,
              status: user.status === 'Active' ? 'confirmed' : 'inactive',
              joined: new Date().toLocaleDateString(),
              lastLogin: '-',
              isCompleted: true,
            },
          ]);
        }}
      />
      <EditUserModal
        open={showEditUser}
        onClose={() => setShowEditUser(false)}
        user={editingUser}
        onEdit={user => {
          setUsers(prev => prev.map(u => u.id === editingUser.id ? { ...u, ...user } : u));
        }}
      />
    </div>
  );
}

function SidebarItem({ href, label, Icon, active = false }: any) {
  return (
    <Link
      href={href}
      className={`flex items-center px-4 py-3 rounded-lg font-medium ${
        active ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
      }`}
    >
      <Icon className="w-5 h-5 mr-3" />
      {label}
    </Link>
  );
}
