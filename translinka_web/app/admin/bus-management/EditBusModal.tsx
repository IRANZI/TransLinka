import React from 'react';

interface EditBusModalProps {
  open: boolean;
  onClose: () => void;
  bus: any;
  onEdit: (bus: any) => void;
}

export default function EditBusModal({ open, onClose, bus, onEdit }: EditBusModalProps) {
  const [form, setForm] = React.useState(bus || {
    plate: '',
    model: '',
    capacity: '',
    operator: '',
    status: 'Active',
  });

  React.useEffect(() => {
    setForm(bus || {
      plate: '',
      model: '',
      capacity: '',
      operator: '',
      status: 'Active',
    });
  }, [bus, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8 relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-xl font-bold"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-lg font-bold mb-1">Edit Bus</h2>
        <div className="text-gray-500 text-sm mb-8">Update bus details and status</div>
        <form
          onSubmit={e => {
            e.preventDefault();
            onEdit(form);
            onClose();
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium mb-2">Plate Number</label>
              <input
                type="text"
                className="w-full border rounded-lg px-4 py-2"
                value={form.plate}
                onChange={e => setForm((f: typeof form) => ({ ...f, plate: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Model</label>
              <input
                type="text"
                className="w-full border rounded-lg px-4 py-2"
                value={form.model}
                onChange={e => setForm((f: typeof form) => ({ ...f, model: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Capacity</label>
              <input
                type="number"
                className="w-full border rounded-lg px-4 py-2"
                value={form.capacity}
                onChange={e => setForm((f: typeof form) => ({ ...f, capacity: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Operator</label>
              <input
                type="text"
                className="w-full border rounded-lg px-4 py-2"
                value={form.operator}
                onChange={e => setForm((f: typeof form) => ({ ...f, operator: e.target.value }))}
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
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
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
