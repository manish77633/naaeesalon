export const image = (name) => `/images/${name.includes('.') ? name : `${name}.jpg`}`;

export const serviceCards = [
  { title: 'Hair Services', detail: 'Haircut · Hair Styling', image: 'woman-02', href: '/services/hair' },
  { title: 'Nail Services', detail: 'Manicure · Pedicure', image: 'beauty-01', href: '/services/nails' },
  { title: 'Beauty Services', detail: 'Personalized beauty care', image: 'makeup-02', href: '/services/beauty' },
];

const page = (title, subtitle, description, hero, items, featureImage) => ({
  eyebrow: title, title, subtitle, description, hero, heroPosition: 'center',
  sectionLabel: `Our ${title.toLowerCase()}`, sectionTitle: title,
  items, featureImage, featureEyebrow: 'NAAEE SALON', featureTitle: 'Care\nThat Feels Personal',
  featureCopy: 'Choose the service that suits your visit and speak with NAAEE SALON for current availability.',
  featureButton: 'Book an Appointment',
});

export const servicePages = {
  hair: page('HAIR SERVICES', 'Haircut and styling for your visit.', 'Hair services including haircut and hair styling.', 'woman-02', [
    { title: 'Haircut', detail: 'Hair Services', image: 'man-03' },
    { title: 'Hair Styling', detail: 'Hair Services', image: 'woman-02' },
  ], 'hair-02'),
  nails: page('NAIL SERVICES', 'Manicure and pedicure care.', 'Nail services including manicure and pedicure.', 'beauty-01', [
    { title: 'Manicure', detail: 'Nail Services', image: 'beauty-01' },
    { title: 'Pedicure', detail: 'Nail Services', image: 'beauty-02' },
  ], 'beauty-03'),
  beauty: page('BEAUTY SERVICES', 'Thoughtful beauty care for every visit.', 'Beauty services for your personal care routine.', 'makeup-02', [
    { title: 'Beauty Services', detail: 'Personalized beauty care', image: 'makeup-02' },
  ], 'beauty-01'),
};

export const galleryItems = [
  { image: 'beauty-01.jpg', category: 'Beauty', alt: 'Beauty salon placeholder image' },
  { image: 'beauty-02.jpg', category: 'Nails', alt: 'Nail salon placeholder image' },
  { image: 'beauty-03.jpg', category: 'Beauty', alt: 'Beauty care placeholder image' },
  { image: 'woman-02.jpg', category: 'Hair', alt: 'Hair styling placeholder image' },
  { image: 'hair-02.jpg', category: 'Hair', alt: 'Hair services placeholder image' },
  { image: 'makeup-02.jpg', category: 'Beauty', alt: 'Beauty services placeholder image' },
];
