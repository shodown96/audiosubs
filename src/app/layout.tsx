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
import { UserMenu } from '@/components/custom/UserMenu';

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
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <div className="p-3 px-4 bg-primary flex justify-end lg:hidden">
            {userId ? <UserMenu /> : null}
          </div>
          {children}
          <Toaster position="top-right" />
          <div className="absolute bottom-10 left-10 max-lg:hidden">
          {userId ? <UserMenu /> : null}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
