import { Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BsGithub } from "react-icons/bs";

export default function Footer({ dict, lang }) {
  return (
    <div className="z-0 flex flex-col items-center justify-between gap-4 p-4 h-[300px] border-t border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between gap-4 w-full max-w-[1200px] py-4">
        <div className="flex flex-col gap-3">
          <Link href={`/${lang}`} className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              width={40}
              height={40}
              alt="LogicLoom logo"
              priority
              className="saturate-200"
            />
            <h1 className="text-xl">LogicLoom</h1>
          </Link>
          <p>{dict?.description}</p>
        </div>

        <div className="flex gap-10 mr-14">
          <div>
            <h6 className="mb-4">{dict?.socials?.title}</h6>

            <div className="flex flex-col gap-2">
              <Link
                href={`mailto:info@logicloom.de`}
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
                href={`https://github.com/pakzadjs`}
                target="_blank"
                className="text-sm text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-300"
              >
                Github
              </Link>

              <Link
                href={`https://www.freelancer.com/u/pakzadjs`}
                target="_blank"
                className="text-sm text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-300"
              >
                Freelancer.com
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

      <div className="flex items-center justify-end w-full max-w-[1200px] gap-2 text-sm text-slate-500 dark:text-slate-400">
        {/* <Link
          href="https://github.com/pakzadjs"
          target="_blank"
          className="hover:text-cyan-500 transition-all duration-300 rounded-full"
        >
          <BsGithub
            size={20}
            className="shadow-lg shadow-cyan-500/50 rounded-full"
          />
        </Link> */}
        <p>{dict?.copyright}</p>
      </div>
    </div>
  );
}
