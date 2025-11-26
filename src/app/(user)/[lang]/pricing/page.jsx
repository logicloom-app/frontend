import PricingClient from "./_components/PricingClient";
import { getDictionary } from "@/lib/utils/dictionary";
import BlurFade from "@/components/ui/blur-fade";
import { Info } from "lucide-react";

export async function generateMetadata({ params }) {
  const { lang } = await params;

  return {
    title:
      lang === "de"
        ? "Preise - LogicLoom | Transparente Web Development Pakete"
        : "Pricing - LogicLoom | Transparent Web Development Packages",
    description:
      lang === "de"
        ? "Faire und transparente Preise für Web Development. One-Pager ab €499, Multi-Page Websites ab €699, Enterprise Solutions ab €1.649. Professionelle Webentwicklung zum Festpreis."
        : "Fair and transparent pricing for web development. One-Pager from €499, Multi-Page Websites from €699, Enterprise Solutions from €1,649. Professional web development at fixed prices.",
    keywords:
      lang === "de"
        ? "Web Development Preise, Website Kosten, Webentwicklung Pakete, Festpreis Website"
        : "Web Development Pricing, Website Costs, Web Development Packages, Fixed Price Website",
    openGraph: {
      title: lang === "de" ? "Preise - LogicLoom" : "Pricing - LogicLoom",
      description:
        lang === "de"
          ? "Transparente Preise für professionelle Webentwicklung"
          : "Transparent pricing for professional web development",
      type: "website",
      locale: lang === "de" ? "de_DE" : "en_US",
    },
  };
}

export default async function PricingPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="relative container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 pb-20 sm:pb-28 md:pb-32">
        {/* Header Section */}
        <BlurFade delay={0.1} inView>
          <div className="text-center mb-12 sm:mb-16">
            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-white pb-1 leading-tight px-4">
              {dict?.pricing?.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg sm:text-xl px-4">
              {dict?.pricing?.subtitle}
            </p>
          </div>
        </BlurFade>

        {/* Pricing Cards */}
        <PricingClient lang={lang} dict={dict} />

        {/* Domain & Hosting Info */}
        <BlurFade delay={0.5} inView>
          <div className="max-w-7xl mx-auto mb-8">
            <div className="bg-blue-50 dark:bg-blue-950/30 border-2 border-blue-200 dark:border-blue-900/50 rounded-3xl p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                  <Info className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">
                    {dict?.pricing?.domainHosting?.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3 text-sm sm:text-base">
                    {dict?.pricing?.domainHosting?.description}
                  </p>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm">
                    {dict?.pricing?.domainHosting?.note}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </BlurFade>

        {/* Price Note */}
        <BlurFade delay={0.6} inView>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              {dict?.pricing?.priceNote}
            </p>
          </div>
        </BlurFade>
      </div>
    </div>
  );
}
