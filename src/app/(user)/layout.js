import "./globals.css";
import { Poppins } from "next/font/google";
import { Providers } from "../Providers";
import { Toaster } from "@/components/ui/toaster";

const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Login",
  description: "Logicloom | login page",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} dark`}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
