import { Destination, DestinationCategory, GalleryCategory, GalleryItem } from '../data/villageData';

export interface BookingFormInput {
  visitorName: string;
  guests: number;
  visitDate: string;
  notes?: string;
}

export interface PriceBreakdown {
  unitPrice: number;
  guests: number;
  subtotal: number;
  discountRate: number;
  discountAmount: number;
  total: number;
}

export interface WhatsAppMessageInput {
  packageName: string;
  unitPrice: number;
  guests: number;
  visitDate: string;
  visitorName: string;
  notes?: string;
}

export const GROUP_DISCOUNT_THRESHOLD = 10;
export const GROUP_DISCOUNT_RATE = 0.1;

export function formatRupiah(amount: number): string {
  const safeAmount = Number.isFinite(amount) ? Math.max(0, Math.round(amount)) : 0;
  return `Rp ${safeAmount.toLocaleString('id-ID')}`;
}

export function calculatePackageTotal(unitPrice: number, guests: number): PriceBreakdown {
  const safePrice = Number.isFinite(unitPrice) && unitPrice > 0 ? Math.round(unitPrice) : 0;
  const safeGuests = Number.isFinite(guests) && guests >= 1 ? Math.floor(guests) : 1;
  const subtotal = safePrice * safeGuests;
  const discountRate = safeGuests >= GROUP_DISCOUNT_THRESHOLD ? GROUP_DISCOUNT_RATE : 0;
  const discountAmount = Math.round(subtotal * discountRate);
  const total = subtotal - discountAmount;

  return {
    unitPrice: safePrice,
    guests: safeGuests,
    subtotal,
    discountRate,
    discountAmount,
    total,
  };
}

export function validateBookingInput(input: BookingFormInput): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!input.visitorName || input.visitorName.trim().length < 2) {
    errors.visitorName = 'Mohon isi nama lengkap minimal 2 huruf.';
  }

  if (!Number.isFinite(input.guests) || input.guests < 1 || input.guests > 100) {
    errors.guests = 'Jumlah peserta harus antara 1 sampai 100 orang.';
  }

  if (!input.visitDate || input.visitDate.trim().length === 0) {
    errors.visitDate = 'Mohon pilih rencana tanggal kunjungan.';
  }

  return errors;
}

export function formatIndonesianDate(isoDate: string): string {
  if (!isoDate) return '-';
  const parts = isoDate.split('-');
  if (parts.length !== 3) return isoDate;
  const months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];
  const year = parts[0];
  const monthIdx = Number(parts[1]) - 1;
  const day = Number(parts[2]);
  if (monthIdx < 0 || monthIdx > 11 || Number.isNaN(day)) return isoDate;
  return `${day} ${months[monthIdx]} ${year}`;
}

export function buildWhatsAppMessage(input: WhatsAppMessageInput): string {
  const pricing = calculatePackageTotal(input.unitPrice, input.guests);
  const formattedDate = formatIndonesianDate(input.visitDate);
  const lines = [
    'Halo Admin Desa Wisata Lereng Asri,',
    '',
    'Saya ingin memesan paket wisata dengan rincian berikut:',
    `- Nama Pemesan: ${input.visitorName.trim() || '-'}`,
    `- Paket Wisata: ${input.packageName}`,
    `- Tanggal Kunjungan: ${formattedDate}`,
    `- Jumlah Peserta: ${pricing.guests} orang`,
    `- Harga Satuan: ${formatRupiah(pricing.unitPrice)} / orang`,
  ];

  if (pricing.discountAmount > 0) {
    lines.push(`- Diskon Rombongan (10%): -${formatRupiah(pricing.discountAmount)}`);
  }

  lines.push(`- Estimasi Total: ${formatRupiah(pricing.total)}`);

  if (input.notes && input.notes.trim().length > 0) {
    lines.push(`- Catatan Tambahan: ${input.notes.trim()}`);
  }

  lines.push('', 'Mohon informasi ketersediaan jadwalnya. Terima kasih.');
  return lines.join('\n');
}

export function buildWhatsAppUrl(phone: string, message: string): string {
  const digits = phone.replace(/\D/g, '');
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function filterDestinations(
  items: Destination[],
  category: DestinationCategory | 'Semua'
): Destination[] {
  if (category === 'Semua') return items;
  return items.filter((item) => item.category === category);
}

export function filterGallery(
  items: GalleryItem[],
  category: GalleryCategory | 'Semua'
): GalleryItem[] {
  if (category === 'Semua') return items;
  return items.filter((item) => item.category === category);
}
