"use client";

import { BiBrain, BiCodeAlt, BiGlobe, BiMobile } from "react-icons/bi";
import { IconCloud } from "@/components/ui/icon-cloud";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { TbArrowNarrowRight } from "react-icons/tb";

const slugs = [
  "typescript",
  "javascript",
  "rust",
  "react",
  "go",
  "android",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "expo",
  "docker",
  "git",
  "django",
  "github",
  "gitlab",
  "androidstudio",
  "python",
  "figma",
];

export default function ServicesClient({ dict, lang }) {
  const { theme } = useTheme();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const images = slugs.map((slug) => `https://cdn.simpleicons.org/${slug}/${slug}`);

  const services = [
    {
      id: 1,
      title: dict?.service1?.title || "Software Development",
      description:
        dict?.service1?.description ||
        "Custom software solutions tailored to your business needs",
      icon: <BiCodeAlt size={26} className="text-rose-500 dark:text-rose-300" />,
      bgColor: "bg-rose-100 dark:bg-rose-900",
    },
    {
      id: 2,
      title: dict?.service2?.title || "Web Development",
      description:
        dict?.service2?.description || "Responsive and modern web applications",
      icon: <BiGlobe size={26} className="text-green-500 dark:text-green-300" />,
      bgColor: "bg-green-100 dark:bg-green-900",
    },
    {
      id: 3,
      title: dict?.service3?.title || "Mobile Development",
      description:
        dict?.service3?.description ||
        "Native and cross-platform mobile applications",
      icon: <BiMobile size={26} className="text-blue-500 dark:text-blue-300" />,
      bgColor: "bg-blue-100 dark:bg-blue-900",
    },
    {
      id: 4,
      title: dict?.service4?.title || "AI Solutions",
      description:
        dict?.service4?.description ||
        "Intelligent automation and data analysis solutions",
      icon: <BiBrain size={26} className="text-purple-500 dark:text-purple-300" />,
      bgColor: "bg-purple-100 dark:bg-purple-900",
    },
  ];

  return (
    <div className="container mx-auto px-8 py-16">
      {isClient &&
        (theme === "dark" ? (
          <div className="absolute inset-0 bg-bottom bg-no-repeat z-0 bg-[url('/images/7-dark.png')] bg-cover opacity-30" />
        ) : (
          <div className="absolute inset-0 bg-bottom bg-no-repeat z-0 bg-[url('/images/8-dark.png')] bg-cover opacity-30" />
        ))}

      {/* Services Hero */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-6">{dict?.title || "Our Services"}</h1>
        <p className="text-lg max-w-3xl mx-auto">
          {dict?.subtitle ||
            "We offer a range of professional services to help your business thrive in the digital landscape."}
        </p>
      </div>

      {/* Services List */}
      <div className="flex flex-wrap justify-center gap-8">
        {services.map((service) => (
          <div
            key={service.id}
            className={`flex-1 min-w-[250px] w-full sm:px-4 bg-white dark:bg-gray-800 rounded-3xl shadow-md p-6 hover:shadow-lg transition-shadow`}
          >
            <div className="mb-4">
              {/* You can replace this with actual icons */}
              <div
                className={`w-12 h-12 ${service.bgColor} rounded-full flex items-center justify-center`}
              >
                {service.icon}
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
          </div>
        ))}
      </div>

      {/* Why Choose Us Section */}
      <div className="mt-24">
        <h2 className="text-3xl font-bold text-center mb-12">
          {dict?.whyChooseUs?.title || "Why Choose Us"}
        </h2>

        <div className="flex flex-wrap justify-center gap-8">
          <div className="flex-1 min-w-[250px] md:max-w-[300px] sm:w-full sm:px-4 bg-gray-100 dark:bg-gray-800 p-6 rounded-3xl">
            <h3 className="text-xl font-semibold mb-3">
              {dict?.whyChooseUs?.reason1?.title || "Expertise"}
            </h3>
            <p>
              {dict?.whyChooseUs?.reason1?.description ||
                "Our team consists of experienced professionals with deep expertise in various technologies."}
            </p>
          </div>

          <div className="flex-1 min-w-[250px] md:max-w-[300px] sm:w-full sm:px-4 bg-gray-100 dark:bg-gray-800 p-6 rounded-3xl">
            <h3 className="text-xl font-semibold mb-3">
              {dict?.whyChooseUs?.reason2?.title || "Custom Solutions"}
            </h3>
            <p>
              {dict?.whyChooseUs?.reason2?.description ||
                "We create tailored solutions that address your specific business challenges."}
            </p>
          </div>

          <div className="flex-1 min-w-[250px] md:max-w-[300px] sm:w-full sm:px-4 bg-gray-100 dark:bg-gray-800 p-6 rounded-3xl">
            <h3 className="text-xl font-semibold mb-3">
              {dict?.whyChooseUs?.reason3?.title || "Support"}
            </h3>
            <p>
              {dict?.whyChooseUs?.reason3?.description ||
                "We provide ongoing support and maintenance for all our services."}
            </p>
          </div>
        </div>

        {/* Send Request Button */}
        <div className="flex items-center gap-4 pointer-events-auto justify-center mt-12">
          <Link href={`/${lang}/dashboard/requests`} className="relative group">
            <button className="relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-2xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95">
              <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
              <span className="relative z-10 block px-6 py-3 rounded-2xl bg-gray-950">
                <div className="relative z-10 flex items-center space-x-2">
                  <span className="transition-all duration-500 group-hover:translate-x-1">
                    {dict?.sendRequest}
                  </span>
                  <TbArrowNarrowRight className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1" />
                </div>
              </span>
            </button>
          </Link>
        </div>
      </div>

      <div className="relative flex size-full items-center justify-center overflow-hidden">
        <IconCloud images={images} />
      </div>
    </div>
  );
}
