import type { Route } from "./+types/sitemap-images.xml";
import { getArticles, getGlobal } from "../lib/api";

export async function loader({}: Route.LoaderArgs) {
  try {
    const [articlesResponse, globalResponse] = await Promise.all([
      getArticles(),
      getGlobal(),
    ]);

    const articles = articlesResponse?.data || [];
    const global = globalResponse?.data;
    const baseUrl = "https://mortgagesbyram.com";
    const currentDate = new Date().toISOString();

    // Collect all images from articles
    const images = articles
      .filter(article => article.featuredImage)
      .map(article => ({
        url: `${baseUrl}${article.featuredImage.url}`,
        title: article.title,
        caption: article.description || '',
        lastmod: new Date(article.updatedAt).toISOString(),
      }));

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.google.com/schemas/sitemap-image/1.1">
  ${images.map(image => `
  <url>
    <image:image>
      <image:loc>${image.url}</image:loc>
      <image:title><![CDATA[${image.title}]]></image:title>
      <image:caption><![CDATA[${image.caption}]]></image:caption>
      <image:lastmod>${image.lastmod}</image:lastmod>
    </image:image>
  </url>`).join('')}
</urlset>`;

    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Error generating image sitemap:", error);
    return new Response("Error generating image sitemap", { status: 500 });
  }
}
