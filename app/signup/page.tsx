'use client';
import React, { useState } from 'react';
import { User, Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthVisual from '@/components/AuthVisual';
import { api } from '@/lib/api';
import { destinationAfterAuth, useAuth, type SessionUser } from '@/components/AuthProvider';

export default function SignupPage() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const data = await api<{ user: SessionUser }>('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      setUser(data.user);
      router.push(destinationAfterAuth(data.user.role));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[100svh] bg-navy-50">
      <AuthVisual
        eyebrow="Create your account"
        title="Travel smarter from the first ticket."
        subtitle="One traveler account for booking, live tracking, and digital boarding. No admin roles, no extra steps."
      />

      <div className="flex w-full items-center justify-center px-4 py-8 sm:px-8 lg:w-[52%] xl:w-[54%]">
        <div className="w-full max-w-md">
          <Link href="/" className="mb-6 inline-flex items-center gap-2 lg:hidden">
            <img src="/logo.png" alt="TransLinka" className="h-8 w-8 object-contain" />
            <span className="text-xl font-bold text-navy-900">TransLinka</span>
          </Link>

          <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-lift sm:p-8">
            <h2 className="text-2xl font-bold text-navy-900 sm:text-3xl">Create account</h2>
            <p className="mt-2 text-sm text-navy-500 sm:text-base">
              Join TransLinka as a traveler in under a minute.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-navy-700">First name</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="John"
                      className="input-field"
                      required
                    />
                    <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-navy-700">Last name</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Doe"
                      className="input-field"
                      required
                    />
                    <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-navy-700">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@email.com"
                    className="input-field"
                    required
                    autoComplete="email"
                  />
                  <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-navy-700">Phone number</label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+250 7..."
                    className="input-field"
                    required
                  />
                  <Phone className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-navy-700">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create a strong password"
                    className="input-field pr-12"
                    required
                  />
                  <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-navy-700">
                  Confirm password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    className="input-field pr-12"
                    required
                  />
                  <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400"
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <label className="flex items-start gap-3 pt-1 text-sm text-navy-600">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="mt-1 h-4 w-4 rounded border-navy-300 text-navy-700 focus:ring-navy-600"
                  required
                />
                <span>
                  I agree to the{' '}
                  <a href="#" className="font-medium text-navy-800 hover:underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="font-medium text-navy-800 hover:underline">
                    Privacy Policy
                  </a>
                </span>
              </label>

              {error && (
                <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>
              )}

              <button type="submit" className="btn-primary w-full" disabled={loading}>
                {loading ? 'Creating account…' : 'Create traveler account'}
              </button>

              <p className="text-center text-sm text-navy-500">
                Already have an account?{' '}
                <Link href="/signin" className="font-semibold text-navy-800 hover:underline">
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
