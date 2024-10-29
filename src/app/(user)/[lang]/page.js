import { getDictionary } from "@/lib/utils/dictionary";
import Hero from "./_components/Hero";

export default async function Home({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="">
      <Hero dict={dict.home} lang={lang} />
    </div>
  );
}
