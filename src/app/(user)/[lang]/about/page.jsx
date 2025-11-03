import { getDictionary } from "@/lib/utils/dictionary";
import { Construction } from "lucide-react";
import BlurFade from "@/components/ui/blur-fade";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  
  return {
    title: lang === "de" 
      ? "Über Uns - LogicLoom | Unsere Mission & Vision" 
      : "About Us - LogicLoom | Our Mission & Vision",
    description: lang === "de"
      ? "Lernen Sie LogicLoom kennen - Ihr Partner für innovative Webentwicklung und digitale Transformation. Erfahren Sie mehr über unsere Mission, Vision und Werte."
      : "Learn about LogicLoom - Your partner for innovative web development and digital transformation. Discover our mission, vision, and values.",
    keywords: lang === "de"
      ? "Über LogicLoom, Unternehmen, Mission, Vision, Web Development Team, Deutschland"
      : "About LogicLoom, Company, Mission, Vision, Web Development Team, Germany",
    openGraph: {
      title: lang === "de" ? "Über Uns - LogicLoom" : "About Us - LogicLoom",
      description: lang === "de"
        ? "Lernen Sie unser Team und unsere Mission kennen"
        : "Learn about our team and mission",
      type: "website",
      locale: lang === "de" ? "de_DE" : "en_US",
    },
  };
}

export default async function AboutPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-20">
        <BlurFade delay={0.1} inView>
          <div className="max-w-4xl mx-auto text-center">
            {/* Icon */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
                <div className="relative w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <Construction className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent pb-2 leading-tight">
              {dict?.aboutUs || "About Us"}
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              {dict?.underConstruction ||
                "This page is currently under construction"}
            </p>

            {/* Description */}
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg">
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                {dict?.underConstructionMessage ||
                  "We're working hard to bring you something amazing. This page will be available soon with detailed information about our company, mission, and team."}
              </p>
            </div>

            {/* Decorative Elements */}
            <div className="mt-12 flex justify-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce delay-100"></div>
              <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        </BlurFade>
      </div>
    </div>
  );
}
