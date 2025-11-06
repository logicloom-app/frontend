import "../../globals.css";
import { Suspense } from "react";
import "@/styles/novel-editor.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { Poppins } from "next/font/google";
import { Providers } from "@/app/Providers";
import { getDictionary } from "@/lib/utils/dictionary";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "LogicLoom - Modern Web Development & Digital Solutions",
    template: "%s | LogicLoom",
  },
  description: "Professional web development, custom digital solutions, and innovative IT services. Transform your vision into digital reality with LogicLoom.",
  keywords: ["Web Development", "Software Development", "IT Services", "Digital Solutions", "Custom Web Apps", "E-Commerce", "MVP Development", "Germany"],
  authors: [{ name: "LogicLoom" }],
  creator: "LogicLoom",
  publisher: "LogicLoom",
  metadataBase: new URL("https://logicloom.de"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en",
      "de-DE": "/de",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://logicloom.de",
    siteName: "LogicLoom",
    title: "LogicLoom - Modern Web Development & Digital Solutions",
    description: "Professional web development and digital solutions",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LogicLoom",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LogicLoom - Modern Web Development",
    description: "Professional web development and digital solutions",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification-code",
  },
};

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "de" }];
}

export default async function RootLayout({ children, params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={`${poppins.className}`}>
        <Providers>
          <Suspense>
            <GoogleAnalytics />
          </Suspense>
          <Header dict={dict.header} lang={lang} />
          {children}
          <Footer dict={dict.footer} lang={lang} />
        </Providers>
      </body>
    </html>
  );
}
