/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function WhatsAppFloat() {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show tooltip after 3 seconds
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleSupportClick = () => {
    const adminNo = '+67077000000'; // Standard Timor-Leste phone code (+670) or demo
    const text = encodeURIComponent('Olá Admin LojaRápido! Hakarak husu informasaun kona-ba sasán fashion...');
    window.open(`https://wa.me/${adminNo}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {showTooltip && (
        <div className="pointer-events-auto mb-2 mr-1 max-w-[260px] rounded-xl bg-white p-3 shadow-xl border border-slate-100 transition-all duration-300 animate-bounce">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs font-bold text-maroon">📞 Apoiu Suporte 24/7</p>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                Husu fabor, iha pergunta hodi hili size ka hela-fatin? Chat fali ami agora!
              </p>
            </div>
            <button 
              onClick={() => setShowTooltip(false)}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-full transition-colors cursor-pointer"
            >
              <X size={12} />
            </button>
          </div>
          <button
            onClick={handleSupportClick}
            className="w-full mt-2 py-1 px-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-[10px] font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
          >
            <MessageCircle size={10} /> WhatsApp chat
          </button>
        </div>
      )}
      
      <button
        id="whatsapp-trigger-btn"
        onClick={handleSupportClick}
        className="pointer-events-auto h-14 w-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-2xl transition-transform duration-300 hover:scale-110 cursor-pointer active:scale-95 animate-pulse relative"
        title="Hubungi Admin di WhatsApp"
      >
        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping -z-10"></span>
        <MessageCircle size={30} className="fill-white text-emerald-500" />
      </button>
    </div>
  );
}
