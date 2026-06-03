/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Product, CartItem, Order, OrderStatus } from './types';
import { PRODUCTS } from './data/products';
import BannerSlider from './components/BannerSlider';
import ProductCard from './components/ProductCard';
import ProductDetailsModal from './components/ProductDetailsModal';
import Cart from './components/Cart';
import CheckoutForm from './components/CheckoutForm';
import OrderTracker from './components/OrderTracker';
import WhatsAppFloat from './components/WhatsAppFloat';
import Logo from './components/Logo';
import NewsletterSignup from './components/NewsletterSignup';
import { 
  ShoppingBag, 
  Search, 
  User, 
  Menu, 
  X, 
  MapPin, 
  Heart, 
  Truck, 
  MessageSquare, 
  Compass, 
  SlidersHorizontal,
  RefreshCw,
  Gift,
  HelpCircle,
  Clock
} from 'lucide-react';

export default function App() {
  // Navigation views: 'katalog' | 'checkout' | 'tracking' | 'favoritos'
  const [activeTab, setActiveTab] = useState<'katalog' | 'checkout' | 'tracking' | 'favoritos'>('katalog');
  
  // Filtering & Catalog
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Interactive Overlays & Modals
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Persistence State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  // Load from local storage
  useEffect(() => {
    const savedCart = localStorage.getItem('loja_rapido_cart');
    const savedOrders = localStorage.getItem('loja_rapido_orders');
    const savedWishlist = localStorage.getItem('loja_rapido_wishlist');
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
    if (savedWishlist) setWishlistIds(JSON.parse(savedWishlist));
  }, []);

  const toggleWishlist = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    const next = wishlistIds.includes(productId) 
      ? wishlistIds.filter(id => id !== productId) 
      : [...wishlistIds, productId];
    setWishlistIds(next);
    localStorage.setItem('loja_rapido_wishlist', JSON.stringify(next));
  };

  // Save changes
  const saveCartToStorage = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('loja_rapido_cart', JSON.stringify(newCart));
  };

  const saveOrdersToStorage = (newOrders: Order[]) => {
    setOrders(newOrders);
    localStorage.setItem('loja_rapido_orders', JSON.stringify(newOrders));
  };

  // Add to Card action
  const handleAddToCart = (
    product: Product, 
    size: string, 
    color: { name: string; hex: string }, 
    quantity: number
  ) => {
    const itemId = `${product.id}-${size}-${color.name}`;
    const existingIndex = cart.findIndex(item => item.id === itemId);

    let updatedCart = [...cart];
    if (existingIndex > -1) {
      updatedCart[existingIndex].quantity += quantity;
    } else {
      updatedCart.push({
        id: itemId,
        product,
        selectedSize: size,
        selectedColor: color,
        quantity
      });
    }

    saveCartToStorage(updatedCart);
  };

  const handleUpdateCartQuantity = (id: string, q: number) => {
    const updated = cart.map(item => {
      if (item.id === id) {
        return { ...item, quantity: q };
      }
      return item;
    });
    saveCartToStorage(updated);
  };

  const handleRemoveCartItem = (id: string) => {
    const updated = cart.filter(item => item.id !== id);
    saveCartToStorage(updated);
  };

  // Order creation tracking and callback
  const handleOrderCreated = (newOrder: Order) => {
    const updatedOrders = [...orders, newOrder];
    saveOrdersToStorage(updatedOrders);
    
    // Clear cart upon checkout submission
    saveCartToStorage([]);
    
    // Switch view to tracking
    setActiveTab('tracking');
  };

  // Simulated status update
  const handleUpdateOrderStatus = (orderId: string, status: OrderStatus) => {
    const updated = orders.map(or => {
      if (or.id === orderId) {
        return { 
          ...or, 
          status,
          statusMessage: `Status diubah via admin ke: ${status}`
        };
      }
      return or;
    });
    saveOrdersToStorage(updated);
  };

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Dynamic products filtering
  const filteredProducts = PRODUCTS.filter(prod => {
    const categoryMatches = selectedCategory === 'All' || prod.kategori === selectedCategory;
    const searchMatches = prod.nama.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          prod.deskripsi.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prod.kategoriLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatches && searchMatches;
  });

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 selection:bg-pinkcoral selection:text-white font-sans text-slate-800">
      
      {/* 2. HEADER/NAVBAR BRAND: Maroon #660022 and Yellow #FFEE44 accents */}
      <header className="sticky top-0 z-40 bg-maroon text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo & Slogan block */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setActiveTab('katalog'); setMobileMenuOpen(false); }}
              className="md:hidden p-2 hover:bg-white/10 rounded-lg text-white transition-colors cursor-pointer"
              title="Menu"
            >
              <Menu size={22} />
            </button>
            <div 
              onClick={() => { setActiveTab('katalog'); setSelectedCategory('All'); }}
              className="flex items-center cursor-pointer group active:scale-95 transition-transform"
            >
              <Logo size="normal" className="text-white group-hover:text-[#FFEE44] transition-colors" />
            </div>
          </div>

          {/* Desktop Search Center Bar */}
          <div className="hidden md:flex items-center max-w-md flex-1 mx-8 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buka vistidu, sapatu, aksesorios faboritu... (Cari baju, tas...)"
              className="w-full bg-white/10 border border-white/15 h-10 px-4 rounded-xl text-xs outline-none placeholder-white/50 text-white focus:bg-white/15 focus:border-timoryellow transition-all font-mono"
            />
            <Search size={16} className="absolute right-3.5 text-white/50 pointer-events-none" />
          </div>

          {/* Navigasi Desktop links and Cart Indicator */}
          <div className="flex items-center gap-3.5">
            <nav className="hidden md:flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-slate-100 mr-2">
              <button
                onClick={() => setActiveTab('katalog')}
                className={`py-2 transition-colors cursor-pointer border-b-2 ${
                  activeTab === 'katalog' ? 'border-timoryellow text-timoryellow' : 'border-transparent hover:text-white'
                }`}
              >
                🎒 Loja (Belanja)
              </button>
              
              <button
                id="tab-favoritos-trigger"
                onClick={() => setActiveTab('favoritos')}
                className={`py-2 transition-colors cursor-pointer border-b-2 ${
                  activeTab === 'favoritos' ? 'border-timoryellow text-timoryellow' : 'border-transparent hover:text-white'
                }`}
              >
                ❤️ Favoritos
              </button>

              <button
                id="tab-tracking-trigger"
                onClick={() => setActiveTab('tracking')}
                className={`py-2 transition-colors cursor-pointer border-b-2 ${
                  activeTab === 'tracking' ? 'border-timoryellow text-timoryellow' : 'border-transparent hover:text-white'
                }`}
              >
                🚚 Rastrear (Lacak Kiriman)
              </button>
            </nav>

            {/* Quick Shopping Cart layout */}
            <button 
              id="header-cart-btn"
              onClick={() => setCartOpen(true)}
              className="relative h-11 w-11 rounded-xl bg-white/10 hover:bg-white/15 text-white flex items-center justify-center transition-all cursor-pointer active:scale-90"
              title="Keranjang Belanja"
            >
              <ShoppingBag size={20} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-brightred text-white flex items-center justify-center text-[10px] font-black border-2 border-maroon animate-pulse">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Simulated profile block or user avatar */}
            <div className="h-10 w-10 rounded-full bg-timoryellow text-maroon font-bold text-xs uppercase flex items-center justify-center shadow-inner cursor-pointer" title="Perpustakaan Dili Student">
              <User size={16} />
            </div>
          </div>

        </div>
      </header>

      {/* MOBILE BAR NAVIGATION SHEET */}
      <div className="md:hidden block bg-slate-900 border-b border-slate-800 py-2.5 px-4">
        <div className="flex items-center justify-between gap-2 text-white text-[11px] font-bold uppercase">
          <button 
            onClick={() => setActiveTab('katalog')}
            className={`flex-1 py-1.5 rounded-md text-center transition-colors flex items-center justify-center gap-1 ${
              activeTab === 'katalog' ? 'bg-maroon text-timoryellow' : 'bg-slate-800'
            }`}
          >
            <Compass size={12} /> Catalog
          </button>

          <button 
            onClick={() => setActiveTab('favoritos')}
            className={`flex-1 py-1.5 rounded-md text-center transition-colors flex items-center justify-center gap-1 ${
              activeTab === 'favoritos' ? 'bg-maroon text-timoryellow' : 'bg-slate-800'
            }`}
          >
            <Heart size={12} /> Favs
          </button>
          
          <button 
            onClick={() => setActiveTab('tracking')}
            className={`flex-1 py-1.5 rounded-md text-center transition-colors flex items-center justify-center gap-1 ${
              activeTab === 'tracking' ? 'bg-maroon text-timoryellow' : 'bg-slate-800'
            }`}
          >
            <Truck size={12} /> Lacak ({orders.length})
          </button>
        </div>

        {/* Search input mobile field */}
        <div className="mt-2.5 flex items-center relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search fashion & accessories..."
            className="w-full bg-slate-800 border-none h-9 px-3.5 rounded-lg text-xs outline-none text-white focus:ring-1 focus:ring-maroon placeholder-slate-400 font-mono"
          />
          <Search size={14} className="absolute right-3 text-slate-400" />
        </div>
      </div>

      {/* MAIN LAYOUT CANVAS */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* VIEW 1: PRODUCT CATALOG */}
        {activeTab === 'katalog' && (
          <div className="space-y-8">
            
            {/* Top Interactive Carousel campaign slider showcase */}
            <BannerSlider onCtaClick={() => setSelectedProduct(PRODUCTS[0])} />

            {/* SIZING, FILTER BAR & CATEGORY DECK - Rounded and beautiful */}
            <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                
                {/* Horizontal Navigation Category Filter Pill */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1">
                    <SlidersHorizontal size={11} /> Hili Kategoria (Kategori Filter):
                  </span>
                  
                  {['All', 'Roupa', 'Sapatos', 'Malas', 'Acessórios'].map((cat) => {
                    const isActive = selectedCategory === cat;
                    const label = cat === 'All' ? 'Hot Items (Semua)' : 
                                  cat === 'Roupa' ? 'Hastán (Roupa)' : 
                                  cat === 'Sapatos' ? 'Sapatos (Sepatu)' : 
                                  cat === 'Malas' ? 'Maleira (Tas/Mala)' : 
                                  'Akesórios (Acessórios)';
                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide transition-all cursor-pointer ${
                          isActive 
                            ? 'bg-brightred text-white shadow-sm ring-2 ring-brightred/20' 
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>

                {/* Counter matching filters */}
                <span className="text-[11px] font-mono font-medium text-slate-400 bg-slate-50 px-3 py-1 rounded-md border border-slate-100">
                  Rezultadu: <strong>{filteredProducts.length}</strong> produtu sira
                </span>
              </div>
            </div>

            {/* PRODUCT CATALOG GRID DETECTING md:grid-cols-3 and lg:grid-cols-4 for responsive layouts */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
                <ShoppingBag size={48} className="mx-auto text-slate-300 mb-3 stroke-[1.2]" />
                <h3 className="font-semibold text-slate-650 text-sm uppercase">La Hetan Produtu (Item Tidak Ditemukan)</h3>
                <p className="text-xs text-slate-405 max-w-xs mx-auto mt-1 leading-snug">
                  Maun, kór ka naran ne\'e ami la rai hela foun. Fabor, buka ho liafuan kategoria seluk.
                </p>
                <button
                  onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                  className="mt-4 px-4 py-2 bg-brightred hover:bg-brightred-hover text-white text-[11px] font-bold rounded-lg uppercase cursor-pointer"
                >
                  Reset Filtro (Lihat Semua)
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id}
                    product={product}
                    onSelect={(prod) => setSelectedProduct(prod)}
                    isFavorite={wishlistIds.includes(product.id)}
                    onToggleFavorite={toggleWishlist}
                  />
                ))}
              </div>
            )}

            {/* LOCAL CULTURE & CRAFT BANNER SECTION */}
            <div className="bg-timoryellow/10 rounded-2xl border border-timoryellow/50 p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-xs">
              <div className="space-y-2">
                <span className="inline-block py-0.5 px-2 bg-maroon text-white font-black text-[9px] uppercase rounded">
                  KULTURA TIMOR
                </span>
                <h2 className="text-lg md:text-xl font-display font-extrabold text-maroon">
                  Apoia Produtu Nasionál - Tais Timor Pride 🇹🇱
                </h2>
                <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
                  Setiap pembelian varian Hoodie "Timor Pride" atau Sepatu Tais membantu melestarikan para penenun sutra tradisional di Liquica, Ermera, dan Oecusse. Kami berkomitmen menyalurkan porsi keuntungan bagi program kebudayaan lokal.
                </p>
              </div>
              <button 
                onClick={() => { setSelectedCategory('Roupa'); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                className="py-3 px-5 rounded-xl bg-maroon hover:bg-maroon-dark text-white font-bold text-xs uppercase tracking-wide flex-shrink-0 cursor-pointer shadow-sm active:scale-95 transition-transform"
              >
                Haree Coleção Roupa
              </button>
            </div>

          </div>
        )}

        {/* VIEW 2: SINGLE-PAGE CHECKOUT FORM */}
        {activeTab === 'checkout' && (
          <CheckoutForm 
            cart={cart}
            onBackToCart={() => { setActiveTab('katalog'); }}
            onOrderCreated={handleOrderCreated}
          />
        )}

        {/* VIEW 3: ORDER STEP-STATUS TRACKER */}
        {activeTab === 'tracking' && (
          <OrderTracker 
            orders={orders}
            onUpdateOrderStatus={handleUpdateOrderStatus}
          />
        )}

        {/* VIEW 4: FAVORITOS WISHLIST */}
        {activeTab === 'favoritos' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex items-center gap-4 animate-fade-in">
              <div className="h-14 w-14 rounded-full bg-pinkcoral/10 text-pinkcoral flex items-center justify-center">
                <Heart size={24} className="fill-pinkcoral" />
              </div>
              <div>
                <h2 className="text-xl font-display font-extrabold text-[#660022]">Kolesaun Favoritu</h2>
                <p className="text-xs text-slate-500">Produtu sira ne'ebé Ita gosta liu hodi sosa fali aban.</p>
              </div>
            </div>
            
            {wishlistIds.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 animate-fade-in">
                <Heart size={48} className="mx-auto text-slate-300 mb-3 stroke-[1.2]" />
                <h3 className="font-semibold text-slate-650 text-sm uppercase">Mamuk (Kosong)</h3>
                <p className="text-xs text-slate-405 max-w-xs mx-auto mt-1 leading-snug">
                  Ita seidauk hili produtu ida ba favoritu. Halim produtu husi loja no hanehan icona fuan.
                </p>
                <button
                  onClick={() => setActiveTab('katalog')}
                  className="mt-4 px-4 py-2 bg-brightred hover:bg-[#660022] text-white text-[11px] font-bold rounded-lg uppercase cursor-pointer transition-colors"
                >
                  Buka Produtu
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in">
                {PRODUCTS.filter(p => wishlistIds.includes(p.id)).map((product) => (
                  <ProductCard 
                    key={product.id}
                    product={product}
                    onSelect={(prod) => setSelectedProduct(prod)}
                    isFavorite={true}
                    onToggleFavorite={toggleWishlist}
                  />
                ))}
              </div>
            )}
          </div>
        )}

      </main>

      {/* FLOATING ACTION ELEMENT: 1. Omni-present WhatsApp administrative button */}
      <WhatsAppFloat />

      {/* SLIDE OUT SHOPPING BASKET DRAWER */}
      <Cart 
        cart={cart}
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onGoToCheckout={() => {
          setCartOpen(false);
          setActiveTab('checkout');
        }}
      />

      {/* QUICK VIEW DETAILS MODAL (Supporting high efficiency zoom overlay lens) */}
      {selectedProduct && (
        <ProductDetailsModal 
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(prod, size, color, quantity) => {
            handleAddToCart(prod, size, color, quantity);
          }}
        />
      )}

      {/* 3. FOOTER: Yellow #FFEE44 strip and social credentials */}
      <footer className="bg-slate-900 text-white mt-12 border-t-8 border-timoryellow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          
          <NewsletterSignup />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Mission declaration */}
            <div className="space-y-3.5">
              <Logo size="small" className="text-timoryellow opacity-90 hover:opacity-100 transition-opacity" />
              <p className="text-[11px] text-slate-300 leading-relaxed max-w-xs mt-2">
                Plataforma e-commerce perantis lori durbabel nian fashion rasik sapatos, ropa, koper kualidade as iha Munisípiu hotu iha Timor-Leste. Estilu foun, sosa lalais num instante!
              </p>
              <div className="text-[10px] text-slate-400 font-mono">
                📞 +670 77000000 | 📍 Dili, Timor-Leste
              </div>
            </div>

            {/* Menu Links */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3.5 border-b border-white/5 pb-1">
                Kategoria Foun (Kategori Belanja)
              </h4>
              <ul className="space-y-2 text-[11px] font-medium text-slate-300">
                <li><button onClick={() => { setSelectedCategory('Roupa'); setActiveTab('katalog'); }} className="hover:text-timoryellow transition-colors cursor-pointer text-left">👔 Hastán & Pakaian</button></li>
                <li><button onClick={() => { setSelectedCategory('Sapatos'); setActiveTab('katalog'); }} className="hover:text-timoryellow transition-colors cursor-pointer text-left">👟 Sapatos & Sneakers Tais</button></li>
                <li><button onClick={() => { setSelectedCategory('Malas'); setActiveTab('katalog'); }} className="hover:text-timoryellow transition-colors cursor-pointer text-left">💼 Maleira & Tas Selempang</button></li>
                <li><button onClick={() => { setSelectedCategory('Acessórios'); setActiveTab('katalog'); }} className="hover:text-timoryellow transition-colors cursor-pointer text-left">🕶️ Akesórios & Relóji Oro</button></li>
              </ul>
            </div>

            {/* Information FAQ links */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3.5 border-b border-white/5 pb-1">
                Ajuda & Kontaktu (Bantuan)
              </h4>
              <ul className="space-y-2 text-[11px] font-medium text-slate-300">
                <li><a href="#" className="hover:text-timoryellow transition-colors">Sobre Nós (Tentang Kami)</a></li>
                <li><a href="#" className="hover:text-timoryellow transition-colors">Portes Grátis em Dili (Info Pengiriman)</a></li>
                <li><a href="#" className="hover:text-timoryellow transition-colors">Termos & Kondisaun (Ketentuan)</a></li>
                <li><a href="#" className="hover:text-timoryellow transition-colors">Perguntas Frequentes (FAQ)</a></li>
              </ul>
            </div>

            {/* Quick trust strip */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3.5 border-b border-white/5 pb-1">
                Metodo Selu (Pembayaran)
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Ami simu Transferensia Banku Timor-Leste nian (BNU, Telemor, TT). Kurier sei kontaktu hodi lori resibu fiziku.
              </p>
              
              {/* Payment partner mock logos */}
              <div className="flex flex-wrap gap-2 text-[9px] font-mono">
                <span className="px-2.5 py-1 bg-white/5 rounded text-slate-300 border border-white/10 font-black">BNU</span>
                <span className="px-2.5 py-1 bg-white/5 rounded text-emerald-400 border border-white/10 font-bold">Mosan / Telemor</span>
                <span className="px-2.5 py-1 bg-white/5 rounded text-slate-300 border border-white/10 font-bold">E-Wallet TT</span>
              </div>
            </div>

          </div>

          <div className="mt-8 pt-6 border-t border-white/5 text-center flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-slate-400">
            <p>© {new Date().getFullYear()} LojaRápido Timor-Leste. All rights preserved. Dezaun ho ksolok.</p>
            <div className="flex items-center gap-4 text-xs">
              <a href="#" className="hover:text-timoryellow"><MessageSquare size={14} /></a>
              <span>🇹🇱 Timor-Leste Estilu, Num Instante!</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
