import type { Route } from "./+types/robots.txt";

export async function loader({}: Route.LoaderArgs) {
  const robotsTxt = `# Robots.txt for Mortgages by Ram - Toronto Mortgage Agent
# https://mortgagesbyram.com

# Allow all search engines to crawl the site
User-agent: *
Allow: /

# Specific rules for major search engines
User-agent: Googlebot
Allow: /
Crawl-delay: 1

User-agent: Bingbot
Allow: /
Crawl-delay: 1

User-agent: Slurp
Allow: /
Crawl-delay: 2

# Block problematic bots
User-agent: AhrefsBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /

# Disallow admin and technical areas
Disallow: /admin/
Disallow: /api/
Disallow: /_build/
Disallow: /node_modules/
Disallow: /dist/
Disallow: /.env
Disallow: /package.json
Disallow: /yarn.lock
Disallow: /tsconfig.json
Disallow: /vite.config.ts

# Disallow search and filter parameters
Disallow: /*?*
Disallow: /search*
Disallow: /filter*

# Allow important content areas
Allow: /articles/
Allow: /pages/
Allow: /images/
Allow: /uploads/

# Sitemap locations
Sitemap: https://mortgagesbyram.com/sitemap.xml
Sitemap: https://mortgagesbyram.com/sitemap-images.xml

# Host directive (helps with duplicate content issues)
Host: https://mortgagesbyram.com
`;

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
