import type { Route } from "./+types/articles._index";
import sdk from "../lib/sdk";
import { ArticleCard } from "../components/custom/ArticleCard";

export async function loader({}: Route.LoaderArgs) {
  try {
    const articles = await sdk.collection("articles").find({
      populate: ["featuredImage", "author", "tags"],
      sort: ["publishedAt:desc"],
    });

    return { articles: articles.data || [] };
  } catch (error) {
    console.error("Error fetching articles:", error);
    return { articles: [] };
  }
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Mortgage Articles & Insights - Mortgages by Ram" },
    { name: "description", content: "Expert mortgage insights, guides, and market updates from Toronto's trusted mortgage agent. Learn about first-time home buying, refinancing, investment properties, and current Toronto mortgage rates." },
    { name: "keywords", content: "mortgage articles Toronto, first time home buyer guide, mortgage refinancing tips, investment property financing, Toronto mortgage rates 2025, mortgage pre-approval guide, mortgage advice" },
    { name: "author", content: "Ram Singh" },
    { name: "robots", content: "index, follow" },
    
    // Open Graph
    { property: "og:type", content: "website" },
    { property: "og:title", content: "Mortgage Articles & Insights - Mortgages by Ram" },
    { property: "og:description", content: "Expert mortgage insights, guides, and market updates from Toronto's trusted mortgage agent." },
    { property: "og:url", content: "https://mortgagesbyram.com/articles" },
    { property: "og:site_name", content: "Mortgages by Ram" },
    
    // Twitter
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: "Mortgage Articles & Insights - Mortgages by Ram" },
    { name: "twitter:description", content: "Expert mortgage insights, guides, and market updates from Toronto's trusted mortgage agent." },
  ];
}

const styles = {
  root: "min-h-screen bg-background",
  container: "container mx-auto px-4 py-8",
  header: "text-center mb-12",
  title: "text-4xl lg:text-5xl font-bold text-gray-900 mb-6",
  description: "text-xl text-gray-600 max-w-3xl mx-auto",
  grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
  empty: "text-center py-16",
  emptyTitle: "text-2xl font-semibold text-gray-900 mb-4",
  emptyText: "text-gray-600",
};

export default function ArticlesIndex({ loaderData }: Route.ComponentProps) {
  const { articles } = loaderData;

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Mortgage Articles & Insights</h1>
          <p className={styles.description}>
            Expert guidance, market insights, and practical tips to help you navigate the mortgage process in Toronto.
          </p>
        </div>

        <div className={styles.grid}>
          {articles.length > 0 ? (
            articles.map((article: any, index: number) => (
              <ArticleCard key={article.documentId || index} {...article} />
            ))
          ) : (
            <div className={styles.empty}>
              <h3 className={styles.emptyTitle}>No articles found</h3>
              <p className={styles.emptyText}>Check back soon for mortgage insights and guides.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
