'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Bell, 
  ArrowLeft,
  Building2, 
  Eye,
  Trash2,
  AlertTriangle,
  CheckCircle,
  XCircle,
  LogOut,
  Shield,
  Users,
  Bus,
  Plus,
  Filter,
  Download,
  MoreVertical,
  X
} from 'lucide-react';

export default function CompaniesManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompanies, setSelectedCompanies] = useState<number[]>([]);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: 'Kigali Express',
      status: 'Active',
      buses: 50,
      routes: 12,
      revenue: '$45,000',
      lastActivity: '2 hours ago',
      registrationDate: '2023-01-15',
      contactPerson: 'Jean Uwimana',
      phone: '+250 788 123 456',
      email: 'jean@kigaliexpress.rw',
      address: 'Kigali, Rwanda',
      businessRegistrationNumber: 'BRN-123456789',
      tinNumber: 'TIN-987654321',
      vatRegistrationNumber: 'VAT-111111111',
      transportLicenseNumber: 'TRL-001-2023',
      ruraLicenseNumber: 'RURA-RL-001-2023',
      rtdaPermitNumber: 'RTDA-RTP-001-2023',
      businessRegistrationCertificate: 'business_reg_cert.pdf',
      taxClearanceCertificate: 'tax_clearance_cert.pdf',
      transportOperatorLicense: 'transport_operator_license.pdf',
      ruraOperatingLicense: 'rura_operating_license.pdf',
      rtdaTransportPermit: 'rtda_transport_permit.pdf',
      insuranceCertificate: 'insurance_certificate.pdf',
      companyType: 'Private Limited Company',
      operatingRoutes: 'Kigali - Nairobi, Kigali - Kampala, Kigali - Dar es Salaam',
      fleetSize: '50',
      bankAccountDetails: 'Bank of Kigali - ACC: 1234567890',
      authorizedCapital: 'RWF 100,000,000',
      paidUpCapital: 'RWF 75,000,000',
      directorName: 'Jean Baptiste Uwimana',
      directorNationalId: '1198012345678901',
      directorAddress: 'KG 15 Ave, Kigali, Rwanda',
      directorPhone: '+250 788 901 234'
    },
    {
      id: 2,
      name: 'Rwanda Transit Co.',
      status: 'Active',
      buses: 35,
      routes: 8,
      revenue: '$32,000',
      lastActivity: '1 day ago',
      registrationDate: '2023-03-22',
      contactPerson: 'Marie Mukamana',
      phone: '+250 789 456 123',
      email: 'marie@rwandatransit.rw',
      address: 'Huye, Rwanda',
      businessRegistrationNumber: 'BRN-234567890',
      tinNumber: 'TIN-876543210',
      vatRegistrationNumber: 'VAT-222222222',
      transportLicenseNumber: 'TRL-002-2023',
      ruraLicenseNumber: 'RURA-RL-002-2023',
      rtdaPermitNumber: 'RTDA-RTP-002-2023',
      businessRegistrationCertificate: 'business_reg_cert_2.pdf',
      taxClearanceCertificate: 'tax_clearance_cert_2.pdf',
      transportOperatorLicense: 'transport_operator_license_2.pdf',
      ruraOperatingLicense: 'rura_operating_license_2.pdf',
      rtdaTransportPermit: 'rtda_transport_permit_2.pdf',
      insuranceCertificate: 'insurance_certificate_2.pdf',
      companyType: 'Public Limited Company',
      operatingRoutes: 'Kigali - Butare, Kigali - Gitarama, Butare - Cyangugu',
      fleetSize: '35',
      bankAccountDetails: 'Equity Bank Rwanda - ACC: 2345678901',
      authorizedCapital: 'RWF 80,000,000',
      paidUpCapital: 'RWF 60,000,000',
      directorName: 'Marie Claire Mukamana',
      directorNationalId: '1199023456789012',
      directorAddress: 'KK 25 St, Huye, Rwanda',
      directorPhone: '+250 789 012 345'
    },
    {
      id: 3,
      name: 'Mountain Bus Services',
      status: 'Inactive',
      buses: 20,
      routes: 5,
      revenue: '$18,000',
      lastActivity: '2 weeks ago',
      registrationDate: '2022-11-10',
      contactPerson: 'Paul Nkurunziza',
      phone: '+250 790 123 789',
      email: 'paul@mountainbus.rw',
      address: 'Musanze, Rwanda',
      businessRegistrationNumber: 'BRN-345678901',
      tinNumber: 'TIN-765432109',
      vatRegistrationNumber: 'VAT-333333333',
      transportLicenseNumber: 'TRL-003-2022',
      ruraLicenseNumber: 'RURA-RL-003-2022',
      rtdaPermitNumber: 'RTDA-RTP-003-2022',
      businessRegistrationCertificate: 'business_reg_cert_3.pdf',
      taxClearanceCertificate: 'tax_clearance_cert_3.pdf',
      transportOperatorLicense: 'transport_operator_license_3.pdf',
      ruraOperatingLicense: 'rura_operating_license_3.pdf',
      rtdaTransportPermit: 'rtda_transport_permit_3.pdf',
      insuranceCertificate: 'insurance_certificate_3.pdf',
      companyType: 'Private Limited Company',
      operatingRoutes: 'Kigali - Musanze, Musanze - Gisenyi, Musanze - Byumba',
      fleetSize: '20',
      bankAccountDetails: 'I&M Bank Rwanda - ACC: 3456789012',
      authorizedCapital: 'RWF 50,000,000',
      paidUpCapital: 'RWF 35,000,000',
      directorName: 'Paul Marie Nkurunziza',
      directorNationalId: '1197034567890123',
      directorAddress: 'RN 15 Rd, Musanze, Rwanda',
      directorPhone: '+250 790 123 456'
    },
    {
      id: 4,
      name: 'City Link Transport',
      status: 'Active',
      buses: 42,
      routes: 15,
      revenue: '$38,500',
      lastActivity: '3 hours ago',
      registrationDate: '2023-05-08',
      contactPerson: 'Grace Uwimana',
      phone: '+250 791 234 567',
      email: 'grace@citylink.rw',
      address: 'Kigali, Rwanda',
      businessRegistrationNumber: 'BRN-456789012',
      tinNumber: 'TIN-654321098',
      vatRegistrationNumber: 'VAT-444444444',
      transportLicenseNumber: 'TRL-004-2023',
      ruraLicenseNumber: 'RURA-RL-004-2023',
      rtdaPermitNumber: 'RTDA-RTP-004-2023',
      businessRegistrationCertificate: 'business_reg_cert_4.pdf',
      taxClearanceCertificate: 'tax_clearance_cert_4.pdf',
      transportOperatorLicense: 'transport_operator_license_4.pdf',
      ruraOperatingLicense: 'rura_operating_license_4.pdf',
      rtdaTransportPermit: 'rtda_transport_permit_4.pdf',
      insuranceCertificate: 'insurance_certificate_4.pdf',
      companyType: 'Private Limited Company',
      operatingRoutes: 'Kigali City Routes, Kigali - Nyanza, Kigali - Rwamagana',
      fleetSize: '42',
      bankAccountDetails: 'Cogebanque - ACC: 4567890123',
      authorizedCapital: 'RWF 90,000,000',
      paidUpCapital: 'RWF 70,000,000',
      directorName: 'Grace Mukamana Uwimana',
      directorNationalId: '1198045678901234',
      directorAddress: 'KN 10 Ave, Kigali, Rwanda',
      directorPhone: '+250 791 234 890'
    },
    {
      id: 5,
      name: 'East Africa Coaches',
      status: 'Inactive',
      buses: 15,
      routes: 3,
      revenue: '$12,000',
      lastActivity: '1 month ago',
      registrationDate: '2022-08-15',
      contactPerson: 'Samuel Habimana',
      phone: '+250 792 345 678',
      email: 'samuel@eastafricacoaches.rw',
      address: 'Kayonza, Rwanda',
      businessRegistrationNumber: 'BRN-567890123',
      tinNumber: 'TIN-543210987',
      vatRegistrationNumber: 'VAT-555555555',
      transportLicenseNumber: 'TRL-005-2022',
      ruraLicenseNumber: 'RURA-RL-005-2022',
      rtdaPermitNumber: 'RTDA-RTP-005-2022',
      businessRegistrationCertificate: 'business_reg_cert_5.pdf',
      taxClearanceCertificate: 'tax_clearance_cert_5.pdf',
      transportOperatorLicense: 'transport_operator_license_5.pdf',
      ruraOperatingLicense: 'rura_operating_license_5.pdf',
      rtdaTransportPermit: 'rtda_transport_permit_5.pdf',
      insuranceCertificate: 'insurance_certificate_5.pdf',
      companyType: 'Private Limited Company',
      operatingRoutes: 'Kigali - Kayonza, Kayonza - Kirehe, Kayonza - Nyagatare',
      fleetSize: '15',
      bankAccountDetails: 'BPR Bank - ACC: 5678901234',
      authorizedCapital: 'RWF 40,000,000',
      paidUpCapital: 'RWF 25,000,000',
      directorName: 'Samuel Jean Habimana',
      directorNationalId: '1196056789012345',
      directorAddress: 'KY 5 St, Kayonza, Rwanda',
      directorPhone: '+250 792 345 901'
    }
  ]);

  // Add company 
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
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
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

  const handleCompanySelect = (companyId: number) => {
    setSelectedCompanies(prev => 
      prev.includes(companyId) 
        ? prev.filter(id => id !== companyId)
        : [...prev, companyId]
    );
  };

  const handleRemoveCompanies = () => {
    setCompanies(prev => prev.filter(company => !selectedCompanies.includes(company.id)));
    setSelectedCompanies([]);
    setShowRemoveModal(false);
  };

  const handleAddCompany = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!newCompany.name || !newCompany.contactPerson || !newCompany.email || !newCompany.phone || !newCompany.password) {
      alert('Please fill in all required fields');
      return;
    }

    if (newCompany.password !== newCompany.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Create new company with admin role
    const company = {
      id: Math.max(...companies.map(c => c.id)) + 1,
      name: newCompany.name,
      status: 'Active',
      buses: 0,
      routes: 0,
      revenue: '0 Rwf',
      lastActivity: 'Just now',
      registrationDate: new Date().toISOString().split('T')[0],
      contactPerson: newCompany.contactPerson,
      phone: newCompany.phone,
      email: newCompany.email,
      address: newCompany.address
    };


    console.log('Creating new company admin:', {
      company: company,
      adminCredentials: {
        email: newCompany.email,
        password: newCompany.password,
        role: 'company_admin',
        companyId: company.id
      }
    });

    // Reset form and close modal
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

    //success 
    alert(`Company "${company.name}" has been successfully added! Admin account created for ${newCompany.email}`);
  };

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         company.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         company.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || company.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b">
          <div className="flex items-center">
            <img
              src="/logo.png"
              alt="TransLinka Logo"
              className="h-8 w-8 object-contain mr-3"
            />
            <span className="text-xl font-heading font-bold text-gray-900">TransLinka</span>
          </div>
          <div className="mt-2 text-xs text-blue-600 font-medium">SUPER ADMIN</div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <Link href="/super-admin" className="flex items-center px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium">
                <Shield className="w-5 h-5 mr-3" />
                Super Dashboard
              </Link>
            </li>
            <li>
              <Link href="/super-admin/companies" className="flex items-center px-4 py-3 text-blue-600 bg-blue-50 rounded-lg font-medium">
                <Building2 className="w-5 h-5 mr-3" />
                Company Management
              </Link>
            </li>
          </ul>
        </nav>

        {/* Sign Out */}
        <div className="p-4 border-t">
          <button className="flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg font-medium w-full">
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Link href="/super-admin" className="mr-4 p-2 hover:bg-gray-100 rounded-lg">
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </Link>
                <h1 className="text-2xl font-heading font-bold text-gray-900">Company Management</h1>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Super Admin Profile */}
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">SA</span>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-gray-900">Super Admin</div>
                    <div className="text-gray-500">System Administrator</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 sm:p-8 lg:p-12">
          {/* Page Header with Actions */}
          <div className="mb-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Companies</h2>
                <p className="text-gray-600">Manage all registered transport companies on the platform</p>
              </div>
              <div className="flex space-x-3">
                <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </button>
                <button 
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
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
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex space-x-3">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-blue-800 font-medium">
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
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
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
                        <div className="text-sm text-gray-500">{company.lastActivity}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => {
                              setSelectedCompany(company);
                              setShowViewModal(true);
                            }}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
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
      </div>

      {/* Add Company Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    required
                    onChange={(e) => setNewCompany(prev => ({ ...prev, businessRegistrationCertificate: e.target.files?.[0] || null }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Tax Clearance Certificate */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tax Clearance Certificate *
                  </label>
                  <input
                    type="file"
                    required
                    onChange={(e) => setNewCompany(prev => ({ ...prev, taxClearanceCertificate: e.target.files?.[0] || null }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Transport Operator License */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transport Operator License *
                  </label>
                  <input
                    type="file"
                    required
                    onChange={(e) => setNewCompany(prev => ({ ...prev, transportOperatorLicense: e.target.files?.[0] || null }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* RURA Operating License */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    RURA Operating License *
                  </label>
                  <input
                    type="file"
                    required
                    onChange={(e) => setNewCompany(prev => ({ ...prev, ruraOperatingLicense: e.target.files?.[0] || null }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* RTDA Transport Permit */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    RTDA Transport Permit *
                  </label>
                  <input
                    type="file"
                    required
                    onChange={(e) => setNewCompany(prev => ({ ...prev, rtdaTransportPermit: e.target.files?.[0] || null }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Insurance Certificate */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Insurance Certificate *
                  </label>
                  <input
                    type="file"
                    required
                    onChange={(e) => setNewCompany(prev => ({ ...prev, insuranceCertificate: e.target.files?.[0] || null }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter director phone"
                  />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div className="text-sm text-blue-800">
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
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Company & Create Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Remove Confirmation Modal */}
      {showRemoveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
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
                <div className="flex items-center space-x-2">
                  {getStatusIcon(selectedCompany.status)}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedCompany.status)}`}>
                    {selectedCompany.status}
                  </span>
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
