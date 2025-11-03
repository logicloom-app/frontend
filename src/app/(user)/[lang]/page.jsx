import Hero from "./_components/Hero";
import { getDictionary } from "@/lib/utils/dictionary";
import HomeSections from "./_components/HomeSections";

export async function generateMetadata({ params }) {
  const { lang } = await params;

  return {
    title:
      lang === "de"
        ? "LogicLoom - Moderne Webentwicklung & Digitale Lösungen"
        : "LogicLoom - Modern Web Development & Digital Solutions",
    description:
      lang === "de"
        ? "Professionelle Webentwicklung, maßgeschneiderte digitale Lösungen und innovative IT-Services für Ihr Unternehmen. Verwandeln Sie Ihre Vision in digitale Realität."
        : "Professional web development, custom digital solutions, and innovative IT services for your business. Turn your vision into digital reality.",
    keywords:
      lang === "de"
        ? "Webentwicklung, Web Development, IT Services, Digitale Lösungen, Software Development, Deutschland"
        : "Web Development, IT Services, Digital Solutions, Software Development, Custom Web Apps, Germany",
    openGraph: {
      title:
        lang === "de"
          ? "LogicLoom - Moderne Webentwicklung"
          : "LogicLoom - Modern Web Development",
      description:
        lang === "de"
          ? "Verwandeln Sie Ihre Vision in digitale Realität"
          : "Turn your vision into digital reality",
      type: "website",
      locale: lang === "de" ? "de_DE" : "en_US",
    },
  };
}

export default async function Home({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="">
      <Hero dict={dict.home} lang={lang} />

      <HomeSections dict={dict.home} lang={lang} />
    </div>
  );
}
