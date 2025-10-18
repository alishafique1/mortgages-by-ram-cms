import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("articles", "routes/articles._index.tsx"),
  route("articles/:slug", "routes/articles.$slug.tsx"),
  route("api/chat", "routes/api.chat.ts"),
  route("api/chat-stream", "routes/api.chat-stream.ts"),
  route("sitemap.xml", "routes/sitemap.xml.tsx"),
  route("sitemap-images.xml", "routes/sitemap-images.xml.tsx"),
  route("robots.txt", "routes/robots.txt.tsx"),
  route("*", "routes/$.tsx"), // Catch-all route for 404s
] satisfies RouteConfig;
