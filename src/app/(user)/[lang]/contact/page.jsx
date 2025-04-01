import { getDictionary } from "@/lib/utils/dictionary";
import { TbBrandTelegram } from "react-icons/tb";
import Meteors from "@/components/ui/meteors";
import Link from "next/link";

export default async function Contact({ params }) {
  const theme =
    typeof window !== "undefined" ? localStorage.getItem("theme") : "light";
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="flex items-center justify-center h-[calc(100vh-100px)] relative overflow-hidden w-full px-4">
      {theme === "dark" ? (
        <div className="absolute inset-0 bg-bottom bg-no-repeat z-0 bg-[url('/images/1-dark.png')] bg-cover opacity-50" />
      ) : (
        <div className="absolute inset-0 bg-bottom bg-no-repeat z-0 bg-[url('/images/7-dark.png')] bg-cover opacity-40" />
      )}

      <div className="z-10 flex flex-col gap-2 items-center justify-center dark:bg-gray-800/50 bg-gray-200/50 backdrop-blur-sm rounded-3xl px-4 py-6 sm:px-6 sm:py-10 lg:text-lg max-w-md w-full shadow-lg hover:shadow-xl transition-shadow">
        <h1 className="text-xl sm:text-2xl font-bold">{dict?.contact?.title}</h1>

        <div className="flex flex-col items-center justify-center gap-2 bg-sky-500/10 rounded-2xl px-4 py-3 sm:px-6 sm:py-4 lg:text-lg  w-full">
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-1 text-nowrap ${
              lang === "de" && "text-sm"
            }`}
          >
            <p>{dict?.contact?.sendMessage}</p>
            <Link
              href="https://t.me/logicloomsupport"
              target="_blank"
              className="flex items-center gap-1 hover:text-sky-500 transition-all duration-300"
            >
              Telegram
              <TbBrandTelegram className="w-5 h-5 sm:w-6 sm:h-6 text-sky-500" />
            </Link>
          </div>
          <Link
            href="https://t.me/logicloomsupport"
            target="_blank"
            className="text-sm font-semibold hover:text-sky-500 transition-all duration-300"
          >
            @LogicLoomsupport
          </Link>
        </div>

        <span className="text-sm">{dict?.contact?.or}</span>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm w-full">
          <p className="">{dict?.contact?.sendEmail}</p>
          <a
            href="mailto:support@logicloom.app"
            className="hover:text-sky-500 font-semibold transition-all duration-300"
          >
            support@logicloom.app
          </a>
        </div>
      </div>

      <Meteors number={15} />
    </div>
  );
}
