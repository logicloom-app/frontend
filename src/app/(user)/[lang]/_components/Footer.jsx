import { FaGithub, FaLinkedinIn } from "react-icons/fa";

import Image from "next/image";
import Link from "next/link";

export default function Footer({ dict, lang }) {
  return (
    <div className="z-0 flex flex-col items-center justify-between gap-4 p-4 h-auto border-t border-slate-200 dark:border-slate-800 relative bg-gradient-to-b from-white to-transparent dark:from-sky-900/10 dark:to-transparent rounded-b-3xl">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full max-w-[1200px] py-4">
        <div className="flex flex-col justify-center items-center md:items-start gap-3 mb-4 md:mb-0 md:ml-4 xl:ml-0">
          <div className="flex items-center gap-3 pointer-events-none">
            <Image
              src="/images/logo.png"
              width={40}
              height={40}
              alt="LogicLoom logo"
              priority
              className="saturate-200"
            />
            <h1 className="text-xl font-bold">LogicLoom</h1>
          </div>
          <p>{dict?.description}</p>
        </div>

        <div className="flex gap-10 md:mr-14">
          <div>
            <h6 className="mb-4">{dict?.socials?.title}</h6>

            <div className="flex flex-col gap-2">
              <Link
                href={`mailto:support@logicloom.app`}
                className="text-sm text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-300"
              >
                {dict?.socials?.email}
              </Link>

              <Link
                href={`https://www.linkedin.com/company/logicloomapp`}
                target="_blank"
                className="text-sm text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-300"
              >
                LinkedIn
              </Link>

              <Link
                href={`https://github.com/logicloom-app`}
                target="_blank"
                className="text-sm text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-300"
              >
                Github
              </Link>
            </div>
          </div>

          <div>
            <h6 className="mb-4">{dict?.legal?.title}</h6>

            <div className="text-sm text-slate-500 dark:text-slate-400 mb-2 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-300">
              <Link href="#">{dict?.legal?.terms}</Link>
            </div>

            <div className="text-sm text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-300">
              <Link href="#">{dict?.legal?.privacy}</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between p-4 md:p-0 md:px-4 xl:px-0 w-full max-w-[1200px] gap-2 text-sm text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2 mb-2 md:mb-0">
          <Link
            href={`https://www.linkedin.com/in/pakzadjs/`}
            target="_blank"
            className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-300"
          >
            <FaLinkedinIn size={18} />
          </Link>
          <Link
            href={`https://github.com/pakzadjs`}
            target="_blank"
            className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-300"
          >
            <FaGithub size={18} />
          </Link>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 text-center md:text-left">
          © {new Date().getFullYear()} LogicLoom. All rights reserved.
        </p>
      </div>
    </div>
  );
}
