import axios from "axios";
import fs from "fs";
const siteUrl = process.env.NEXT_PUBLIC_NEXT_APP_WEB_HOST;
const API_HOST = process.env.NEXT_PUBLIC_NEXT_APP_BLOG_API_HOST;
const TENANT_ID = process.env.NEXT_PUBLIC_NEXT_APP_TENANTID;

async function getSitemapUrls() {
  const response = await axios.get(API_HOST + "/sitemap/type", {
    headers: {
      tenantId: TENANT_ID,
    },
  });
  console.log("response:", response.data);
  let serverSitemapArr = [];
  response.data.data.map((item) => {
    for (let i = 1; i < item.page_count + 1; i++) {
      serverSitemapArr.push(
        `${siteUrl}/server-sitemap.xml?type=${item.type}&amp;page=${i}`
      );
    }
  });
  fs.writeFileSync("sitemaps.json", JSON.stringify(serverSitemapArr));
}
getSitemapUrls();
