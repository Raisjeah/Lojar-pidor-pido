/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CartItem, DeliveryDetails, Order, OrderStatus } from '../types';
import { DISTRITOS, SUB_DISTRITOS } from '../data/products';
import { ShoppingBag, ArrowLeft, Send, CheckCircle2, Copy, Check } from 'lucide-react';

interface CheckoutFormProps {
  cart: CartItem[];
  onBackToCart: () => void;
  onOrderCreated: (order: Order) => void;
}

export default function CheckoutForm({ cart, onBackToCart, onOrderCreated }: CheckoutFormProps) {
  // Receivers and delivery states for Timor leste
  const [namaPenerima, setNamaPenerima] = useState('');
  const [noTelepon, setNoTelepon] = useState('');
  const [distrito, setDistrito] = useState('Dili');
  const [subDistrito, setSubDistrito] = useState('');
  const [patokanLokasi, setPatokanLokasi] = useState('');
  const [catatanTambahan, setCatatanTambahan] = useState('');

  const [copiedText, setCopiedText] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const subtotal = cart.reduce((acc, item) => acc + item.product.harga * item.quantity, 0);

  // Auto set first subdistrito on district shift
  useEffect(() => {
    const list = SUB_DISTRITOS[distrito] || [];
    if (list.length > 0) {
      setSubDistrito(list[0]);
    } else {
      setSubDistrito('');
    }
  }, [distrito]);

  // Construct a beautiful WhatsApp order text template
  const generateWhatsAppMessage = (orderId: string) => {
    const header = `🛒 *LOJA RÁPIDO - TIMOR-LESTE REZISTA DE DETALLES* 🇹🇱\n`;
    const subheader = `*ID Pesanan:* #${orderId}\n*Data:* ${new Date().toLocaleDateString('pt-TL')}\n\n`;
    
    let itemsList = `📦 *SASÁN SIRA (DAFTAR BELANJA):*\n`;
    cart.forEach((item, idx) => {
      itemsList += `${idx + 1}. *${item.product.nama}*\n   Size: ${item.selectedSize} | Kór: ${item.selectedColor.name}\n   Qtd: ${item.quantity} x $${item.product.harga.toFixed(2)} = *$${(item.product.harga * item.quantity).toFixed(2)}*\n\n`;
    });

    const totalStr = `💵 *TOTAL FINÁL:* *$${subtotal.toFixed(2)}* (Portes Gratis em Dili)\n\n`;
    
    const shippingDetails = `📍 *DETALLE ENTREGA (RUTE KIRIM):*\n👤 *Penerima:* ${namaPenerima}\n📞 *WhatsApp/Kontaktu:* ${noTelepon}\n🗺️ *Distrito:* ${distrito}\n🏘️ *Sub-distrito:* ${subDistrito}\n🏠 *Patokan Lokasi:* ${patokanLokasi}\n📝 *Catatan:* ${catatanTambahan || '-'}\n\n`;
    
    const footer = `📱 _Favor, admin ami konfirma ulan foun hodi haruka seltasaun proses!_`;

    return `${header}${subheader}${itemsList}${totalStr}${shippingDetails}${footer}`;
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!namaPenerima || !noTelepon || !distrito || !subDistrito || !patokanLokasi) {
      setErrorMessage('Husu fabor, prienxe dadus hotu ne\'e diak! (Silakan lengkapi semua bidang wajib!)');
      return;
    }

    setIsSubmitting(true);

    // Simulate process
    setTimeout(() => {
      const simulatedId = 'LR-' + Math.floor(100000 + Math.random() * 900000);
      const deliveryObj: DeliveryDetails = {
        namaPenerima,
        noTelepon,
        distrito,
        subDistrito,
        patokanLokasi,
        catatanTambahan
      };

      const orderObj: Order = {
        id: simulatedId,
        items: cart,
        deliveryDetails: deliveryObj,
        total: subtotal,
        status: 'Prosesu',
        statusMessage: 'Pesanan didaftarkan! Admins sedang menyiapkan kemasan di gudang Dili.',
        tanggal: new Date().toISOString(),
        whatsappAdmin: '+67077000000'
      };

      setCompletedOrder(orderObj);
      onOrderCreated(orderObj);
      setIsSubmitting(false);
    }, 1200);
  };

  const copyToClipboard = () => {
    if (!completedOrder) return;
    const rawMsg = generateWhatsAppMessage(completedOrder.id);
    navigator.clipboard.writeText(rawMsg);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  // SUCCESS STEP: Order processed, show sharing trigger
  if (completedOrder) {
    const formattedMsg = generateWhatsAppMessage(completedOrder.id);
    return (
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-2xl mx-auto border border-slate-100 text-center animate-fade-in">
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 animate-bounce">
            <CheckCircle2 size={40} className="stroke-[1.5]" />
          </div>
        </div>

        <h2 className="text-xl md:text-2xl font-display font-black text-[#660022] leading-tight">
          PESANAN SUKSES DI DAFTARKAN! 🇹🇱
        </h2>
        <p className="text-xs text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
          Obrigadu barak! Pesanan Anda dengan ID <span className="font-mono font-bold text-maroon">#{completedOrder.id}</span> sukses terekam. Ikuti langkah di bawah ini untuk mengirim detail ke admin via WhatsApp Anda.
        </p>

        {/* Highlight details view */}
        <div className="mt-6 bg-slate-50 border border-slate-100 rounded-xl p-4 text-left">
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400">Preview Formato WhatsApp:</span>
            <button
              onClick={copyToClipboard}
              className="text-[10px] font-bold text-maroon hover:text-brightred flex items-center gap-1 cursor-pointer transition-colors"
            >
              {copiedText ? (
                <>
                  <Check size={11} className="text-emerald-600" /> Kopiado (Disalin)
                </>
              ) : (
                <>
                  <Copy size={11} /> Salin Teks
                </>
              )}
            </button>
          </div>
          <pre className="font-mono text-[10px] text-slate-700 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto bg-white p-3 rounded-lg border border-slate-100">
            {formattedMsg}
          </pre>
        </div>

        {/* WhatsApp & Tracking Navigation buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <a
            href={`https://wa.me/67077000000?text=${encodeURIComponent(formattedMsg)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3.5 bg-emerald-500 hover:bg-emerald-650 active:scale-95 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer text-center"
          >
            <Send size={15} /> KIRIM KE WHATSAPP ADMIN (670-77000000)
          </a>
          
          <button
            onClick={onBackToCart}
            className="py-3.5 px-5 border border-slate-250 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Sosa Fali (Kembali Belanja)
          </button>
        </div>

        <div className="mt-4 p-3 bg-timoryellow/20 border border-timoryellow/50 rounded-xl text-left">
          <p className="text-[11px] text-slate-700 font-medium leading-relaxed">
            💡 <strong>Hatudu informasaun:</strong> Setelah mengirim detail pesanan di WhatsApp, admin kami akan segera mengonfirmasi status pembayaran dan pengiriman barang ke alamat Anda.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto block animate-fade-in">
      {/* Back click option */}
      <button
        onClick={onBackToCart}
        className="mb-4 inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-maroon transition-colors cursor-pointer"
      >
        <ArrowLeft size={14} /> Fila fali ba Carrinho (Kembali ke Keranjang)
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Input Form details config */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h2 className="text-lg font-display font-extrabold text-slate-900 border-b border-slate-100 pb-3 mb-5 uppercase tracking-wide flex items-center gap-2">
            <ShoppingBag className="text-maroon" size={20} /> DETALLES ENTEGRA (INFORMASI PENGIRIMAN)
          </h2>

          <form onSubmit={handleCheckoutSubmit} className="space-y-4">
            
            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-slate-707 uppercase tracking-wider mb-1.5">
                Naran Kompletu (Nama Penerima) <span className="text-brightred">*</span>
              </label>
              <input
                type="text"
                required
                value={namaPenerima}
                onChange={(e) => setNamaPenerima(e.target.value)}
                placeholder="Heitor da Costa Tais"
                className="w-full px-4 h-11 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-brightred/10 focus:border-brightred outline-none transition-all duration-150"
              />
            </div>

            {/* Telephone WhatsApp */}
            <div>
              <label className="block text-xs font-bold text-slate-707 uppercase tracking-wider mb-1.5">
                No. Telepon / WhatsApp <span className="text-brightred">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 font-mono">
                  +670
                </span>
                <input
                  type="tel"
                  required
                  value={noTelepon}
                  onChange={(e) => setNoTelepon(e.target.value)}
                  placeholder="77000000"
                  className="w-full pl-15 pr-4 h-11 rounded-lg border border-slate-200 text-xs font-mono focus:ring-2 focus:ring-brightred/10 focus:border-brightred outline-none transition-all duration-150"
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                Aprezenta númeru WhatsApp Timor-Leste nian ne\'ebé ativu hodi fasilita kontaktu.
              </p>
            </div>

            {/* Grid for Cascading Timor-Leste Municipalities */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Distrito selection */}
              <div>
                <label className="block text-xs font-bold text-slate-707 uppercase tracking-wider mb-1.5">
                  Distrito (Munisípiu) <span className="text-brightred">*</span>
                </label>
                <select
                  value={distrito}
                  onChange={(e) => setDistrito(e.target.value)}
                  className="w-full px-3 h-11 rounded-lg border border-slate-200 text-xs font-bold focus:ring-2 focus:ring-brightred/10 focus:border-brightred outline-none bg-white cursor-pointer transition-all duration-150"
                >
                  {DISTRITOS.map((dist) => (
                    <option key={dist} value={dist}>
                      {dist}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sub-Distrito selection mapped under parent Distrito */}
              <div>
                <label className="block text-xs font-bold text-slate-707 uppercase tracking-wider mb-1.5">
                  Sub-Distrito (Posto) <span className="text-brightred">*</span>
                </label>
                <select
                  value={subDistrito}
                  onChange={(e) => setSubDistrito(e.target.value)}
                  required
                  className="w-full px-3 h-11 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-brightred/10 focus:border-brightred outline-none bg-white cursor-pointer transition-all duration-150"
                >
                  {(SUB_DISTRITOS[distrito] || []).map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Landmark Patokan Lokasi */}
            <div>
              <label className="block text-xs font-bold text-slate-707 uppercase tracking-wider mb-1.5">
                Patokan Lokasi / Detalle Hela-fatin <span className="text-brightred">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={patokanLokasi}
                onChange={(e) => setPatokanLokasi(e.target.value)}
                placeholder="Exemplo: Iha besik Eskola Secondary/Amo Igreja Cristo Rei, odomat mean..."
                className="w-full p-4 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-brightred/10 focus:border-brightred outline-none transition-all duration-150"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Deskreve patokan signifikante ka naran toko ka igreja hodi kurier labele lakon.
              </p>
            </div>

            {/* Optional Additional Message */}
            <div>
              <label className="block text-xs font-bold text-slate-707 uppercase tracking-wider mb-1.5">
                Nota Adisionál (Catatan Opsional)
              </label>
              <input
                type="text"
                value={catatanTambahan}
                onChange={(e) => setCatatanTambahan(e.target.value)}
                placeholder="Husu kores katuas, haruka size M loloos"
                className="w-full px-4 h-11 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-brightred/10 focus:border-brightred outline-none transition-all duration-150"
              />
            </div>

            {/* Inline validation feedback state */}
            {errorMessage && (
              <div className="p-3.5 bg-red-50 border border-red-200 text-brightred rounded-lg text-xs font-semibold animate-pulse">
                ⚠️ {errorMessage}
              </div>
            )}

            {/* Action Trigger Submit */}
            <div className="pt-4 border-t border-slate-100">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 rounded-xl bg-brightred hover:bg-[#660022] disabled:bg-slate-400 text-white font-bold text-xs uppercase tracking-widest transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    PESANAN SEDANG DIPROSES...
                  </span>
                ) : (
                  'SUBMETE PESANAN AGORA (DAFTAR SEKARANG)'
                )}
              </button>
            </div>

          </form>
        </div>

        {/* RIGHT COLUMN: Items checkout checkout list */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-sm relative overflow-hidden">
            <div className="absolute right-0 top-0 w-36 h-36 bg-maroon/30 rounded-full blur-2xl pointer-events-none"></div>

            <h3 className="font-display font-extrabold text-sm uppercase tracking-wider border-b border-white/10 pb-3 mb-4 text-timoryellow">
              TOTAL FINÁL SASÁN SIRA (DAFTAR BELANJA)
            </h3>

            <div className="max-h-64 overflow-y-auto space-y-3.5 pr-2">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="h-10 w-10 rounded overflow-hidden bg-slate-800 flex-shrink-0 border border-white/10">
                      <img src={item.product.imageUrl} alt={item.product.nama} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold line-clamp-1 max-w-[150px]">{item.product.nama}</h4>
                      <p className="text-[10px] text-slate-350">
                        Size {item.selectedSize} | {item.quantity}x
                      </p>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-timoryellow">
                    ${(item.product.harga * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 mt-5 pt-4 space-y-2 uppercase text-[11px] font-bold tracking-wider">
              <div className="flex justify-between text-slate-300">
                <span>Subtotál</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-emerald-400">
                <span>Entrega Taxa (Ongkir)</span>
                <span>GRÁTIS</span>
              </div>
              <div className="flex justify-between text-white font-extrabold text-sm border-t border-white/10 pt-3">
                <span>TOTAL RESÍDUU</span>
                <span className="text-timoryellow font-display font-black text-base">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
            </div>
            
            <p className="text-[10px] text-slate-400 mt-4 italic">
              * Nota: Pembayaran dilakukan via transfer bank lokal Timor-Leste (BNU / Telemor / TT) setelah admin menghubungi nomor Anda.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
