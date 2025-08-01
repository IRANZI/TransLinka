import React from 'react';

interface EditRouteModalProps {
  open: boolean;
  onClose: () => void;
  route: any;
  onEdit: (route: any) => void;
}

export default function EditRouteModal({ open, onClose, route, onEdit }: EditRouteModalProps) {
  const [form, setForm] = React.useState({
    name: route?.name || '',
    origin: route?.origin || '',
    destination: route?.destination || '',
    distance: route?.distance || '',
    duration: route?.duration || '',
    price: route?.price || '',
    frequency: route?.frequency || 'Daily',
    status: route?.status || 'Active',
  
    stops: Array.isArray(route?.stops) ? route.stops.join(', ') : (route?.stops || '')
  });

  React.useEffect(() => {
    setForm({
      name: route?.name || '',
      origin: route?.origin || '',
      destination: route?.destination || '',
      distance: route?.distance || '',
      duration: route?.duration || '',
      price: route?.price || '',
      frequency: route?.frequency || 'Daily',
      status: route?.status || 'Active',
      stops: Array.isArray(route?.stops) ? route.stops.join(', ') : (route?.stops || '')
    });
  }, [route, open]);

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
        <h2 className="text-lg font-bold mb-1">Edit Route</h2>
        <div className="text-gray-500 text-sm mb-8">Update route details and status</div>
        <form
          onSubmit={e => {
            e.preventDefault();
            
            const stopsArray = form.stops
              ? form.stops.split(/,|\n/).map((s: string) => s.trim()).filter(Boolean)
              : [];
            const updatedRoute = {
              ...form,
              stops: stopsArray
            };
            onEdit(updatedRoute);
            onClose();
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium mb-2">Route Name</label>
              <input
                type="text"
                className="w-full border rounded-lg px-4 py-2"
                value={form.name}
                onChange={e => setForm((f: typeof form) => ({ ...f, name: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Origin</label>
              <input
                type="text"
                className="w-full border rounded-lg px-4 py-2"
                value={form.origin}
                onChange={e => setForm((f: typeof form) => ({ ...f, origin: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Destination</label>
              <input
                type="text"
                className="w-full border rounded-lg px-4 py-2"
                value={form.destination}
                onChange={e => setForm((f: typeof form) => ({ ...f, destination: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Distance (km)</label>
              <input
                type="number"
                value={form.distance}
                onChange={e => setForm((f: typeof form) => ({ ...f, distance: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Duration (hours)</label>
              <input
                type="number"
                value={form.duration}
                onChange={e => setForm((f: typeof form) => ({ ...f, duration: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Price (Rwf)</label>
              <input
                type="number"
                value={form.price}
                onChange={e => setForm((f: typeof form) => ({ ...f, price: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Stops (comma or newline separated)</label>
              <textarea
                value={form.stops || ''}
                onChange={e => setForm((f: typeof form) => ({ ...f, stops: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 min-h-[48px]"
              />
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
