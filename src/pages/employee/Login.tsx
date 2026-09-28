import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Eye, EyeOff, Smartphone, AlertCircle } from 'lucide-react';

export default function EmployeeLogin() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please enter your credentials');
      return;
    }

    const success = await login(email, password, 'employee');
    if (success) {
      navigate('/employee');
    } else {
      setError('Invalid credentials or access denied');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 via-primary-600 to-primary-800 flex flex-col items-center justify-center p-6">
      {/* Logo & Branding */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <span className="text-primary-500 font-bold text-2xl">AX</span>
        </div>
        <h1 className="text-white text-2xl font-bold">ATTENDEX</h1>
        <p className="text-primary-200 text-sm mt-1">Employee Portal</p>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Smartphone className="w-5 h-5 text-primary-500" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Employee Login</h2>
        </div>

        {error && (
          <div className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-4">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Email or Employee ID
            </label>
            <input
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your.email@glitzcorp.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-base"
              autoComplete="username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-base pr-12"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-base touch-target"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing in...
              </span>
            ) : 'Sign In'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button className="text-sm text-primary-500 hover:text-primary-600 font-medium">
            Forgot Password?
          </button>
        </div>
      </div>

      {/* Demo credentials */}
      <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-4 max-w-sm w-full">
        <p className="text-primary-200 text-xs font-medium mb-2 text-center">Demo Credentials</p>
        <div className="space-y-1">
          <button
            onClick={() => { setEmail('arjun.sharma@glitzcorp.com'); setPassword('emp123'); }}
            className="w-full text-left px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs transition-colors"
          >
            <span className="font-medium">Employee:</span> arjun.sharma@glitzcorp.com / emp123
          </button>
        </div>
      </div>

      {/* Admin link */}
      <div className="mt-6">
        <Link to="/admin-login" className="text-primary-200 text-sm hover:text-white transition-colors">
          Admin Login →
        </Link>
      </div>
    </div>
  );
}
