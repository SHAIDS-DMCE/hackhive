import localFont from "next/font/local";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import SmoothScroll from "@/components/providers/SmoothScroll";
import AppLoadingProvider from "@/components/providers/AppLoadingProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

// Nord font - for headings
const nord = localFont({
  src: [
    { path: "../../public/fonts/nord/Nord-Regular.otf", weight: "400", style: "normal" },
    { path: "../../public/fonts/nord/Nord-Medium.otf", weight: "500", style: "normal" },
    { path: "../../public/fonts/nord/Nord-Bold.otf", weight: "700", style: "normal" },
    { path: "../../public/fonts/nord/Nord-Black.otf", weight: "900", style: "normal" },
  ],
  variable: "--font-nord",
  display: "swap",
});

// Satoshi font - for body text
const satoshi = localFont({
  src: [
    { path: "../../public/fonts/satoshi/Satoshi-Light.otf", weight: "300", style: "normal" },
    { path: "../../public/fonts/satoshi/Satoshi-Regular.otf", weight: "400", style: "normal" },
    { path: "../../public/fonts/satoshi/Satoshi-Medium.otf", weight: "500", style: "normal" },
    { path: "../../public/fonts/satoshi/Satoshi-Bold.otf", weight: "700", style: "normal" },
    { path: "../../public/fonts/satoshi/Satoshi-Black.otf", weight: "900", style: "normal" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

// CaskaydiaMono Nerd Font - for code and timer
const caskaydia = localFont({
  src: [
    { path: "../../public/fonts/caskaydiamono-nerdfont/CaskaydiaMonoNerdFont-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/caskaydiamono-nerdfont/CaskaydiaMonoNerdFont-Light.ttf", weight: "300", style: "normal" },
    { path: "../../public/fonts/caskaydiamono-nerdfont/CaskaydiaMonoNerdFont-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../../public/fonts/caskaydiamono-nerdfont/CaskaydiaMonoNerdFont-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-caskaydia",
  display: "swap",
});

export const metadata = {
  title: "HackHive",
  description: "Join the resistance, the ultimate heist",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${nord.variable} ${satoshi.variable} ${caskaydia.variable} antialiased bg-background text-foreground font-body`}
      >
        <ThemeProvider>
          <NextThemesProvider
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
          </NextThemesProvider>
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
