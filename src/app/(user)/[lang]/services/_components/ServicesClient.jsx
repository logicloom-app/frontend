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
    },
  ];

  return (
    <div className="min-h-screen">
      {isClient &&
        (theme === "dark" ? (
          <div className="fixed inset-0 bg-bottom bg-no-repeat z-0 bg-[url('/images/7-dark.png')] bg-cover opacity-40" />
        ) : (
          <div className="fixed inset-0 bg-bottom bg-no-repeat z-0 bg-[url('/images/8-dark.png')] bg-cover opacity-40" />
        ))}

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              {dict?.title}
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-8">
              {dict?.subtitle}
            </p>
            <Link href={`/${lang}/contact`}>
              <GradientButton variant="primary" size="lg">
                {dict?.sendRequest}
              </GradientButton>
            </Link>
          </div>
        </div>

        {/* Services Grid */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="group bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-[35px] p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 dark:border-gray-700"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  {service.icon}
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
                      <TbCheck className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300 text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900/50 dark:to-gray-800/30 py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-16 dark:text-white">
              {dict?.whyChooseUs?.title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((num) => (
                <div
                  key={num}
                  className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-[35px] p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-xl mb-4">
                    {num}
                  </div>
                  <h3 className="text-xl font-bold mb-3 dark:text-white">
                    {dict?.whyChooseUs?.[`reason${num}`]?.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {dict?.whyChooseUs?.[`reason${num}`]?.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-[35px] p-12 text-center text-white shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              {dict?.readyToBuild}
            </h2>
            <p className="text-xl mb-8 opacity-90">{dict?.scheduleConsultation}</p>
            <Link href={`/${lang}/contact`} className="inline-block">
              <button className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center gap-2 mx-auto hover:bg-blue-50">
                <span>{dict?.sendRequest}</span>
                <TbArrowNarrowRight className="w-6 h-6" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
