/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Product } from '../types';
import { Star, ZoomIn, Eye, BadgePercent, Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (e: React.MouseEvent, productId: string) => void;
  key?: string;
}

export default function ProductCard({ product, onSelect, isFavorite, onToggleFavorite }: ProductCardProps) {
  return (
    <div 
      id={`product-card-${product.id}`}
      className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-md border border-slate-100 flex flex-col h-full relative transition-all duration-300"
    >
      {/* Promo Discount or Edition Badge in Coral Pink */}
      {product.highlight && (
        <span 
          className="absolute top-6 left-6 z-10 font-display text-[9px] font-extrabold px-2.5 py-1 rounded-md text-white bg-pinkcoral shadow-sm tracking-widest uppercase flex items-center gap-1"
        >
          {product.highlight}
        </span>
      )}

      {/* Favorite Button */}
      <button
        onClick={(e) => { e.stopPropagation(); onToggleFavorite?.(e, product.id); }}
        className="absolute top-4 right-4 z-20 p-2 bg-white/70 hover:bg-white backdrop-blur-sm shadow-sm rounded-full transition-all cursor-pointer hover:scale-105 text-slate-400"
      >
        <Heart size={16} className={`transition-colors ${isFavorite ? 'fill-pinkcoral text-pinkcoral' : 'hover:text-pinkcoral'}`} />
      </button>

      {/* New Badge */}
      {product.isNew && (
        <span 
          className="absolute top-12 left-6 z-10 font-display text-[9px] font-bold px-2 py-0.5 rounded bg-timoryellow text-maroon shadow-xs tracking-widest uppercase"
        >
          FOUN (NEW)
        </span>
      )}

      {/* Product Image Area with quick-action overlay */}
      <div 
        onClick={() => onSelect(product)}
        className="bg-slate-100 rounded-xl aspect-square mb-4 relative overflow-hidden cursor-pointer flex items-center justify-center border border-slate-50"
      >
        <img
          src={product.imageUrl}
          alt={product.nama}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Interactive Overlay */}
        <div className="absolute inset-0 bg-maroon/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <button className="p-2.5 bg-white/95 text-maroon hover:bg-brightred hover:text-white rounded-full transition-all duration-200 shadow-md transform translate-y-4 group-hover:translate-y-0 cursor-pointer">
            <Eye size={18} />
          </button>
          
          {product.zoomAllowed && (
            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-slate-900/80 text-[10px] text-timoryellow flex items-center gap-1 px-2 py-0.5 rounded backdrop-blur-xs font-mono">
              <ZoomIn size={10} /> Zoom
            </span>
          )}
        </div>
      </div>

      {/* Details Box */}
      <div className="flex flex-col flex-grow">
        {/* Title */}
        <h3 
          onClick={() => onSelect(product)}
          className="font-bold text-maroon hover:text-brightred text-sm truncate cursor-pointer transition-colors duration-150 mb-0.5"
        >
          {product.nama}
        </h3>

        {/* Category & specs description style from Sleek layout */}
        <p className="text-xs text-slate-405 mb-2 uppercase font-medium tracking-tighter">
          {product.kategori} • {product.sizes.slice(0, 3).join(', ')}{product.sizes.length > 3 ? '...' : ''}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i} 
                size={11} 
                className={`${i < Math.floor(product.rating) ? 'fill-amber-400' : ''}`} 
              />
            ))}
          </div>
          <span className="text-[10px] font-mono text-slate-400">({product.rating})</span>
        </div>

        {/* Price & Action Footer */}
        <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Folin</span>
            <span className="text-lg font-black text-slate-900">
              ${product.harga.toFixed(2)}
            </span>
          </div>

          <button
            onClick={() => onSelect(product)}
            className="bg-brightred hover:bg-maroon text-white p-2.5 rounded-xl transition-all duration-200 transform hover:scale-[1.08] active:scale-95 cursor-pointer shadow-xs flex items-center justify-center"
            title="Sosa fali"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
