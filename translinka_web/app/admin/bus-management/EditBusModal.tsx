import React from 'react';
import { X, Bus } from 'lucide-react';

interface BusData {
  name: string;
  plateNumber: string;
  chassisNumber: string;
  engineNumber: string;
  make: string;
  model: string;
  year: string;
  color: string;
  seats: number;
  route: string;
  driver: {
    name: string;
    licenseNumber: string;
    nationalId: string;
  };
  company: {
    name: string;
    registrationNumber: string;
    contactPerson: string;
    phone: string;
  };
  status: string;
}

interface EditBusModalProps {
  open: boolean;
  onClose: () => void;
  bus: BusData;
  onEdit: (bus: BusData) => void;
}

export default function EditBusModal({ open, onClose, bus, onEdit }: EditBusModalProps) {
  const [form, setForm] = React.useState(bus || {
    name: '',
    plateNumber: '',
    chassisNumber: '',
    engineNumber: '',
    make: '',
    model: '',
    year: '',
    color: '',
    seats: 0,
    route: '',
    driver: {
      name: '',
      licenseNumber: '',
      nationalId: ''
    },
    company: {
      name: '',
      registrationNumber: '',
      contactPerson: '',
      phone: ''
    },
    status: 'Active',
  });

  React.useEffect(() => {
    if (bus) {
      setForm(bus);
    }
  }, [bus, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEdit(form);
    onClose();
  };

  if (!open || !bus) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-8 py-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Bus className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Edit Bus Details</h2>
                <p className="text-gray-600">{form.plateNumber} • {form.make} {form.model}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          {/* Vehicle Information */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-6">Vehicle Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bus Name *</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Plate Number *</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={form.plateNumber}
                  onChange={e => setForm(f => ({ ...f, plateNumber: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Chassis Number *</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={form.chassisNumber}
                  onChange={e => setForm(f => ({ ...f, chassisNumber: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Engine Number *</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={form.engineNumber}
                  onChange={e => setForm(f => ({ ...f, engineNumber: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Make *</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={form.make}
                  onChange={e => setForm(f => ({ ...f, make: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Model *</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={form.model}
                  onChange={e => setForm(f => ({ ...f, model: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Year *</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={form.year}
                  onChange={e => setForm(f => ({ ...f, year: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Color *</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={form.color}
                  onChange={e => setForm(f => ({ ...f, color: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Seating Capacity *</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={form.seats}
                  onChange={e => setForm(f => ({ ...f, seats: parseInt(e.target.value) }))}
                  required
                />
              </div>
            </div>
          </div>

          {/* Driver Information */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-6">Driver Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Driver Name *</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={form.driver.name}
                  onChange={e => setForm(f => ({ ...f, driver: { ...f.driver, name: e.target.value } }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">License Number *</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={form.driver.licenseNumber}
                  onChange={e => setForm(f => ({ ...f, driver: { ...f.driver, licenseNumber: e.target.value } }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">National ID *</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={form.driver.nationalId}
                  onChange={e => setForm(f => ({ ...f, driver: { ...f.driver, nationalId: e.target.value } }))}
                  required
                />
              </div>
            </div>
          </div>

          {/* Company Information */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-6">Company Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={form.company.name}
                  onChange={e => setForm(f => ({ ...f, company: { ...f.company, name: e.target.value } }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Registration Number *</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={form.company.registrationNumber}
                  onChange={e => setForm(f => ({ ...f, company: { ...f.company, registrationNumber: e.target.value } }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person *</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={form.company.contactPerson}
                  onChange={e => setForm(f => ({ ...f, company: { ...f.company, contactPerson: e.target.value } }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={form.company.phone}
                  onChange={e => setForm(f => ({ ...f, company: { ...f.company, phone: e.target.value } }))}
                  required
                />
              </div>
            </div>
          </div>

          {/* Route & Status */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-6">Route & Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Route *</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={form.route}
                  onChange={e => setForm(f => ({ ...f, route: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  value={form.status}
                  onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                >
                  <option value="Active">Active</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
