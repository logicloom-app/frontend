import Hero from "./_components/Hero";
import { getDictionary } from "@/lib/utils/dictionary";
import HomeSections from "./_components/HomeSections";

export default async function Home({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="">
      <Hero dict={dict.home} lang={lang} />

      <HomeSections dict={dict.home} lang={lang} />
    </div>
  );
}
