import { getDictionary } from "@/lib/utils/dictionary";
import RequestClient from "./_components/RequestClient";

export default async function RequestPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <RequestClient dict={dict?.request} />;
}
