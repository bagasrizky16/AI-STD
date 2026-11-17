import { useState } from 'react';
import { Calendar, Check, CheckCircle2, Copy, Minus, Plus, Users, X } from 'lucide-react';
import { TOUR_PACKAGES, TourPackage, WHATSAPP_NUMBER } from '../data/villageData';
import {
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  calculatePackageTotal,
  formatIndonesianDate,
  formatRupiah,
  validateBookingInput,
} from '../utils/booking';
import { ResilientImage } from './ResilientImage';
import { WhatsAppIcon } from './WhatsAppIcon';

interface PackagesAndBookingSectionProps {
  selectedPackage: TourPackage;
  onSelectPackage: (pkg: TourPackage) => void;
  guests: number;
  onChangeGuests: (guests: number) => void;
  visitorName: string;
  onChangeVisitorName: (name: string) => void;
  visitDate: string;
  onChangeVisitDate: (date: string) => void;
  notes: string;
  onChangeNotes: (notes: string) => void;
}

export function PackagesAndBookingSection({
  selectedPackage,
  onSelectPackage,
  guests,
  onChangeGuests,
  visitorName,
  onChangeVisitorName,
  visitDate,
  onChangeVisitDate,
  notes,
  onChangeNotes,
}: PackagesAndBookingSectionProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  const pricing = calculatePackageTotal(selectedPackage.pricePerPerson, guests);

  const messageText = buildWhatsAppMessage({
    packageName: selectedPackage.name,
    unitPrice: selectedPackage.pricePerPerson,
    guests: pricing.guests,
    visitDate,
    visitorName,
    notes,
  });

  const whatsappUrl = buildWhatsAppUrl(WHATSAPP_NUMBER, messageText);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateBookingInput({
      visitorName,
      guests,
      visitDate,
      notes,
    });
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setCopiedMessage(false);
      setShowConfirmModal(true);
    }
  };

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(messageText);
      setCopiedMessage(true);
    } catch {
      setCopiedMessage(false);
    }
  };

  return (
    <section
      id="paket"
      aria-labelledby="paket-heading"
      className="py-12 md:py-16 bg-[#EFFDEE] border-y border-[#1B4332]/10 scroll-mt-16 md:scroll-mt-20"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-10">
        <div className="max-w-2xl mb-8">
          <p className="text-[14px] font-bold text-[#2D6A4F] mb-1.5">
            Transparan &amp; Tanpa Biaya Tersembunyi
          </p>
          <h2
            id="paket-heading"
            className="text-[24px] sm:text-[32px] font-extrabold text-[#131E15] leading-[1.25] tracking-[-0.015em] text-balance"
          >
            Paket Wisata, Homestay &amp; Daftar Harga
          </h2>
          <p className="text-[15px] sm:text-[16px] leading-[1.6] text-[#414844] mt-2">
            Pilih paket yang sesuai dengan rencana liburan Anda. Pemesanan rombongan minimal 10
            orang otomatis mendapatkan potongan harga 10%.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Package Cards Column */}
          <div className="lg:col-span-7 space-y-5">
            {TOUR_PACKAGES.map((pkg) => {
              const isSelected = pkg.id === selectedPackage.id;
              return (
                <article
                  key={pkg.id}
                  className={`bg-white rounded-2xl overflow-hidden transition-all ${
                    isSelected
                      ? 'border-2 border-[#1B4332] shadow-[0_6px_20px_-2px_rgba(27,67,50,0.14)]'
                      : 'border border-[#1B4332]/12 shadow-[0_2px_8px_rgba(60,50,40,0.04)]'
                  }`}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-12">
                    <div className="sm:col-span-5 aspect-[16/10] sm:aspect-auto sm:h-full bg-[#E9F7E8]">
                      <ResilientImage
                        src={pkg.image}
                        alt={pkg.imageAlt}
                        fallbackTitle={pkg.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="sm:col-span-7 p-5 sm:p-6 flex flex-col">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] font-semibold mb-1.5">
                        <span className="text-[#2D6A4F]">{pkg.duration}</span>
                        {pkg.popular && (
                          <>
                            <span className="text-[#717973]" aria-hidden="true">
                              ·
                            </span>
                            <span className="text-[#9A442D]">Paling Diminati</span>
                          </>
                        )}
                      </div>

                      <h3 className="text-[20px] sm:text-[22px] font-bold text-[#131E15] leading-[1.3] mb-1.5">
                        {pkg.name}
                      </h3>

                      <p className="text-[14px] text-[#414844] mb-4">{pkg.tagline}</p>

                      <ul className="space-y-2 mb-5">
                        {pkg.includes.map((inc) => (
                          <li
                            key={inc}
                            className="flex items-start gap-2 text-[14px] sm:text-[15px] text-[#263228] leading-[1.45]"
                          >
                            <Check
                              className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-1"
                              aria-hidden="true"
                            />
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-auto pt-4 border-t border-[#1B4332]/10 flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="text-[12px] font-medium text-[#414844]">
                            Minimal {pkg.minGuests} orang
                          </p>
                          <p className="text-[22px] font-extrabold text-[#1B4332] tabular-nums">
                            {formatRupiah(pkg.pricePerPerson)}
                            <span className="text-[13px] font-normal text-[#414844]"> / orang</span>
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            onSelectPackage(pkg);
                            const formEl = document.getElementById('pemesanan');
                            if (window.innerWidth < 1024 && formEl) {
                              formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                          }}
                          aria-pressed={isSelected}
                          className={`min-h-[48px] px-5 py-2.5 text-[15px] font-bold rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                            isSelected
                              ? 'bg-[#2D6A4F] text-white'
                              : 'bg-[#E9F7E8] hover:bg-[#1B4332] text-[#1B4332] hover:text-white'
                          }`}
                        >
                          {isSelected ? 'Paket Dipilih' : 'Pilih Paket Ini'}
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Sticky Booking & WhatsApp Calculator Column */}
          <div id="pemesanan" className="lg:col-span-5 lg:sticky lg:top-20 scroll-mt-20">
            <form
              onSubmit={handleSubmit}
              noValidate
              aria-labelledby="booking-form-heading"
              className="bg-white rounded-2xl border border-[#1B4332]/15 shadow-[0_6px_16px_-2px_rgba(45,106,79,0.1)] p-5 sm:p-6"
            >
              <div className="pb-4 mb-5 border-b border-[#1B4332]/10">
                <p className="text-[13px] font-bold text-[#2D6A4F] mb-1">
                  Formulir Pesan Cepat
                </p>
                <h3
                  id="booking-form-heading"
                  className="text-[20px] sm:text-[22px] font-extrabold text-[#131E15]"
                >
                  Hitung Biaya &amp; Pesan WhatsApp
                </h3>
              </div>

              {/* Selected Package Selector */}
              <div className="mb-4">
                <label
                  htmlFor="booking-package-select"
                  className="block text-[14px] font-bold text-[#131E15] mb-1.5"
                >
                  Paket yang Dipilih
                </label>
                <select
                  id="booking-package-select"
                  value={selectedPackage.id}
                  onChange={(e) => {
                    const found = TOUR_PACKAGES.find((p) => p.id === e.target.value);
                    if (found) onSelectPackage(found);
                  }}
                  className="w-full min-h-[48px] px-3.5 py-2.5 bg-[#FAFAF7] border-[1.5px] border-[#263228]/25 rounded-lg text-[15px] font-semibold text-[#131E15] focus:border-[#2D6A4F] focus:bg-white"
                >
                  {TOUR_PACKAGES.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.name} ({formatRupiah(pkg.pricePerPerson)}/org)
                    </option>
                  ))}
                </select>
              </div>

              {/* Visitor Name */}
              <div className="mb-4">
                <label
                  htmlFor="booking-visitor-name"
                  className="block text-[14px] font-bold text-[#131E15] mb-1.5"
                >
                  Nama Lengkap Anda
                </label>
                <input
                  id="booking-visitor-name"
                  type="text"
                  value={visitorName}
                  onChange={(e) => {
                    onChangeVisitorName(e.target.value);
                    if (errors.visitorName) setErrors((prev) => ({ ...prev, visitorName: '' }));
                  }}
                  placeholder="Contoh: Budi Santoso"
                  aria-invalid={Boolean(errors.visitorName)}
                  aria-describedby={errors.visitorName ? 'error-visitor-name' : undefined}
                  className="w-full min-h-[48px] px-3.5 py-2.5 bg-white border-[1.5px] border-[#263228]/25 rounded-lg text-[16px] text-[#131E15] placeholder:text-[#717973] focus:border-[#2D6A4F]"
                />
                {errors.visitorName && (
                  <p id="error-visitor-name" role="alert" className="mt-1.5 text-[13px] font-semibold text-[#BA1A1A]">
                    {errors.visitorName}
                  </p>
                )}
              </div>

              {/* Guest Stepper + Visit Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <span
                    id="guest-count-label"
                    className="block text-[14px] font-bold text-[#131E15] mb-1.5"
                  >
                    Jumlah Peserta
                  </span>
                  <div
                    role="group"
                    aria-labelledby="guest-count-label"
                    className="flex items-center justify-between min-h-[48px] px-1.5 bg-[#FAFAF7] border-[1.5px] border-[#263228]/25 rounded-lg"
                  >
                    <button
                      type="button"
                      onClick={() => onChangeGuests(Math.max(1, guests - 1))}
                      aria-label="Kurangi jumlah peserta"
                      className="min-h-[42px] min-w-[42px] flex items-center justify-center rounded-md bg-white border border-[#1B4332]/15 text-[#1B4332] hover:bg-[#E9F7E8] cursor-pointer"
                    >
                      <Minus className="w-5 h-5" aria-hidden="true" />
                    </button>

                    <span
                      data-testid="guest-count-value"
                      className="inline-flex items-center gap-1.5 text-[16px] font-extrabold text-[#131E15] tabular-nums"
                    >
                      <Users className="w-4 h-4 text-[#2D6A4F]" aria-hidden="true" />
                      {guests} org
                    </span>

                    <button
                      type="button"
                      onClick={() => onChangeGuests(Math.min(100, guests + 1))}
                      aria-label="Tambah jumlah peserta"
                      className="min-h-[42px] min-w-[42px] flex items-center justify-center rounded-md bg-white border border-[#1B4332]/15 text-[#1B4332] hover:bg-[#E9F7E8] cursor-pointer"
                    >
                      <Plus className="w-5 h-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="booking-visit-date"
                    className="block text-[14px] font-bold text-[#131E15] mb-1.5"
                  >
                    Tanggal Kunjungan
                  </label>
                  <div className="relative">
                    <input
                      id="booking-visit-date"
                      type="date"
                      value={visitDate}
                      onChange={(e) => {
                        onChangeVisitDate(e.target.value);
                        if (errors.visitDate) setErrors((prev) => ({ ...prev, visitDate: '' }));
                      }}
                      aria-invalid={Boolean(errors.visitDate)}
                      aria-describedby={errors.visitDate ? 'error-visit-date' : undefined}
                      className="w-full min-h-[48px] px-3.5 py-2.5 bg-white border-[1.5px] border-[#263228]/25 rounded-lg text-[15px] text-[#131E15] focus:border-[#2D6A4F]"
                    />
                  </div>
                  {errors.visitDate && (
                    <p id="error-visit-date" role="alert" className="mt-1.5 text-[13px] font-semibold text-[#BA1A1A]">
                      {errors.visitDate}
                    </p>
                  )}
                </div>
              </div>

              {/* Optional Notes */}
              <div className="mb-5">
                <label
                  htmlFor="booking-notes"
                  className="block text-[14px] font-bold text-[#131E15] mb-1.5"
                >
                  Catatan Tambahan (Opsional)
                </label>
                <textarea
                  id="booking-notes"
                  rows={2}
                  value={notes}
                  onChange={(e) => onChangeNotes(e.target.value)}
                  placeholder="Misal: bawa lansia, minta menu tidak pedas, atau butuh penjemputan"
                  className="w-full px-3.5 py-2.5 bg-white border-[1.5px] border-[#263228]/25 rounded-lg text-[15px] text-[#131E15] placeholder:text-[#717973] focus:border-[#2D6A4F]"
                />
              </div>

              {/* Live Price Summary */}
              <div className="bg-[#FAFAF7] rounded-xl p-4 border border-[#1B4332]/10 mb-5 space-y-2">
                <div className="flex items-center justify-between text-[14px] text-[#414844]">
                  <span>
                    {formatRupiah(pricing.unitPrice)} × {pricing.guests} orang
                  </span>
                  <span className="font-semibold text-[#131E15] tabular-nums">
                    {formatRupiah(pricing.subtotal)}
                  </span>
                </div>

                {pricing.discountAmount > 0 ? (
                  <div className="flex items-center justify-between text-[14px] font-semibold text-[#2D6A4F]">
                    <span>Diskon Rombongan (10%)</span>
                    <span className="tabular-nums">-{formatRupiah(pricing.discountAmount)}</span>
                  </div>
                ) : (
                  <p className="text-[12px] text-[#414844]">
                    Tambah hingga 10 orang untuk mendapatkan diskon rombongan 10%.
                  </p>
                )}

                <div className="pt-2.5 border-t border-[#1B4332]/10 flex items-baseline justify-between">
                  <span className="text-[15px] font-bold text-[#131E15]">Estimasi Total</span>
                  <span
                    data-testid="booking-total-price"
                    className="text-[22px] font-extrabold text-[#1B4332] tabular-nums"
                  >
                    {formatRupiah(pricing.total)}
                  </span>
                </div>
              </div>

              {/* Dedicated WhatsApp Green CTA */}
              <button
                type="submit"
                className="w-full min-h-[54px] px-6 py-3 bg-[#25D366] hover:bg-[#1FA855] text-[#052E16] text-[16px] font-extrabold rounded-full shadow-[0_4px_14px_rgba(37,211,102,0.28)] flex items-center justify-center gap-2.5 transition-colors cursor-pointer"
              >
                <WhatsAppIcon className="w-6 h-6 shrink-0" />
                <span>Pesan via WhatsApp</span>
              </button>

              <p className="text-[13px] text-center text-[#414844] mt-3">
                Langsung terhubung ke Admin Pokdarwis Desa · Respon cepat 07.00–21.00 WIB
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* WhatsApp Order Confirmation Sheet / Modal */}
      {showConfirmModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="wa-confirm-title"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#131E15]/65 backdrop-blur-xs p-0 sm:p-4"
          onClick={() => setShowConfirmModal(false)}
        >
          <div
            className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl p-5 sm:p-7 shadow-2xl border border-[#1B4332]/10 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#E9F7E8] text-[#1B4332] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 id="wa-confirm-title" className="text-[20px] font-extrabold text-[#131E15]">
                    Pesan WhatsApp Siap Dikirim
                  </h3>
                  <p className="text-[14px] text-[#414844]">
                    Periksa kembali rincian rencana kunjungan Anda di bawah ini.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                aria-label="Tutup jendela konfirmasi"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-[#FAFAF7] text-[#414844] cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="bg-[#FAFAF7] rounded-xl p-4 border border-[#1B4332]/10 mb-4 space-y-1.5 text-[14px]">
              <p>
                <span className="text-[#414844]">Pemesan:</span>{' '}
                <strong className="text-[#131E15]">{visitorName}</strong>
              </p>
              <p>
                <span className="text-[#414844]">Paket:</span>{' '}
                <strong className="text-[#131E15]">{selectedPackage.name}</strong>
              </p>
              <p className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#2D6A4F]" aria-hidden="true" />
                <span className="text-[#414844]">Tanggal:</span>{' '}
                <strong className="text-[#131E15]">{formatIndonesianDate(visitDate)}</strong>
              </p>
              <p>
                <span className="text-[#414844]">Total Estimasi:</span>{' '}
                <strong className="text-[#1B4332] tabular-nums">{formatRupiah(pricing.total)}</strong>{' '}
                ({pricing.guests} orang)
              </p>
            </div>

            <div className="mb-5">
              <p className="text-[13px] font-bold text-[#414844] mb-1.5">Pratinjau Pesan:</p>
              <pre className="whitespace-pre-wrap font-sans text-[13px] leading-[1.5] text-[#263228] bg-[#EFFDEE] p-3.5 rounded-xl border border-[#1B4332]/10">
                {messageText}
              </pre>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-h-[52px] px-5 py-3 bg-[#25D366] hover:bg-[#1FA855] text-[#052E16] text-[15px] font-extrabold rounded-full flex items-center justify-center gap-2 transition-colors"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>Buka Chat WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={handleCopyMessage}
                className="min-h-[52px] px-5 py-3 bg-[#FAFAF7] hover:bg-[#E9F7E8] border border-[#1B4332]/20 text-[#1B4332] text-[15px] font-bold rounded-full flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Copy className="w-4 h-4" aria-hidden="true" />
                <span>{copiedMessage ? 'Tersalin!' : 'Salin Pesan'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
