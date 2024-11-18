import { getDictionary } from "@/lib/utils/dictionary";
import RequestsList from "./_components/RequestsList";

export default async function Requests({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <RequestsList dict={dict?.dashboard?.requests} lang={lang} />;
}
