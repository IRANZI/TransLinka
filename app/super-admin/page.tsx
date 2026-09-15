'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  Bus,
  CheckCircle,
  Eye,
  Search,
  Trash2,
  TrendingUp,
  Users,
  XCircle,
} from 'lucide-react';
import AdminHeader from '@/components/AdminHeader';
import { api } from '@/lib/api';

export default function SuperAdminDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [overviewData, setOverviewData] = useState({
    totalCompanies: '0',
    activeCompanies: '0',
    inactiveCompanies: '0',
    totalRevenue: '0 Rwf',
    revenueChange: 'From completed payments',
    totalBuses: '0',
    totalUsers: '0',
  });
  const [companies, setCompanies] = useState<any[]>([]);

  const load = async () => {
    try {
      const [overview, list] = await Promise.all([
        api<any>('/api/super-admin/overview'),
        api<any[]>('/api/super-admin/companies'),
      ]);
      setOverviewData({
        totalCompanies: overview.totalCompanies,
        activeCompanies: overview.activeCompanies,
        inactiveCompanies: overview.inactiveCompanies,
        totalRevenue: overview.totalRevenue,
        revenueChange: 'From completed payments',
        totalBuses: overview.totalBuses,
        totalUsers: overview.totalUsers,
      });
      setCompanies(list || []);
    } catch {
      setCompanies([]);
    }
  };

  useEffect(() => {
    load();
  }, []);

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
        return <CheckCircle className="h-4 w-4 text-emerald-600" />;
      case 'Inactive':
        return <XCircle className="h-4 w-4 text-rose-600" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-amber-600" />;
    }
  };

  const handleCompanySelect = (companyId: string) => {
    setSelectedCompanies((prev) =>
      prev.includes(companyId) ? prev.filter((id) => id !== companyId) : [...prev, companyId]
    );
  };

  const handleRemoveCompanies = async () => {
    await api('/api/super-admin/companies', {
      method: 'DELETE',
      body: JSON.stringify({ ids: selectedCompanies }),
    });
    setSelectedCompanies([]);
    setShowRemoveModal(false);
    await load();
  };

  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.contactPerson.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    {
      label: 'Companies',
      value: overviewData.totalCompanies,
      hint: `${overviewData.activeCompanies} active · ${overviewData.inactiveCompanies} inactive`,
      icon: Building2,
    },
    {
      label: 'Platform revenue',
      value: overviewData.totalRevenue,
      hint: overviewData.revenueChange,
      icon: TrendingUp,
    },
    {
      label: 'Buses',
      value: overviewData.totalBuses,
      hint: 'Across all companies',
      icon: Bus,
    },
    {
      label: 'Platform users',
      value: overviewData.totalUsers,
      hint: 'Active travelers on TransLinka',
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen bg-navy-50">
      <AdminHeader variant="super" />

      <main className="page-wrap py-6 sm:py-8 lg:py-10">
        <section className="relative overflow-hidden rounded-3xl bg-navy-950 px-5 py-7 text-white shadow-lift sm:px-8 sm:py-9 lg:px-10">
          <img
            src="/illustrations/hero-bus-3d.png"
            alt=""
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/80 to-navy-950/35" />
          <div className="relative max-w-2xl">
            <p className="text-label text-navy-200">Super admin</p>
            <h1 className="mt-2 text-3xl font-bold sm:text-4xl lg:text-5xl">Platform overview</h1>
            <p className="mt-3 max-w-xl text-body-lg text-white/75">
              Monitor companies, fleet size, and revenue with the same layout as the traveler app.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/super-admin/companies" className="btn-primary bg-white text-navy-900 hover:bg-navy-50">
                Manage companies
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-navy-100 bg-white p-5 shadow-soft">
              <div className="flex items-center justify-between">
                <p className="text-sm text-navy-500">{stat.label}</p>
                <stat.icon className="h-4 w-4 text-navy-500" />
              </div>
              <p className="mt-2 text-2xl font-bold text-navy-900">{stat.value}</p>
              <p className="mt-1 text-sm text-emerald-700">{stat.hint}</p>
            </div>
          ))}
        </section>

        <section className="mt-8">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-navy-900 sm:text-2xl">Companies</h2>
              <p className="mt-1 text-sm text-navy-500">Search, review, and remove operators</p>
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
              <input
                type="text"
                placeholder="Search companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>

          {selectedCompanies.length > 0 && (
            <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-navy-100 bg-navy-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-medium text-navy-800">
                {selectedCompanies.length} selected
              </p>
              <button
                type="button"
                onClick={() => setShowRemoveModal(true)}
                className="inline-flex items-center justify-center rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Remove selected
              </button>
            </div>
          )}

          <div className="overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-soft">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left">
                <thead>
                  <tr className="border-b border-navy-100 bg-navy-50/70">
                    <th className="px-4 py-3">
                      <input
                        type="checkbox"
                        className="rounded border-navy-300 text-navy-700 focus:ring-navy-500"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCompanies(filteredCompanies.map((c) => c.id));
                          } else {
                            setSelectedCompanies([]);
                          }
                        }}
                      />
                    </th>
                    <th className="px-4 py-3 text-sm font-medium text-navy-500">Company</th>
                    <th className="px-4 py-3 text-sm font-medium text-navy-500">Status</th>
                    <th className="px-4 py-3 text-sm font-medium text-navy-500">Buses</th>
                    <th className="px-4 py-3 text-sm font-medium text-navy-500">Routes</th>
                    <th className="px-4 py-3 text-sm font-medium text-navy-500">Revenue</th>
                    <th className="px-4 py-3 text-sm font-medium text-navy-500">Last activity</th>
                    <th className="px-4 py-3 text-sm font-medium text-navy-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCompanies.map((company) => (
                    <tr key={company.id} className="border-b border-navy-50 last:border-0">
                      <td className="px-4 py-4">
                        <input
                          type="checkbox"
                          className="rounded border-navy-300 text-navy-700 focus:ring-navy-500"
                          checked={selectedCompanies.includes(company.id)}
                          onChange={() => handleCompanySelect(company.id)}
                        />
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-semibold text-navy-900">{company.name}</p>
                        <p className="text-sm text-navy-500">{company.contactPerson}</p>
                        <p className="text-sm text-navy-500">{company.phone}</p>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(company.status)}
                          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(company.status)}`}>
                            {company.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-navy-900">{company.buses}</td>
                      <td className="px-4 py-4 text-navy-900">{company.routes}</td>
                      <td className="px-4 py-4 font-medium text-navy-900">{company.revenue}</td>
                      <td className="px-4 py-4 text-sm text-navy-500">
                        {company.lastActivity ? new Date(company.lastActivity).toLocaleString() : '—'}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1">
                          <Link
                            href="/super-admin/companies"
                            className="rounded-lg p-2 text-navy-700 hover:bg-navy-50"
                            aria-label={`View ${company.name}`}
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                          <button
                            type="button"
                            className="rounded-lg p-2 text-rose-600 hover:bg-rose-50"
                            aria-label={`Remove ${company.name}`}
                            onClick={() => {
                              setSelectedCompanies([company.id]);
                              setShowRemoveModal(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      {showRemoveModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-navy-950/50 p-0 sm:items-center sm:p-4">
          <div className="w-full max-w-md rounded-t-3xl bg-white p-6 shadow-lift sm:rounded-2xl">
            <div className="mb-4 flex items-center">
              <AlertTriangle className="mr-3 h-6 w-6 text-rose-600" />
              <h3 className="text-lg font-semibold text-navy-900">Remove companies</h3>
            </div>
            <p className="mb-6 text-navy-600">
              Remove {selectedCompanies.length} selected company(ies)? This cannot be undone in this demo.
            </p>
            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => setShowRemoveModal(false)} className="btn-secondary">
                Cancel
              </button>
              <button
                type="button"
                onClick={handleRemoveCompanies}
                className="rounded-xl bg-rose-600 px-4 py-2.5 font-semibold text-white hover:bg-rose-700"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
