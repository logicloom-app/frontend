import "./globals.css";
import Header from "./_components/Header";
import { Poppins } from "next/font/google";
import { Providers } from "@/app/Providers";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { getDictionary } from "@/lib/utils/dictionary";

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
      <body className={poppins.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Providers>
            <Header dict={dict.header} />
            {children}
          </Providers>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
