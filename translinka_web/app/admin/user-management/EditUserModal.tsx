import React from 'react';

interface EditUserModalProps {
  open: boolean;
  onClose: () => void;
  user: any;
  onEdit: (user: any) => void;
}

const roles = ['Passenger', 'Driver', 'Operator', 'Admin'];
const statuses = ['Active', 'Inactive'];

export default function EditUserModal({ open, onClose, user, onEdit }: EditUserModalProps) {
  const [form, setForm] = React.useState(user || {
    name: '',
    email: '',
    phone: '',
    location: '',
    role: 'Passenger',
    status: 'Active',
  });

  React.useEffect(() => {
    setForm(user || {
      name: '',
      email: '',
      phone: '',
      location: '',
      role: 'Passenger',
      status: 'Active',
    });
  }, [user, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-8 relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-xl font-bold"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-lg font-bold mb-1">Edit User</h2>
        <div className="text-gray-500 text-sm mb-8">Update user account details and permissions</div>
        <form
          onSubmit={e => {
            e.preventDefault();
            onEdit(form);
            onClose();
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                className="w-full border rounded-lg px-4 py-2"
                value={form.name}
                onChange={e => setForm((f: typeof form) => ({ ...f, name: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <input
                type="email"
                className="w-full border rounded-lg px-4 py-2"
                value={form.email}
                onChange={e => setForm((f: typeof form) => ({ ...f, email: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phone Number</label>
              <input
                type="text"
                className="w-full border rounded-lg px-4 py-2"
                value={form.phone}
                onChange={e => setForm((f: typeof form) => ({ ...f, phone: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Role</label>
              <select
                className="w-full border rounded-lg px-4 py-2 bg-white"
                value={form.role}
                onChange={e => setForm((f: typeof form) => ({ ...f, role: e.target.value }))}
              >
                {roles.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <input
                type="text"
                className="w-full border rounded-lg px-4 py-2"
                value={form.location}
                onChange={e => setForm((f: typeof form) => ({ ...f, location: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                className="w-full border rounded-lg px-4 py-2 bg-white"
                value={form.status}
                onChange={e => setForm((f: typeof form) => ({ ...f, status: e.target.value }))}
              >
                {statuses.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="px-6 py-2 rounded-lg border font-medium"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
