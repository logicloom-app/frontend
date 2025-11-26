"use client";

import { GradientButton } from "@/components/ui/gradient-button";
import { getWebsitePackages } from "@/services/pricingService";
import BlurFade from "@/components/ui/blur-fade";
import { useQuery } from "@tanstack/react-query";
import { featureIcons } from "./featureIcons";
import { Check } from "lucide-react";
import Link from "next/link";
import {
  OnePageIllustration,
  MultiPageIllustration,
  EnterpriseIllustration,
} from "./PricingIllustrations";

export default function PricingClient({ lang, dict }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["website-packages"],
    queryFn: getWebsitePackages,
    retry: false,
  });

  const packages = data?.packages || [];

  // Map packages by slug for easy access
  const onePagePackage = packages.find((pkg) => pkg.slug === "one-page-website");
  const multiPagePackage = packages.find((pkg) => pkg.slug === "multi-page-website");
  const enterprisePackage = packages.find(
    (pkg) => pkg.slug === "enterprise-website"
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
      </div>
    );
  }

  if (error || !packages || packages.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-gray-600 dark:text-gray-400">
          {error ? "Error loading information" : "No information found"}
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 lg:mb-24">
        {/* One-Page Package */}
        {onePagePackage && (
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
                    {onePagePackage.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {onePagePackage.description}
                  </p>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-yellow-300 dark:via-yellow-700 to-transparent mb-6"></div>

                {/* Features */}
                <div className="space-y-3 mb-8 flex-1">
                  {onePagePackage.features?.map((feature, idx) => {
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
                  {onePagePackage.original_price && (
                    <div className="mb-2">
                      <span className="text-orange-500 dark:text-orange-400 line-through text-lg font-semibold">
                        €{onePagePackage.original_price.toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="text-5xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 dark:from-yellow-400 dark:to-orange-400 bg-clip-text text-transparent">
                    €{onePagePackage.discounted_price?.toLocaleString()}
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
        )}

        {/* Multi-Pager Package */}
        {multiPagePackage && (
          <BlurFade delay={0.3} inView>
            <div className="relative group h-full">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-3xl blur-lg opacity-25 group-hover:opacity-40 transition duration-300"></div>

              {/* Popular Badge */}
              {multiPagePackage.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    ⭐ {multiPagePackage.badge}
                  </div>
                </div>
              )}

              <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border-2 border-purple-200 dark:border-purple-900/30 h-full flex flex-col">
                {/* Header */}
                <div className="text-center mb-6">
                  {/* Illustration */}
                  <div className="relative mx-auto mb-4 w-24 h-24 flex items-center justify-center">
                    <MultiPageIllustration />
                  </div>

                  <h2 className="text-3xl font-bold mb-2 text-gray-800 dark:text-gray-200">
                    {multiPagePackage.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {multiPagePackage.description}
                  </p>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-purple-300 dark:via-purple-700 to-transparent mb-6"></div>

                {/* Features */}
                <div className="space-y-3 mb-8 flex-1">
                  {multiPagePackage.features?.map((feature, idx) => {
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
                  {multiPagePackage.original_price && (
                    <div className="mb-2">
                      <span className="text-indigo-500 dark:text-indigo-400 line-through text-lg font-semibold">
                        €{multiPagePackage.original_price.toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                    €{multiPagePackage.discounted_price?.toLocaleString()}
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
        )}

        {/* Enterprise Package */}
        {enterprisePackage && (
          <BlurFade delay={0.4} inView>
            <div className="relative group h-full lg:mt-16">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl blur-lg opacity-25 group-hover:opacity-40 transition duration-300"></div>

              {/* Premium Badge */}
              {enterprisePackage.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    💎 {enterprisePackage.badge}
                  </div>
                </div>
              )}

              <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border-2 border-emerald-200 dark:border-emerald-900/30 h-full flex flex-col">
                {/* Header */}
                <div className="text-center mb-6">
                  {/* Illustration */}
                  <div className="relative mx-auto mb-4 w-24 h-24 flex items-center justify-center">
                    <EnterpriseIllustration />
                  </div>

                  <h2 className="text-3xl font-bold mb-2 text-gray-800 dark:text-gray-200">
                    {enterprisePackage.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {enterprisePackage.description}
                  </p>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-emerald-300 dark:via-emerald-700 to-transparent mb-6"></div>

                {/* Features */}
                <div className="space-y-3 mb-8 flex-1">
                  {enterprisePackage.features?.map((feature, idx) => {
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
                  {enterprisePackage.original_price && (
                    <div className="mb-2">
                      <span className="text-teal-500 dark:text-teal-400 line-through text-lg font-semibold">
                        €{enterprisePackage.original_price.toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                    €{enterprisePackage.discounted_price?.toLocaleString()}
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
        )}
      </div>
    </>
  );
}
