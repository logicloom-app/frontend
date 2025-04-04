import "../../globals.css";
import { Suspense } from "react";
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
  title: "LogicLoom",
  description: "LogicLoom",
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
