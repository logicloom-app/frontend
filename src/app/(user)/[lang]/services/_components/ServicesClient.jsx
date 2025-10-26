"use client";

import {
  BiMobile,
  BiGlobe,
  BiPalette,
  BiCheckShield,
  BiCog,
  BiRocket,
} from "react-icons/bi";
import { GradientButton } from "@/components/ui/gradient-button";
import { TbArrowNarrowRight, TbCheck } from "react-icons/tb";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function ServicesClient({ dict, lang }) {
  const { theme } = useTheme();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const services = [
    {
      id: 1,
      title: dict?.mobileDev?.title || "Mobile App Development",
      description: dict?.mobileDev?.description,
      icon: <BiMobile className="w-8 h-8" />,
      features: [
        dict?.mobileDev?.features?.ios || "iOS app development",
        dict?.mobileDev?.features?.android || "Android app development",
        dict?.mobileDev?.features?.flutter || "Flutter app development",
      ],
      color: "from-blue-500 to-cyan-500",
      borderColor: "border-blue-200 dark:border-blue-900/50",
      shadowColor: "hover:shadow-blue-500/10",
    },
    {
      id: 2,
      title: dict?.webDev?.title || "Web App Development",
      description: dict?.webDev?.description,
      icon: <BiGlobe className="w-8 h-8" />,
      features: [
        dict?.webDev?.features?.pwa || "PWA development",
        dict?.webDev?.features?.webapp || "Website and web app creation",
        dict?.webDev?.features?.responsive || "Responsive design",
      ],
      color: "from-green-500 to-emerald-500",
      borderColor: "border-green-200 dark:border-green-900/50",
      shadowColor: "hover:shadow-green-500/10",
    },
    {
      id: 3,
      title: dict?.uiux?.title || "UI/UX Design",
      description: dict?.uiux?.description,
      icon: <BiPalette className="w-8 h-8" />,
      features: [
        dict?.uiux?.features?.wireframing || "Wireframing and prototyping",
        dict?.uiux?.features?.consulting || "UX consulting",
        dict?.uiux?.features?.design || "Product design",
      ],
      color: "from-purple-500 to-pink-500",
      borderColor: "border-purple-200 dark:border-purple-900/50",
      shadowColor: "hover:shadow-purple-500/10",
    },
    {
      id: 4,
      title: dict?.qa?.title || "QA Services",
      description: dict?.qa?.description,
      icon: <BiCheckShield className="w-8 h-8" />,
      features: [
        dict?.qa?.features?.testing || "Software testing",
        dict?.qa?.features?.functional || "Functional testing",
        dict?.qa?.features?.nonfunctional || "Non-functional testing",
      ],
      color: "from-orange-500 to-red-500",
      borderColor: "border-orange-200 dark:border-orange-900/50",
      shadowColor: "hover:shadow-orange-500/10",
    },
    {
      id: 5,
      title: dict?.devops?.title || "DevOps Services",
      description: dict?.devops?.description,
      icon: <BiCog className="w-8 h-8" />,
      features: [
        dict?.devops?.features?.cloud || "Cloud Infrastructure services",
        dict?.devops?.features?.cicd || "CI/CD services",
        dict?.devops?.features?.optimization || "Cloud cost optimization",
      ],
      color: "from-indigo-500 to-blue-500",
      borderColor: "border-indigo-200 dark:border-indigo-900/50",
      shadowColor: "hover:shadow-indigo-500/10",
    },
    {
      id: 6,
      title: dict?.startup?.title || "Startup Services",
      description: dict?.startup?.description,
      icon: <BiRocket className="w-8 h-8" />,
      features: [
        dict?.startup?.features?.discovery || "Discovery phase",
        dict?.startup?.features?.mvp || "MVP development",
        dict?.startup?.features?.cto || "CTO as a service",
      ],
      color: "from-yellow-500 to-orange-500",
      borderColor: "border-yellow-200 dark:border-yellow-900/50",
      shadowColor: "hover:shadow-yellow-500/10",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {isClient &&
        (theme === "dark" ? (
          <div className="fixed inset-0 bg-bottom bg-no-repeat z-0 bg-[url('/images/7-dark.png')] bg-cover opacity-20" />
        ) : (
          <div className="fixed inset-0 bg-bottom bg-no-repeat z-0 bg-[url('/images/8-dark.png')] bg-cover opacity-20" />
        ))}

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-4 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl relative group">
                <BiCog className="w-8 h-8 text-white relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 rounded-3xl blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl animate-pulse opacity-30" />
              </div>
            </div>
            <h1
              className={`text-4xl sm:text-5xl font-bold mb-6 pb-2 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-400 dark:via-teal-400 dark:to-cyan-400 bg-clip-text text-transparent leading-tight ${
                lang === "en" ? "lg:text-6xl" : "lg:text-5xl"
              }`}
            >
              {dict?.title}
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-8 font-medium">
              {dict?.subtitle}
            </p>
            <Link href={`/${lang}/contact`}>
              <button className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/40 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <span className="relative z-10">{dict?.sendRequest}</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Services Grid */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className={`group bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl ${service.shadowColor} transition-all duration-300 hover:-translate-y-2 border-2 ${service.borderColor} relative overflow-hidden`}
              >
                {/* Decorative Background Elements */}
                <div
                  className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} opacity-5 rounded-full blur-3xl group-hover:opacity-10 transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 relative`}
                  >
                    <div className="relative z-10 text-white drop-shadow-lg">
                      {service.icon}
                    </div>
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${service.color} rounded-2xl blur-lg opacity-50 group-hover:opacity-70 transition-opacity duration-300`}
                    />
                  </div>

                  <h3 className="text-2xl font-bold mb-4 dark:text-white">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <TbCheck className="w-5 h-5 text-emerald-500 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900/50 dark:to-gray-800/30 py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-400 dark:via-teal-400 dark:to-cyan-400 bg-clip-text text-transparent pb-1 leading-tight">
              {dict?.whyChooseUs?.title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((num, idx) => {
                const colors = [
                  "from-emerald-500 via-teal-500 to-cyan-500",
                  "from-teal-500 via-cyan-500 to-emerald-500",
                  "from-cyan-500 via-emerald-500 to-teal-500",
                  "from-emerald-500 via-cyan-500 to-teal-500",
                ];
                const borderColors = [
                  "border-emerald-200 dark:border-emerald-900/50",
                  "border-teal-200 dark:border-teal-900/50",
                  "border-cyan-200 dark:border-cyan-900/50",
                  "border-emerald-200 dark:border-emerald-900/50",
                ];
                return (
                  <div
                    key={num}
                    className={`bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 border-2 ${borderColors[idx]} group`}
                  >
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${colors[idx]} rounded-xl flex items-center justify-center font-bold text-xl mb-4 relative group-hover:scale-110 transition-transform duration-300`}
                    >
                      <span className="relative z-10 text-white drop-shadow-lg">
                        {num}
                      </span>
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${colors[idx]} rounded-xl blur-lg opacity-50 group-hover:opacity-70 transition-opacity duration-300`}
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-3 dark:text-white">
                      {dict?.whyChooseUs?.[`reason${num}`]?.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {dict?.whyChooseUs?.[`reason${num}`]?.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-[2rem] p-12 text-center text-white shadow-2xl shadow-emerald-500/20 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-white/10 to-transparent rounded-full blur-3xl" />

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                {dict?.readyToBuild}
              </h2>
              <p className="text-xl mb-8 opacity-90">{dict?.scheduleConsultation}</p>
              <Link href={`/${lang}/contact`} className="inline-block">
                <button className="bg-white text-emerald-700 font-bold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center gap-2 mx-auto hover:bg-gray-50 group">
                  <span>{dict?.sendRequest}</span>
                  <TbArrowNarrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
