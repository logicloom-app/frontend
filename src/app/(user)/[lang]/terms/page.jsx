import { getDictionary } from "@/lib/utils/dictionary";
import {
  FileText,
  Briefcase,
  FileSignature,
  Wrench,
  Users,
  DollarSign,
  Copyright,
  ShieldCheck,
  AlertTriangle,
  Database,
  Clock,
  Gavel,
} from "lucide-react";
import BlurFade from "@/components/ui/blur-fade";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  
  return {
    title: lang === "de" 
      ? "AGB - LogicLoom | Allgemeine Geschäftsbedingungen" 
      : "Terms & Conditions - LogicLoom | Terms of Service",
    description: lang === "de"
      ? "Allgemeine Geschäftsbedingungen von LogicLoom. Lesen Sie unsere Nutzungsbedingungen, Zahlungsbedingungen und rechtliche Vereinbarungen."
      : "Terms and Conditions of LogicLoom. Read our terms of use, payment terms, and legal agreements.",
    keywords: lang === "de"
      ? "AGB, Allgemeine Geschäftsbedingungen, Terms, Nutzungsbedingungen, Rechtliches"
      : "Terms and Conditions, Terms of Service, Legal Terms, Terms of Use",
    robots: "index, follow",
    openGraph: {
      title: lang === "de" ? "AGB - LogicLoom" : "Terms & Conditions - LogicLoom",
      type: "website",
      locale: lang === "de" ? "de_DE" : "en_US",
    },
  };
}

export default async function TermsPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>

      <div className="relative container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 pb-20 sm:pb-28 md:pb-32">
        <BlurFade delay={0.1} inView>
          <div className="max-w-5xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              {/* Icon */}
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full blur-xl sm:blur-2xl opacity-40 animate-pulse"></div>
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl sm:shadow-2xl transform hover:scale-110 transition-transform duration-300">
                    <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent pb-1 leading-tight px-4">
                {dict?.termsPage?.title ||
                  dict?.termsConditions ||
                  "Terms & Conditions"}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg px-4">
                {dict?.termsPage?.subtitle || "Your rights and obligations"}
              </p>
            </div>

            {/* Main Content */}
            <div className="grid gap-4 sm:gap-6 mb-6 sm:mb-8">
              {/* Section 1: Scope */}
              <BlurFade delay={0.2} inView>
                <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-green-200 dark:border-green-900/30 shadow-lg">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-800 dark:text-gray-200">
                        {dict?.termsPage?.section1?.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 mb-2">
                        {dict?.termsPage?.section1?.intro}
                      </p>
                      <ul className="space-y-1.5 text-xs sm:text-sm">
                        {dict?.termsPage?.section1?.points?.map((point, idx) => (
                          <li
                            key={idx}
                            className="text-gray-700 dark:text-gray-300 flex items-start gap-2"
                          >
                            <span className="text-green-500 mt-1 flex-shrink-0">
                              •
                            </span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </BlurFade>

              {/* Section 2 & 3 Grid */}
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:auto-rows-fr">
                {/* Section 2: Contract Formation */}
                <BlurFade delay={0.25} inView className="h-full">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-green-200 dark:border-green-900/30 h-full flex flex-col">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <FileSignature className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                      <h3 className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-200">
                        {dict?.termsPage?.section2?.title}
                      </h3>
                    </div>
                    <ul className="space-y-1.5 text-xs sm:text-sm flex-1">
                      {dict?.termsPage?.section2?.points?.map((point, idx) => (
                        <li
                          key={idx}
                          className="text-gray-700 dark:text-gray-300 flex items-start gap-2"
                        >
                          <span className="text-emerald-500 mt-1 flex-shrink-0">
                            ✓
                          </span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </BlurFade>

                {/* Section 4: Customer Obligations */}
                <BlurFade delay={0.3} inView className="h-full">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-blue-200 dark:border-blue-900/30 h-full flex flex-col">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                      <h3 className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-200">
                        {dict?.termsPage?.section4?.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                      {dict?.termsPage?.section4?.description}
                    </p>
                  </div>
                </BlurFade>
              </div>

              {/* Section 3: Scope of Services */}
              <BlurFade delay={0.35} inView>
                <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-green-200 dark:border-green-900/30 shadow-lg">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                      <Wrench className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg sm:text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">
                        {dict?.termsPage?.section3?.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 mb-2">
                        {dict?.termsPage?.section3?.intro}
                      </p>
                      <ul className="space-y-1 text-xs sm:text-sm mb-3">
                        {dict?.termsPage?.section3?.services?.map((service, idx) => (
                          <li
                            key={idx}
                            className="text-gray-700 dark:text-gray-300 flex items-start gap-2"
                          >
                            <span className="text-purple-500 mt-1 flex-shrink-0">
                              ▸
                            </span>
                            <span className="font-semibold">{service}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="space-y-2 text-xs sm:text-sm">
                        {dict?.termsPage?.section3?.details?.map((detail, idx) => (
                          <p key={idx} className="text-gray-700 dark:text-gray-300">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </BlurFade>

              {/* Section 5: Payment Terms */}
              <BlurFade delay={0.4} inView>
                <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-amber-200 dark:border-amber-900/30 shadow-lg">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                      <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg sm:text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">
                        {dict?.termsPage?.section5?.title}
                      </h2>
                      <p className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        {dict?.termsPage?.section5?.intro}
                      </p>
                      <ul className="space-y-1 text-xs sm:text-sm mb-3">
                        {dict?.termsPage?.section5?.payments?.map((payment, idx) => (
                          <li
                            key={idx}
                            className="text-gray-700 dark:text-gray-300 flex items-start gap-2"
                          >
                            <span className="text-amber-500 mt-1 flex-shrink-0">
                              💰
                            </span>
                            <span>{payment}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1.5">
                        {dict?.termsPage?.section5?.cancellation}
                      </p>
                      <ul className="space-y-1 text-xs sm:text-sm mb-2">
                        {dict?.termsPage?.section5?.cancellationRules?.map(
                          (rule, idx) => (
                            <li
                              key={idx}
                              className="text-gray-700 dark:text-gray-300 flex items-start gap-2"
                            >
                              <span className="text-red-500 mt-1 flex-shrink-0">
                                →
                              </span>
                              <span>{rule}</span>
                            </li>
                          )
                        )}
                      </ul>
                      <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 italic mt-2">
                        {dict?.termsPage?.section5?.delay}
                      </p>
                    </div>
                  </div>
                </div>
              </BlurFade>

              {/* Section 6 & 7 Grid */}
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:auto-rows-fr">
                {/* Section 6: Copyright */}
                <BlurFade delay={0.45} inView className="h-full">
                  <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-indigo-200 dark:border-indigo-900/30 h-full flex flex-col">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <Copyright className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                      <h3 className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-200">
                        {dict?.termsPage?.section6?.title}
                      </h3>
                    </div>
                    <ul className="space-y-1.5 text-xs sm:text-sm flex-1">
                      {dict?.termsPage?.section6?.points?.map((point, idx) => (
                        <li
                          key={idx}
                          className="text-gray-700 dark:text-gray-300 flex items-start gap-2"
                        >
                          <span className="text-indigo-500 mt-1 flex-shrink-0">
                            ©
                          </span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </BlurFade>

                {/* Section 7: Confidentiality */}
                <BlurFade delay={0.5} inView className="h-full">
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-purple-200 dark:border-purple-900/30 h-full flex flex-col">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                      <h3 className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-200">
                        {dict?.termsPage?.section7?.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                      {dict?.termsPage?.section7?.description}
                    </p>
                  </div>
                </BlurFade>
              </div>

              {/* Section 8, 9, 10, 11 - Compact Grid */}
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:auto-rows-fr">
                {/* Section 8: Liability */}
                <BlurFade delay={0.55} inView className="h-full">
                  <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-red-200 dark:border-red-900/30 h-full flex flex-col">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2">
                      <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                      <h3 className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-200">
                        {dict?.termsPage?.section8?.title}
                      </h3>
                    </div>
                    <ul className="space-y-1 text-xs sm:text-sm flex-1">
                      {dict?.termsPage?.section8?.points?.map((point, idx) => (
                        <li
                          key={idx}
                          className="text-gray-700 dark:text-gray-300 flex items-start gap-2"
                        >
                          <span className="text-red-500 mt-1 flex-shrink-0">!</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </BlurFade>

                {/* Section 9: Data Protection */}
                <BlurFade delay={0.6} inView className="h-full">
                  <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-cyan-200 dark:border-cyan-900/30 h-full flex flex-col">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2">
                      <Database className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
                      <h3 className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-200">
                        {dict?.termsPage?.section9?.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                      {dict?.termsPage?.section9?.description}
                    </p>
                  </div>
                </BlurFade>

                {/* Section 10: Term and Termination */}
                <BlurFade delay={0.65} inView className="h-full">
                  <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950/30 dark:to-amber-950/30 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-yellow-200 dark:border-yellow-900/30 h-full flex flex-col">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
                      <h3 className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-200">
                        {dict?.termsPage?.section10?.title}
                      </h3>
                    </div>
                    <ul className="space-y-1 text-xs sm:text-sm flex-1">
                      {dict?.termsPage?.section10?.points?.map((point, idx) => (
                        <li
                          key={idx}
                          className="text-gray-700 dark:text-gray-300 flex items-start gap-2"
                        >
                          <span className="text-yellow-500 mt-1 flex-shrink-0">
                            ⏱
                          </span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </BlurFade>

                {/* Section 11: Final Provisions */}
                <BlurFade delay={0.7} inView className="h-full">
                  <div className="bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-800/50 dark:to-slate-900/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-gray-300 dark:border-gray-700 h-full flex flex-col">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2">
                      <Gavel className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
                      <h3 className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-200">
                        {dict?.termsPage?.section11?.title}
                      </h3>
                    </div>
                    <ul className="space-y-1 text-xs sm:text-sm flex-1">
                      {dict?.termsPage?.section11?.points?.map((point, idx) => (
                        <li
                          key={idx}
                          className="text-gray-700 dark:text-gray-300 flex items-start gap-2"
                        >
                          <span className="text-gray-500 mt-1 flex-shrink-0">§</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </BlurFade>
              </div>

              {/* Contact Section */}
              <BlurFade delay={0.75} inView>
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white shadow-xl">
                  <div className="text-center">
                    <h3 className="text-lg sm:text-xl font-bold mb-2">
                      {dict?.termsPage?.contact?.name}
                    </h3>
                    <p className="text-sm sm:text-base font-semibold mb-1">
                      {dict?.termsPage?.contact?.company}
                    </p>
                    <p className="text-xs sm:text-sm opacity-90 mb-1">
                      {dict?.termsPage?.contact?.location}
                    </p>
                    <p className="text-xs sm:text-sm opacity-90">
                      {dict?.termsPage?.contact?.email}
                    </p>
                  </div>
                </div>
              </BlurFade>
            </div>

            {/* Footer Date */}
            <BlurFade delay={0.8} inView>
              <div className="bg-gray-100 dark:bg-gray-800/50 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 italic">
                  {dict?.termsPage?.lastUpdated}
                </p>
              </div>
            </BlurFade>
          </div>
        </BlurFade>
      </div>
    </div>
  );
}
