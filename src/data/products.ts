/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    nama: 'Hoodie Premium "Timor Pride"',
    deskripsi: 'Hoodie durbabel premium ho estilu eklusivu kulturál Tais Timor paired, comfortable and warm. Fitur uniseks dengan tali maroon yang elegan dan bahan katun penyerap keringat sangat cocok untuk anak muda di Dili.',
    harga: 25.00,
    kategori: 'Roupa',
    kategoriLabel: 'Hastán (Roupa)',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Maroon Flag', hex: '#660022' },
      { name: 'Negru Klasiku', hex: '#111111' },
      { name: 'Uan Mean (Merah)', hex: '#DD1C39' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=600',
    zoomAllowed: false,
    sku: 'HD-TIMOR-PRD-01',
    rating: 4.8,
    highlight: 'EDISYUN LOKAL',
    isNew: true
  },
  {
    id: 'p2',
    nama: 'Sepatu Sapatu "Timor Runner" Tais Edition',
    deskripsi: 'Sapatu desportu sirkulasaun ar nian ho toke modernu ho detalle tais timor iha parte kantu. Sol karet anti slip kokoh, cocok untuk berjalan di aspal kota Dili maupun jalanan berbukit Ermera.',
    harga: 35.00,
    kategori: 'Sapatos',
    kategoriLabel: 'Sapatos',
    sizes: ['39', '40', '41', '42', '43'],
    colors: [
      { name: 'Branco Coral', hex: '#FF6666' },
      { name: 'Maroon Tais', hex: '#660022' },
      { name: 'Kuning Timor', hex: '#FFEE44' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600',
    zoomAllowed: false,
    sku: 'SP-TAIS-RUN-39',
    rating: 4.9,
    highlight: 'DIFERENTE DEZAINO',
    isNew: true
  },
  {
    id: 'p3',
    nama: 'Mala De Viajem "Explorer Dili" Suite',
    deskripsi: 'Koper tas perjalanan (mala tula sasán) kokoh anti-benturan kapasitas 45 Liter. Memiliki handle ergonomis dan roda bersuara halus 360 derajat. Sangat ideal untuk perjalanan udara ke Atauro atau rute Kupang.',
    harga: 45.00,
    kategori: 'Malas',
    kategoriLabel: 'Maleira/Taza',
    sizes: ['Standard 20"', 'Large 24"'],
    colors: [
      { name: 'Maroon Premium', hex: '#660022' },
      { name: 'Xanadu Slate', hex: '#334155' },
      { name: 'Mean Bright', hex: '#DD1C39' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1565026057447-bc90a3d9237f?auto=format&fit=crop&q=80&w=600',
    zoomAllowed: false,
    sku: 'ML-DILI-EXP-20',
    rating: 4.7,
    highlight: 'HOT ITEM'
  },
  {
    id: 'p4',
    nama: 'Relóji "Dili Chrono" Stylish Leather',
    deskripsi: 'Jam tangan kulit aksesoris premium elegan dengan dial berwarna rose-gold berpadu strap kulit sapi asli berwarna coklat gelap. (Mendukung zoom detail tinggi untuk melihat keindahan kronograf mikro)',
    harga: 18.00,
    kategori: 'Acessórios',
    kategoriLabel: 'Akesórios (Acessórios)',
    sizes: ['Mala (40mm)', 'Feto (36mm)'],
    colors: [
      { name: 'Rose Gold Brown', hex: '#8B4513' },
      { name: 'Deep Midnight Slate', hex: '#1E293B' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=600',
    zoomAllowed: true,
    sku: 'AC-DILI-CHRONO-M',
    rating: 4.9,
    highlight: 'ZOOM AKTIF',
    isNew: false
  },
  {
    id: 'p5',
    nama: 'Chapéu "Timor Pride" Baseball Cap',
    deskripsi: 'Topi baseball kasual dengan bordiran patch bendera Timor-Leste di dahi dan anyaman tais di panel dalam. Melindungi mata dari teriknya matahari khatulistiwa di Pantai Tasitolu.',
    harga: 8.50,
    kategori: 'Roupa',
    kategoriLabel: 'Hastán (Roupa)',
    sizes: ['Ajustável (All Size)'],
    colors: [
      { name: 'Negru Klasiku', hex: '#000000' },
      { name: 'Maroon Flag', hex: '#660022' },
      { name: 'Coral Pink', hex: '#FF6666' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=600',
    zoomAllowed: true,
    sku: 'CP-TIMOR-CAP-01',
    rating: 4.6,
    highlight: 'APENAS $8.50'
  },
  {
    id: 'p6',
    nama: 'Women\'s "Crossóbios" Leather Bag',
    deskripsi: 'Mala feto kintu kulit buatan awet dengan tali silang rantai keemasan yang ramping. Sangat bergaya untuk kondangan di Dili, makan malam romantis di Cristo Rei, atau kuliah.',
    harga: 22.00,
    kategori: 'Malas',
    kategoriLabel: 'Maleira/Taza',
    sizes: ['Medium 10-L'],
    colors: [
      { name: 'Coral Pink', hex: '#FF6666' },
      { name: 'Deep Ivory', hex: '#FDF6E2' },
      { name: 'Maroon Elite', hex: '#660022' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=600',
    zoomAllowed: true,
    sku: 'ML-CROSSOBIOS-F',
    rating: 4.7,
    highlight: 'POPULAR'
  },
  {
    id: 'p7',
    nama: 'Kacamata Retro "Sun Solor" Sunglasses',
    deskripsi: 'Kacamata hitam anti UV dengan bingkai metalik keemasan yang berkilau premium. Sangat fungsional saat bertamasya ke pantai-pantai eksotis Liquiçá atau Baucau.',
    harga: 12.00,
    kategori: 'Acessórios',
    kategoriLabel: 'Akesórios (Acessórios)',
    sizes: ['Universal Frame'],
    colors: [
      { name: 'Classic Gold Black', hex: '#D4AF37' },
      { name: 'Silver Smoke', hex: '#E2E8F0' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=600',
    zoomAllowed: true,
    sku: 'KS-RETR-SOL-A1',
    rating: 4.5,
    highlight: 'COSTA DO SOL'
  },
  {
    id: 'p8',
    nama: 'Perhiasan "Brinco Oro Tais" Pearl Earrings',
    deskripsi: 'Anting mutiara halus dengan gantungan paduan emas bernuansa ukiran motif Tais tradisional. Desain ringan yang melengkapi keanggunan busana kebaya Timor maupun outfit modern.',
    harga: 15.00,
    kategori: 'Acessórios',
    kategoriLabel: 'Akesórios (Acessórios)',
    sizes: ['Completo'],
    colors: [
      { name: 'Lustrous Mutiara Emas', hex: '#FFDF00' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=600',
    zoomAllowed: true,
    sku: 'AC-EAR-PEARL-G5',
    rating: 4.9,
    highlight: 'AKSESORIS CILIK (ZOOM ON)'
  }
];

// List of Timor-Leste Districts (Municipalities)
export const DISTRITOS = [
  'Dili',
  'Baucau',
  'Ermera',
  'Bobonaro',
  'Cova Lima',
  'Liquiçá',
  'Manufahi',
  'Lautém',
  'Manatuto',
  'Ainaro',
  'Viqueque',
  'Oecusse-Ambeno',
  'Atauro'
];

interface SubdistrictMap {
  [key: string]: string[];
}

export const SUB_DISTRITOS: SubdistrictMap = {
  'Dili': ['Vera Cruz', 'Nain Feto', 'Dom Aleixo', 'Cristo Rei', 'Metinaro'],
  'Baucau': ['Baucau Villa', 'Vemasse', 'Laga', 'Baguia', 'Quelicai', 'Venilale'],
  'Ermera': ['Gleno', 'Ermera Villa', 'Letefoho', 'Hatolia', 'Atsabe'],
  'Bobonaro': ['Maliana', 'Balibo', 'Cailaco', 'Bobonaro Villa', 'Lolotoe', 'Atabae'],
  'Cova Lima': ['Suai', 'Tilomar', 'Fohorem', 'Fatu-Lulic', 'Fatu-Mean', 'Maucatar', 'Zumalai'],
  'Liquiçá': ['Liquiçá Villa', 'Maubara', 'Bazartete'],
  'Manufahi': ['Same', 'Alas', 'Fatuberlio', 'Turiscai'],
  'Lautém': ['Lospalos', 'Luro', 'Iliomar', 'Lautem Villa', 'Tutuala'],
  'Manatuto': ['Manatuto Villa', 'Laclo', 'Laclubar', 'Laleia', 'Soibada', 'Barique-Natarbora'],
  'Ainaro': ['Ainaro Villa', 'Maubisse', 'Hatu-Builico', 'Pantano-Vila'],
  'Viqueque': ['Viqueque Villa', 'Uatu-Lari', 'Uatu-Carbau', 'Lacluta', 'Ossu'],
  'Oecusse-Ambeno': ['Pante Macassar', 'Oesilo', 'Nitibe', 'Passabe'],
  'Atauro': ['Atauro Vila', 'Beloi', 'Biqueli', 'Macadade']
};
