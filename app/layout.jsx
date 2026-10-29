import { Great_Vibes, Cormorant_Garamond, Hind_Vadodara } from 'next/font/google';
import { CONFIG } from '../lib/config';
import './globals.css';

const script = Great_Vibes({ weight: '400', subsets: ['latin'], variable: '--f-script', display: 'swap' });
const serif = Cormorant_Garamond({ weight: ['400', '600'], style: ['normal', 'italic'], subsets: ['latin'], variable: '--f-serif', display: 'swap' });
const guj = Hind_Vadodara({ weight: ['400', '600'], subsets: ['gujarati', 'latin'], variable: '--f-guj', display: 'swap' });

const title = 'Happy Anniversary, Together Always ❤️';
const description = `${CONFIG.name1} & ${CONFIG.name2} - our little love story. Tap to open.`;

export const metadata = {
  metadataBase: new URL(CONFIG.siteUrl),
  title,
  description,
  openGraph: {
    type: 'website', url: '/', siteName: `${CONFIG.name1} & ${CONFIG.name2}`, title, description,
    images: [{ url: `${CONFIG.siteUrl}/og.jpg`, width: 1200, height: 800, alt: `Happy Anniversary — ${CONFIG.name1} and ${CONFIG.name2}` }],
  },
  twitter: { card: 'summary_large_image', title, description, images: [`${CONFIG.siteUrl}/og.jpg`] },
};
export const viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#1a0710' };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${script.variable} ${serif.variable} ${guj.variable}`}>
      <body>{children}</body>
    </html>
  );
}
