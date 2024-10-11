import {
  ClerkProvider,
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Button } from '@/components/ui/button';
import { auth } from '@clerk/nextjs/server';

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
  title: "AudioSubs",
  description: "Built by Elijah Soladoye",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { userId }: { userId: string | null } = auth()
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
          <Toaster position="top-right" />
          <div className="absolute bottom-10 left-10">
            {!userId ? (
              <SignOutButton >
              <Button className='bg-blue-600'>Sign out</Button>
            </SignOutButton>
            ):null}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
