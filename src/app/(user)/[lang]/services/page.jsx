import { getDictionary } from "@/lib/utils/dictionary";
import ServicesClient from "./_components/ServicesClient";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  
  return {
    title: lang === "de" 
      ? "Unsere Dienstleistungen - LogicLoom | Web & Software Development" 
      : "Our Services - LogicLoom | Web & Software Development",
    description: lang === "de"
      ? "Entdecken Sie unsere umfassenden Web Development Services: Custom Web Apps, E-Commerce, MVP Development, QA Testing und DevOps. Moderne Technologien für Ihr Business."
      : "Discover our comprehensive web development services: Custom Web Apps, E-Commerce, MVP Development, QA Testing, and DevOps. Modern technologies for your business.",
    keywords: lang === "de"
      ? "Web Development, Software Entwicklung, E-Commerce, MVP, DevOps, QA Testing, Custom Web Apps"
      : "Web Development, Software Development, E-Commerce, MVP, DevOps, QA Testing, Custom Web Apps",
    openGraph: {
      title: lang === "de" ? "Unsere Dienstleistungen - LogicLoom" : "Our Services - LogicLoom",
      description: lang === "de"
        ? "Umfassende Web Development Services für Ihr Unternehmen"
        : "Comprehensive web development services for your business",
      type: "website",
      locale: lang === "de" ? "de_DE" : "en_US",
    },
  };
}

export default async function Services({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <ServicesClient dict={dict.services} lang={lang} />;
}
