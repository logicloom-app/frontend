import UpdateProfileForm from "./_components/UpdateProfileForm";
import { getDictionary } from "@/lib/utils/dictionary";

export default async function Info({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <UpdateProfileForm dict={dict?.dashboard?.info} />
    </div>
  );
}
