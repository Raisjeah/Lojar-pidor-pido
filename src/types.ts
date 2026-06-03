/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  nama: string;
  deskripsi: string;
  harga: number; // in USD
  kategori: 'Roupa' | 'Sapatos' | 'Malas' | 'Acessórios'; // Apparel, Shoes, Bags, Accessories
  kategoriLabel: string; // Tetum & Portuguese/Indon labels
  sizes: string[]; // Sizes from S to XL or Shoe sizes like 39, 40
  colors: { name: string; hex: string }[]; // Colors with nice visual hexes
  imageUrl: string;
  zoomAllowed: boolean; // Enables the accessory hover-interactive zoom lens
  sku: string;
  rating: number;
  highlight?: string; // Discount / Promo badge (e.g. "Promo Tais", "15% OFF")
  isNew?: boolean;
}

export interface CartItem {
  id: string; // unique combination of product id + size + color
  product: Product;
  selectedSize: string;
  selectedColor: { name: string; hex: string };
  quantity: number;
}

export interface DeliveryDetails {
  namaPenerima: string;
  noTelepon: string; // WhatsApp number
  distrito: string; // District in Timor-Leste
  subDistrito: string; // Sub-district
  patokanLokasi: string; // Landmark coordinates/description
  catatanTambahan?: string;
}

export type OrderStatus = 'Prosesu' | 'Iha Dalan' | 'To\'o Ona'; // Active tracking status: Diproses | Sedang Di Jalan | Sampai

export interface Order {
  id: string;
  items: CartItem[];
  deliveryDetails: DeliveryDetails;
  total: number;
  status: OrderStatus;
  statusMessage: string;
  tanggal: string; // ISO date
  whatsappAdmin: string; // Destination number
}
