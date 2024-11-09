import { getDictionary } from "@/lib/utils/dictionary";
import LoomClient from "./_components/LoomClient";

export default async function LoomPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <LoomClient dict={dict.loom} />;
}
