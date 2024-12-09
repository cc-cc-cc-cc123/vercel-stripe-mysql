// Import the functions you need from the SDKs you need
import { AppSettings } from "@/shared/app-common";
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getRedirectResult, getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import Cookies from "js-cookie";
const isProd = true;

export async function initFirebase() {
  // Initialize Firebase
  const apps = getApps();
  if (!apps.length) {
    const app = initializeApp(AppSettings.firebaseConfig);

    if (isProd) {
      const analyticsSupported = await isSupported();
      if (analyticsSupported) {
        getAnalytics(app);
      }
    }
  }
}

export const loadUserData = async () => {
  const auth = getAuth();
  try {
    // 处理重定向登录结果
    const result = await getRedirectResult(auth);

    if (result) {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;

      // 获取 Firebase ID token
      const idToken = await result.user.getIdToken();

      // 保存 tokens
      Cookies.set("accessToken", token || "", { expires: 7 });
      Cookies.set("firebaseToken", idToken, { expires: 7 });
      Cookies.set("firebaseUser", JSON.stringify(result.user.uid), {
        expires: 7,
      });
    }

    // 即使不是重定向登录，也要检查当前用户并更新 token
    const currentUser = auth.currentUser;
    if (currentUser) {
      const idToken = await currentUser.getIdToken(true);
      Cookies.set("firebaseToken", idToken, { expires: 7 });
      Cookies.set("firebaseUser", JSON.stringify(currentUser), {
        expires: 7,
      });
    }
    return {
      user: auth.currentUser,
      error: null,
    };
  } catch (error) {
    console.error("Error loading user data:", error);
    return {
      user: null,
      error,
    };
  }
};

export const FirebaseLogOut = async () => {
  const auth = getAuth();
  await auth.signOut();
};
