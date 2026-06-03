import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { authService } from '../services/authService';
import GoogleButton from './GoogleButton';

interface LoginProps {
  onSuccess: () => void;
  onSwitchToRegister: () => void;
}

const Login: React.FC<LoginProps> = ({ onSuccess, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.formEvent ? e.preventDefault() : e;
    setIsLoading(true);
    setError('');

    try {
      const data = await authService.login({ email, password });
      login(data.token, data);
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-display font-extrabold text-maroon">Bem-vindo (Selamat Datang)</h2>
        <p className="text-sm text-slate-500 mt-2">Log in to your LojaRápido account</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 text-xs rounded-lg border border-red-100">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-maroon focus:ring-1 focus:ring-maroon outline-none transition-all text-sm"
            placeholder="ita_nia_email@exemplo.com"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-maroon focus:ring-1 focus:ring-maroon outline-none transition-all text-sm"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 mt-2 bg-maroon hover:bg-maroon-dark text-white text-sm font-bold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Entrar...' : 'Login (Entrar)'}
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
        Belum punya akun?{' '}
        <button onClick={onSwitchToRegister} className="text-maroon font-bold hover:underline">
          Register di sini
        </button>
      </p>
    </div>
  );
};

export default Login;
