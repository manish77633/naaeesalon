export const image = (name) => `/images/${name.includes('.') ? name : `${name}.jpg`}`;

export const serviceCards = [
  { title: 'Hair', detail: 'Cut · Style · Color', image: 'woman-02', href: '/services/hair' },
  { title: 'Beauty', detail: 'Facials · Cleanses · Care', image: 'beauty-01', href: '/services/beauty' },
  { title: 'Makeup', detail: 'Party · Bridal · HD', image: 'makeup-02', href: '/services/makeup' },
  { title: 'Bridal', detail: 'Bridal Makeup · Hair · Look', image: 'bridal-portrait', href: '/services/bridal' },
  { title: "Men's Grooming", detail: 'Haircut · Beard · Styling', image: 'man-03', href: '/services/mens-grooming' },
  { title: 'Hair Treatments', detail: 'Repair · Nourish · Grow', image: 'beauty-03', href: '/services/hair' },
];

export const servicePages = {
  hair: {
    eyebrow: 'HAIR SERVICES', title: 'HAIR SERVICES', subtitle: 'Healthy Hair. Confident You.',
    description: 'From precision cuts to expert treatments, our hair services are designed to help you look and feel your best.',
    hero: 'man-01', heroPosition: '75% 35%', sectionLabel: 'Our hair services', sectionTitle: 'Our Hair Services',
    items: [
      { title: 'Hair Cut', detail: 'Fresh Look', image: 'man-03' },
      { title: 'Hair Styling', detail: 'For Every Occasion', image: 'woman-02' },
      { title: 'Hair Color', detail: 'Express Yourself', image: 'hair-02' },
      { title: 'Hair Treatment', detail: 'Stronger & Healthier', image: 'beauty-03' },
    ],
    featureImage: 'man-03', featureEyebrow: 'THE ART OF HAIR', featureTitle: 'Style\nThat Suits You',
    featureCopy: 'Whether it is a quick trim or a complete transformation, our experts are here to create the perfect look for you.',
    featureButton: 'Explore Hair Services',
  },
  beauty: {
    eyebrow: 'BEAUTY SERVICES', title: 'BEAUTY SERVICES', subtitle: 'Healthy Skin. Natural Glow.',
    description: 'Personalized care for your skin, your preferences, and your everyday confidence.',
    hero: 'salon-warm', heroPosition: 'center', sectionLabel: 'Our beauty services', sectionTitle: 'Our Beauty Services',
    items: [
      { title: 'Facials', detail: 'Glow & Renew', image: 'beauty-01' },
      { title: 'Cleanup', detail: 'Fresh & Refined', image: 'beauty-02' },
      { title: 'Skin Care', detail: 'Everyday Radiance', image: 'woman-02' },
      { title: 'Beauty Treatments', detail: 'Care Just for You', image: 'beauty-03' },
    ],
    featureImage: 'beauty-01', featureEyebrow: 'A MOMENT FOR YOU', featureTitle: 'Natural Beauty.\nLasting Confidence',
    featureCopy: 'Our beauty treatments are designed to bring out your natural glow and help you feel your best.',
    featureButton: 'Explore Beauty Services',
  },
  makeup: {
    eyebrow: 'MAKEUP SERVICES', title: 'MAKEUP SERVICES', subtitle: 'More Than Just Makeup.',
    description: 'Enhance your natural beauty with our professional makeup services for every occasion. From everyday looks to special events.',
    hero: 'woman-02', heroPosition: '76% 40%', sectionLabel: 'Our makeup services', sectionTitle: 'Our Makeup Services',
    items: [
      { title: 'Party Makeup', detail: 'Glam & Stylish', image: 'makeup-02' },
      { title: 'Bridal Makeup', detail: 'Traditional & Modern', image: 'bridal-portrait' },
      { title: 'HD Makeup', detail: 'Flawless Finish', image: 'woman-02' },
      { title: 'Makeup Trial', detail: 'Plan Your Look', image: 'makeup-01' },
    ],
    featureImage: 'makeup-02', featureEyebrow: 'FEATURED LOOK', featureTitle: 'Every Look\nTells a Story',
    featureCopy: 'Our expert makeup team creates looks that match your personality and occasion.',
    featureButton: 'Explore Makeup Services',
  },
  bridal: {
    eyebrow: 'BRIDAL SERVICES', title: 'BRIDAL SERVICES', subtitle: 'Your Day. Your Look.',
    description: 'From bridal makeup to pre-bridal care, we create timeless looks for your most special moments.',
    hero: 'bridal-portrait', heroPosition: '78% 30%', sectionLabel: 'Our bridal services', sectionTitle: 'Our Bridal Services',
    items: [
      { title: 'Bridal Makeup', detail: 'Traditional & Modern', image: 'bridal-portrait' },
      { title: 'Bridal Hair', detail: 'Expert Styles', image: 'hair-02' },
      { title: 'Pre-Bridal Beauty', detail: 'Glow & Care', image: 'beauty-01' },
      { title: 'Bridal Consultation', detail: 'Personalized Plan', image: 'bridal-02' },
    ],
    featureImage: 'bridal-portrait', featureEyebrow: 'BRIDAL BEAUTY', featureTitle: 'Beyond the\nOrdinary',
    featureCopy: 'Let us be a part of your beautiful journey with looks that feel true to you.',
    featureButton: 'Explore Bridal Services',
  },
  'mens-grooming': {
    eyebrow: "MEN'S GROOMING", title: "MEN'S GROOMING", subtitle: 'Look Sharp. Feel Confident.',
    description: 'Modern grooming services designed for the modern man. From haircuts to beard care, we have got you covered.',
    hero: 'man-01', heroPosition: '73% 34%', sectionLabel: "Our men's services", sectionTitle: "Our Men's Services",
    items: [
      { title: 'Haircut', detail: 'Clean & Sharp', image: 'man-03' },
      { title: 'Beard Grooming', detail: 'Defined & Stylish', image: 'man-02' },
      { title: 'Hair Styling', detail: 'Everyday & Occasion', image: 'man-01' },
      { title: "Men's Beauty", detail: 'Skin & Facials', image: 'beauty-01' },
    ],
    featureImage: 'man-03', featureEyebrow: 'GROOMING MATTERS', featureTitle: 'Grooming\nIs Self Respect',
    featureCopy: 'Look sharp, feel great. Our men’s grooming services are designed to enhance your style, confidence and ready-for-anything feeling.',
    featureButton: "Explore Men's Services",
  },
};

export const galleryItems = [
  { image: 'gallery-uplooks-01.webp', category: 'Men', alt: 'Men’s layered haircut at Uplooks', position: 'center 45%' },
  { image: 'gallery-uplooks-04.webp', category: 'Bridal', alt: 'Bridal makeup with red veil at Uplooks', position: 'center 28%' },
  { image: 'gallery-uplooks-07.webp', category: 'Makeup', alt: 'Traditional occasion makeup at Uplooks', position: 'center 24%' },
  { image: 'gallery-uplooks-03.webp', category: 'Hair', alt: 'Long layered hair styling at Uplooks', position: 'center 45%' },
  { image: 'gallery-uplooks-02.webp', category: 'Men', alt: 'Men’s haircut and beard styling at Uplooks' },
  { image: 'gallery-uplooks-05.webp', category: 'Makeup', alt: 'Party makeup and styling at Uplooks' },
  { image: 'gallery-uplooks-12.webp', category: 'Hair', alt: 'Long smooth hair treatment result at Uplooks' },
  { image: 'gallery-uplooks-08.webp', category: 'Bridal', alt: 'Bridal side profile makeup at Uplooks' },
  { image: 'gallery-uplooks-09.webp', category: 'Bridal', alt: 'Traditional bridal makeup portrait at Uplooks' },
  { image: 'gallery-uplooks-10.webp', category: 'Bridal', alt: 'Bridal makeup and jewellery look at Uplooks' },
  { image: 'gallery-uplooks-11.webp', category: 'Hair', alt: 'Occasion hair styling at Uplooks' },
  { image: 'gallery-uplooks-06.webp', category: 'Hair', alt: 'Women’s haircut and colour at Uplooks' },
  { image: 'gallery-uplooks-13.webp', category: 'Men', alt: 'Men’s finished grooming look at Uplooks' },
  { image: 'gallery-uplooks-14.webp', category: 'Hair', alt: 'Long straight haircut at Uplooks' },
];
