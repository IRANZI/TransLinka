'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Bell,   
  Building2, 
  TrendingUp, 
  Eye,
  Trash2,
  AlertTriangle,
  CheckCircle,
  XCircle,
  LogOut,
  Shield,
  Users,
  Bus,
 
} from 'lucide-react';

export default function SuperAdminDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompanies, setSelectedCompanies] = useState<number[]>([]);
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  // Super admin overview data
  const overviewData = {
    totalCompanies: '24',
    activeCompanies: '21',
    inactiveCompanies: '3',
    totalRevenue: '2,450,000 Rwf',
    revenueChange: '+15.2% from last month',
    totalBuses: '342',
    totalUsers: '15,847'
  };

  // company data
  const companies = [
    {
      id: 1,
      name: 'Kigali Express',
      status: 'Active',
      buses: 45,
      routes: 12,
      revenue: '450,000 Rwf',
      lastActivity: '2 hours ago',
      registrationDate: '2023-01-15',
      contactPerson: 'Jean Uwimana',
      phone: '+250 788 123 456'
    },
    {
      id: 2,
      name: 'Rwanda Transit Co.',
      status: 'Active',
      buses: 38,
      routes: 8,
      revenue: '380,000 Rwf',
      lastActivity: '1 day ago',
      registrationDate: '2023-03-22',
      contactPerson: 'Marie Mukamana',
      phone: '+250 788 234 567'
    },
    {
      id: 3,
      name: 'City Movers',
      status: 'Inactive',
      buses: 12,
      routes: 3,
      revenue: '0 Rwf',
      lastActivity: '45 days ago',
      registrationDate: '2022-11-10',
      contactPerson: 'Paul Nzeyimana',
      phone: '+250 788 345 678'
    },
    {
      id: 4,
      name: 'Mountain Transport',
      status: 'Active',
      buses: 28,
      routes: 6,
      revenue: '320,000 Rwf',
      lastActivity: '5 hours ago',
      registrationDate: '2023-02-08',
      contactPerson: 'Grace Uwera',
      phone: '+250 788 456 789'
    },
    {
      id: 5,
      name: 'Quick Bus Services',
      status: 'Inactive',
      buses: 8,
      routes: 2,
      revenue: '0 Rwf',
      lastActivity: '67 days ago',
      registrationDate: '2022-09-15',
      contactPerson: 'David Habimana',
      phone: '+250 788 567 890'
    }
  ];

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
    
    console.log('Removing companies:', selectedCompanies);
    setSelectedCompanies([]);
    setShowRemoveModal(false);
    
  };

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.contactPerson.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
   
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <Link href="/super-admin" className="flex items-center px-4 py-3 text-blue-600 bg-blue-50 rounded-lg font-medium">
                <Shield className="w-5 h-5 mr-3" />
                Super Dashboard
              </Link>
            </li>
            <li>
              <Link href="/super-admin/companies" className="flex items-center px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium">
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
              <h1 className="text-2xl font-heading font-bold text-gray-900"> Dashboard</h1>
              
              <div className="flex items-center space-x-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search companies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                  />
                </div>

                {/* Notifications */}
                <button className="relative p-2 text-gray-600 hover:text-gray-900">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Super Admin Profile */}
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
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

        {/* Dashboard Content */}
        <main className="flex-1 p-6 sm:p-8 lg:p-12">
          {/* Overview Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Companies */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-500">Total Companies</h3>
                <Building2 className="w-5 h-5 text-blue-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{overviewData.totalCompanies}</div>
              <div className="text-sm text-gray-600">
                <span className="text-green-600">{overviewData.activeCompanies} Active</span> • 
                <span className="text-red-600 ml-1">{overviewData.inactiveCompanies} Inactive</span>
              </div>
            </div>

            {/* Total Revenue */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-500">Platform Revenue</h3>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{overviewData.totalRevenue}</div>
              <div className="text-sm text-green-600">{overviewData.revenueChange}</div>
            </div>

            {/* Total Buses */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-500">Total Buses</h3>
                <Bus className="w-5 h-5 text-orange-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{overviewData.totalBuses}</div>
              <div className="text-sm text-gray-600">Across all companies</div>
            </div>

            {/* Total Users */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-500">Platform Users</h3>
                <Users className="w-5 h-5 text-purple-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{overviewData.totalUsers}</div>
              <div className="text-sm text-gray-600">Active users</div>
            </div>
          </div>

          {/* Company Management Section */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Company Management</h2>
                  <p className="text-sm text-gray-500">Manage and monitor all registered companies</p>
                </div>
                {selectedCompanies.length > 0 && (
                  <button
                    onClick={() => setShowRemoveModal(true)}
                    className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remove Selected ({selectedCompanies.length})
                  </button>
                )}
              </div>
            </div>
            
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-gray-500">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedCompanies(filteredCompanies.map(c => c.id));
                            } else {
                              setSelectedCompanies([]);
                            }
                          }}
                        />
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Company</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Buses</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Routes</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Revenue</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Last Activity</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCompanies.map((company) => (
                      <tr key={company.id} className="border-b hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300"
                            checked={selectedCompanies.includes(company.id)}
                            onChange={() => handleCompanySelect(company.id)}
                          />
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <div className="font-medium text-gray-900">{company.name}</div>
                            <div className="text-sm text-gray-500">{company.contactPerson}</div>
                            <div className="text-sm text-gray-500">{company.phone}</div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(company.status)}
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(company.status)}`}>
                              {company.status}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-900">{company.buses}</td>
                        <td className="py-4 px-4 text-gray-900">{company.routes}</td>
                        <td className="py-4 px-4 text-gray-900">{company.revenue}</td>
                        <td className="py-4 px-4 text-gray-500">{company.lastActivity}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

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
              This action cannot be undone and will permanently delete all associated data.
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
    </div>
  );
}
