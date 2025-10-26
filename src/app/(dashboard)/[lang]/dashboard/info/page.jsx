import UpdateProfileForm from "./_components/UpdateProfileForm";
import { getDictionary } from "@/lib/utils/dictionary";

export default async function Info({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <UpdateProfileForm dict={dict?.dashboard?.info} />;
}
