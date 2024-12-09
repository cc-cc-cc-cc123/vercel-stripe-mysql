import axios from "@/shared/axios";
import { BaseResponse } from "@/types/web.interface";
import { HomeArticleModel } from "@/types/home";

// 获取白名单列表

export async function getSafeLinkListApi() {
  const res = await axios.get<BaseResponse<any>>("/safeLink/list");
  return res.data;
}

// 文章列表
export async function getArticleListData(params?: any, locale?: string) {
  const res = await axios.get<BaseResponse<[HomeArticleModel]>>(
    "/article/list",
    {
      params,
      headers: {
        "Current-Language": locale,
        tenantId: `${process.env.NEXT_PUBLIC_NEXT_APP_TENANTID}`,
      },
      baseURL: process.env.NEXT_PUBLIC_NEXT_APP_BLOG_API_HOST,
    }
  );
  return res.data;
}

// 首页检测
export async function getHomeCheckApi(params?: any) {
  const res = await axios.post<BaseResponse<any>>("/search", {
    ...params,
  });
  return res.data;
}
// 首页检测 本地
export async function getHomeCheckLocalApi(params?: any) {
  const res = await axios.post<BaseResponse<any>>(
    "/api/ins-follow",
    {
      ...params,
    },
    {
      baseURL: "http://localhost:3000",
    }
  );
  return res.data;
}

// 文章详情
export async function getArticleDetailData(titleId: string, locale?: string) {
  const res = await axios.get<BaseResponse<HomeArticleModel>>(
    `/article/detail/title/${titleId}`,
    {
      headers: {
        "Current-Language": locale,
        tenantId: `${process.env.NEXT_PUBLIC_NEXT_APP_TENANTID}`,
      },
      baseURL: process.env.NEXT_PUBLIC_NEXT_APP_BLOG_API_HOST,
    }
  );
  return res.data;
}
// 内容
export async function getArticleDetailContent(url: string) {
  const res = await axios.get<any>(`${url}`, {
    baseURL: process.env.NEXT_PUBLIC_NEXT_APP_BLOG_API_HOST,
  });
  return res;
}

export async function getSitemapList(params?: any, locale?: string) {
  const res = await axios.get<BaseResponse<[any]>>(`/sitemap/list`, {
    baseURL: process.env.NEXT_PUBLIC_NEXT_APP_BLOG_API_HOST,
    params,
    headers: {
      "Current-Language": locale,
    },
  });
  return res.data;
}
