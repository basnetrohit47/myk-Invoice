import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppThemeProvider } from "@/contexts/AppThemeProvider";
import { Suspense } from "react";
import ClientProvider from "@/components/ClientProvider";
import NavigationBar from "@/components/NavigationBar";
import { AuthProvider } from "@/contexts/AuthContext";
import FooterMenu from "@/components/FooterMenu";
import { Container } from "@mui/material";

const LoadingFallback = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <p>...Loading</p>
  </div>
);

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Myk-invoice",
  description: "Generate and manage invoice",
  icons: {
    icon: "/favicon.svg",
  },
};

// Dynamically import NavigationBar to enable Suspense

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <ClientProvider>
            <AppThemeProvider>
              <Suspense fallback={<LoadingFallback />}>
                <NavigationBar />
                <Container className="p-4 min-w-full">{children}</Container>
                <FooterMenu />
              </Suspense>
            </AppThemeProvider>
          </ClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
