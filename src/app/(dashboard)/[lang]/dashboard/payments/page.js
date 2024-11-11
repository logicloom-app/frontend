import { getDictionary } from "@/lib/utils/dictionary";
import PaymentsList from "./_components/PaymentsList";

export default async function Payments({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <PaymentsList dict={dict?.dashboard?.payments} />;
}
