import { getDictionary } from "@/lib/utils/dictionary";
import ContactClient from "./_components/ContactClient";

export async function generateMetadata({ params }) {
  const { lang } = await params;

  return {
    title:
      lang === "de"
        ? "Kontakt - LogicLoom | Lassen Sie uns sprechen"
        : "Contact - LogicLoom | Let's Talk",
    description:
      lang === "de"
        ? "Kontaktieren Sie LogicLoom für Ihre Webentwicklungsprojekte. Wir sind hier, um Ihre digitale Vision Wirklichkeit werden zu lassen. Schnelle Antwortzeit innerhalb von 24 Stunden."
        : "Contact LogicLoom for your web development projects. We're here to make your digital vision a reality. Quick response time within 24 hours.",
    keywords:
      lang === "de"
        ? "Kontakt, LogicLoom kontaktieren, Anfrage senden, Web Development Beratung, Deutschland"
        : "Contact, Contact LogicLoom, Send Request, Web Development Consultation, Germany",
    openGraph: {
      title: lang === "de" ? "Kontakt - LogicLoom" : "Contact - LogicLoom",
      description:
        lang === "de"
          ? "Kontaktieren Sie uns für Ihr nächstes Projekt"
          : "Contact us for your next project",
      type: "website",
      locale: lang === "de" ? "de_DE" : "en_US",
    },
  };
}

export default async function Contact({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <ContactClient dict={dict?.contact} />;
}
