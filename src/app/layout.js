import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import SmoothScroll from "@/components/providers/SmoothScroll";
import AppLoadingProvider from "@/components/providers/AppLoadingProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "HackHive",
  description: "Join the resistance, the ultimate heist",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <AppLoadingProvider>
            <SmoothScroll>
              <Navbar />
              <main>{children}</main>
              <Footer />
            </SmoothScroll>
          </AppLoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
