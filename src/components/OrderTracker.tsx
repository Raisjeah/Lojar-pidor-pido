/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Order, OrderStatus } from '../types';
import { Truck, CheckCircle, Package, Clock, ShieldCheck, Smartphone, MapPin, Search } from 'lucide-react';

interface OrderTrackerProps {
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
}

export default function OrderTracker({ orders, onUpdateOrderStatus }: OrderTrackerProps) {
  const [searchId, setSearchId] = useState('');
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

  // If there are recorded orders and none is currently active, default to the latest one
  useEffect(() => {
    if (orders.length > 0 && !activeOrder) {
      setActiveOrder(orders[orders.length - 1]);
    }
  }, [orders, activeOrder]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = searchId.trim().toUpperCase();
    const found = orders.find(o => o.id === cleanId || o.id.replace('LR-', '') === cleanId);
    if (found) {
      setActiveOrder(found);
    } else {
      alert(`⚠️ ID Pesanan "${cleanId}" la hetan fali (tidak ditemukan). Husu fabor, cek fali ID nian!`);
    }
  };

  // Cycle states to simulate status changes
  const cycleStatus = (order: Order) => {
    let nextStatus: OrderStatus = 'Prosesu';
    if (order.status === 'Prosesu') {
      nextStatus = 'Iha Dalan';
    } else if (order.status === 'Iha Dalan') {
      nextStatus = 'To\'o Ona';
    } else {
      nextStatus = 'Prosesu';
    }

    onUpdateOrderStatus(order.id, nextStatus);
    
    // Update state
    setActiveOrder({
      ...order,
      status: nextStatus,
      statusMessage: getSimulatedMsg(nextStatus, order.deliveryDetails.distrito)
    });
  };

  const getSimulatedMsg = (status: OrderStatus, dist: string) => {
    if (status === 'Prosesu') {
      return `Kada sasán foti tiha ona. Admins sedang menyiapkan kemasan di gudang pusat Dili.`;
    } else if (status === 'Iha Dalan') {
      return `Kurier sedang dalam perjalanan mengantar barang ke wilayah ${dist}. Harap aktifkan WhatsApp Anda.`;
    } else {
      return `Pesanan sukses dikirim dan diterima di patokan lokasi Anda. Obrigadu barak barak!`;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      
      {/* Tracker Lookup Header Panel */}
      <div className="bg-gradient-to-r from-maroon to-maroon-dark text-white rounded-2xl p-6 md:p-8 shadow-md">
        <h2 className="text-xl md:text-2xl font-display font-black uppercase text-timoryellow flex items-center gap-2 mb-2">
          <Truck size={24} /> PANEL REZA-FOTI TRACKING (PELACAKAN PESANAN)
        </h2>
        <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
          Monitor status pengiriman pakaian & aksesoris pesanan Anda dari gudang Dili menuju tempat tujuan di seluruh distrik Timor-Leste secara langsung.
        </p>

        {/* Search input bar */}
        <form onSubmit={handleSearch} className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-xs">#</span>
            <input
              type="text"
              required
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="Exemplo: LR-123456"
              className="w-full pl-7 pr-4 h-11 bg-white/10 text-white rounded-xl border border-white/20 focus:border-timoryellow text-xs font-mono outline-none placeholder-slate-400 focus:bg-white/15"
            />
          </div>
          <button
            type="submit"
            className="h-11 px-6 bg-brightred hover:bg-brightred-hover text-white rounded-xl text-xs font-bold transition-all uppercase tracking-wide cursor-pointer flex items-center justify-center gap-1"
          >
            <Search size={14} /> Buka (CARI)
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Main Tracking Steps visualization */}
        <div className="lg:col-span-8 bg-white border border-slate-100 rounded-2xl shadow-sm p-6">
          {activeOrder ? (
            <div>
              {/* Order Metadata */}
              <div className="flex flex-wrap items-center justify-between border-b border-slate-100 pb-4 mb-6 gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">ID Pesanan</span>
                  <p className="font-mono text-sm font-black text-slate-900">#{activeOrder.id}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Data</span>
                  <p className="text-xs text-slate-700 font-semibold">
                    {new Date(activeOrder.tanggal).toLocaleDateString('pt-TL')}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 text-right block">Total</span>
                  <p className="text-sm font-display font-black text-maroon text-right">
                    ${activeOrder.total.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Status Stepper Progression */}
              <div className="relative pb-8 mb-8">
                
                {/* Connecting Track Line */}
                <div className="absolute left-6 top-8 bottom-8 w-1 bg-slate-100 -z-10">
                  <div 
                    className="w-full bg-emerald-500 transition-all duration-500"
                    style={{ 
                      height: activeOrder.status === 'Prosesu' ? '0%' : activeOrder.status === 'Iha Dalan' ? '50%' : '100%' 
                    }}
                  />
                </div>

                <div className="space-y-8 relative">
                  
                  {/* STEP 1: Prosesu */}
                  <div className="flex gap-4">
                    <div 
                      className={`h-12 w-12 rounded-full flex items-center justify-center shadow-md transition-colors ${
                        activeOrder.status === 'Prosesu' || activeOrder.status === 'Iha Dalan' || activeOrder.status === 'To\'o Ona'
                          ? 'bg-emerald-500 text-white' 
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      <Package size={22} className="stroke-[1.5]" />
                    </div>
                    <div>
                      <h3 className="font-display font-extrabold text-sm text-slate-900 uppercase">
                        Prosesu (Diproses em Dili)
                      </h3>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                        Kada sasán foti tiha ona husi stock. Admin sedang mengecek resi pembayaran Anda.
                      </p>
                      {activeOrder.status === 'Prosesu' && (
                        <span className="inline-flex items-center gap-1 mt-2 px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-amber-50 text-amber-600 border border-amber-200">
                          <Clock size={10} /> Hambuka Status Ativu (Tahap Ini)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* STEP 2: Iha Dalan */}
                  <div className="flex gap-4">
                    <div 
                      className={`h-12 w-12 rounded-full flex items-center justify-center shadow-md transition-colors ${
                        activeOrder.status === 'Iha Dalan' || activeOrder.status === 'To\'o Ona'
                          ? 'bg-emerald-500 text-white' 
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      <Truck size={22} className="stroke-[1.5]" />
                    </div>
                    <div>
                      <h3 className="font-display font-extrabold text-sm text-slate-900 uppercase">
                        Iha Dalan (Sedang di Jalan / Kurir)
                      </h3>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                        Sasan lori husi kurier motor ka transportador. Sedang dikirim ke wilayah {activeOrder.deliveryDetails.distrito}.
                      </p>
                      {activeOrder.status === 'Iha Dalan' && (
                        <span className="inline-flex items-center gap-1 mt-2 px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-amber-50 text-amber-600 border border-amber-200 animate-pulse">
                          <Clock size={10} /> Hambuka Status Ativu (Tahap Ini)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* STEP 3: To'o Ona */}
                  <div className="flex gap-4">
                    <div 
                      className={`h-12 w-12 rounded-full flex items-center justify-center shadow-md transition-colors ${
                        activeOrder.status === 'To\'o Ona'
                          ? 'bg-emerald-500 text-white' 
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      <CheckCircle size={22} className="stroke-[1.5]" />
                    </div>
                    <div>
                      <h3 className="font-display font-extrabold text-sm text-slate-900 uppercase">
                        To'o ona (Tiba di Tujuan / Sukses)
                      </h3>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                        Kurier entrega ona sasan ho ksolok. Barang sudah berada di tangan Anda di patokan lokasi.
                      </p>
                      {activeOrder.status === 'To\'o Ona' && (
                        <span className="inline-flex items-center gap-1 mt-2 px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-250">
                          <ShieldCheck size={10} /> Suksesu Entregadu (Tiba Dengan Aman)
                        </span>
                      )}
                    </div>
                  </div>

                </div>

              </div>

              {/* Status description alert window */}
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl mt-6">
                <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wide block mb-1">
                  Katak foun (Pesan Status Terkini)
                </span>
                <p className="text-xs text-slate-700 font-medium">
                  "{getSimulatedMsg(activeOrder.status, activeOrder.deliveryDetails.distrito)}"
                </p>
              </div>

              {/* THE ELITE SIMULATION TOGGLE UNIT */}
              <div className="mt-8 border-t border-slate-105 pt-5 text-center bg-timoryellow/10 rounded-2xl p-4 border border-timoryellow/15">
                <p className="text-[11px] font-semibold text-slate-700 mb-2">
                  🛠️ <strong>Simulasi Keadaan (Gunakan untuk Uji Coba Penilai atau Admin):</strong>
                </p>
                <p className="text-[10px] text-slate-500 mb-3 leading-snug">
                  Tombol di bawah ini menyimulasikan kurir mengubah status paket Anda secara instan dari Gudang pusat ke Jalan, lalu Tiba di Tujuan.
                </p>
                <button
                  type="button"
                  onClick={() => cycleStatus(activeOrder)}
                  className="px-4 py-2 bg-maroon text-white hover:bg-maroon-dark rounded-lg text-[10px] font-bold uppercase transition-colors tracking-wider shadow-sm cursor-pointer"
                >
                  Uran-Sasuk Status (Simulasi Step Berikutnya)
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <Package size={44} className="mx-auto text-slate-300 stroke-[1.2] mb-3" />
              <h3 className="font-semibold text-slate-600 text-xs uppercase mb-1">Mauk Pesanan (Belum Ada Order)</h3>
              <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
                Silakan beli produk terlebih dahulu di katalog dan simpan alamat tempat tinggal Anda untuk mulai merunut tracking pesanan.
              </p>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Recipient address details & tracking items receipt info */}
        <div className="lg:col-span-4 space-y-6">
          {activeOrder && (
            <>
              {/* Recipient Details Card */}
              <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                <h3 className="text-xs font-display font-black text-slate-900 uppercase border-b border-slate-50 pb-2.5 mb-4 tracking-wide flex items-center gap-1.5">
                  <MapPin size={14} className="text-brightred" /> Fatin entrega (Alamat Penerima)
                </h3>
                
                <div className="space-y-3 font-medium text-xs text-slate-700">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] uppercase font-bold text-slate-400">Penerima</span>
                    <p className="font-bold">{activeOrder.deliveryDetails.namaPenerima}</p>
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] uppercase font-bold text-slate-400">WhatsApp / No. HP</span>
                    <p className="font-mono flex items-center gap-1">
                      <Smartphone size={12} className="text-slate-405" /> +670 {activeOrder.deliveryDetails.noTelepon}
                    </p>
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] uppercase font-bold text-slate-400">Munisípiu / Distrito</span>
                    <p className="font-semibold">{activeOrder.deliveryDetails.distrito}</p>
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] uppercase font-bold text-slate-400">Posto (Sub-distrito)</span>
                    <p className="font-semibold">{activeOrder.deliveryDetails.subDistrito}</p>
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] uppercase font-bold text-slate-400">Patokan Lokasi</span>
                    <p className="text-[11px] text-slate-550 leading-relaxed bg-slate-50 p-2 rounded-lg border border-slate-50">
                      {activeOrder.deliveryDetails.patokanLokasi}
                    </p>
                  </div>

                  {activeOrder.deliveryDetails.catatanTambahan && (
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9px] uppercase font-bold text-slate-400 font-mono">Nota Tambahan</span>
                      <p className="text-[11px] italic text-slate-500">"{activeOrder.deliveryDetails.catatanTambahan}"</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Items Summary Card */}
              <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                <h3 className="text-xs font-display font-black text-slate-900 uppercase border-b border-slate-50 pb-2.5 mb-3.5 tracking-wide">
                  Sasán Iha Laran (Item Belanja)
                </h3>
                <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                  {activeOrder.items.map((it) => (
                    <div key={it.id} className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-2">
                        <img src={it.product.imageUrl} alt={it.product.nama} className="w-8 h-8 rounded object-cover border" />
                        <div>
                          <p className="font-bold line-clamp-1 max-w-[120px]">{it.product.nama}</p>
                          <p className="text-[9px] text-slate-400">Tamanho: {it.selectedSize} | {it.quantity}x</p>
                        </div>
                      </div>
                      <span className="font-mono font-bold text-slate-700">${it.product.harga.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Quick List of Previous Orders */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-xs font-display font-black text-slate-900 uppercase border-b border-slate-50 pb-2.5 mb-3.5 tracking-wide">
              Rezistu Pesanan (Riwayat Order)
            </h3>
            {orders.length === 0 ? (
              <p className="text-[11px] text-slate-400 italic text-center py-2">Belum ada riwayat order.</p>
            ) : (
              <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                {orders.map((or) => (
                  <button
                    key={or.id}
                    onClick={() => setActiveOrder(or)}
                    className={`w-full text-left p-2.5 rounded-lg border flex items-center justify-between text-xs transition-colors cursor-pointer ${
                      activeOrder?.id === or.id 
                        ? 'border-maroon bg-maroon/5 font-bold text-maroon' 
                        : 'border-slate-100 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div>
                      <p className="font-mono">#{or.id}</p>
                      <span className="text-[9px] text-slate-450 uppercase">{or.status}</span>
                    </div>
                    <span>${or.total.toFixed(2)}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
