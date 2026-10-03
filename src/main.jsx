import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, CalendarDays, Check, ChevronDown, Clock3, Heart, MapPin, Menu, Phone, Play, Scissors, ShieldCheck, Sparkles, Star, Users, X } from 'lucide-react';
import { client, salon } from './client-config';
import './styles.css';

const { image, galleryItems, serviceCards, servicePages } = client;
const { name: SALON_NAME, phone: PHONE, phoneTel: PHONE_TEL, address: ADDRESS, hours: HOURS } = salon;
const DIRECTIONS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;
const navItems = [ ['Home', '/'], ['About', '/about'], ['Services', '/services'], ['Gallery', '/gallery'], ['Reviews', '/reviews'], ['Contact', '/contact'] ];
const detailLinks = serviceCards.map(item => [item.title, item.href]);

function Logo({ inverse = false }) {
  return <Link className={`logo ${inverse ? 'logo-inverse' : ''}`} to="/" aria-label={`${SALON_NAME} home`}>
    {salon.logo ? <img src={salon.logo} alt={`${SALON_NAME} logo`} /> : <span className="text-logo" aria-label={`${SALON_NAME} logo`}>NAAEE<small>SALON</small></span>}
  </Link>;
}

function Button({ to, children, outline = false, light = false, className = '', onClick, type = 'button' }) {
  const classes = `button ${outline ? 'button-outline' : ''} ${light ? 'button-light' : ''} ${className}`;
  const content = <>{children}<ArrowRight size={15} strokeWidth={1.6} /></>;
  return to ? <Link to={to} className={classes}>{content}</Link> : <button type={type} className={classes} onClick={onClick}>{content}</button>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => { setOpen(false); }, [location.pathname]);
  useEffect(() => { document.body.classList.toggle('menu-open', open); return () => document.body.classList.remove('menu-open'); }, [open]);
  return <>
    <header className="site-header">
      <div className="header-inner shell">
        <Logo />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map(([label, href]) => label === 'Services'
            ? <div className="nav-dropdown" key={label}><NavLink to={href} className={({isActive}) => isActive ? 'active' : ''}>Services <ChevronDown size={11} /></NavLink><div className="dropdown-panel">{detailLinks.map(([name, url]) => <Link to={url} key={name}>{name}<ArrowUpRight size={13} /></Link>)}</div></div>
            : <NavLink to={href} key={label} end={href === '/'} className={({isActive}) => isActive ? 'active' : ''}>{label}</NavLink>)}
        </nav>
        <div className="header-actions"><a className="header-phone" href={`tel:${PHONE_TEL}`}><Phone size={13} /> {PHONE}</a><Link className="header-book" to="/booking">Book Appointment</Link></div>
        <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>{open ? <X /> : <Menu />}</button>
      </div>
    </header>
    <div className={`mobile-menu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
      <nav aria-label="Mobile navigation">{navItems.map(([label, href]) => <NavLink key={href} to={href} end={href === '/'}>{label}<ArrowRight size={16} /></NavLink>)}<div className="mobile-service-links">{detailLinks.slice(0,5).map(([label, href]) => <Link key={label} to={href}>{label}</Link>)}</div></nav>
      <Button to="/booking" className="mobile-menu-book">Book Appointment</Button>
      <a className="mobile-call" href={`tel:${PHONE_TEL}`}><Phone size={15} /> {PHONE}</a>
    </div>
  </>;
}

function Footer() {
  return <footer className="site-footer"><div className="shell footer-inner">
    <div className="footer-brand"><Logo inverse /><p>Thoughtful beauty, hair and grooming for everyone.</p></div>
    <div className="footer-column"><strong>Explore</strong><Link to="/about">About</Link><Link to="/services">Services</Link><Link to="/gallery">Gallery</Link><Link to="/reviews">Reviews</Link></div>
    <div className="footer-column"><strong>Services</strong>{detailLinks.slice(0,5).map(([label, href]) => <Link key={label} to={href}>{label}</Link>)}</div>
    <div className="footer-column footer-contact"><strong>Visit {SALON_NAME}</strong><span>{HOURS}</span><a href={`tel:${PHONE_TEL}`}>{PHONE}</a><span className="footer-address">{ADDRESS}</span><Link to="/contact">Contact & directions</Link><Link className="footer-book" to="/booking">Book an appointment <ArrowUpRight size={15} /></Link></div>
  </div><div className="shell footer-bottom"><span>© {new Date().getFullYear()} {SALON_NAME}</span><span>Made for every version of you.</span></div></footer>;
}

function ScrollToTop() { const { pathname } = useLocation(); useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); const titles = { '/':'Home', '/about':'About', '/services':'Services', '/gallery':'Gallery', '/reviews':'Customer Stories', '/booking':'Book Appointment', '/booking/success':'Appointment Requested', '/contact':'Contact' }; const service = pathname.split('/')[2]; document.title = `${titles[pathname] || servicePages[service]?.title || 'Uplooks'} | ${SALON_NAME}`; }, [pathname]); return null; }

function SectionHeading({ label, title, description, action, actionTo }) {
  return <div className="section-heading"><div><span className="eyebrow dark-eyebrow">{label}</span><h2>{title}</h2>{description && <p>{description}</p>}</div>{action && <Link className="text-link" to={actionTo}>{action}<ArrowRight size={15} /></Link>}</div>;
}

function Hero({ eyebrow, title, subtitle, description, photo, position = 'center', variant = '', children }) {
  return <section className={`page-hero ${variant}`}>
    <img className="hero-photo" src={image(photo)} style={{ objectPosition: position }} alt="" />
    <div className="hero-shade" /><div className="shell hero-content"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1>{subtitle && <p className="hero-subtitle">{subtitle}</p>}{description && <p className="hero-description">{description}</p>}{children && <div className="hero-buttons">{children}</div>}</div>
  </section>;
}

function ServiceCard({ item, compact = false }) {
  return <Link to={item.href} className={`service-card ${compact ? 'compact' : ''}`}><div className="card-image"><img src={image(item.image)} alt={item.title} loading="lazy" /></div><div className="service-card-copy"><div><h3>{item.title}</h3><p>{item.detail}</p></div><ArrowUpRight size={17} strokeWidth={1.5} /></div></Link>;
}

function FeatureStrip() {
  const entries = [[Scissors,'Expert Team','Skilled & Certified'],[ShieldCheck,'Premium Products','Trusted Brands'],[Heart,'Hygiene & Safety','Always Our Priority'],[Sparkles,'Relaxing Ambience','Feel at Home']];
  return <div className="feature-strip shell">{entries.map(([Icon, title, desc]) => <div className="feature-item" key={title}><span><Icon size={22} strokeWidth={1.25} /></span><div><strong>{title}</strong><small>{desc}</small></div></div>)}</div>;
}

function EditorialSection({ photo, eyebrow, title, description, button, to = '/booking', reverse = false }) {
  return <section className={`editorial ${reverse ? 'editorial-reverse' : ''}`}><div className="editorial-image"><img src={image(photo)} alt="Uplooks salon experience" loading="lazy" /></div><div className="editorial-copy"><span className="eyebrow dark-eyebrow">{eyebrow}</span><h2>{title.split('\n').map((line, i) => <React.Fragment key={line}>{i > 0 && <br />}{line}</React.Fragment>)}</h2><p>{description}</p><Button to={to}>{button}</Button></div></section>;
}

function GalleryPreview() {
  return <section className="section shell"><SectionHeading label="OUR GALLERY" title={`Moments at ${SALON_NAME}`} action="View all" actionTo="/gallery" /><div className="gallery-preview">{galleryItems.slice(0,4).map((item, i) => <Link to="/gallery" key={i}><img src={image(item.image)} alt={item.alt} style={{ objectPosition: item.position }} loading="lazy" /></Link>)}</div></section>;
}

function CtaSection() { return <section className="cta-section"><img src={image('salon-warm')} alt="" loading="lazy" /><div className="cta-shade" /><div className="shell cta-content"><span className="eyebrow">YOUR MOMENT STARTS HERE</span><h2>Ready to feel like<br />your best self?</h2><p>Make time for a little care. We will take it from there.</p><Button to="/booking" light>Book Appointment</Button></div></section>; }

function Home() {
  return <>
    <section className="home-hero"><img className="home-hero-bg" src={image('salon-warm')} alt="" /><img className="home-person home-woman" src={image('woman-02')} alt="Woman with styled hair" /><img className="home-person home-man" src={image('man-01')} alt="Man with groomed hair" /><div className="home-hero-shade" /><div className="shell home-hero-content"><span className="eyebrow">PREMIUM CARE · FOR EVERY YOU</span><h1>Look Good<br />Feel Great</h1><p>Expert hair, skin, beauty and grooming<br className="desktop-only" /> services for men and women.</p><div className="hero-buttons"><Button to="/booking" light>Book Appointment</Button><Button to="/services" outline light>Explore Services</Button></div></div></section>
    <div className="stats-strip"><div className="shell stats-inner"><div><Star size={22} /><strong>{salon.rating}</strong><span>Rating</span></div><div><Users size={22} /><strong>{salon.reviews}</strong><span>Reviews</span></div><div><Clock3 size={22} /><strong className="hours-stat">9 AM – 9 PM</strong><span>Daily</span></div></div></div>
    <section className="section shell home-services"><div className="home-services-intro"><span className="eyebrow dark-eyebrow">OUR SERVICES</span><h2>Beauty & Grooming<br />for Everyone</h2><p>From everyday care to special occasions, our expert team is here to bring out the best in you.</p><Link className="text-link" to="/services">Explore all services <ArrowRight size={15}/></Link></div><div className="home-service-grid">{serviceCards.map(item => <ServiceCard key={item.title} item={item} compact />)}</div></section>
    <div className="shell"><EditorialSection photo="salon-warm" eyebrow="OUR BEAUTY SPACE" title="A Place for\nSelf Care" description="Step into a personalized care experience. Thoughtful service, premium products and a comfortable environment that helps you look and feel your best." button="Discover Us" to="/about" /></div>
    <GalleryPreview />
    <section className="section shell why-us"><SectionHeading label="WHY CHOOSE UPLOOKS" title="Care That Feels Personal" description="A little attention makes all the difference." /><FeatureStrip /></section>
    <section className="section shell home-stories"><SectionHeading label="CUSTOMER STORIES" title="Real People. Real Results." action="Explore stories" actionTo="/reviews" /><div className="story-preview"><img src={image('man-03')} alt="Grooming result placeholder" loading="lazy" /><div><span className="eyebrow dark-eyebrow">YOUR STORY, YOUR STYLE</span><h3>A look that feels<br />like you.</h3><p>Every visit is a chance to feel refreshed, confident, and more yourself.</p><Link className="text-link" to="/reviews">View customer stories <ArrowRight size={15}/></Link></div></div></section>
    <CtaSection />
  </>;
}

function About() {
  return <><section className="about-hero"><div className="about-hero-image"><img src={image('woman-02')} alt="Woman with styled hair" /></div><div className="shell about-hero-content"><div><span className="eyebrow dark-eyebrow">ABOUT UPLOOKS</span><h1>Your Beauty,<br />Our Passion</h1><p>We are a modern unisex salon committed to delivering high-quality services in hair, skin, beauty and grooming. Our professional team ensures a relaxing and luxurious experience every time.</p><Button to="/services">Our Story</Button></div></div></section><FeatureStrip /><GalleryPreview /><section className="section shell"><SectionHeading label="WHY CHOOSE UPLOOKS" title="Made for Every You" /><div className="benefits-grid">{[['Personalized Care','Tailored to You'],['Hygiene & Safety','Clean & Safe'],['Professional Service','Expert Team'],['Customer Satisfaction','Your Happiness Matters']].map(([a,b],i)=><div key={a}><span>{['01','02','03','04'][i]}</span><h3>{a}</h3><p>{b}</p></div>)}</div></section><CtaSection /></>;
}

function Services() { return <><Hero eyebrow="OUR SERVICES" title="OUR SERVICES" subtitle="Everything you need to look and feel your best." photo="salon-warm" variant="salon-hero" /><section className="section shell"><SectionHeading label="CHOOSE YOUR CARE" title="Explore Our Services" description="Thoughtful services for every style, every occasion, and everyone." /><div className="services-grid">{serviceCards.map(item => <ServiceCard key={item.title} item={item} />)}</div></section><CtaSection /></>; }

function ServiceDetail() {
  const { slug } = useParams(); const page = servicePages[slug];
  if (!page) return <NotFound />;
  return <><Hero eyebrow={page.eyebrow} title={page.title} subtitle={page.subtitle} description={page.description} photo={page.hero} position={page.heroPosition} variant={`detail-hero detail-${slug}`}><Button to="/booking" light>Book Appointment</Button></Hero><section className="section shell detail-content"><SectionHeading label={page.sectionLabel} title={page.sectionTitle} /><div className="detail-grid">{page.items.map(item => <Link to={`/booking?service=${encodeURIComponent(item.title)}`} className="detail-card" key={item.title}><img src={image(item.image)} alt={item.title} loading="lazy" /><div><h3>{item.title}</h3><p>{item.detail}</p><ArrowUpRight size={16}/></div></Link>)}</div><EditorialSection photo={page.featureImage} eyebrow={page.featureEyebrow} title={page.featureTitle} description={page.featureCopy} button={page.featureButton} to="/booking" /></section><section className="section shell related"><SectionHeading label="MORE TO EXPLORE" title="Related Services" /><div className="related-links">{serviceCards.filter(item => item.href !== `/services/${slug}`).slice(0,3).map(item => <ServiceCard key={item.title} item={item} compact />)}</div></section><CtaSection /></>;
}

function Gallery() {
  const [filter, setFilter] = useState('All'); const [active, setActive] = useState(null);
  const filters = ['All', ...new Set(galleryItems.map(item => item.category))];
  const visible = filter === 'All' ? galleryItems : galleryItems.filter(item => item.category === filter);
  useEffect(() => { const handle = e => { if (e.key === 'Escape') setActive(null); }; window.addEventListener('keydown',handle); return () => window.removeEventListener('keydown',handle); }, []);
  return <><Hero eyebrow="OUR GALLERY" title="OUR GALLERY" subtitle="Real Moments. Real People." photo="salon-warm" variant="short-hero" /><section className="section shell"><div className="filter-row" role="group" aria-label="Gallery filters">{filters.map(name => <button key={name} className={filter===name?'selected':''} onClick={() => setFilter(name)}>{name}</button>)}</div><div className="gallery-grid">{visible.map(item => <button className="gallery-tile" key={item.image} onClick={() => setActive(item)} aria-label={`Open ${item.alt}`}><img src={image(item.image)} alt={item.alt} loading="lazy" /><span>{item.category}<ArrowUpRight size={17}/></span></button>)}</div></section>{active && <div className="lightbox" role="dialog" aria-modal="true" aria-label={active.alt} onClick={() => setActive(null)}><button aria-label="Close image" onClick={() => setActive(null)}><X/></button><img src={image(active.image)} alt={active.alt} onClick={e => e.stopPropagation()}/></div>}<CtaSection /></>;
}

function Reviews() { return <><Hero eyebrow="CUSTOMER STORIES" title="REAL PEOPLE.\nREAL RESULTS." subtitle="Our clients' transformations and the stories behind them." photo="salon-warm" variant="short-hero" /><section className="section shell"><SectionHeading label="THE UPLOOKS EXPERIENCE" title="Every Look Has a Story" description="A space for real client moments and approved customer feedback." /><div className="reviews-grid"><div className="review-image-card"><img src={image('man-03')} alt="Men’s haircut placeholder" /><span><Play size={20} fill="currentColor" /> Transformation video placeholder</span></div><div className="review-image-card"><img src={image('makeup-02')} alt="Makeup result placeholder" /><span><Play size={20} fill="currentColor" /> Makeup result placeholder</span></div><div className="review-placeholder"><span className="eyebrow dark-eyebrow">CUSTOMER VOICES</span><h2>Stories from<br />our chair.</h2><p>Verified customer reviews and before-and-after photos will appear here once provided and approved by Uplooks.</p><Button to="/booking">Create Your Moment</Button></div></div></section><CtaSection /></>; }

const initialBooking = { name:'', phone:'', service:'', date:'', time:'', message:'' };
const BOOKING_TIMES = Array.from({ length: 27 }, (_, index) => {
  const minutes = 9 * 60 + index * 30;
  const hour = Math.floor(minutes / 60);
  return `${hour % 12 || 12}:${minutes % 60 ? '30' : '00'} ${hour < 12 ? 'AM' : 'PM'}`;
});

function Booking() {
  const navigate = useNavigate();
  const location = useLocation();
  const requestedService = new URLSearchParams(location.search).get('service') || '';
  const [form, setForm] = useState({ ...initialBooking, service: requestedService });
  useEffect(() => { setForm(current => ({ ...current, service: requestedService || current.service })); }, [requestedService]);
  const update = e => setForm(current => ({ ...current, [e.target.name]: e.target.value }));
  const submit = e => {
    e.preventDefault();
    if (!e.currentTarget.reportValidity()) return;
    sessionStorage.setItem('uplooksBooking', JSON.stringify(form));
    navigate('/booking/success');
  };
  const today = new Date().toLocaleDateString('en-CA');
  const services = [...new Set([...serviceCards.map(item => item.title), ...Object.values(servicePages).flatMap(page => page.items.map(item => item.title))])];
  return <>
    <Hero eyebrow="BOOK YOUR APPOINTMENT" title="BOOK YOUR APPOINTMENT" subtitle="Choose your service and preferred time." photo="salon-warm" variant="short-hero" />
    <section className="section shell booking-layout">
      <div>
        <span className="eyebrow dark-eyebrow">LET'S GET STARTED</span>
        <h2>Find your moment<br />at {SALON_NAME}.</h2>
        <p>Tell us a little about your visit. This preview saves your request on this device; live booking will be connected before launch.</p>
        <form className="booking-form" onSubmit={submit}>
          <label>Service<select name="service" value={form.service} onChange={update} required><option value="">Select Service</option>{services.map(service => <option key={service}>{service}</option>)}</select></label>
          <label>Name<input name="name" value={form.name} onChange={update} placeholder="Your Name" autoComplete="name" required /></label>
          <label>Phone<input name="phone" value={form.phone} onChange={update} placeholder="Your Phone Number" type="tel" inputMode="tel" autoComplete="tel" minLength="7" required /></label>
          <label>Date<input name="date" value={form.date} onChange={update} type="date" min={today} required /></label>
          <label>Time<select name="time" value={form.time} onChange={update} required><option value="">Select Time</option>{BOOKING_TIMES.map(time => <option key={time}>{time}</option>)}</select></label>
          <label className="full">Message (Optional)<textarea name="message" value={form.message} onChange={update} rows="3" placeholder="Anything you would like us to know?" /></label>
          <Button type="submit" className="form-submit">Book Appointment</Button>
        </form>
      </div>
      <aside className="booking-aside">
        <span className="eyebrow dark-eyebrow">PREFER TO TALK?</span><h3>Prefer to call?</h3>
        <p>We would be happy to help you choose the right service and time.</p>
        <a className="button" href={`tel:${PHONE_TEL}`}>Call Now <Phone size={15}/></a>
        <div className="booking-aside-hours"><Clock3 size={18}/><div><strong>Opening hours</strong><span>{HOURS}</span></div></div>
      </aside>
    </section>
  </>;
}

function BookingSuccess() {
  let data = null;
  try { data = JSON.parse(sessionStorage.getItem('uplooksBooking')); } catch {}
  return <section className="success-wrap shell">
    <div className="success-icon"><Check size={30}/></div>
    <span className="eyebrow dark-eyebrow">THANK YOU FOR CHOOSING UPLOOKS</span>
    <h1>Appointment<br />Requested</h1>
    {data ? <><p>Your request has been saved in this browser. Live confirmations will be available when the booking service is connected.</p><div className="success-details">{[['Service',data.service],['Date',data.date],['Time',data.time],['Name',data.name],['Phone',data.phone]].map(([label,value])=><div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div></> : <p>No appointment request was found in this browser. Please fill out the booking form first.</p>}
    <div className="success-actions"><Button to="/">Back to Home</Button><a className="button button-outline" href={`tel:${PHONE_TEL}`}>Call Salon <Phone size={15}/></a></div>
  </section>;
}

function Contact() {
  return <>
    <Hero eyebrow="LET'S CONNECT" title="LET'S CONNECT" subtitle="We are here to help." photo="salon-warm" variant="short-hero" />
    <section className="section shell contact-layout">
      <div>
        <span className="eyebrow dark-eyebrow">VISIT {SALON_NAME}</span>
        <h2>Come in, unwind,<br />leave feeling you.</h2>
        <p className="contact-category">{salon.category}</p>
        <div className="contact-line"><MapPin/><div><strong>Address</strong><p>{ADDRESS}</p></div></div>
        <div className="contact-line"><Phone/><div><strong>Phone</strong><p><a href={`tel:${PHONE_TEL}`}>{PHONE}</a></p></div></div>
        <div className="contact-line"><Clock3/><div><strong>Opening Hours</strong><p>{HOURS}</p></div></div>
        <div className="contact-buttons"><a className="button button-outline" href={DIRECTIONS_URL} target="_blank" rel="noreferrer">Get Directions <ArrowUpRight size={15}/></a><a className="button button-outline" href={`tel:${PHONE_TEL}`}>Call Now <Phone size={15}/></a><Button to="/booking">Book Appointment</Button></div>
      </div>
      <div className="map-embed"><iframe title={`Map showing ${SALON_NAME} in Mansarovar, Jaipur`} src={`https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /><a href={DIRECTIONS_URL} target="_blank" rel="noreferrer">Open directions in Google Maps <ArrowUpRight size={15}/></a></div>
    </section>
  </>;
}

function NotFound() { return <section className="success-wrap shell"><span className="eyebrow dark-eyebrow">PAGE NOT FOUND</span><h1>Let's get you<br />back to {SALON_NAME}.</h1><Button to="/">Back to Home</Button></section>; }

function MobileActionBar() { const location = useLocation(); if (location.pathname.startsWith('/booking')) return null; return <Link className="mobile-action-bar" to="/booking"><CalendarDays size={17}/> Book Appointment <ArrowRight size={16}/></Link>; }

function App() { return <BrowserRouter><ScrollToTop/><Header/><main><Routes><Route path="/" element={<Home/>}/><Route path="/about" element={<About/>}/><Route path="/services" element={<Services/>}/><Route path="/services/:slug" element={<ServiceDetail/>}/><Route path="/gallery" element={<Gallery/>}/><Route path="/reviews" element={<Reviews/>}/><Route path="/booking" element={<Booking/>}/><Route path="/booking/success" element={<BookingSuccess/>}/><Route path="/contact" element={<Contact/>}/><Route path="*" element={<NotFound/>}/></Routes></main><Footer/><MobileActionBar/></BrowserRouter>; }

createRoot(document.getElementById('root')).render(<App/>);
