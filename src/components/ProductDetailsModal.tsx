/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { Product, CartItem } from '../types';
import { X, ShoppingBag, Check, ZoomIn, Info, HelpCircle } from 'lucide-react';

interface ProductDetailsModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: { name: string; hex: string }, quantity: number) => void;
}

export default function ProductDetailsModal({ product, onClose, onAddToCart }: ProductDetailsModalProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || { name: '', hex: '' });
  const [quantity, setQuantity] = useState(1);
  const [cartSuccess, setCartSuccess] = useState(false);

  // Focus zoom refs and state
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({});
  const [isZooming, setIsZooming] = useState(false);
  const imgContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgContainerRef.current) return;
    const { left, top, width, height } = imgContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: 'scale(2.2)'
    });
    setIsZooming(true);
  };

  const handleMouseLeave = () => {
    setZoomStyle({});
    setIsZooming(false);
  };

  const submitToCart = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setCartSuccess(true);
    setTimeout(() => {
      setCartSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col md:flex-row relative max-h-[90vh] sm:max-h-none md:h-auto overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-slate-400 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Left Side: Product Zoom interactive image */}
        <div className="w-full md:w-1/2 p-4 md:p-6 bg-slate-50 flex flex-col justify-center border-r border-slate-100 relative">
          <span className="absolute top-4 left-4 z-10 px-2 py-1 rounded bg-maroon/10 text-maroon text-[9px] font-mono font-bold uppercase tracking-wider">
            {product.sku}
          </span>

          <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-white shadow-inner flex items-center justify-center">
            {/* Magnifier Info Overlay */}
            {product.zoomAllowed && (
              <div className="absolute bottom-3 left-3 right-3 z-10 bg-slate-900/75 backdrop-blur-xs text-white text-[10px] py-1 px-2.5 rounded-lg flex items-center gap-2 pointer-events-none">
                <ZoomIn size={12} className="text-timoryellow animate-pulse" />
                <span>Rasta hodi zoom lense (Arahkan kursor untuk zoom anting/aksesoris)</span>
              </div>
            )}

            {/* Main Interactive Zoom Box */}
            <div
              ref={imgContainerRef}
              onMouseMove={product.zoomAllowed ? handleMouseMove : undefined}
              onMouseLeave={product.zoomAllowed ? handleMouseLeave : undefined}
              className={`w-full h-full relative cursor-crosshair overflow-hidden flex items-center justify-center`}
            >
              <img
                src={product.imageUrl}
                alt={product.nama}
                style={zoomStyle}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-100"
              />
            </div>
          </div>
          
          <div className="hidden sm:flex items-center gap-1.5 mt-3 text-slate-400 text-xs justify-center font-mono">
            <Info size={12} />
            <span>Kualidade primeiru, Tais dezainu orijinál</span>
          </div>
        </div>

        {/* Right Side: Configuration details & cart submit */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Category Breadcrumb */}
            <span className="text-pinkcoral text-xs font-bold uppercase tracking-widest block mb-2">
              {product.kategoriLabel}
            </span>

            {/* Product Title */}
            <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 leading-snug mb-3">
              {product.nama}
            </h1>

            {/* Highlight Banner / Promo */}
            {product.highlight && (
              <div className="inline-block bg-pinkcoral text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full mb-4">
                🏷️ {product.highlight}
              </div>
            )}

            {/* Cost section */}
            <div className="bg-slate-50 p-4 rounded-xl mb-5 flex items-baseline justify-between border border-slate-100">
              <div>
                <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wide">Folin (Harga)</span>
                <span className="text-3xl font-display font-extrabold text-maroon">${product.harga.toFixed(2)}</span>
              </div>
              <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded">
                Prontu iha Estoke (+15)
              </span>
            </div>

            {/* Description */}
            <p className="text-slate-600 text-xs leading-relaxed mb-6">
              {product.deskripsi}
            </p>

            {/* VARIANT SECTION 1: Colors selection chips */}
            <div className="mb-5">
              <span className="block text-xs font-bold text-slate-705 tracking-wide uppercase mb-2">
                Hili Kór (Pilih Warna): <span className="font-semibold text-slate-500 text-[11px]">{selectedColor.name}</span>
              </span>
              <div className="flex flex-wrap gap-2.5">
                {product.colors.map((color) => {
                  const isSelected = selectedColor.name === color.name;
                  return (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`h-9 px-3.5 rounded-lg border flex items-center gap-2 transition-all cursor-pointer ${
                        isSelected 
                          ? 'border-brightred ring-2 ring-brightred/20 bg-slate-50' 
                          : 'border-slate-200 hover:border-slate-350 bg-white'
                      }`}
                      title={color.name}
                    >
                      <span 
                        className="h-4 w-4 rounded-full border border-slate-300 shadow-xs flex-shrink-0 animate-pulse-slow"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="text-xs font-semibold text-slate-700">{color.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* VARIANT SECTION 2: Sizes selection chips */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="block text-xs font-bold text-slate-707 tracking-wide uppercase">
                  Hili Size (Pilih Ukuran)
                </span>
                <span className="text-[10px] text-slate-400 underline flex items-center gap-1 cursor-pointer hover:text-brightred">
                  <HelpCircle size={10} /> Tabela ukuran
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-9 min-w-10 px-3 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'border-brightred text-white bg-brightred ring-2 ring-brightred/20'
                          : 'border-slate-200 text-slate-700 bg-white hover:border-slate-300'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6 flex items-center justify-between border-t border-slate-100 pt-4">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Hira-hira (Jumlah)
              </span>
              <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-md hover:bg-white text-slate-600 flex items-center justify-center font-bold text-sm cursor-pointer transition-colors"
                >
                  -
                </button>
                <span className="w-10 text-center font-mono font-bold text-xs">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-md hover:bg-white text-slate-600 flex items-center justify-center font-bold text-sm cursor-pointer transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action Trigger */}
          <div className="mt-4">
            {cartSuccess ? (
              <div className="w-full h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold text-xs gap-2 animate-pulse">
                <Check size={16} /> Tau tiha ona iha carrinho! (Tersimpan ke Keranjang)
              </div>
            ) : (
              <button
                onClick={submitToCart}
                className="w-full h-12 rounded-xl bg-brightred hover:bg-[#660022] text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm hover:shadow-md cursor-pointer transform active:scale-[0.99]"
              >
                <ShoppingBag size={15} /> TAU IHA CARRINHO (BELI SEKARANG)
              </button>
            )}
            
            <p className="text-center text-[10px] text-slate-400 mt-2.5">
              💡 Transaksi aman & gratis ongkir Dili. Bisa kirim WhatsApp ke Admin admin kami.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
