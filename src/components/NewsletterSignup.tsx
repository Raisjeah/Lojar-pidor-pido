import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const validateEmail = (email: string) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setStatus('error');
      setMessage('Husu fabor, prienxe email! (Email wajib diisi)');
      return;
    }
    
    if (!validateEmail(email)) {
      setStatus('error');
      setMessage('Format email laloos. (Format email salah)');
      return;
    }

    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setMessage('Obrigadu! Ita rejistu ho susesu.');
      setEmail('');
    }, 1000);
  };

  return (
    <div className="mb-10 pb-10 border-b border-white/5">
      <div className="max-w-xl mx-auto text-center">
        <h4 className="text-sm font-bold uppercase tracking-wider text-timoryellow mb-2">
          Update Moda & Promosaun Foun!
        </h4>
        <p className="text-[11px] text-slate-400 mb-5">
          Rejistu (Subscribe) hodi hetan alerta ba produtu fashion foun, diskontu, no stok husi Loja Rápido.
        </p>
        
        {status === 'success' ? (
          <div className="flex flex-col items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-4 rounded-xl text-xs font-semibold animate-fade-in">
            <CheckCircle2 size={24} />
            {message}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 relative justify-center">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === 'error') setStatus('idle');
              }}
              placeholder="Ita nia email (Ex: ran@gmail.com)"
              className="flex-1 max-w-sm h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-timoryellow focus:ring-1 focus:ring-timoryellow/50 transition-all font-medium"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="h-11 px-6 rounded-xl bg-timoryellow hover:bg-[#FFD700] text-slate-900 text-xs font-bold uppercase tracking-widest transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              {status === 'loading' ? (
                <div className="h-4 w-4 rounded-full border-2 border-slate-900 border-t-transparent animate-spin" />
              ) : (
                <>Rejistu <Send size={15} /></>
              )}
            </button>
            {status === 'error' && (
              <span className="absolute -bottom-6 left-0 right-0 text-[10px] text-red-400 font-medium">
                {message}
              </span>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
