import type { Route } from "./+types/articles.$slug";
import sdk from "../lib/sdk";
import { ArticleDetail } from "../components/custom/ArticleDetail";

export async function loader({ params }: Route.LoaderArgs) {
  const { slug } = params;
  
  if (!slug) {
    throw new Response("Article slug is required", { status: 400 });
  }

  try {
    const articles = await sdk.collection("articles").find({
      filters: { slug: { $eq: slug } },
      populate: ["featuredImage", "author.image", "tags"],
    });

    const article = articles.data?.[0];

    if (!article) {
      throw new Response("Article not found", { status: 404 });
    }

    return { article };
  } catch (error) {
    console.error("Error fetching article:", error);
    throw new Response("Article not found", { status: 404 });
  }
}

export function meta({ loaderData }: Route.MetaArgs) {
  const article = loaderData?.article;
  
  if (!article) {
    return [
      { title: "Article Not Found - Mortgages by Ram" },
      { name: "description", content: "The requested article could not be found." },
      { name: "robots", content: "noindex, nofollow" },
    ];
  }

  const publishedDate = new Date(article.publishedAt).toISOString();
  const modifiedDate = new Date(article.updatedAt).toISOString();
  const articleUrl = `https://mortgagesbyram.com/articles/${article.slug}`;

  return [
    { title: `${article.title} - Mortgages by Ram` },
    { name: "description", content: article.description || "Expert mortgage insights from Toronto's trusted mortgage agent." },
    { name: "keywords", content: "mortgage advice Toronto, mortgage tips, home buying guide, mortgage rates, first time home buyer, refinancing, investment property" },
    { name: "author", content: article.author?.fullName || "Ram Singh" },
    { name: "robots", content: "index, follow" },
    { name: "article:author", content: article.author?.fullName || "Ram Singh" },
    { name: "article:published_time", content: publishedDate },
    { name: "article:modified_time", content: modifiedDate },
    { name: "article:section", content: "Mortgage Advice" },
    { name: "article:tag", content: "mortgage, Toronto, real estate, home buying" },
    
    // Open Graph
    { property: "og:type", content: "article" },
    { property: "og:title", content: article.title },
    { property: "og:description", content: article.description || "Expert mortgage insights from Toronto's trusted mortgage agent." },
    { property: "og:url", content: articleUrl },
    { property: "og:site_name", content: "Mortgages by Ram" },
    { property: "og:locale", content: "en_CA" },
    { property: "article:author", content: article.author?.fullName || "Ram Singh" },
    { property: "article:published_time", content: publishedDate },
    { property: "article:modified_time", content: modifiedDate },
    { property: "article:section", content: "Mortgage Advice" },
    { property: "article:tag", content: "mortgage, Toronto, real estate, home buying" },
    
    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: article.title },
    { name: "twitter:description", content: article.description || "Expert mortgage insights from Toronto's trusted mortgage agent." },
    { name: "twitter:creator", content: "@mortgagesbyram" },
    
    // Additional SEO
    { name: "geo.region", content: "CA-ON" },
    { name: "geo.placename", content: "Toronto" },
  ];
}

export default function ArticleSlug({ loaderData }: Route.ComponentProps) {
  const { article } = loaderData;

  return <ArticleDetail {...article} />;
}
