import axios from "axios";
import fs from "fs";

const siteUrl: string = process.env.NEXT_PUBLIC_NEXT_APP_WEB_HOST!;
const API_HOST: string = process.env.NEXT_PUBLIC_NEXT_APP_BLOG_API_HOST!;
const TENANT_ID: string = process.env.NEXT_PUBLIC_NEXT_APP_TENANTID!;

class SitemapPlugin {
  private static instance: SitemapPlugin;
  private hasRun: boolean = false;

  constructor() {
    if (SitemapPlugin.instance) {
      return SitemapPlugin.instance;
    }
    SitemapPlugin.instance = this;
    this.hasRun = false;
  }

  apply(compiler: any): void {
    compiler.hooks.run.tap("SitemapPlugin", async () => {
      if (this.hasRun) {
        return;
      }
      this.hasRun = true;
      console.log("sitemap plugin begin");

      const response: any = await axios.get<{
        data: { data: { type: string; page_count: number }[] };
      }>(API_HOST + "/sitemap/type", {
        headers: {
          tenantId: TENANT_ID,
        },
      });

      const serverSitemapArr: string[] = [];
      response.data.data.map((item: any) => {
        for (let i = 1; i < item.page_count + 1; i++) {
          serverSitemapArr.push(
            `${siteUrl}/server-sitemap.xml?type=${item.type}&amp;page=${i}`
          );
        }
      });

      fs.writeFileSync("sitemaps.json", JSON.stringify(serverSitemapArr));
      console.log("sitemap plugin end");
    });
  }
}

export default SitemapPlugin; // 确保这里是 module.exports
