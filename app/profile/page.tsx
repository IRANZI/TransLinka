'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {
  User,
  CreditCard,
  Settings,
  Globe,
  Moon,
  HelpCircle,
  Shield,
  LogOut,
} from 'lucide-react';
import AppHeader from '@/components/AppHeader';
import { useAuth } from '@/components/AuthProvider';
import { api } from '@/lib/api';

export default function ProfilePage() {
  const { user, signout, setUser } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('English');
  const [editing, setEditing] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toppingUp, setToppingUp] = useState(false);
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
  });
  const [topUpAmount, setTopUpAmount] = useState('10000');

  const openPersonalInfo = () => {
    setForm({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      phone: user?.phone || '',
    });
    setEditing(true);
    setMessage('');
  };

  const saveProfile = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const data = await api<{ user: NonNullable<typeof user> }>('/api/profile', {
        method: 'PUT',
        body: JSON.stringify(form),
      });
      setUser(data.user);
      setEditing(false);
      setMessage('Profile updated.');
    } catch (error: any) {
      setMessage(error.message || 'Could not update profile');
    } finally {
      setSaving(false);
    }
  };

  const topUpWallet = async (amount = Number(topUpAmount)) => {
    if (!amount || amount <= 0) {
      setMessage('Enter a valid top-up amount');
      return;
    }
    setToppingUp(true);
    setMessage('');
    try {
      const data = await api<{ user: NonNullable<typeof user> }>('/api/wallet', {
        method: 'POST',
        body: JSON.stringify({ amount, method: 'MOMO' }),
      });
      setUser(data.user);
      setMessage(`Wallet topped up. New balance: ${data.user.walletBalance.toLocaleString()} Rwf`);
    } catch (error: any) {
      setMessage(error.message || 'Could not top up wallet');
    } finally {
      setToppingUp(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-50">
      <AppHeader />

      <main className="page-wrap py-6 sm:py-8">
        <div className="w-full bg-white rounded-xl shadow-sm border p-6 space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center font-medium text-lg">
              {(user?.firstName || 'T').charAt(0)}
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {user ? `${user.firstName} ${user.lastName}` : 'Traveler'}
              </h2>
              <p className="text-sm text-gray-600">{user?.email || 'Sign in to see your profile'}</p>
              <p className="text-sm text-navy-600">Wallet: {(user?.walletBalance || 0).toLocaleString()} Rwf</p>
              {user?.phone && <p className="text-sm text-gray-500">{user.phone}</p>}
            </div>
          </div>

          {message && (
            <p className="rounded-lg bg-navy-50 px-3 py-2 text-sm text-navy-800">{message}</p>
          )}

          <div>
            <h3 className="font-semibold text-gray-700 mb-3">Account</h3>
            <div className="space-y-3">
              <button
                type="button"
                onClick={openPersonalInfo}
                className="w-full flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100"
              >
                <User className="w-5 h-5 text-navy-500" />
                <span className="text-sm text-gray-700">Personal Information</span>
              </button>
              <button
                type="button"
                onClick={() => setWalletOpen((open) => !open)}
                className="w-full flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100"
              >
                <CreditCard className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-700">Payment Methods</span>
              </button>
              <button
                type="button"
                className="w-full flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100"
              >
                <Settings className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-700">Notifications</span>
              </button>
            </div>
          </div>

          {editing && (
            <form onSubmit={saveProfile} className="space-y-3 rounded-xl border border-navy-100 bg-navy-50/50 p-4">
              <h4 className="font-semibold text-navy-900">Edit personal information</h4>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <label className="text-sm text-navy-700">
                  First name
                  <input
                    className="mt-1 w-full rounded-lg border border-navy-100 px-3 py-2"
                    value={form.firstName}
                    onChange={(e) => setForm((prev) => ({ ...prev, firstName: e.target.value }))}
                    required
                  />
                </label>
                <label className="text-sm text-navy-700">
                  Last name
                  <input
                    className="mt-1 w-full rounded-lg border border-navy-100 px-3 py-2"
                    value={form.lastName}
                    onChange={(e) => setForm((prev) => ({ ...prev, lastName: e.target.value }))}
                    required
                  />
                </label>
              </div>
              <label className="block text-sm text-navy-700">
                Phone
                <input
                  className="mt-1 w-full rounded-lg border border-navy-100 px-3 py-2"
                  value={form.phone}
                  onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                  placeholder="+250 788 000 000"
                />
              </label>
              <p className="text-xs text-navy-500">Email is used for login and cannot be changed here.</p>
              <div className="flex gap-2">
                <button type="submit" disabled={saving} className="btn-primary">
                  {saving ? 'Saving...' : 'Save'}
                </button>
                <button type="button" className="btn-secondary" onClick={() => setEditing(false)}>
                  Cancel
                </button>
              </div>
            </form>
          )}

          {walletOpen && (
            <div className="space-y-3 rounded-xl border border-navy-100 bg-navy-50/50 p-4">
              <h4 className="font-semibold text-navy-900">TransLinka wallet</h4>
              <p className="text-sm text-navy-600">
                Current balance: {(user?.walletBalance || 0).toLocaleString()} Rwf
              </p>
              <div className="flex flex-wrap gap-2">
                {[5000, 10000, 25000].map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    disabled={toppingUp}
                    onClick={() => {
                      setTopUpAmount(String(amount));
                      void topUpWallet(amount);
                    }}
                    className="rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm font-medium text-navy-800 hover:bg-navy-50"
                  >
                    + {amount.toLocaleString()} Rwf
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="number"
                  min={500}
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(e.target.value)}
                  className="w-full rounded-lg border border-navy-100 px-3 py-2"
                />
                <button type="button" disabled={toppingUp} className="btn-primary whitespace-nowrap" onClick={() => void topUpWallet()}>
                  {toppingUp ? 'Adding...' : 'Add money'}
                </button>
              </div>
            </div>
          )}

          <div>
            <h3 className="font-semibold text-gray-700 mb-3">Preferences</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-navy-500" />
                  <span className="text-sm text-gray-700">Language</span>
                </div>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="text-sm text-gray-700 bg-transparent border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-navy-500"
                >
                  <option>English</option>
                  <option>Kinyarwanda</option>
                  <option>French</option>
                  <option>Kiswahili</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div className="flex items-center space-x-3">
                  <Moon className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-700">Dark Mode</span>
                </div>
                <button
                  type="button"
                  onClick={() => setDarkMode(!darkMode)}
                  className={`w-10 h-5 flex items-center rounded-full p-1 transition ${
                    darkMode ? 'bg-navy-600 justify-end' : 'bg-gray-300 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 bg-white rounded-full shadow-md" />
                </button>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 mb-3">Support</h3>
            <div className="space-y-3">
              <Link href="/chat-support" className="w-full flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100">
                <HelpCircle className="w-5 h-5 text-navy-500" />
                <span className="text-sm text-gray-700">Help & Support</span>
              </Link>
              <button
                type="button"
                onClick={() => setPrivacyOpen((open) => !open)}
                className="w-full flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100"
              >
                <Shield className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-700">Privacy & Security</span>
              </button>
              {privacyOpen && (
                <p className="rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-600">
                  Your session is stored in an HTTP-only cookie. Booking and payment records stay in your TransLinka account. Contact iradianah5@gmail.com to request account changes.
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={async () => {
                await signout();
                window.location.href = '/signin';
              }}
              className="w-full flex items-center space-x-3 p-3 rounded-lg text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
