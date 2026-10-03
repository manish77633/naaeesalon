import * as uplooks from './data';
import * as naaee from './naaee-data';

const clients = { uplooks, naaee };
const clientKey = (import.meta.env.VITE_SALON_CLIENT || 'naaee').toLowerCase();
export const client = clients[clientKey] || clients.naaee;
export const CLIENT_KEY = clientKey;

export const salon = clientKey === 'uplooks' ? {
  name: 'Uplooks Unisex Saloon', phone: '+91 85295 91122', phoneTel: '+918529591122',
  address: 'Front Of Balaji Paradise, Muhana Mandi Rd, Near Kesar Nagar Chauraha, Kalyanpura, Mansarovar, Jaipur, Rajasthan 302020',
  hours: 'Monday–Sunday · 9:00 AM – 10:30 PM', rating: '4.9', reviews: '500+',
  logo: '/images/uplooks-logo.png', category: 'Unisex Salon · Beauty Salon · Makeup Artist',
} : {
  name: 'NAAEE SALON', phone: '+91 91664 89227', phoneTel: '+919166489227',
  address: 'Sector 150, C-2, Shipra Path, Mansarovar, Jaipur, Rajasthan 302020',
  hours: 'Daily · 9:00 AM – 9:00 PM', rating: '4.9', reviews: '141+',
  logo: '/images/salon-warm.jpg', category: 'Beauty Salon · Nail Salon · Hairdresser',
};
