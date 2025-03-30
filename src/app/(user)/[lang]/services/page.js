import { getDictionary } from "@/lib/utils/dictionary";
import ServicesClient from "./_components/ServicesClient";

export default async function Services({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <ServicesClient dict={dict.services} lang={lang} />;
}
