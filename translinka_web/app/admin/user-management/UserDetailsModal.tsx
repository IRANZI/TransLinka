import React from 'react';

interface UserDetailsModalProps {
  open: boolean;
  onClose: () => void;
}

const mockUser = {
  name: 'John Doe',
  email: 'johndoe@gmail.com',
  phone: '+234 801 234 5678',
  location: 'Masaka',
  role: 'John Doe',
  status: 'active',
  joined: '2/15/2024',
  lastLogin: '1/19/2024, 4:30:00 PM',
  permissions: 'all',
};

export default function UserDetailsModal({ open, onClose }: UserDetailsModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl p-8 relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-lg font-semibold mb-6">John Admin - User Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Passenger Information */}
          <div>
            <h3 className="font-semibold mb-4">Passenger Information:</h3>
            <div className="mb-2"><span className="font-semibold">Name:</span> {mockUser.name}</div>
            <div className="mb-2"><span className="font-semibold">Email:</span> <span className="text-xs">{mockUser.email}</span></div>
            <div className="mb-2"><span className="font-semibold">Phone:</span> <span className="text-xs">{mockUser.phone}</span></div>
            <div className="mb-2"><span className="font-semibold">Location:</span> <span className="text-xs">{mockUser.location}</span></div>
          </div>
          {/* Account Information */}
          <div>
            <h3 className="font-semibold mb-4">Account Information:</h3>
            <div className="mb-2"><span className="font-semibold">Role:</span> {mockUser.role}</div>
            <div className="mb-2"><span className="font-semibold">Status:</span> <span className="lowercase">{mockUser.status}</span></div>
            <div className="mb-2"><span className="font-semibold">Joined:</span> {mockUser.joined}</div>
            <div className="mb-2"><span className="font-semibold">Last Login:</span> {mockUser.lastLogin}</div>
          </div>
        </div>
        {/* Permissions */}
        <div className="mt-8">
          <div className="font-semibold mb-2">Permissions:</div>
          <span className="inline-block bg-green-600 text-white px-5 py-1 rounded-full text-sm font-semibold">all</span>
        </div>
      </div>
    </div>
  );
}
