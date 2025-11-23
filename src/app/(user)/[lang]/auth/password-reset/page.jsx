import { getDictionary } from "@/lib/utils/dictionary";
import ResetPasswordClient from "./_components/ResetPasswordClient";

export const metadata = {
  title: "LogicLoom | Password Reset",
  description: "Reset your LogicLoom account password",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
  },
};

export default async function PasswordReset({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <ResetPasswordClient dict={dict.auth.passwordReset} />;
}
