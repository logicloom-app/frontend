import { getDictionary } from "@/lib/utils/dictionary";
import AuthPageClient from "./_components/AuthPageClient";

export default async function AuthPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <AuthPageClient dict={dict.auth} />;
}
