import { Poppins } from "next/font/google";
import { Providers } from "@/app/Providers";
import { Toaster } from "@/components/ui/toaster";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import "./globals.css";

const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "de" }];
}

export default async function RootLayout({ children, params }) {
  const { lang } = await params;

  return (
    <html lang={lang}>
      <body className={`${poppins.className} dark`}>
        <Providers>
          <LanguageSwitcher />
          {children}
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
