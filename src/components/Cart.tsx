/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CartItem } from '../types';
import { X, Trash2, ShoppingCart, ArrowRight } from 'lucide-react';

interface CartProps {
  cart: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (id: string, q: number) => void;
  onRemoveItem: (id: string) => void;
  onGoToCheckout: () => void;
}

export default function Cart({
  cart,
  isOpen,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onGoToCheckout
}: CartProps) {
  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.harga * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Background shadow */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity cursor-pointer"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2">
              <ShoppingCart size={18} className="text-maroon" />
              <h2 className="font-display font-extrabold text-slate-900 text-sm tracking-wide">
                CARRINHO KETA (KERANJANG BELANJA)
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 -mr-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Cart products body */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-100">
                <ShoppingCart size={48} className="text-slate-300 mb-3 stroke-[1.5]" />
                <h3 className="font-semibold text-slate-700 text-xs uppercase mb-1">Mamuk (Keranjang Kosong)</h3>
                <p className="text-[11px] text-slate-400 max-w-[200px]">
                  Basa buat ruma feto ka mane, tau iha ne\'e hodi submete ba admin!
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-4 py-2 bg-brightred hover:bg-brightred-hover text-white font-bold rounded-lg text-[10px] uppercase tracking-wide transition-colors cursor-pointer"
                >
                  Haree Produtu Agora
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const itemTotal = item.product.harga * item.quantity;
                return (
                  <div 
                    key={item.id}
                    className="flex p-3 rounded-xl border border-slate-100 hover:border-slate-200 transition-all bg-white gap-3.5 relative shadow-xs"
                  >
                    {/* Visual representation */}
                    <div className="h-16 w-16 rounded-lg overflow-hidden bg-slate-50 flex-shrink-0">
                      <img 
                        src={item.product.imageUrl} 
                        alt={item.product.nama} 
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover" 
                      />
                    </div>

                    {/* Meta info block */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        {/* Title */}
                        <h4 className="text-xs font-bold text-slate-800 line-clamp-1 leading-snug">
                          {item.product.nama}
                        </h4>
                        
                        {/* Variants selected */}
                        <div className="flex items-center gap-1.5 mt-1 text-[10px] text-slate-500 font-medium">
                          <span className="px-1.5 py-0.5 rounded bg-slate-100 uppercase text-[9px] font-bold">
                            Tamanho: {item.selectedSize}
                          </span>
                          <span 
                            className="inline-block h-2.5 w-2.5 rounded-full border border-slate-300"
                            style={{ backgroundColor: item.selectedColor.hex }}
                            title={item.selectedColor.name}
                          />
                          <span className="text-slate-400 text-[9px] truncate max-w-[80px]">
                            {item.selectedColor.name}
                          </span>
                        </div>
                      </div>

                      {/* Incrementor and Delete and value */}
                      <div className="flex items-center justify-between mt-2.5">
                        <div className="flex items-center bg-slate-100 rounded-md p-0.5">
                          <button
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="w-5.5 h-5.5 rounded-sm hover:bg-white text-slate-600 flex items-center justify-center font-bold text-[10px] cursor-pointer"
                          >
                            -
                          </button>
                          <span className="w-6 text-center font-mono font-bold text-[10px] text-slate-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-5.5 h-5.5 rounded-sm hover:bg-white text-slate-600 flex items-center justify-center font-bold text-[10px] cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                        
                        {/* Cost */}
                        <span className="font-display font-extrabold text-maroon text-xs">
                          ${itemTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Delete button absolute icon */}
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="absolute top-2.5 right-2 text-slate-400 hover:text-brightred p-1 rounded-full hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Pricing totals block */}
          {cart.length > 0 && (
            <div className="border-t border-slate-100 bg-slate-50/70 p-4 space-y-3.5">
              <div className="space-y-1.5 uppercase tracking-wide">
                <div className="flex justify-between text-[11px] text-slate-500 font-bold">
                  <span>Subtotál</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[11px] text-emerald-600 font-extrabold">
                  <span>Kareta Entegre (Ongkos Kirim)</span>
                  <span>GRÁTIS</span>
                </div>
                <div className="flex justify-between text-xs font-display font-black text-slate-900 border-t border-slate-100 pt-2 text-[13px]">
                  <span>TOTAL FINÁL</span>
                  <span className="text-maroon text-sm">${subtotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Action routes */}
              <div className="space-y-2">
                <button
                  id="cart-go-checkout-btn"
                  onClick={onGoToCheckout}
                  className="w-full py-3 px-4 rounded-xl bg-brightred hover:bg-brightred-hover text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg transition-transform duration-200 transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                >
                  PROSEDA BA PAGAMENTU <ArrowRight size={13} />
                </button>
                <button
                  onClick={onClose}
                  className="w-full py-2 bg-white border border-slate-250 hover:bg-slate-50 text-slate-700 font-bold text-[10px] uppercase rounded-xl transition-colors cursor-pointer"
                >
                  Kontinuar Sosa (Kembali Belanja)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
