import type { Route } from "./+types/sitemap.xml";
import { getArticles, getGlobal, getPages } from "../lib/api";

export async function loader({}: Route.LoaderArgs) {
  try {
    const [articlesResponse, globalResponse, pagesResponse] = await Promise.all([
      getArticles(),
      getGlobal(),
      getPages(),
    ]);

    const articles = articlesResponse?.data || [];
    const global = globalResponse?.data;
    const pages = pagesResponse?.data || [];
    const baseUrl = "https://mortgagesbyram.com";
    const currentDate = new Date().toISOString();

    // Static pages that should be in sitemap
    const staticPages = [
      { url: "/", priority: "1.0", changefreq: "weekly" },
      { url: "/articles", priority: "0.8", changefreq: "weekly" },
      { url: "/pages/about", priority: "0.7", changefreq: "monthly" },
      { url: "/pages/contact", priority: "0.7", changefreq: "monthly" },
      { url: "/pages/first-time-buyers", priority: "0.8", changefreq: "monthly" },
      { url: "/pages/refinancing", priority: "0.8", changefreq: "monthly" },
      { url: "/pages/investment-properties", priority: "0.8", changefreq: "monthly" },
      { url: "/pages/commercial-mortgages", priority: "0.8", changefreq: "monthly" },
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${staticPages.map(page => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <xhtml:link rel="alternate" hreflang="en-ca" href="${baseUrl}${page.url}" />
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}${page.url}" />
  </url>`).join('')}
  ${pages.map(page => `
  <url>
    <loc>${baseUrl}/pages/${page.slug}</loc>
    <lastmod>${new Date(page.updatedAt || page.createdAt).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
    <xhtml:link rel="alternate" hreflang="en-ca" href="${baseUrl}/pages/${page.slug}" />
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/pages/${page.slug}" />
  </url>`).join('')}
  ${articles.map(article => `
  <url>
    <loc>${baseUrl}/articles/${article.slug}</loc>
    <lastmod>${new Date(article.updatedAt).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <xhtml:link rel="alternate" hreflang="en-ca" href="${baseUrl}/articles/${article.slug}" />
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/articles/${article.slug}" />
    ${article.featuredImage ? `
    <image:image>
      <image:loc>${baseUrl}${article.featuredImage.url}</image:loc>
      <image:title>${article.title}</image:title>
      <image:caption>${article.description || ''}</image:caption>
    </image:image>` : ''}
  </url>`).join('')}
</urlset>`;

    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return new Response("Error generating sitemap", { status: 500 });
  }
}
