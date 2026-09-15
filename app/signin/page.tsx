'use client';
import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthVisual from '@/components/AuthVisual';
import { api } from '@/lib/api';
import { destinationAfterAuth, useAuth, type SessionUser } from '@/components/AuthProvider';

export default function SignInPage() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isEmail = (input: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
  const isPhone = (input: string) =>
    /^[+]?[1-9][\d]{0,15}$/.test(input.replace(/[\s\-()]/g, ''));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmail(formData.emailOrPhone) && !isPhone(formData.emailOrPhone)) {
      setError('Please enter a valid email address or phone number');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const data = await api<{ user: SessionUser }>('/api/auth/signin', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      setUser(data.user);
      router.push(destinationAfterAuth(data.user.role));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[100svh] bg-navy-50">
      <AuthVisual
        eyebrow="Welcome back"
        title="Your next coach is already waiting."
        subtitle="Sign in to manage tickets, track live buses, and keep every trip in one place."
      />

      <div className="flex w-full items-center justify-center px-4 py-10 sm:px-8 lg:w-[52%] xl:w-[54%]">
        <div className="w-full max-w-md">
          <Link href="/" className="mb-8 inline-flex items-center gap-2 lg:hidden">
            <img src="/logo.png" alt="TransLinka" className="h-8 w-8 object-contain" />
            <span className="text-xl font-bold text-navy-900">TransLinka</span>
          </Link>

          <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-lift sm:p-8">
            <h2 className="text-2xl font-bold text-navy-900 sm:text-3xl">Sign in</h2>
            <p className="mt-2 text-sm text-navy-500 sm:text-base">
              Use your email or phone. No role selection needed.
            </p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-navy-700">
                  Email or phone number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="emailOrPhone"
                    value={formData.emailOrPhone}
                    onChange={handleInputChange}
                    placeholder="you@email.com"
                    className="input-field"
                    required
                  />
                  <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-navy-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className="input-field pr-12"
                    required
                  />
                  <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400 hover:text-navy-700"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="text-right">
                <a href="#" className="text-sm font-medium text-navy-700 hover:underline">
                  Forgot password?
                </a>
              </div>

              {error && (
                <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>
              )}

              <button type="submit" className="btn-primary w-full" disabled={loading}>
                {loading ? 'Signing in…' : 'Continue'}
              </button>

              <div className="text-center">
                <p className="mb-3 text-sm text-navy-500">Or continue with</p>
                <button
                  type="button"
                  className="flex w-full items-center justify-center rounded-xl border border-navy-100 bg-white py-3 transition hover:bg-navy-50"
                >
                  <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="font-medium text-navy-800">Google</span>
                </button>
              </div>

              <p className="text-center text-sm text-navy-500">
                New to TransLinka?{' '}
                <Link href="/signup" className="font-semibold text-navy-800 hover:underline">
                  Create an account
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
