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
          <div className="flex flex-row w-full">
            <DashboardSidebar dict={dict.sidebar} lang={lang} />
            <div className="flex-1">
              <>
                <DashboardHeader dict={dict.header} lang={lang} />
                <div className="dark:bg-gray-500/20 bg-black/10 w-full h-[80vh] overflow-y-auto rounded-tl-3xl rounded-bl-3xl flex justify-center items-center">
                  {children}
                </div>
              </>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
