import { getDictionary } from "@/lib/utils/dictionary";
import AuthPageClient from "./_components/AuthPageClient";

export const metadata = {
  title: "LogicLoom | Authentication",
  description: "Login or register to access your LogicLoom account",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
  },
};

export default async function AuthPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <AuthPageClient dict={dict.auth} />;
}
