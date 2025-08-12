// Studio Pickens Constants

export const CONTACT_INFO = {
  phone: '+1 (555) 123-4567',
  email: 'hello@studiopickens.com',
  address: {
    brooklyn: {
      street: '123 Creative Ave',
      city: 'Brooklyn',
      state: 'NY',
      zip: '11201'
    },
    beverly_hills: {
      street: '456 Studio Blvd',
      city: 'Beverly Hills',
      state: 'CA', 
      zip: '90210'
    },
    london: {
      street: '789 Design St',
      city: 'London',
      country: 'UK',
      postcode: 'SW1A 1AA'
    }
  }
};

export const NAVIGATION_LINKS = {
  left: [
    { name: 'WORK', href: '/work' },
    { name: 'PROCESS', href: '/process' },
    { name: 'STORY', href: '/story' }
  ],
  right: [
    { name: 'LOCATIONS', href: '/locations' },
    { name: 'CONTACT', href: '/contact' },
    { name: 'FAQ', href: '/faq' }
  ],
  // All links combined for footer use
  all: [
    { name: 'WORK', href: '/work' },
    { name: 'PROCESS', href: '/process' },
    { name: 'STORY', href: '/story' },
    { name: 'CONTACT', href: '/contact' },
    { name: 'FAQ', href: '/faq' }
  ],
  // Desktop footer links (updated layout)
  desktop: [
    { name: 'WORK', href: '/work' },
    { name: 'PROCESS', href: '/process' },
    { name: 'STORY', href: '/story' },
    { name: 'CONTACT', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
    { name: 'INSTAGRAM', href: 'https://www.instagram.com/studio_pickens/', external: true }
  ]
};

export const HERO_IMAGES = [
  `${process.env.PUBLIC_URL}/images/hero/background1.jpg`,
  `${process.env.PUBLIC_URL}/images/hero/background2.jpg`
];

export const POLAROID_IMAGES = [
  `${process.env.PUBLIC_URL}/images/polaroids/polaroid1.png`,
  `${process.env.PUBLIC_URL}/images/polaroids/polaroid2.png`, 
  `${process.env.PUBLIC_URL}/images/polaroids/polaroid3.png`
];

export const LOGO_IMAGES = {
  default: `${process.env.PUBLIC_URL}/images/hero/Studio Pickens Logo.png`,
  white: `${process.env.PUBLIC_URL}/images/hero/Studio Pickens Logo - white.png`
};

export const RESPONSIVE_BREAKPOINTS = {
  mobile: '640px',
  tablet: '768px', 
  desktop: '1024px',
  xl: '1280px'
};

export const WORK_PROJECTS = [
  {
    id: 1,
    src: `${process.env.PUBLIC_URL}/images/work/the-killer.jpg`,
    alt: 'The Killer',
    left: 132,
    top: 0,
    category: 'EDITORIAL',
    side: 'left',
    title: 'The Killer',
    content: {
      stylist: 'Emmie America',
      photographer: 'jane smith',
      date: '2024',
      labels: {
        stylist: 'PHOTOGRAPHER',
        photographer: 'STYLIST',
        date: 'DATE'
      }
    }
  },
  {
    id: 2,
    src: `${process.env.PUBLIC_URL}/images/work/concert.jpg`,
    alt: 'Concert photo',
    left: 396,
    top: 400,
    category: 'CONCERT',
    side: 'center',
    content: {
      stylist: 'madison avenue',
      photographer: 'taylor swift',
      date: 'eras tour',
      labels: {
        stylist: 'HAIR DESIGNER',
        photographer: 'ARTIST',
        date: 'TOUR'
      }
    }
  },
  {
    id: 3,
    src: `${process.env.PUBLIC_URL}/images/work/filmandtv.jpg`,
    alt: 'Never Have I Ever',
    left: 625,
    top: 800,
    category: 'FILM & TV',
    side: 'right',
    title: 'Never Have I Ever',
    content: {
      stylist: 'Mindy Kaling',
      photographer: 'jame smith',
      date: 'netflix',
      labels: {
        stylist: 'DIRECTOR',
        photographer: 'STYLIST',
        date: 'DATE'
      }
    }
  },
  {
    id: 4,
    src: `${process.env.PUBLIC_URL}/images/work/editorial2.png`,
    alt: 'Allure',
    left: 132,
    top: 1200,
    category: 'EDITORIAL',
    side: 'left',
    title: 'Allure',
    content: {
      stylist: 'Tom Schirmacher',
      photographer: 'Adir Abergel',
      date: '2023',
      labels: {
        stylist: 'PHOTOGRAPHER',
        photographer: 'STYLIST',
        date: 'DATE'
      }
    }
  },
  {
    id: 5,
    src: `${process.env.PUBLIC_URL}/images/work/theatre.png`,
    alt: 'Here We Are',
    left: 625,
    top: 1600,
    category: 'THEATRE',
    side: 'right',
    title: 'Here We Are',
    content: {
      stylist: 'Emilio Madrid',
      photographer: 'jane smith',
      date: '2023',
      labels: {
        stylist: 'DIRECTOR/PHOTOGRAPHER',
        photographer: 'STYLIST',
        date: 'DATE'
      }
    }
  },
  {
    id: 6,
    src: `${process.env.PUBLIC_URL}/images/work/Billie Eilish.webp`,
    alt: 'Music video photo',
    left: 396,
    top: 2000,
    category: 'MUSIC VIDEO',
    side: 'center',
    content: {
      stylist: 'ariana grande',
      photographer: 'michael torres',
      date: 'positions',
      labels: {
        stylist: 'ARTIST',
        photographer: 'HAIR DESIGNER',
        date: 'MUSIC VIDEO'
      }
    }
  },
  {
    id: 7,
    src: `${process.env.PUBLIC_URL}/images/work/filmandtv2.png`,
    alt: 'Mank',
    left: 132,
    top: 2400,
    category: 'FILM & TV',
    side: 'left',
    title: 'Mank',
    content: {
      stylist: 'David Fincher',
      photographer: 'andrew jacobs',
      date: '2020',
      labels: {
        stylist: 'DIRECTOR',
        photographer: 'STYLIST',
        date: 'DATE'
      }
    }
  },
  {
    id: 8,
    src: `${process.env.PUBLIC_URL}/images/work/editorial3.jpg`,
    alt: 'Editorial photo 3',
    left: 396,
    top: 3200,
    category: 'EDITORIAL',
    side: 'center',
    content: {
      stylist: 'margot robbie',
      photographer: 'kevin garcia',
      date: 'elle magazine',
      labels: {
        stylist: 'ACTRESS',
        photographer: 'HAIR DESIGNER',
        date: 'PUBLICATION'
      }
    }
  },
  {
    id: 9,
    src: `${process.env.PUBLIC_URL}/images/work/live.jpg`,
    alt: 'Coachella',
    left: 625,
    top: 2800,
    category: 'LIVE',
    side: 'right',
    title: 'Coachella',
    content: {
      stylist: 'jane smith',
      photographer: 'valerie macon',
      date: '2024',
      labels: {
        stylist: 'STYLIST',
        photographer: 'DIRECTOR/PHOTOGRAPHER',
        date: 'DATE'
      }
    }
  }
];