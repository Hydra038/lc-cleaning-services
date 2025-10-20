import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "L&C Cleaning Services Ltd - Professional Cleaning Across the UK",
  description: "Professional cleaning services for homes and businesses across the UK. Domestic cleaning, office cleaning, end of tenancy, carpet cleaning and more. Book online today!",
  keywords: "cleaning services UK, domestic cleaning, office cleaning, end of tenancy cleaning, carpet cleaning, professional cleaners",
  authors: [{ name: "L&C Cleaning Services Ltd" }],
  openGraph: {
    title: "L&C Cleaning Services Ltd - Your Mess is Our Mission",
    description: "Professional, reliable, and affordable cleaning services across the UK. Book your cleaning service online today!",
    type: "website",
    locale: "en_GB",
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: { url: '/apple-icon.png' }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
