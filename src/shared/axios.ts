import axios from "axios";
import Cookies from "js-cookie";

const generateSessionId = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NEXT_APP_API_HOST,
  timeout: 60000,
  headers: {
    tenantId: `${process.env.NEXT_PUBLIC_NEXT_APP_TENANTID}`,
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("userToken");

    // 只在浏览器环境中处理 sessionStorage
    if (typeof window !== "undefined") {
      // 获取或创建会话ID
      let sessionId = sessionStorage.getItem("browserSessionId");
      if (!sessionId) {
        sessionId = generateSessionId();
        sessionStorage.setItem("browserSessionId", sessionId);
      }
      config.headers["x-browser-session-id"] = sessionId;
    }

    // 设置请求头
    if (token != undefined) {
      config.headers["Authorization"] = token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
