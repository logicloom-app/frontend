import { getDictionary } from "@/lib/utils/dictionary";
import { Building2, Mail, Globe, FileText, Shield, Scale } from "lucide-react";
import BlurFade from "@/components/ui/blur-fade";

export default async function ImprintPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>

      <div className="relative container mx-auto px-4 py-20">
        <BlurFade delay={0.1} inView>
          <div className="max-w-5xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-12">
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur-2xl opacity-40 animate-pulse"></div>
                  <div className="relative w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300">
                    <Building2 className="w-10 h-10 text-white" />
                  </div>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400 bg-clip-text text-transparent pb-1 leading-tight">
                {dict?.imprintPage?.title || dict?.imprint || "Imprint"}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                {dict?.imprintPage?.subtitle || "Legal information according to German law"}
              </p>
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-6 mb-8">
              {/* Company Information Card */}
              <BlurFade delay={0.2} inView>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-orange-200 dark:border-orange-900/30 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">
                        {dict?.imprintPage?.section1Title}
                      </h2>
                      <div className="space-y-2 text-gray-700 dark:text-gray-300">
                        <p className="font-semibold text-lg">
                          {dict?.imprintPage?.companyName}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          {dict?.imprintPage?.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </BlurFade>

              {/* Contact Information Card */}
              <BlurFade delay={0.25} inView>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-orange-200 dark:border-orange-900/30 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">
                        {dict?.imprintPage?.contactTitle}
                      </h3>
                      <div className="space-y-2">
                        <p className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                          <Mail className="w-4 h-4 text-orange-500" />
                          <a
                            href="mailto:hi@logicloom.de"
                            className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                          >
                            hi@logicloom.de
                          </a>
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                          <Globe className="w-4 h-4 text-orange-500" />
                          <a
                            href="https://logicloom.de"
                            target="_blank"
                            className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                          >
                            https://logicloom.de
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </BlurFade>

              {/* VAT & Tax Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                <BlurFade delay={0.3} inView>
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 rounded-2xl p-6 border border-orange-200 dark:border-orange-900/30">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                        {dict?.imprintPage?.vatTitle}
                      </h3>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      {dict?.imprintPage?.vatInfo}
                    </p>
                  </div>
                </BlurFade>

                <BlurFade delay={0.35} inView>
                  <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 rounded-2xl p-6 border border-red-200 dark:border-red-900/30">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-red-500 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                        {dict?.imprintPage?.taxTitle}
                      </h3>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      {dict?.imprintPage?.taxInfo}
                    </p>
                  </div>
                </BlurFade>
              </div>

              {/* Responsible Person Card */}
              <BlurFade delay={0.4} inView>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-orange-200 dark:border-orange-900/30 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">
                        {dict?.imprintPage?.responsibleTitle}
                      </h3>
                      <div className="space-y-1 text-gray-700 dark:text-gray-300">
                        <p className="font-semibold text-lg">
                          {dict?.imprintPage?.responsibleName}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          {dict?.imprintPage?.responsibleLocation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </BlurFade>
            </div>

            {/* Disclaimer Section */}
            <BlurFade delay={0.45} inView>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg mt-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
                    <Scale className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    {dict?.imprintPage?.disclaimerTitle}
                  </h2>
                </div>

                <div className="space-y-6">
                  {/* Content Liability */}
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
                      {dict?.imprintPage?.contentLiabilityTitle}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                      {dict?.imprintPage?.contentLiability}
                    </p>
                  </div>

                  {/* Links Liability */}
                  <div className="border-l-4 border-red-500 pl-4">
                    <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
                      {dict?.imprintPage?.linksLiabilityTitle}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                      {dict?.imprintPage?.linksLiability}
                    </p>
                  </div>

                  {/* Copyright */}
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
                      {dict?.imprintPage?.copyrightTitle}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                      {dict?.imprintPage?.copyright}
                    </p>
                  </div>
                </div>

                {/* Last Updated */}
                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400 italic text-center">
                    {dict?.imprintPage?.lastUpdated}
                  </p>
                </div>
              </div>
            </BlurFade>
          </div>
        </BlurFade>
      </div>
    </div>
  );
}
