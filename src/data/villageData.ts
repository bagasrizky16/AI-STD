export type DestinationCategory = 'Ekowisata' | 'Agro & Edukasi' | 'Budaya';
export type GalleryCategory = 'Alam' | 'Budaya' | 'Penginapan';

export interface Destination {
  id: string;
  name: string;
  category: DestinationCategory;
  shortDesc: string;
  fullDesc: string;
  openHours: string;
  statusLabel: string;
  ticketPrice: number;
  priceUnit: string;
  distanceFromGate: string;
  accessibilityNote: string;
  highlights: string[];
  image: string;
  imageAlt: string;
}

export interface TourPackage {
  id: string;
  name: string;
  tagline: string;
  duration: string;
  pricePerPerson: number;
  minGuests: number;
  popular?: boolean;
  includes: string[];
  suitableFor: string;
  image: string;
  imageAlt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  caption: string;
  location: string;
  image: string;
  imageAlt: string;
}

export interface MapLocation {
  id: string;
  name: string;
  category: string;
  x: number;
  y: number;
  elevation: string;
  walkTime: string;
  accessibility: string;
  description: string;
  facilities: string[];
}

export interface CommunityHost {
  id: string;
  name: string;
  role: string;
  experience: string;
  quote: string;
  initials: string;
}

export const WHATSAPP_NUMBER = '6281234567890';

export const VILLAGE_IMAGES = {
  hero: '/src/assets/images/hero_lereng_asri_1794886831053.jpg',
  curug: '/src/assets/images/destinasi_curug_pinus_1794886830715.jpg',
  kopi: '/src/assets/images/destinasi_kebun_kopi_1794886831400.jpg',
  homestay: '/src/assets/images/paket_homestay_joglo_1794886831714.jpg',
  budaya: '/src/assets/images/galeri_budaya_kuliner_1794886832275.jpg',
} as const;

export const DESTINATIONS: Destination[] = [
  {
    id: 'curug-pinus',
    name: 'Curug Lembah Pinus',
    category: 'Ekowisata',
    shortDesc: 'Air terjun jernih di tengah hutan pinus yang sejuk dengan jembatan bambu ramah keluarga.',
    fullDesc:
      'Curug Lembah Pinus menawarkan kesegaran mata air pegunungan alami dengan kolam dangkal yang aman untuk bermain air. Jalur menuju lokasi telah dilengkapi tangga batu landai dan pegangan bambu sehingga nyaman dilalui bersama keluarga.',
    openHours: '07.00 – 17.00 WIB',
    statusLabel: 'Buka Setiap Hari',
    ticketPrice: 25000,
    priceUnit: 'tiket masuk',
    distanceFromGate: '450 m (10 menit jalan santai)',
    accessibilityNote: 'Jalur paving & pegangan bambu, cocok untuk anak-anak',
    highlights: ['Kolam air jernih alami', 'Gazebo istirahat di tepi sungai', 'Spot foto jembatan bambu'],
    image: VILLAGE_IMAGES.curug,
    imageAlt: 'Air terjun Curug Lembah Pinus dengan jembatan bambu dan pepohonan pinus hijau',
  },
  {
    id: 'terasering-sunrise',
    name: 'Bukit Terasering & Gardu Pandang',
    category: 'Ekowisata',
    shortDesc: 'Panorama sawah berundak dengan kabut pagi dan latar gagah puncak Merbabu.',
    fullDesc:
      'Nikmati udara pagi pegunungan yang bersih dari gardu pandang kayu jati di ketinggian 1.180 mdpl. Pengunjung dapat menyaksikan matahari terbit menyinari hamparan terasering hijau sambil menyeruput teh jahe hangat dari warung warga.',
    openHours: '05.00 – 18.00 WIB',
    statusLabel: 'Buka Setiap Hari',
    ticketPrice: 20000,
    priceUnit: 'tiket masuk',
    distanceFromGate: '300 m (6 menit jalan kaki)',
    accessibilityNote: 'Akses jalan cor datar, sangat ramah lansia',
    highlights: ['Panorama matahari terbit', 'Gazebo kayu jati berteduh', 'Warung wedang tradisional'],
    image: VILLAGE_IMAGES.hero,
    imageAlt: 'Pemandangan matahari terbit di terasering hijau Desa Wisata Lereng Asri',
  },
  {
    id: 'kebun-kopi',
    name: 'Kebun Kopi Arabika & Agroedukasi',
    category: 'Agro & Edukasi',
    shortDesc: 'Pengalaman memetik ceri kopi merah langsung di kebun organik bersama petani lokal.',
    fullDesc:
      'Pelajari perjalanan biji kopi lereng vulkanik mulai dari pembibitan, panen ceri merah, hingga proses sangrai tradisional menggunakan wajan tanah liat. Cocok untuk kunjungan keluarga, komunitas, maupun rombongan edukasi sekolah.',
    openHours: '08.00 – 16.00 WIB',
    statusLabel: 'Panen Aktif',
    ticketPrice: 35000,
    priceUnit: 'termasuk seduh kopi',
    distanceFromGate: '650 m (tersedia antar-jemput mobil bak desa)',
    accessibilityNote: 'Tersedia shuttle desa bagi pengunjung lansia',
    highlights: ['Petik kopi & sayuran organik', 'Gratis 1 cangkir kopi tubruk', 'Edukasi kompos & tani lestari'],
    image: VILLAGE_IMAGES.kopi,
    imageAlt: 'Petani memetik buah kopi merah di kebun kopi lereng gunung berkabut',
  },
  {
    id: 'sanggar-budaya',
    name: 'Sanggar Anyaman & Dapur Ndeso',
    category: 'Budaya',
    shortDesc: 'Belajar menganyam kerajinan bambu bersama perajin desa dan mencicipi jajanan pasar hangat.',
    fullDesc:
      'Di pendopo sanggar warga, Ibu-ibu perajin menyambut hangat setiap tamu untuk mencoba menganyam besek bambu sederhana dan mencicipi getuk, klepon, serta wedang serai yang disajikan di atas daun pisang segar.',
    openHours: '09.00 – 16.30 WIB',
    statusLabel: 'Buka Setiap Hari',
    ticketPrice: 30000,
    priceUnit: 'termasuk kudapan',
    distanceFromGate: '150 m (3 menit dari parkir)',
    accessibilityNote: 'Area pendopo datar tanpa tangga tinggi, ramah kursi roda',
    highlights: ['Workshop anyaman bambu bawa pulang', 'Jajanan tradisional daun pisang', 'Interaksi hangat dengan warga'],
    image: VILLAGE_IMAGES.budaya,
    imageAlt: 'Perajin desa menganyam bambu ditemani sajian kue tradisional di atas daun pisang',
  },
];

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: 'paket-jelajah-sehari',
    name: 'Paket Jelajah Alam Sehari',
    tagline: 'Ringkas & menyegarkan untuk akhir pekan',
    duration: '1 Hari (08.00 – 15.00 WIB)',
    pricePerPerson: 85000,
    minGuests: 2,
    includes: [
      'Tiket masuk Terasering & Curug Lembah Pinus',
      'Pemandu wisata warga lokal',
      '1x Makan siang nasi liwet lauk ndeso',
      'Wedang jahe & gorengan hangat',
    ],
    suitableFor: 'Pasangan, sahabat, dan keluarga kecil',
    image: VILLAGE_IMAGES.curug,
    imageAlt: 'Suasana sejuk air terjun Curug Lembah Pinus untuk paket jelajah alam sehari',
  },
  {
    id: 'paket-keluarga-agro',
    name: 'Paket Keluarga Agro & Budaya',
    tagline: 'Paling diminati wisatawan keluarga & rombongan',
    duration: 'Sehari Penuh (07.30 – 16.30 WIB)',
    pricePerPerson: 150000,
    minGuests: 2,
    popular: true,
    includes: [
      'Semua akses destinasi Curug, Terasering & Kebun Kopi',
      'Workshop petik kopi & anyaman bambu bawa pulang',
      'Makan siang prasmanan khas desa + jajanan pasar',
      'Antar-jemput kendaraan wisata internal desa',
    ],
    suitableFor: 'Keluarga besar, acara kantor, & study tour',
    image: VILLAGE_IMAGES.kopi,
    imageAlt: 'Aktivitas petik kopi organik dan wisata edukasi keluarga di Lereng Asri',
  },
  {
    id: 'paket-homestay-joglo',
    name: 'Paket Menginap Homestay Joglo 2H1M',
    tagline: 'Tidur nyenyak di rumah kayu jati & bangun disambut kabut pagi',
    duration: '2 Hari 1 Malam',
    pricePerPerson: 320000,
    minGuests: 2,
    includes: [
      '1 Malam menginap di Homestay Joglo Kayu (air hangat & Wi-Fi)',
      '3x Makan masakan rumah warga (malam, sarapan, siang)',
      'Tur matahari terbit di Bukit Terasering & Kebun Kopi',
      'Workshop membatik/anyaman & api unggun malam desa',
    ],
    suitableFor: 'Liburan tenang, healing akhir pekan, & tamu luar kota',
    image: VILLAGE_IMAGES.homestay,
    imageAlt: 'Beranda Homestay Joglo kayu jati menghadap terasering sawah berkabut',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Matahari Terbit di Lembah Terasering',
    category: 'Alam',
    caption: 'Cahaya pagi menyinari hamparan sawah bertingkat dan pendopo kayu di ketinggian 1.150 mdpl.',
    location: 'Bukit Terasering Lereng Asri',
    image: VILLAGE_IMAGES.hero,
    imageAlt: 'Panorama matahari terbit di atas terasering sawah hijau dan rumah desa',
  },
  {
    id: 'gal-2',
    title: 'Menyeberangi Jembatan Bambu Curug',
    category: 'Alam',
    caption: 'Suara gemericik air terjun dan teduhnya tajuk pinus menjaga suhu udara tetap sejuk 19–23°C.',
    location: 'Curug Lembah Pinus',
    image: VILLAGE_IMAGES.curug,
    imageAlt: 'Pengunjung berjalan di jembatan bambu di depan air terjun hutan pinus',
  },
  {
    id: 'gal-3',
    title: 'Panen Ceri Kopi Arabika Merah',
    category: 'Alam',
    caption: 'Petani desa memilih buah kopi matang sempurna secara manual untuk menjaga cita rasa alami.',
    location: 'Blok Kebun Kopi Timur',
    image: VILLAGE_IMAGES.kopi,
    imageAlt: 'Keranjang bambu berisi buah kopi merah hasil panen petani lokal',
  },
  {
    id: 'gal-4',
    title: 'Pagi Hangat di Beranda Joglo',
    category: 'Penginapan',
    caption: 'Secangkir teh melati hangat dinikmati dari kursi rotan sambil memandang kabut sawah turun perlahan.',
    location: 'Homestay Joglo Asri',
    image: VILLAGE_IMAGES.homestay,
    imageAlt: 'Dua cangkir teh hangat di beranda rumah kayu tradisional menghadap sawah',
  },
  {
    id: 'gal-5',
    title: 'Anyaman Bambu & Jajanan Daun Pisang',
    category: 'Budaya',
    caption: 'Keramahan tuan rumah sanggar budaya menyambut wisatawan dengan kudapan pasar buatan pagi hari.',
    location: 'Sanggar Warga Dusun Krajan',
    image: VILLAGE_IMAGES.budaya,
    imageAlt: 'Ibu perajin menganyam bambu bersama tamu dengan hidangan kue tradisional',
  },
];

export const MAP_LOCATIONS: MapLocation[] = [
  {
    id: 'gerbang-parkir',
    name: 'Gerbang Utama & Pusat Informasi',
    category: 'Titik Kedatangan',
    x: 20,
    y: 78,
    elevation: '1.080 mdpl',
    walkTime: 'Titik 0 (Area Parkir Luas)',
    accessibility: 'Akses aspal mulus untuk mobil pribadi & bus medium',
    description:
      'Loket penyambutan resmi, area parkir bus & mobil pribadi, mushola bersih, toilet ramah lansia, serta pos pemandu wisata.',
    facilities: ['Parkir 40+ Mobil & Bus', 'Mushola & Toilet Bersih', 'Pos Pemandu Wisata'],
  },
  {
    id: 'sanggar-budaya',
    name: 'Sanggar Anyaman & Dapur Ndeso',
    category: 'Budaya & Kuliner',
    x: 38,
    y: 64,
    elevation: '1.100 mdpl',
    walkTime: '3 menit jalan santai dari Gerbang',
    accessibility: 'Jalur datar ramah kursi roda & stroller',
    description:
      'Pendopo utama tempat mencicipi hidangan tradisional, kelas singkat anyaman bambu, serta pusat oleh-oleh produk UMKM desa.',
    facilities: ['Pendopo Makan Utama', 'Pusat Oleh-oleh UMKM', 'Area Istirahat Teduh'],
  },
  {
    id: 'homestay-joglo',
    name: 'Kawasan Homestay Joglo Asri',
    category: 'Penginapan Warga',
    x: 52,
    y: 44,
    elevation: '1.140 mdpl',
    walkTime: '6 menit dari Gerbang',
    accessibility: 'Akses kendaraan roda empat langsung ke teras homestay',
    description:
      'Gugusan 8 unit rumah kayu Joglo milik warga yang ditata bersih dan nyaman, dilengkapi air hangat, selimut tebal, dan teras menghadap sawah.',
    facilities: ['Kamar Mandi Air Hangat', 'Sarapan Masakan Warga', 'Wi-Fi Area Pendopo'],
  },
  {
    id: 'terasering-sunrise',
    name: 'Bukit Terasering & Gardu Pandang',
    category: 'Panorama Alam',
    x: 74,
    y: 34,
    elevation: '1.185 mdpl',
    walkTime: '8 menit jalan kaki santai',
    accessibility: 'Tangga landai berpegangan kayu & bangku istirahat tiap 50 m',
    description:
      'Titik pandang tertinggi di desa dengan panorama sawah berundak 180 derajat dan pemandangan puncak Merbabu saat cuaca cerah.',
    facilities: ['Gardu Pandang Jati', 'Warung Teh & Gorengan', 'Bangku Istirahat'],
  },
  {
    id: 'curug-pinus',
    name: 'Curug Lembah Pinus & Kebun Kopi',
    category: 'Ekowisata & Agro',
    x: 78,
    y: 72,
    elevation: '1.120 mdpl',
    walkTime: '10 menit lewat jalur paving teduh',
    accessibility: 'Jalur batu tertata rapi & tersedia shuttle desa untuk lansia',
    description:
      'Kawasan hutan pinus sejuk dengan aliran air terjun berundak serta blok kebun kopi arabika organik tempat wisata petik buah.',
    facilities: ['Ruang Bilas & Ganti', 'Gazebo Tepi Sungai', 'Saung Seduh Kopi'],
  },
];

export const COMMUNITY_HOSTS: CommunityHost[] = [
  {
    id: 'host-sutrisno',
    name: 'Pak Sutrisno',
    role: 'Ketua Pokdarwis & Pemandu Alam',
    experience: '12 tahun memandu jalur lereng',
    quote: 'Kami menjaga jalur curug tetap bersih dan aman supaya anak kecil hingga kakek-nenek bisa menikmati segarnya alam desa.',
    initials: 'PS',
  },
  {
    id: 'host-hartini',
    name: 'Ibu Hartini',
    role: 'Koordinator Homestay & Dapur Ndeso',
    experience: 'Tuan rumah 8 unit Joglo warga',
    quote: 'Setiap tamu kami sambut seperti saudara pulang kampung—selalu ada teh hangat dan masakan segar dari kebun sendiri.',
    initials: 'IH',
  },
  {
    id: 'host-bagas',
    name: 'Mas Bagas',
    role: 'Petani Muda Kebun Kopi Organik',
    experience: 'Penggerak agroedukasi lereng',
    quote: 'Dari kebun ini pengunjung bisa melihat langsung bagaimana kopi arabika dirawat tanpa bahan kimia keras.',
    initials: 'MB',
  },
];
