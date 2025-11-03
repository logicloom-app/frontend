import { getDictionary } from "@/lib/utils/dictionary";
import BlogPostClient from "../_components/BlogPostClient";
import { getBlogPostBySlug } from "@/services/blogService";

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  
  try {
    const post = await getBlogPostBySlug(slug);
    
    return {
      title: post.seo_title || `${post.title} - LogicLoom Blog`,
      description: post.seo_description || post.excerpt || post.title,
      keywords: post.seo_keywords || [],
      authors: [{ name: "LogicLoom" }],
      openGraph: {
        title: post.seo_title || post.title,
        description: post.seo_description || post.excerpt,
        type: "article",
        publishedTime: post.published_at || post.created_at,
        authors: ["LogicLoom"],
        locale: lang === "de" ? "de_DE" : "en_US",
        images: post.cover_image_url ? [{
          url: post.cover_image_url,
          alt: post.title,
        }] : [],
      },
      twitter: {
        card: "summary_large_image",
        title: post.seo_title || post.title,
        description: post.seo_description || post.excerpt,
        images: post.cover_image_url ? [post.cover_image_url] : [],
      },
      alternates: post.canonical_url ? {
        canonical: post.canonical_url,
      } : {},
    };
  } catch (error) {
    return {
      title: "Blog Post - LogicLoom",
      description: "Read our latest blog post",
    };
  }
}

export default async function BlogPostPage({ params }) {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang);

  return <BlogPostClient lang={lang} slug={slug} dict={dict?.blog || {}} />;
}

