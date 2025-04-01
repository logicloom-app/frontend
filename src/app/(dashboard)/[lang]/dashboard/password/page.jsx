import { getDictionary } from "@/lib/utils/dictionary";
import UpdatePasswordForm from "./UpdatePasswordForm";

export default async function Password({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <UpdatePasswordForm dict={dict?.dashboard?.password} />
    </div>
  );
}
