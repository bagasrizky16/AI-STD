import { formatRupiah } from '../utils/booking';
import { WhatsAppIcon } from './WhatsAppIcon';

interface MobileStickyBarProps {
  packageName: string;
  totalPrice: number;
  guests: number;
  onOrderClick: () => void;
}

export function MobileStickyBar({
  packageName,
  totalPrice,
  guests,
  onOrderClick,
}: MobileStickyBarProps) {
  return (
    <div
      role="region"
      aria-label="Pemesanan Cepat WhatsApp"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 h-[68px] bg-white/95 backdrop-blur-md border-t border-[#1B4332]/15 shadow-[0_-4px_20px_rgba(27,67,50,0.12)] px-4 flex items-center justify-between gap-3"
    >
      <div className="min-w-0">
        <p className="text-[12px] font-medium text-[#414844] truncate">
          {packageName} ({guests} org)
        </p>
        <p className="text-[18px] font-extrabold text-[#131E15] leading-tight tabular-nums">
          {formatRupiah(totalPrice)}
        </p>
      </div>

      <button
        type="button"
        onClick={onOrderClick}
        className="min-h-[48px] px-5 py-2.5 bg-[#25D366] hover:bg-[#1FA855] text-[#052E16] text-[15px] font-extrabold rounded-full shadow-sm flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
      >
        <WhatsAppIcon className="w-5 h-5 shrink-0" />
        <span>Pesan WhatsApp</span>
      </button>
    </div>
  );
}
