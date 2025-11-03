import { getDictionary } from "@/lib/utils/dictionary";
import RequestClient from "./_components/RequestClient";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  
  return {
    title: lang === "de" 
      ? "Anfrage Senden - LogicLoom | Projekt Starten" 
      : "Send Request - LogicLoom | Start Your Project",
    description: lang === "de"
      ? "Senden Sie uns Ihre Projektanfrage und lassen Sie uns gemeinsam Ihre digitale Vision verwirklichen. Schnelle Bearbeitung und professionelle Beratung."
      : "Send us your project request and let's bring your digital vision to life together. Quick processing and professional consultation.",
    keywords: lang === "de"
      ? "Projektanfrage, Angebot anfordern, Web Development Anfrage, Projekt starten"
      : "Project Request, Request Quote, Web Development Inquiry, Start Project",
    openGraph: {
      title: lang === "de" ? "Anfrage Senden - LogicLoom" : "Send Request - LogicLoom",
      description: lang === "de"
        ? "Starten Sie Ihr Projekt mit uns"
        : "Start your project with us",
      type: "website",
      locale: lang === "de" ? "de_DE" : "en_US",
    },
  };
}

export default async function RequestPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <RequestClient dict={dict?.request} />;
}
