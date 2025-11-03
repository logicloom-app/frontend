import "../../../globals.css";

import { Poppins } from "next/font/google";
import { Providers } from "@/app/Providers";
import DashboardHeader from "./_components/Header";
import { getDictionary } from "@/lib/utils/dictionary";
import DashboardSidebar from "./_components/Sidebar";

const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "LogicLoom | Dashboard",
  description: "LogicLoom Dashboard",
};

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "de" }];
}

export default async function DashboardLayout({ children, params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={poppins.className}>
        <Providers>
          <div className="flex flex-row w-full min-h-screen relative overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 -z-10">
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-blue-950/20 dark:to-purple-950/20"></div>
              
              {/* Grid Pattern */}
              <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20 dark:opacity-10"></div>
              
              {/* Animated Blobs */}
              <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-400/30 dark:bg-blue-600/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-xl animate-blob"></div>
              <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-400/30 dark:bg-purple-600/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-xl animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400/30 dark:bg-pink-600/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-xl animate-blob animation-delay-4000"></div>
            </div>

            <DashboardSidebar dict={dict.sidebar} lang={lang} />
            <div className="flex-1 flex flex-col">
              <DashboardHeader dict={dict.header} lang={lang} />
              <main className="flex-1 overflow-auto">
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
