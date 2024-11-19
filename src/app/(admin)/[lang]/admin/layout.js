import "../../../globals.css";

import { Poppins } from "next/font/google";
import { Providers } from "@/app/Providers";
import AdminHeader from "./_components/AdminHeader";
import AdminSidebar from "./_components/AdminSidebar";

const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "LogicLoom | Admin",
  description: "LogicLoom Admin",
};

export default async function AdminLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body className={poppins.className}>
        <Providers>
          <div className="flex flex-row w-full min-h-screen pb-6">
            <AdminSidebar />
            <div className="flex-1 flex flex-col">
              <AdminHeader />
              <div className="dark:bg-gray-500/20 bg-black/10 flex-1 overflow-auto rounded-tl-[30px] rounded-bl-[30px] flex justify-center items-center">
                {children}
              </div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
