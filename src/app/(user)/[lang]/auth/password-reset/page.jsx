import { getDictionary } from "@/lib/utils/dictionary";
import ResetPasswordClient from "./_components/ResetPasswordClient";

export default async function PasswordReset({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <ResetPasswordClient dict={dict.auth.passwordReset} />;
}
