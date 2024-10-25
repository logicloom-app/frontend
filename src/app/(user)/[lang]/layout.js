import { Poppins } from "next/font/google";
import { Providers } from "@/app/Providers";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import "./globals.css";
import { ThemeToggle } from "@/components/ThemeToggle";

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
    <html lang={lang} suppressHydrationWarning>
      <body className={poppins.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Providers>
            <LanguageSwitcher />
            <ThemeToggle />
            {children}
          </Providers>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
