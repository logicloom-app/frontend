import { getDictionary } from "@/lib/utils/dictionary";
import DashboardClient from "./_components/DashboardClient";

export default async function Dashboard({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <DashboardClient lang={lang} dict={dict?.dashboard} />;
}
