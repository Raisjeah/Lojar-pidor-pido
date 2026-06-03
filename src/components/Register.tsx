import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { authService } from '../services/authService';
import GoogleButton from './GoogleButton';

interface RegisterProps {
  onSuccess: () => void;
  onSwitchToLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ onSuccess, onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const data = await authService.register({ name, email, password });
      login(data.token, data);
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-display font-extrabold text-maroon">Cria Konta Foun</h2>
        <p className="text-sm text-slate-500 mt-2">Daftar untuk mulai berbelanja</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 text-xs rounded-lg border border-red-100">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">Naran Kompletu (Nama)</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-maroon focus:ring-1 focus:ring-maroon outline-none transition-all text-sm"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-maroon focus:ring-1 focus:ring-maroon outline-none transition-all text-sm"
            placeholder="email@exemplo.com"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-maroon focus:ring-1 focus:ring-maroon outline-none transition-all text-sm"
            placeholder="Min. 6 karakter"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">Konfirma Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={6}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-maroon focus:ring-1 focus:ring-maroon outline-none transition-all text-sm"
            placeholder="Ketik ulang password"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 mt-2 bg-maroon hover:bg-maroon-dark text-white text-sm font-bold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Registu...' : 'Register (Daftar)'}
        </button>
      </form>

      <div className="mt-6 flex items-center justify-between">
        <hr className="w-full border-slate-200" />
        <span className="p-2 text-xs text-slate-400 bg-white absolute left-1/2 -translate-x-1/2">ATAU</span>
      </div>

      <div className="mt-6">
        <GoogleButton />
      </div>

      <p className="text-center mt-6 text-xs text-slate-500">
        Sudah punya akun?{' '}
        <button onClick={onSwitchToLogin} className="text-maroon font-bold hover:underline">
          Login di sini
        </button>
      </p>
    </div>
  );
};

export default Register;
