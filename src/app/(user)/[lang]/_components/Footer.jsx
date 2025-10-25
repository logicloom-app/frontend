import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { TbMail, TbBrandLinkedin, TbSparkles } from "react-icons/tb";
import Image from "next/image";
import Link from "next/link";

export default function Footer({ dict, lang }) {
  return (
    <footer className="relative overflow-hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/50 to-purple-50/50 dark:from-transparent dark:via-blue-950/20 dark:to-purple-950/20"></div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="relative container mx-auto px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href={`/${lang}`} className="flex items-center gap-3 mb-4 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                <Image
                  src="/images/logo.png"
                  width={48}
                  height={48}
                  alt="LogicLoom logo"
                  className="relative saturate-200 group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                LogicLoom
              </h2>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md leading-relaxed">
              {dict?.description}
            </p>

            {/* Social Links with Icons */}
            <div className="flex gap-3">
              <Link
                href={`mailto:hi@logicloom.de`}
                className="group relative p-3 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 hover:from-blue-500 hover:to-cyan-500 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-110"
                aria-label="Email"
              >
                <TbMail className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors" />
              </Link>
              <Link
                href={`https://www.linkedin.com/company/logicloomapp`}
                target="_blank"
                className="group relative p-3 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 hover:from-blue-500 hover:to-cyan-500 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-110"
                aria-label="LinkedIn"
              >
                <TbBrandLinkedin className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors" />
              </Link>
              <Link
                href={`https://github.com/pakzadjs`}
                target="_blank"
                className="group relative p-3 bg-gradient-to-br from-purple-500/10 to-pink-500/10 hover:from-purple-500 hover:to-pink-500 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-110"
                aria-label="GitHub"
              >
                <FaGithub className="w-5 h-5 text-purple-600 dark:text-purple-400 group-hover:text-white transition-colors" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <TbSparkles className="w-5 h-5 text-blue-500" />
              {dict?.socials?.quickLinks}
            </h3>
            <div className="flex flex-col gap-3">
              <Link
                href={`/${lang}/services`}
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 flex items-center gap-2 group"
              >
                <span className="w-0 h-0.5 bg-blue-500 group-hover:w-4 transition-all duration-300"></span>
                {dict?.socials?.services}
              </Link>
              <Link
                href={`/${lang}/contact`}
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 flex items-center gap-2 group"
              >
                <span className="w-0 h-0.5 bg-blue-500 group-hover:w-4 transition-all duration-300"></span>
                {dict?.socials?.contact}
              </Link>
              <Link
                href={`/${lang}/about`}
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 flex items-center gap-2 group"
              >
                <span className="w-0 h-0.5 bg-blue-500 group-hover:w-4 transition-all duration-300"></span>
                {dict?.socials?.aboutUs}
              </Link>
            </div>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">{dict?.legal?.title}</h3>
            <div className="flex flex-col gap-3">
              <Link
                href={`/${lang}/terms`}
                className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 flex items-center gap-2 group"
              >
                <span className="w-0 h-0.5 bg-purple-500 group-hover:w-4 transition-all duration-300"></span>
                {dict?.legal?.terms}
              </Link>
              <Link
                href={`/${lang}/privacy`}
                className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 flex items-center gap-2 group"
              >
                <span className="w-0 h-0.5 bg-purple-500 group-hover:w-4 transition-all duration-300"></span>
                {dict?.legal?.privacy}
              </Link>
              <Link
                href={`/${lang}/imprint`}
                className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 flex items-center gap-2 group"
              >
                <span className="w-0 h-0.5 bg-purple-500 group-hover:w-4 transition-all duration-300"></span>
                {dict?.legal?.imprint}
              </Link>
            </div>
          </div>
        </div>

        {/* Divider with Gradient */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-0.5 w-32"></div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p className="text-gray-600 dark:text-gray-400 text-center md:text-left">
            © {new Date().getFullYear()} LogicLoom. {dict?.allRightsReserved}
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-center md:text-right">
            Made with <span className="text-red-500 animate-pulse">❤️</span> by
            LogicLoom Team
          </p>
        </div>
      </div>
    </footer>
  );
}
