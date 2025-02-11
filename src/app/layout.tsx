import { APP_NAME } from '@/lib/constants';
import {
  ClerkProvider
} from '@clerk/nextjs';
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: APP_NAME,
  description: "Built by Elijah Soladoye",
  metadataBase: new URL('https://mediasubs.vercel.app'),
  openGraph: {
    url: 'https://mediasubs.vercel.app',
    type: 'website',
    title: APP_NAME,
    description: 'Built by Elijah Soladoye',
    images: [
      {
        url: '/img/favicon.ico',
        width: 800,
        height: 600,
        alt: APP_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: APP_NAME,
    description: 'Built by Elijah Soladoye',
    images: '/img/favicon.ico',
    // site: '@your_twitter_handle', // Optional
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {children}
          <Toaster position="top-right" />
        </body>
      </html>
    </ClerkProvider>
  );
}
