import axios from "@/shared/axios";
import { FakeSearchModel } from "@/types/home";
import { BaseResponse } from "@/types/web.interface";

// 获取白名单列表

export async function getSafeLinkListApi() {
  const res = await axios.get<BaseResponse<any>>("/safeLink/list");
  return res.data;
}

// 消费用量记录
export async function getConsumePageApi(params: any) {
  const res = await axios.get<BaseResponse<any>>("/product/order/page", {
    params,
  });
  return res.data;
}

// 获取泄露线索
export async function getLeaksClewsApi(params: any) {
  const res = await axios.get<BaseResponse<any>>("/clue/list", {
    params,
  });
  return res.data;
}

// dashboard 首页数据 /dashboard/data
export async function getDashboardDataTopApi() {
  const res = await axios.get<BaseResponse<any>>("/dashboard/data");
  return res.data;
}
// dashboard  /dashboard/sourceData
export async function getDashboardSourDataApi() {
  const res = await axios.get<BaseResponse<any>>("/dashboard/sourceData");
  return res.data;
}

//侵权线索爬取时间 /clue/spiderStatus
export async function getLeakClewTimeApi() {
  const res = await axios.get<BaseResponse<any>>("/clue/spiderStatus");
  return res.data;
}
// 侵权线索爬取内容
export async function getLeakClewDataApi(params: any) {
  const res = await axios.get<BaseResponse<any>>("/clue/list", {
    params,
  });
  return res.data;
}
// 添加白名单
export async function postAddWhiteListApi(params: any) {
  const res = await axios.post<BaseResponse<any>>("/safeLink/add", {
    ...params,
  });
  return res.data;
}

// 修改白名单
export async function postEditWhiteListApi(id: number, params: any) {
  const res = await axios.post<BaseResponse<any>>(
    `/safeLink/updateSafeLink/${id}`,
    {
      ...params,
    }
  );
  return res.data;
}
// 手段添加链接 /clue/addManual
export async function postAddManualClewApi(params: any) {
  const res = await axios.post<BaseResponse<any>>("/clue/addManual", {
    ...params,
  });
  return res.data;
}

// 白名单统计 /clue/filterCount

export async function getWhiteListFilterApi() {
  const res = await axios.get<BaseResponse<any>>("/clue/clueCount");
  return res.data;
}

// 搜索社交账号
export async function postSeachSocialAccountApi(params: any) {
  const res = await axios.post<BaseResponse<any>>(
    "/account/socialAccountSearch",
    {
      ...params,
    }
  );
  return res.data;
}
// 添加社交账号
export async function postAccountAddApi(params: any) {
  const res = await axios.post<BaseResponse<any>>("/account/add", {
    ...params,
  });
  return res.data;
}
// 账号查询
export async function getAccountListApi() {
  const res = await axios.get<BaseResponse<any>>("/account/list");
  return res.data;
}
// 删除账号
export async function deleteAccountApi(id: number) {
  const res = await axios.delete<BaseResponse<any>>(`/account/delete/${id}`);
  return res.data;
}

// 添加查询条件
export async function postAddTermsApi(params: any) {
  const res = await axios.post<BaseResponse<any>>("/terms/add", {
    ...params,
  });
  return res.data;
}
// 搜索查询条件
export async function getTermsListApi() {
  const res = await axios.get<BaseResponse<any>>("/terms/list");
  return res.data;
}
// 删除关键词
export async function deleteTermsKeyApi(id: number) {
  const res = await axios.delete<BaseResponse<any>>(`/terms/delete/${id}`);
  return res.data;
}

// 删除白名单线索
export async function deleteSafeLinkApi(id: number) {
  const res = await axios.delete<BaseResponse<any>>(`/safeLink/delete/${id}`);
  return res.data;
}

// 获取国家列表 /terms/allCountryServiceList
export async function getCountryListApi() {
  const res = await axios.get<BaseResponse<any>>(
    `/terms/allCountryServiceList`
  );
  return res.data;
}
// 添加服务 /terms/addCountryService
export async function postAddServerListApi(params: any) {
  const res = await axios.post<BaseResponse<any>>(`/terms/addCountryService`, {
    ...params,
  });
  return res.data;
}
// 获取正在监测的国家列表
export async function getMonitorCountriesListApi() {
  const res = await axios.get<BaseResponse<any>>(`/terms/countryServiceList`);
  return res.data;
}

// 更新账户状态
export async function postEditAccountStatustApi(id: number, params: any) {
  const res = await axios.post<BaseResponse<any>>(
    `/account/verifyStatus/${id}`,
    {
      ...params,
    }
  );
  return res.data;
}

// 限制词检查
export async function postRestrictedWordCheckApi(params: any) {
  const res = await axios.post<BaseResponse<any>>(`/tool/restrictedWordCheck`, {
    ...params,
  });
  return res.data;
}

// 限制点赞
export async function postToolsReviewApi(id: any, params: any) {
  const res = await axios.post<BaseResponse<any>>(`/tool/review/${id}`, {
    ...params,
  });
  return res.data;
}

// ai点赞
export async function postAiRewriteApi(id: any, params: any) {
  const res = await axios.post<BaseResponse<any>>(
    `/tool/aiReWrite/review/${id}`,
    {
      ...params,
    }
  );
  return res.data;
}

// 流输出
export async function postAiWriteApi(params: any) {
  const res = await axios.post<BaseResponse<any>>(`/tool/aiWrite`, {
    ...params,
  });
  return res.data;
}

// ai使用次数 /tool/restrictedCount
export async function getAiWriteCountCount() {
  const res = await axios.get<BaseResponse<any>>(`/tool/aiWriteCount`);
  return res.data;
}
// 限制词使用次数 /tool/restrictedCount
export async function getRestrictedCount() {
  const res = await axios.get<BaseResponse<any>>(`/tool/restrictedCount`);
  return res.data;
}

// 重新开启监控

// export async function resStartMonitorApi(params: any) {
//   const res = await axios.post<BaseResponse<any>>("/content/reactivate", {
//     ...params,
//   });
//   return res.data;
// }
// 测试调用
export async function getCustomerPortalApi() {
  const res = await axios.post<BaseResponse<any>>(`/product/customerPortal`);
  return res.data;
}

// 邮箱是否存在
export async function getExistEmail(email?: string) {
  const res = await axios.get<BaseResponse<any>>(`/user/exists?email=${email}`);
  return res.data;
}

export async function accountFakeSearch(username: string) {
  const res = await axios.post<BaseResponse<FakeSearchModel>>(
    `/account/fakeSearch`,
    {
      username,
    }
  );
  return res.data;
}

//  /account/updateSocialAccount
export async function getUploadAccountIdApi(params: { id: number }) {
  const res = await axios.post<BaseResponse<FakeSearchModel>>(
    `/account/updateSocialAccount`,
    params
  );
  return res.data;
}
