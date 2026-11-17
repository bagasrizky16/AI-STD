import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  calculatePackageTotal,
  filterDestinations,
  filterGallery,
  formatIndonesianDate,
  formatRupiah,
  validateBookingInput,
} from './booking';
import { DESTINATIONS, GALLERY_ITEMS } from '../data/villageData';

test('formatRupiah formats Indonesian currency cleanly', () => {
  assert.equal(formatRupiah(150000), 'Rp 150.000');
  assert.equal(formatRupiah(0), 'Rp 0');
  assert.equal(formatRupiah(-5000), 'Rp 0');
});

test('calculatePackageTotal computes standard and 10% group discount accurately', () => {
  const regular = calculatePackageTotal(150000, 4);
  assert.equal(regular.subtotal, 600000);
  assert.equal(regular.discountRate, 0);
  assert.equal(regular.discountAmount, 0);
  assert.equal(regular.total, 600000);

  const group = calculatePackageTotal(150000, 10);
  assert.equal(group.subtotal, 1500000);
  assert.equal(group.discountRate, 0.1);
  assert.equal(group.discountAmount, 150000);
  assert.equal(group.total, 1350000);
});

test('validateBookingInput catches missing or invalid fields', () => {
  const emptyErrors = validateBookingInput({
    visitorName: '',
    guests: 0,
    visitDate: '',
  });
  assert.ok(emptyErrors.visitorName);
  assert.ok(emptyErrors.guests);
  assert.ok(emptyErrors.visitDate);

  const validErrors = validateBookingInput({
    visitorName: 'Budi Santoso',
    guests: 5,
    visitDate: '2026-12-20',
  });
  assert.deepEqual(validErrors, {});
});

test('buildWhatsAppMessage and buildWhatsAppUrl include formatted details and encoded query', () => {
  const msg = buildWhatsAppMessage({
    packageName: 'Paket Keluarga Agro & Budaya',
    unitPrice: 150000,
    guests: 10,
    visitDate: '2026-12-20',
    visitorName: 'Siti Rahma',
    notes: 'Minta menu tidak pedas untuk anak',
  });
  assert.match(msg, /Siti Rahma/);
  assert.match(msg, /20 Desember 2026/);
  assert.match(msg, /Diskon Rombongan \(10%\)/);
  assert.match(msg, /Rp 1\.350\.000/);

  const url = buildWhatsAppUrl('+62 812-3456-7890', msg);
  assert.ok(url.startsWith('https://wa.me/6281234567890?text='));
  assert.ok(url.includes(encodeURIComponent('Siti Rahma')));
});

test('formatIndonesianDate converts ISO date string to Indonesian month name', () => {
  assert.equal(formatIndonesianDate('2026-08-17'), '17 Agustus 2026');
});

test('filterDestinations and filterGallery return accurate subsets', () => {
  assert.equal(filterDestinations(DESTINATIONS, 'Semua').length, DESTINATIONS.length);
  const eko = filterDestinations(DESTINATIONS, 'Ekowisata');
  assert.ok(eko.length > 0 && eko.every((d) => d.category === 'Ekowisata'));

  assert.equal(filterGallery(GALLERY_ITEMS, 'Semua').length, GALLERY_ITEMS.length);
  const alam = filterGallery(GALLERY_ITEMS, 'Alam');
  assert.ok(alam.length > 0 && alam.every((g) => g.category === 'Alam'));
});
