import "@/src/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { Toaster } from "sonner";

import { Providers } from "../lib/providers";
import AuthProvider from "../components/AuthProvider/AuthProvider";

import { siteConfig } from "@/src/config/site";
import { fontSans } from "@/src/config/fonts";
import { Poppins } from 'next/font/google'

const PoppinsFont = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800', '900']
})

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <AuthProvider>
          <Providers>
            <Toaster richColors />
            <div className={`relative flex flex-col h-screen ${PoppinsFont.className}`}>
              <main className="container mx-auto max-w-7xl flex-grow">
                {children}
              </main>
            </div>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
