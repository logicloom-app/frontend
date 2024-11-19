import Meteors from "@/components/ui/meteors";

export default function Contact() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)] relative overflow-hidden w-full">
      <h1 className="text-2xl font-bold">Contact</h1>
      <div className="flex items-center justify-center gap-2 md:text-lg text-sm">
        <p className="">Send us an email at</p>
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
