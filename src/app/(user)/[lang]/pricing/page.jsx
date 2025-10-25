import {
  OnePageIllustration,
  MultiPageIllustration,
  EnterpriseIllustration,
} from "./_components/PricingIllustrations";
import Link from "next/link";
import { Check, Info } from "lucide-react";
import BlurFade from "@/components/ui/blur-fade";
import { getDictionary } from "@/lib/utils/dictionary";
import { featureIcons } from "./_components/featureIcons";
import { GradientButton } from "@/components/ui/gradient-button";

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
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 lg:mb-24">
          {/* One-Page Package */}
          <BlurFade delay={0.2} inView>
            <div className="relative group h-full lg:mt-16">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-3xl blur-lg opacity-25 group-hover:opacity-40 transition duration-300"></div>

              <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border-2 border-blue-200 dark:border-blue-900/30 h-full flex flex-col">
                {/* Header */}
                <div className="text-center mb-6">
                  {/* Illustration */}
                  <div className="relative mx-auto mb-4 w-24 h-24 flex items-center justify-center">
                    <OnePageIllustration />
                  </div>

                  <h2 className="text-3xl font-bold mb-2 text-gray-800 dark:text-gray-200">
                    {dict?.pricing?.onePager?.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {dict?.pricing?.onePager?.subtitle}
                  </p>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-yellow-300 dark:via-yellow-700 to-transparent mb-6"></div>

                {/* Features */}
                <div className="space-y-3 mb-8 flex-1">
                  {dict?.pricing?.onePager?.features?.map((feature, idx) => {
                    const IconComponent = featureIcons[idx] || Check;
                    return (
                      <div
                        key={idx}
                        className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300"
                      >
                        <div className="w-5 h-5 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <IconComponent className="w-3 h-3 text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <span>{feature}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Pricing */}
                <div className="text-center mb-6">
                  <div className="mb-2">
                    <span className="text-orange-500 dark:text-orange-400 line-through text-lg font-semibold">
                      €1,549
                    </span>
                  </div>
                  <div className="text-5xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 dark:from-yellow-400 dark:to-orange-400 bg-clip-text text-transparent">
                    €499
                  </div>
                </div>

                {/* CTA Button */}
                <Link href={`/${lang}/contact`}>
                  <GradientButton
                    variant="primary"
                    size="lg"
                    rounded="lg"
                    className="w-full"
                  >
                    {dict?.pricing?.cta}
                  </GradientButton>
                </Link>
              </div>
            </div>
          </BlurFade>

          {/* Multi-Pager Package */}
          <BlurFade delay={0.3} inView>
            <div className="relative group h-full">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-3xl blur-lg opacity-25 group-hover:opacity-40 transition duration-300"></div>

              {/* Popular Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                  ⭐ {dict?.pricing?.popular}
                </div>
              </div>

              <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border-2 border-purple-200 dark:border-purple-900/30 h-full flex flex-col">
                {/* Header */}
                <div className="text-center mb-6">
                  {/* Illustration */}
                  <div className="relative mx-auto mb-4 w-24 h-24 flex items-center justify-center">
                    <MultiPageIllustration />
                  </div>

                  <h2 className="text-3xl font-bold mb-2 text-gray-800 dark:text-gray-200">
                    {dict?.pricing?.multiPager?.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {dict?.pricing?.multiPager?.subtitle}
                  </p>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-purple-300 dark:via-purple-700 to-transparent mb-6"></div>

                {/* Features */}
                <div className="space-y-3 mb-8 flex-1">
                  {dict?.pricing?.multiPager?.features?.map((feature, idx) => {
                    const IconComponent = featureIcons[idx] || Check;
                    return (
                      <div
                        key={idx}
                        className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300"
                      >
                        <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <IconComponent className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                        </div>
                        <span>{feature}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Pricing */}
                <div className="text-center mb-6">
                  <div className="mb-2">
                    <span className="text-indigo-500 dark:text-indigo-400 line-through text-lg font-semibold">
                      €2,249
                    </span>
                  </div>
                  <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                    €699
                  </div>
                </div>

                {/* CTA Button */}
                <Link href={`/${lang}/contact`}>
                  <GradientButton
                    variant="primary"
                    size="lg"
                    rounded="lg"
                    className="w-full"
                  >
                    {dict?.pricing?.cta}
                  </GradientButton>
                </Link>
              </div>
            </div>
          </BlurFade>

          {/* Enterprise Package */}
          <BlurFade delay={0.4} inView>
            <div className="relative group h-full lg:mt-16">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl blur-lg opacity-25 group-hover:opacity-40 transition duration-300"></div>

              {/* Premium Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                  💎 Premium
                </div>
              </div>

              <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border-2 border-emerald-200 dark:border-emerald-900/30 h-full flex flex-col">
                {/* Header */}
                <div className="text-center mb-6">
                  {/* Illustration */}
                  <div className="relative mx-auto mb-4 w-24 h-24 flex items-center justify-center">
                    <EnterpriseIllustration />
                  </div>

                  <h2 className="text-3xl font-bold mb-2 text-gray-800 dark:text-gray-200">
                    {dict?.pricing?.enterprise?.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {dict?.pricing?.enterprise?.subtitle}
                  </p>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-emerald-300 dark:via-emerald-700 to-transparent mb-6"></div>

                {/* Features */}
                <div className="space-y-3 mb-8 flex-1">
                  {dict?.pricing?.enterprise?.features?.map((feature, idx) => {
                    const IconComponent = featureIcons[idx] || Check;
                    return (
                      <div
                        key={idx}
                        className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300"
                      >
                        <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <IconComponent className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <span>{feature}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Pricing */}
                <div className="text-center mb-6">
                  <div className="mb-2">
                    <span className="text-teal-500 dark:text-teal-400 line-through text-lg font-semibold">
                      €3,599
                    </span>
                  </div>
                  <div className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                    €1,649
                  </div>
                </div>

                {/* CTA Button */}
                <Link href={`/${lang}/contact`}>
                  <GradientButton
                    variant="success"
                    size="lg"
                    rounded="lg"
                    className="w-full"
                  >
                    {dict?.pricing?.cta}
                  </GradientButton>
                </Link>
              </div>
            </div>
          </BlurFade>
        </div>

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
