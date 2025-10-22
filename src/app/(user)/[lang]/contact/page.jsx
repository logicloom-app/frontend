import { getDictionary } from "@/lib/utils/dictionary";
import ContactClient from "./_components/ContactClient";

export default async function Contact({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <ContactClient dict={dict?.contact} />;
}
