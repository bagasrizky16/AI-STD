import { useState } from 'react';
import { TOUR_PACKAGES, TourPackage } from './data/villageData';
import { calculatePackageTotal } from './utils/booking';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { DestinationsSection } from './components/DestinationsSection';
import { PackagesAndBookingSection } from './components/PackagesAndBookingSection';
import { GallerySection } from './components/GallerySection';
import { LocationMapSection } from './components/LocationMapSection';
import { CommunityHostsSection } from './components/CommunityHostsSection';
import { MobileStickyBar } from './components/MobileStickyBar';
import { Footer } from './components/Footer';

export default function App() {
  const defaultPackage = TOUR_PACKAGES[1] ?? TOUR_PACKAGES[0];
  const [selectedPackage, setSelectedPackage] = useState<TourPackage>(defaultPackage);
  const [guests, setGuests] = useState<number>(2);
  const [visitorName, setVisitorName] = useState<string>('');
  const [visitDate, setVisitDate] = useState<string>('2026-12-20');
  const [notes, setNotes] = useState<string>('');

  const pricing = calculatePackageTotal(selectedPackage.pricePerPerson, guests);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectBookingFromDestination = (destinationName: string) => {
    setNotes((prev) =>
      prev.trim().length > 0 ? prev : `Tertarik mengunjungi ${destinationName}`
    );
    scrollToSection('pemesanan');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF7] text-[#263228]">
      <a
        href="#konten-utama"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#1B4332] focus:text-white focus:rounded-lg focus:font-bold"
      >
        Lewati ke konten utama
      </a>

      <Navbar onQuickBook={() => scrollToSection('pemesanan')} />

      <main id="konten-utama" className="flex-1">
        <HeroSection onExplorePackages={() => scrollToSection('paket')} />

        <DestinationsSection
          onSelectBookingFromDestination={handleSelectBookingFromDestination}
        />

        <PackagesAndBookingSection
          selectedPackage={selectedPackage}
          onSelectPackage={setSelectedPackage}
          guests={guests}
          onChangeGuests={setGuests}
          visitorName={visitorName}
          onChangeVisitorName={setVisitorName}
          visitDate={visitDate}
          onChangeVisitDate={setVisitDate}
          notes={notes}
          onChangeNotes={setNotes}
        />

        <GallerySection />

        <LocationMapSection />

        <CommunityHostsSection />
      </main>

      <Footer />

      <MobileStickyBar
        packageName={selectedPackage.name}
        totalPrice={pricing.total}
        guests={pricing.guests}
        onOrderClick={() => scrollToSection('pemesanan')}
      />
    </div>
  );
}
