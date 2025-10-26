import { getDictionary } from "@/lib/utils/dictionary";
import UpdatePasswordForm from "./UpdatePasswordForm";

export default async function Password({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <UpdatePasswordForm dict={dict?.dashboard?.password} />;
}
