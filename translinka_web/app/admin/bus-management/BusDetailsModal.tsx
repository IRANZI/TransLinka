import React from 'react';
import { X, Bus, User, Phone, Calendar, MapPin, Wrench, FileText, CheckCircle, XCircle } from 'lucide-react';

interface BusDetailsModalProps {
  open: boolean;
  onClose: () => void;
  bus?: any;
}

export default function BusDetailsModal({ open, onClose, bus }: BusDetailsModalProps) {
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
                <h2 className="text-2xl font-bold text-gray-900">{bus.name}</h2>
                <p className="text-gray-600">{bus.plateNumber} • {bus.make} {bus.model}</p>
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

        <div className="p-8">
          {/* Status Badge */}
          <div className="mb-8">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${bus.statusColor}`}>
              {bus.status}
            </span>
          </div>

          {/* Main Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {/* Vehicle Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Vehicle Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Plate Number</label>
                  <p className="text-gray-900">{bus.plateNumber}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Chassis Number</label>
                  <p className="text-gray-900">{bus.chassisNumber}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Engine Number</label>
                  <p className="text-gray-900">{bus.engineNumber}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Make & Model</label>
                  <p className="text-gray-900">{bus.make} {bus.model}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Year</label>
                  <p className="text-gray-900">{bus.year}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Color</label>
                  <p className="text-gray-900">{bus.color}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Seating Capacity</label>
                  <p className="text-gray-900">{bus.seats} seats</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Mileage</label>
                  <p className="text-gray-900">{bus.mileage}</p>
                </div>
              </div>
            </div>

            {/* Driver & Route Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Driver & Route</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <div>
                    <label className="text-sm font-medium text-gray-500">Driver Name</label>
                    <p className="text-gray-900">{bus.driver.name}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">License Number</label>
                  <p className="text-gray-900">{bus.driver.licenseNumber}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">National ID</label>
                  <p className="text-gray-900">{bus.driver.nationalId}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <div>
                    <label className="text-sm font-medium text-gray-500">Route</label>
                    <p className="text-gray-900">{bus.route}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <div>
                    <label className="text-sm font-medium text-gray-500">Last Maintenance</label>
                    <p className="text-gray-900">{new Date(bus.lastMaintenance).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Wrench className="w-4 h-4 text-gray-400" />
                  <div>
                    <label className="text-sm font-medium text-gray-500">Next Maintenance</label>
                    <p className="text-gray-900">{new Date(bus.nextMaintenance).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Company Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Company Name</label>
                  <p className="text-gray-900">{bus.company.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Registration Number</label>
                  <p className="text-gray-900">{bus.company.registrationNumber}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Contact Person</label>
                  <p className="text-gray-900">{bus.company.contactPerson}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <div>
                    <label className="text-sm font-medium text-gray-500">Phone</label>
                    <p className="text-gray-900">{bus.company.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Documents Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4">Required Documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-700">Vehicle Registration</span>
                </div>
                <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">{bus.documents.vehicleRegistration}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-700">Roadworthiness Certificate</span>
                </div>
                <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">{bus.documents.roadworthinessCertificate}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-700">Insurance Certificate</span>
                </div>
                <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">{bus.documents.insuranceCertificate}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-700">Operating License</span>
                </div>
                <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">{bus.documents.operatingLicense}</span>
              </div>
            </div>
          </div>

          {/* Safety Equipment Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4">Safety Equipment Compliance</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(bus.safetyEquipment).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  {value ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                  <span className="text-sm text-gray-700 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Edit Bus Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
