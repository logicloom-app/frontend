import { getDictionary } from "@/lib/utils/dictionary";
import { TbBrandTelegram } from "react-icons/tb";
import Meteors from "@/components/ui/meteors";
import Link from "next/link";

export default async function Contact({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="flex flex-col gap-1 items-center justify-center h-[calc(100vh-100px)] relative overflow-hidden w-full">
      <h1 className="text-2xl font-bold">{dict?.contact?.title}</h1>

      <div className="flex flex-col items-center justify-center gap-2 bg-sky-500/10 rounded-3xl px-6 py-4 lg:text-lg md:text-base text-sm">
        <div className="flex items-center justify-center gap-1">
          <p>{dict?.contact?.sendMessage}</p>
          <Link
            href="https://t.me/logicloomsupport"
            target="_blank"
            className="flex items-center gap-1 hover:text-sky-500 transition-all duration-300"
          >
            Telegram
            <TbBrandTelegram className="w-6 h-6 text-sky-500" />
          </Link>
        </div>
        <Link
          href="https://t.me/logicloomsupport"
          target="_blank"
          className="text-sm hover:text-sky-500 transition-all duration-300"
        >
          @LogicLoomsupport
        </Link>
      </div>

      <span className="text-sm">{dict?.contact?.or}</span>

      <div className="flex items-center justify-center gap-2 text-sm">
        <p className="">{dict?.contact?.sendEmail}</p>
        <a
          href="mailto:support@logicloom.app"
          className="hover:text-sky-500 transition-all duration-300"
        >
          support@logicloom.app
        </a>
      </div>

      <Meteors number={15} />
    </div>
  );
}
