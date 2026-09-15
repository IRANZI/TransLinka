'use client';
import React, { useEffect, useState } from 'react';
import AdminHeader from '@/components/AdminHeader';
import { api } from '@/lib/api';
import { 
  Search, 
  Building2, 
  Eye,
  Trash2,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Plus,
  Filter,
  Download,
  X,
  Power
} from 'lucide-react';

export default function CompaniesManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [companies, setCompanies] = useState<any[]>([]);

  const loadCompanies = async () => {
    try {
      const data = await api<any[]>('/api/super-admin/companies');
      setCompanies(data || []);
    } catch {
      setCompanies([]);
    }
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  // Adding a company 
  const [newCompany, setNewCompany] = useState({
    // Basic Company Information
    name: '',
    contactPerson: '',
    phone: '',
    email: '',
    address: '',
    password: '',
    confirmPassword: '',
    
    // Rwandan Government Requirements
    businessRegistrationNumber: '',
    tinNumber: '',
    vatRegistrationNumber: '',
    transportLicenseNumber: '',
    ruraLicenseNumber: '',
    rtdaPermitNumber: '',
    
    // Legal Documents
    businessRegistrationCertificate: null as File | null,
    taxClearanceCertificate: null as File | null,
    transportOperatorLicense: null as File | null,
    ruraOperatingLicense: null as File | null,
    rtdaTransportPermit: null as File | null,
    insuranceCertificate: null as File | null,
    
    // Additional Requirements
    companyType: '',
    operatingRoutes: '',
    fleetSize: '',
    bankAccountDetails: '',
    authorizedCapital: '',
    paidUpCapital: '',
    
    // Director/Owner Information
    directorName: '',
    directorNationalId: '',
    directorAddress: '',
    directorPhone: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-50 text-emerald-800';
      case 'Inactive':
        return 'bg-rose-50 text-rose-800';
      default:
        return 'bg-navy-50 text-navy-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Inactive':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
    }
  };

  const handleCompanySelect = (companyId: string) => {
    setSelectedCompanies(prev => 
      prev.includes(companyId) 
        ? prev.filter(id => id !== companyId)
        : [...prev, companyId]
    );
  };

  const handleRemoveCompanies = async () => {
    await api('/api/super-admin/companies', {
      method: 'DELETE',
      body: JSON.stringify({ ids: selectedCompanies }),
    });
    setSelectedCompanies([]);
    setShowRemoveModal(false);
    await loadCompanies();
  };

  const handleAddCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newCompany.name || !newCompany.contactPerson || !newCompany.email || !newCompany.phone || !newCompany.password) {
      alert('Please fill in all required fields');
      return;
    }

    if (newCompany.password !== newCompany.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const createdName = newCompany.name;
    const createdEmail = newCompany.email;
    await api('/api/super-admin/companies', {
      method: 'POST',
      body: JSON.stringify({
        ...newCompany,
        businessRegistrationCertificate: newCompany.businessRegistrationCertificate?.name || null,
        taxClearanceCertificate: newCompany.taxClearanceCertificate?.name || null,
        transportOperatorLicense: newCompany.transportOperatorLicense?.name || null,
        ruraOperatingLicense: newCompany.ruraOperatingLicense?.name || null,
        rtdaTransportPermit: newCompany.rtdaTransportPermit?.name || null,
        insuranceCertificate: newCompany.insuranceCertificate?.name || null,
      }),
    });
    await loadCompanies();

    setNewCompany({
      name: '',
      contactPerson: '',
      phone: '',
      email: '',
      address: '',
      password: '',
      confirmPassword: '',
      businessRegistrationNumber: '',
      tinNumber: '',
      vatRegistrationNumber: '',
      transportLicenseNumber: '',
      ruraLicenseNumber: '',
      rtdaPermitNumber: '',
      businessRegistrationCertificate: null,
      taxClearanceCertificate: null,
      transportOperatorLicense: null,
      ruraOperatingLicense: null,
      rtdaTransportPermit: null,
      insuranceCertificate: null,
      companyType: '',
      operatingRoutes: '',
      fleetSize: '',
      bankAccountDetails: '',
      authorizedCapital: '',
      paidUpCapital: '',
      directorName: '',
      directorNationalId: '',
      directorAddress: '',
      directorPhone: ''
    });
    setShowAddModal(false);
    alert(`Company "${createdName}" has been added. Admin login email: ${createdEmail}`);
  };

  const toggleCompanyStatus = async (company: any) => {
    const nextStatus = company.status === 'Active' ? 'Inactive' : 'Active';
    await api('/api/super-admin/companies', {
      method: 'PUT',
      body: JSON.stringify({ id: company.id, status: nextStatus }),
    });
    await loadCompanies();
  };

  const exportCompanies = () => {
    const header = 'Name,Status,Contact,Email,Phone,Buses,Routes,Revenue\n';
    const rows = filteredCompanies
      .map((company) =>
        [company.name, company.status, company.contactPerson, company.email, company.phone, company.buses, company.routes, company.revenue]
          .map((value) => `"${String(value ?? '').replace(/"/g, '""')}"`)
          .join(',')
      )
      .join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'translinka-companies.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         company.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         company.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || company.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-navy-50">
      <AdminHeader variant="super" />
        <main className="page-wrap py-6 sm:py-8 lg:py-10">
          <div className="mb-8">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-navy-900">Companies</h1>
                <p className="mt-1 text-navy-600">Manage all registered transport companies on the platform</p>
              </div>
              <div className="flex gap-3">
                <button type="button" className="btn-secondary" onClick={exportCompanies}>
                  <Download className="h-4 w-4" />
                  Export
                </button>
                <button 
                  type="button"
                  onClick={() => setShowAddModal(true)}
                  className="btn-primary"
                >
                  <Plus className="h-4 w-4" />
                  Add Company
                </button>
              </div>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search companies, contacts, or emails..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-field pl-10"
                  />
                </div>
              </div>
              <div className="flex space-x-3">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </button>
              </div>
            </div>

            {/* Selected Actions */}
            {selectedCompanies.length > 0 && (
              <div className="bg-navy-50 border border-navy-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-navy-800 font-medium">
                    {selectedCompanies.length} company(ies) selected
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setShowRemoveModal(true)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                    >
                      Remove Selected
                    </button>
                    <button
                      onClick={() => setSelectedCompanies([])}
                      className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm"
                    >
                      Clear Selection
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Companies Table */}
          <div className="overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-soft">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-navy-100 bg-navy-50/70">
                    <th className="text-left py-4 px-6 font-medium text-gray-500">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                        checked={selectedCompanies.length === filteredCompanies.length && filteredCompanies.length > 0}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCompanies(filteredCompanies.map(c => c.id));
                          } else {
                            setSelectedCompanies([]);
                          }
                        }}
                      />
                    </th>
                    <th className="text-left py-4 px-6 font-medium text-gray-500">Company</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-500">Status</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-500">Fleet</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-500">Revenue</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-500">Last Activity</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCompanies.map((company) => (
                    <tr key={company.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                          checked={selectedCompanies.includes(company.id)}
                          onChange={() => handleCompanySelect(company.id)}
                        />
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <div className="font-medium text-gray-900">{company.name}</div>
                          <div className="text-sm text-gray-500">{company.contactPerson}</div>
                          <div className="text-sm text-gray-500">{company.email}</div>
                          <div className="text-sm text-gray-500">{company.address}</div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(company.status)}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(company.status)}`}>
                            {company.status}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm">
                          <div className="font-medium text-gray-900">{company.buses} buses</div>
                          <div className="text-gray-500">{company.routes} routes</div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-medium text-gray-900">{company.revenue}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm text-gray-500">{company.lastActivity ? new Date(company.lastActivity).toLocaleString() : "—"}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => {
                              setSelectedCompany(company);
                              setShowViewModal(true);
                            }}
                            className="p-2 text-navy-600 hover:bg-navy-50 rounded-lg"
                            aria-label="View company"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            className="p-2 text-navy-600 hover:bg-navy-50 rounded-lg"
                            onClick={() => void toggleCompanyStatus(company)}
                            aria-label={company.status === 'Active' ? 'Deactivate company' : 'Activate company'}
                            title={company.status === 'Active' ? 'Deactivate' : 'Activate'}
                          >
                            <Power className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            onClick={() => {
                              setSelectedCompanies([company.id]);
                              setShowRemoveModal(true);
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {filteredCompanies.length === 0 && (
              <div className="text-center py-12">
                <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No companies found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </main>

      {/* Add Company Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-navy-950/50 flex items-center justify-center z-50">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-lift">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Add New Company</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <form onSubmit={handleAddCompany} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Company Name */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newCompany.name}
                    onChange={(e) => setNewCompany(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    placeholder="Enter company name"
                  />
                </div>

                {/* Contact Person */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Person *
                  </label>
                  <input
                    type="text"
                    required
                    value={newCompany.contactPerson}
                    onChange={(e) => setNewCompany(prev => ({ ...prev, contactPerson: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    placeholder="Full name"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={newCompany.phone}
                    onChange={(e) => setNewCompany(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    placeholder="+250 788 123 456"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={newCompany.email}
                    onChange={(e) => setNewCompany(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    placeholder="admin@company.rw"
                  />
                  <p className="text-xs text-gray-500 mt-1">This will be used as the admin login email</p>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    value={newCompany.address}
                    onChange={(e) => setNewCompany(prev => ({ ...prev, address: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    placeholder="City, Rwanda"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Admin Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={newCompany.password}
                    onChange={(e) => setNewCompany(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    placeholder="Enter password"
                    minLength={6}
                  />
                  <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={newCompany.confirmPassword}
                    onChange={(e) => setNewCompany(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    placeholder="Confirm password"
                  />
                </div>

                {/* Business Registration Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Registration Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={newCompany.businessRegistrationNumber}
                    onChange={(e) => setNewCompany(prev => ({ ...prev, businessRegistrationNumber: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    placeholder="Enter business registration number"
                  />
                </div>

                {/* TIN Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    TIN Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={newCompany.tinNumber}
                    onChange={(e) => setNewCompany(prev => ({ ...prev, tinNumber: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    placeholder="Enter TIN number"
                  />
                </div>

                {/* VAT Registration Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    VAT Registration Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={newCompany.vatRegistrationNumber}
                    onChange={(e) => setNewCompany(prev => ({ ...prev, vatRegistrationNumber: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    placeholder="Enter VAT registration number"
                  />
                </div>

                {/* Transport License Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transport License Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={newCompany.transportLicenseNumber}
                    onChange={(e) => setNewCompany(prev => ({ ...prev, transportLicenseNumber: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    placeholder="Enter transport license number"
                  />
                </div>

                {/* RURA License Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    RURA License Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={newCompany.ruraLicenseNumber}
                    onChange={(e) => setNewCompany(prev => ({ ...prev, ruraLicenseNumber: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    placeholder="Enter RURA license number"
                  />
                </div>

                {/* RTDA Permit Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    RTDA Permit Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={newCompany.rtdaPermitNumber}
                    onChange={(e) => setNewCompany(prev => ({ ...prev, rtdaPermitNumber: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    placeholder="Enter RTDA permit number"
                  />
                </div>

                {/* Business Registration Certificate */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Registration Certificate *
                  </label>
                  <input
                    type="file"
                    onChange={(e) => setNewCompany(prev => ({ ...prev, businessRegistrationCertificate: e.target.files?.[0] || null }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                  />
                </div>

                {/* Tax Clearance Certificate */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tax Clearance Certificate *
                  </label>
                  <input
                    type="file"
                    onChange={(e) => setNewCompany(prev => ({ ...prev, taxClearanceCertificate: e.target.files?.[0] || null }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                  />
                </div>

                {/* Transport Operator License */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transport Operator License *
                  </label>
                  <input
                    type="file"
                    onChange={(e) => setNewCompany(prev => ({ ...prev, transportOperatorLicense: e.target.files?.[0] || null }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                  />
                </div>

                {/* RURA Operating License */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    RURA Operating License *
                  </label>
                  <input
                    type="file"
                    onChange={(e) => setNewCompany(prev => ({ ...prev, ruraOperatingLicense: e.target.files?.[0] || null }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                  />
                </div>

                {/* RTDA Transport Permit */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    RTDA Transport Permit *
                  </label>
                  <input
                    type="file"
                    onChange={(e) => setNewCompany(prev => ({ ...prev, rtdaTransportPermit: e.target.files?.[0] || null }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                  />
                </div>

                {/* Insurance Certificate */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Insurance Certificate *
                  </label>
                  <input
                    type="file"
                    onChange={(e) => setNewCompany(prev => ({ ...prev, insuranceCertificate: e.target.files?.[0] || null }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                  />
                </div>

                {/* Company Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Type *
                  </label>
                  <select
                    value={newCompany.companyType}
                    onChange={(e) => setNewCompany(prev => ({ ...prev, companyType: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                  >
                    <option value="">Select company type</option>
                    <option value="Private">Private</option>
                    <option value="Public">Public</option>
                  </select>
                </div>

                {/* Operating Routes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Operating Routes *
                  </label>
                  <input
                    type="text"
                    required
                    value={newCompany.operatingRoutes}
                    onChange={(e) => setNewCompany(prev => ({ ...prev, operatingRoutes: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    placeholder="Enter operating routes"
                  />
                </div>

                {/* Fleet Size */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fleet Size *
                  </label>
                  <input
                    type="number"
                    required
                    value={newCompany.fleetSize}
                    onChange={(e) => setNewCompany(prev => ({ ...prev, fleetSize: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    placeholder="Enter fleet size"
                  />
                </div>

                {/* Bank Account Details */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bank Account Details *
                  </label>
                  <input
                    type="text"
                    required
                    value={newCompany.bankAccountDetails}
                    onChange={(e) => setNewCompany(prev => ({ ...prev, bankAccountDetails: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    placeholder="Enter bank account details"
                  />
                </div>

                {/* Authorized Capital */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Authorized Capital *
                  </label>
                  <input
                    type="number"
                    required
                    value={newCompany.authorizedCapital}
                    onChange={(e) => setNewCompany(prev => ({ ...prev, authorizedCapital: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    placeholder="Enter authorized capital"
                  />
                </div>

                {/* Paid Up Capital */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Paid Up Capital *
                  </label>
                  <input
                    type="number"
                    required
                    value={newCompany.paidUpCapital}
                    onChange={(e) => setNewCompany(prev => ({ ...prev, paidUpCapital: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    placeholder="Enter paid up capital"
                  />
                </div>

                {/* Director Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Director Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newCompany.directorName}
                    onChange={(e) => setNewCompany(prev => ({ ...prev, directorName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    placeholder="Enter director name"
                  />
                </div>

                {/* Director National ID */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Director National ID *
                  </label>
                  <input
                    type="text"
                    required
                    value={newCompany.directorNationalId}
                    onChange={(e) => setNewCompany(prev => ({ ...prev, directorNationalId: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    placeholder="Enter director national ID"
                  />
                </div>

                {/* Director Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Director Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={newCompany.directorAddress}
                    onChange={(e) => setNewCompany(prev => ({ ...prev, directorAddress: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    placeholder="Enter director address"
                  />
                </div>

                {/* Director Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Director Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={newCompany.directorPhone}
                    onChange={(e) => setNewCompany(prev => ({ ...prev, directorPhone: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    placeholder="Enter director phone"
                  />
                </div>
              </div>

              <div className="bg-navy-50 border border-navy-200 rounded-lg p-4">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-navy-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div className="text-sm text-navy-800">
                    <p className="font-medium mb-1">Admin Account Creation</p>
                    <p>A company admin account will be automatically created with the provided email and password. The admin will have access to manage buses, routes, and bookings for this company.</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700"
                >
                  Add Company & Create Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Removeing the Confirmation Modal */}
      {showRemoveModal && (
        <div className="fixed inset-0 bg-navy-950/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Remove Companies</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to remove {selectedCompanies.length} selected company(ies)? 
              This action cannot be undone and will permanently delete all associated data including buses, routes, and bookings.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowRemoveModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleRemoveCompanies}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Remove Companies
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Company Modal */}
      {showViewModal && (
        <div className="fixed inset-0 bg-navy-950/50 flex items-center justify-center z-50">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-lift">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">View Company</h3>
              <button
                onClick={() => setShowViewModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">Company Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Name:</label>
                    <p className="text-gray-900">{selectedCompany.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person:</label>
                    <p className="text-gray-900">{selectedCompany.contactPerson}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number:</label>
                    <p className="text-gray-900">{selectedCompany.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address:</label>
                    <p className="text-gray-900">{selectedCompany.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address:</label>
                    <p className="text-gray-900">{selectedCompany.address}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">Company Status</h4>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(selectedCompany.status)}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedCompany.status)}`}>
                      {selectedCompany.status}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={async () => {
                      await toggleCompanyStatus(selectedCompany);
                      setSelectedCompany((current: any) =>
                        current
                          ? { ...current, status: current.status === 'Active' ? 'Inactive' : 'Active' }
                          : current
                      );
                    }}
                  >
                    {selectedCompany.status === 'Active' ? 'Deactivate' : 'Activate'}
                  </button>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">Fleet Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Number of Buses:</label>
                    <p className="text-gray-900">{selectedCompany.buses}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Number of Routes:</label>
                    <p className="text-gray-900">{selectedCompany.routes}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">Revenue Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Total Revenue:</label>
                    <p className="text-gray-900">{selectedCompany.revenue}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">Activity Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Activity:</label>
                    <p className="text-gray-900">{selectedCompany.lastActivity}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Registration Date:</label>
                    <p className="text-gray-900">{selectedCompany.registrationDate}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">Government Compliance</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Business Registration Number:</label>
                    <p className="text-gray-900">{selectedCompany.businessRegistrationNumber}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">TIN Number:</label>
                    <p className="text-gray-900">{selectedCompany.tinNumber}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">VAT Registration Number:</label>
                    <p className="text-gray-900">{selectedCompany.vatRegistrationNumber}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Transport License Number:</label>
                    <p className="text-gray-900">{selectedCompany.transportLicenseNumber}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">RURA License Number:</label>
                    <p className="text-gray-900">{selectedCompany.ruraLicenseNumber}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">RTDA Permit Number:</label>
                    <p className="text-gray-900">{selectedCompany.rtdaPermitNumber}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">Legal Documents</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Business Registration Certificate:</label>
                    <p className="text-gray-900">{selectedCompany.businessRegistrationCertificate}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tax Clearance Certificate:</label>
                    <p className="text-gray-900">{selectedCompany.taxClearanceCertificate}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Transport Operator License:</label>
                    <p className="text-gray-900">{selectedCompany.transportOperatorLicense}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">RURA Operating License:</label>
                    <p className="text-gray-900">{selectedCompany.ruraOperatingLicense}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">RTDA Transport Permit:</label>
                    <p className="text-gray-900">{selectedCompany.rtdaTransportPermit}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Insurance Certificate:</label>
                    <p className="text-gray-900">{selectedCompany.insuranceCertificate}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">Additional Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Type:</label>
                    <p className="text-gray-900">{selectedCompany.companyType}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Operating Routes:</label>
                    <p className="text-gray-900">{selectedCompany.operatingRoutes}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fleet Size:</label>
                    <p className="text-gray-900">{selectedCompany.fleetSize}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bank Account Details:</label>
                    <p className="text-gray-900">{selectedCompany.bankAccountDetails}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Authorized Capital:</label>
                    <p className="text-gray-900">{selectedCompany.authorizedCapital}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Paid Up Capital:</label>
                    <p className="text-gray-900">{selectedCompany.paidUpCapital}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">Director/Owner Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Director Name:</label>
                    <p className="text-gray-900">{selectedCompany.directorName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Director National ID:</label>
                    <p className="text-gray-900">{selectedCompany.directorNationalId}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Director Address:</label>
                    <p className="text-gray-900">{selectedCompany.directorAddress}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Director Phone:</label>
                    <p className="text-gray-900">{selectedCompany.directorPhone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
