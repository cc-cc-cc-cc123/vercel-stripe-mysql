import { getSitemapList } from "@/lib/service/blog";

export async function GET(ctx: any): Promise<Response> {
  const { locale, query } = ctx;
  const response = await getSitemapList(query, locale);

  const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${response?.data
      ?.map(
        (it) => `
      <url>
        <loc>${it.loc}</loc>
        <lastmod>${it.lastmod}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>
      </url>
    `
      )
      .join("")}
  </urlset>
`;

  return new Response(sitemapXML, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
