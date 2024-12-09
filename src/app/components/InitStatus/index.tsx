"use client";
import { initFirebase, loadUserData } from "@/lib/firebaseConfig/init";
import { useEffect } from "react";
import { useAuthStore } from "@/lib/auth";
import Cookies from "js-cookie";

export default function InitStatus() {
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    // 初始化 firebase
    initFirebase();
    // 获取用户状态
    loadUserData();
    login(
      JSON.parse(localStorage.getItem("user") || "{}").displayName || "",
      Cookies.get("accessToken") || "",
      JSON.parse(localStorage.getItem("user") || "{}").photoURL || "",
      JSON.parse(localStorage.getItem("user") || "{}").email || ""
    );
  }, []);
  return null;
}
