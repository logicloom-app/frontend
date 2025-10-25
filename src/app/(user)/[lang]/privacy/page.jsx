import { getDictionary } from "@/lib/utils/dictionary";
import {
  Shield,
  Info,
  Database,
  Share2,
  UserCheck,
  Cookie,
  Lock,
  Scale,
  FileCheck,
  Trash2,
  Mail,
} from "lucide-react";
import BlurFade from "@/components/ui/blur-fade";

export default async function PrivacyPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="relative container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 pb-20 sm:pb-28 md:pb-32">
        <BlurFade delay={0.1} inView>
          <div className="max-w-5xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              {/* Icon */}
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-xl sm:blur-2xl opacity-40 animate-pulse"></div>
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl sm:shadow-2xl transform hover:scale-110 transition-transform duration-300">
                    <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent pb-1 leading-tight px-4">
                {dict?.privacyPage?.title || dict?.privacyPolicy || "Privacy Policy"}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg px-4">
                {dict?.privacyPage?.subtitle || "Your privacy matters to us"}
              </p>
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-4 sm:gap-6 mb-6 sm:mb-8">
              {/* Section 1: General Information */}
              <BlurFade delay={0.2} inView>
                <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-cyan-200 dark:border-cyan-900/30 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                      <Info className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-800 dark:text-gray-200">
                        {dict?.privacyPage?.section1?.title}
                      </h2>
                      <div className="space-y-1.5 sm:space-y-2 text-gray-700 dark:text-gray-300 text-xs sm:text-sm">
                        <p>{dict?.privacyPage?.section1?.website}</p>
                        <p className="font-semibold mt-3">
                          {dict?.privacyPage?.section1?.operator}
                        </p>
                        <p>{dict?.privacyPage?.section1?.operatorName}</p>
                        <p>{dict?.privacyPage?.section1?.location}</p>
                        <p className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-cyan-500" />
                          <a
                            href="mailto:hi@logicloom.de"
                            className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                          >
                            {dict?.privacyPage?.section1?.email}
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </BlurFade>

              {/* Section 2: Data Collection */}
              <BlurFade delay={0.25} inView>
                <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-cyan-200 dark:border-cyan-900/30 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
                      <Database className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-800 dark:text-gray-200">
                        {dict?.privacyPage?.section2?.title}
                      </h2>
                      <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                        <div>
                          <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                            {dict?.privacyPage?.section2?.dataTypes}
                          </p>
                          <p className="text-gray-700 dark:text-gray-300">
                            {dict?.privacyPage?.section2?.dataTypesDesc}
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                            {dict?.privacyPage?.section2?.purpose}
                          </p>
                          <ul className="space-y-1 ml-4">
                            {dict?.privacyPage?.section2?.purposes?.map(
                              (purpose, idx) => (
                                <li
                                  key={idx}
                                  className="text-gray-700 dark:text-gray-300 flex items-start gap-2"
                                >
                                  <span className="text-cyan-500 mt-1">•</span>
                                  <span>{purpose}</span>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                            {dict?.privacyPage?.section2?.methods}
                          </p>
                          <ul className="space-y-1 ml-4">
                            {dict?.privacyPage?.section2?.methodsList?.map(
                              (method, idx) => (
                                <li
                                  key={idx}
                                  className="text-gray-700 dark:text-gray-300 flex items-start gap-2"
                                >
                                  <span className="text-blue-500 mt-1">•</span>
                                  <span>{method}</span>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </BlurFade>

              {/* Section 3: Data Processing */}
              <BlurFade delay={0.3} inView>
                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-cyan-200 dark:border-cyan-900/30">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                      <Share2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-800 dark:text-gray-200">
                        {dict?.privacyPage?.section3?.title}
                      </h2>
                      <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                        <div>
                          <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                            {dict?.privacyPage?.section3?.thirdParty}
                          </p>
                          <p className="text-gray-700 dark:text-gray-300">
                            {dict?.privacyPage?.section3?.thirdPartyDesc}
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                            {dict?.privacyPage?.section3?.dataSharing}
                          </p>
                          <p className="text-gray-700 dark:text-gray-300">
                            {dict?.privacyPage?.section3?.dataSharingDesc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </BlurFade>

              {/* Section 4 & 5 Grid */}
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:auto-rows-fr">
                {/* Section 4: User Rights */}
                <BlurFade delay={0.35} inView className="h-full">
                  <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-green-200 dark:border-green-900/30 h-full flex flex-col">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-green-500 flex items-center justify-center flex-shrink-0">
                        <UserCheck className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <h2 className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-200">
                        {dict?.privacyPage?.section4?.title}
                      </h2>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      {dict?.privacyPage?.section4?.intro}
                    </p>
                    <ul className="space-y-1 text-xs sm:text-sm">
                      {dict?.privacyPage?.section4?.rights?.map((right, idx) => (
                        <li
                          key={idx}
                          className="text-gray-700 dark:text-gray-300 flex items-start gap-2"
                        >
                          <span className="text-green-500 mt-1">✓</span>
                          <span>{right}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-3 italic">
                      {dict?.privacyPage?.section4?.contact}
                    </p>
                  </div>
                </BlurFade>

                {/* Section 5: Cookies */}
                <BlurFade delay={0.4} inView className="h-full">
                  <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-orange-200 dark:border-orange-900/30 h-full flex flex-col">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-orange-500 flex items-center justify-center flex-shrink-0">
                        <Cookie className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <h2 className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-200">
                        {dict?.privacyPage?.section5?.title}
                      </h2>
                    </div>
                    <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                      <div>
                        <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                          {dict?.privacyPage?.section5?.cookies}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                          {dict?.privacyPage?.section5?.cookiesDesc}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                          {dict?.privacyPage?.section5?.analytics}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                          {dict?.privacyPage?.section5?.analyticsDesc}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                          {dict?.privacyPage?.section5?.settings}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                          {dict?.privacyPage?.section5?.settingsDesc}
                        </p>
                      </div>
                    </div>
                  </div>
                </BlurFade>
              </div>

              {/* Remaining Sections - Compact Cards */}
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:auto-rows-fr">
                {/* Section 6: Security */}
                <BlurFade delay={0.45} inView className="h-full">
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-purple-200 dark:border-purple-900/30 h-full flex flex-col">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2">
                      <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                      <h3 className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-200">
                        {dict?.privacyPage?.section6?.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                      {dict?.privacyPage?.section6?.description}
                    </p>
                  </div>
                </BlurFade>

                {/* Section 7: Legal Basis */}
                <BlurFade delay={0.5} inView className="h-full">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-blue-200 dark:border-blue-900/30 h-full flex flex-col">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2">
                      <Scale className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                      <h3 className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-200">
                        {dict?.privacyPage?.section7?.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      {dict?.privacyPage?.section7?.intro}
                    </p>
                    <ul className="space-y-1 text-xs">
                      {dict?.privacyPage?.section7?.bases?.map((basis, idx) => (
                        <li key={idx} className="text-gray-700 dark:text-gray-300">
                          • {basis}
                        </li>
                      ))}
                    </ul>
                  </div>
                </BlurFade>

                {/* Section 8: NDA */}
                <BlurFade delay={0.55} inView className="h-full">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-green-200 dark:border-green-900/30 h-full flex flex-col">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2">
                      <FileCheck className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                      <h3 className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-200">
                        {dict?.privacyPage?.section8?.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                      {dict?.privacyPage?.section8?.description}
                    </p>
                  </div>
                </BlurFade>

                {/* Section 9: Data Retention */}
                <BlurFade delay={0.6} inView className="h-full">
                  <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-red-200 dark:border-red-900/30 h-full flex flex-col">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2">
                      <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                      <h3 className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-200">
                        {dict?.privacyPage?.section9?.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                      {dict?.privacyPage?.section9?.description}
                    </p>
                  </div>
                </BlurFade>
              </div>

              {/* Section 10: Contact */}
              <BlurFade delay={0.65} inView>
                <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-cyan-200 dark:border-cyan-900/30 shadow-lg">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg sm:text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">
                        {dict?.privacyPage?.section10?.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 mb-2 sm:mb-3">
                        {dict?.privacyPage?.section10?.intro}
                      </p>
                      <div className="space-y-1 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                        <p className="font-semibold">
                          {dict?.privacyPage?.section10?.name}
                        </p>
                        <p className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-cyan-500" />
                          <a
                            href="mailto:hi@logicloom.de"
                            className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                          >
                            {dict?.privacyPage?.section10?.email}
                          </a>
                        </p>
                        <p>{dict?.privacyPage?.section10?.website}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </BlurFade>
            </div>

            {/* Footer Dates */}
            <BlurFade delay={0.7} inView>
              <div className="bg-gray-100 dark:bg-gray-800/50 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  {dict?.privacyPage?.effectiveDate} |{" "}
                  {dict?.privacyPage?.lastUpdated}
                </p>
              </div>
            </BlurFade>
          </div>
        </BlurFade>
      </div>
    </div>
  );
}
