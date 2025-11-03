import { getDictionary } from "@/lib/utils/dictionary";
import BlogListClient from "./_components/BlogListClient";

export async function generateMetadata({ params }) {
  const { lang } = await params;

  return {
    title:
      lang === "de"
        ? "Blog - LogicLoom | Web Development Insights & Tutorials"
        : "Blog - LogicLoom | Web Development Insights & Tutorials",
    description:
      lang === "de"
        ? "Entdecken Sie unsere neuesten Artikel über Webentwicklung, Software-Entwicklung, Best Practices und technische Tutorials. Bleiben Sie auf dem Laufenden mit LogicLoom Blog."
        : "Discover our latest articles about web development, software engineering, best practices, and technical tutorials. Stay updated with LogicLoom Blog.",
    keywords:
      lang === "de"
        ? "Blog, Web Development Blog, Programming Tutorials, Software Development, Tech Articles"
        : "Blog, Web Development Blog, Programming Tutorials, Software Development, Tech Articles",
    openGraph: {
      title: lang === "de" ? "Blog - LogicLoom" : "Blog - LogicLoom",
      description:
        lang === "de"
          ? "Web Development Insights & Tutorials"
          : "Web Development Insights & Tutorials",
      type: "website",
      locale: lang === "de" ? "de_DE" : "en_US",
    },
  };
}

export default async function BlogPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <BlogListClient lang={lang} dict={dict?.blog || {}} />;
}
