'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiLock, FiUser, FiEye, FiEyeOff, FiShield } from 'react-icons/fi';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      if (credentials.username === 'admin' && credentials.password === 'admin123') {
        document.cookie = 'adminToken=authenticated; path=/; max-age=86400';
        router.push('/admin');
      } else {
        setError('Incorrect username or password. Please try again.');
      }
      setLoading(false);
    }, 700);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a1826] via-[#0e2233] to-[#0a1826] px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 sm:p-10 border border-yellow-300/20">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-3">
            <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 to-cyan-400 shadow-lg">
              <FiShield className="w-8 h-8 text-white" />
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Access</h1>
          <p className="text-cyan-100 max-w-xs mx-auto">
            Please sign in with your administrator credentials to manage portfolio content. Only authorized users are allowed.
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit} autoComplete="off" aria-label="Admin login form">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-cyan-100 mb-1">
              Username
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="h-5 w-5 text-cyan-300" />
              </span>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="block w-full rounded-lg border border-cyan-300 bg-white/20 py-2 pl-10 pr-3 text-cyan-900 placeholder-cyan-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300 sm:text-sm"
                placeholder="e.g. admin"
                value={credentials.username}
                onChange={e => setCredentials({ ...credentials, username: e.target.value })}
                aria-describedby="username-help"
              />
            </div>
            <p id="username-help" className="text-xs text-cyan-200 mt-1">Default username: <span className="font-semibold text-yellow-200">admin</span></p>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-cyan-100 mb-1">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="h-5 w-5 text-cyan-300" />
              </span>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                className="block w-full rounded-lg border border-cyan-300 bg-white/20 py-2 pl-10 pr-10 text-cyan-900 placeholder-cyan-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300 sm:text-sm"
                placeholder="e.g. admin123"
                value={credentials.password}
                onChange={e => setCredentials({ ...credentials, password: e.target.value })}
                aria-describedby="password-help"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-cyan-400 hover:text-yellow-400 focus:outline-none"
                tabIndex={-1}
                onClick={() => setShowPassword(v => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FiEyeOff className="h-5 w-5" /> : <FiEye className="h-5 w-5" />}
              </button>
            </div>
            <p id="password-help" className="text-xs text-cyan-200 mt-1">Default password: <span className="font-semibold text-yellow-200">admin123</span></p>
          </div>
          {error && <div className="text-red-500 text-sm text-center" role="alert">{error}</div>}
          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2 py-2 px-4 rounded-lg bg-gradient-to-r from-yellow-400 to-cyan-400 hover:from-yellow-300 hover:to-cyan-300 text-white font-semibold text-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2"
            disabled={loading}
            aria-label="Sign in to admin dashboard"
          >
            <FiLock className="h-5 w-5 mr-1" />
            {loading ? (
              <span className="flex items-center gap-2"><span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span> Signing in...</span>
            ) : (
              'Sign in'
            )}
          </button>
        </form>
        <div className="mt-6 flex flex-col items-center gap-2">
          <a href="/" className="text-cyan-200 hover:text-yellow-300 text-sm transition-colors">← Back to Portfolio</a>
          <a href="mailto:support@example.com" className="text-cyan-300 hover:text-yellow-200 text-xs underline mt-1">Need help? Contact support</a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin; 