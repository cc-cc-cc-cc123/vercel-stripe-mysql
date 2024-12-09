"use client";
import { Button } from "@/components/ui/button";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  // signInWithRedirect,
  // sendEmailVerification,
} from "firebase/auth";
// import useScreenSize from "@/hooks/useScreenSize";
import { useAuthStore } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { loadUserData } from "@/lib/firebaseConfig/init";

export function GoogleLoginButton() {
  const provider = new GoogleAuthProvider();
  // const { width } = useScreenSize();
  const login = useAuthStore((state) => state.login);
  const router = useRouter();
  const handleGoogleLogin = () => {
    const auth = getAuth();
    // if (width < 900) {
    //   signInWithRedirect(auth, provider);
    // } else {
    signInWithPopup(auth, provider).then(async (result: any) => {
      localStorage.setItem("user", JSON.stringify(result.user));
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token: any = credential?.accessToken;
      login(
        result.user.displayName,
        token,
        result.user.photoURL,
        result.user.email
      );
      await loadUserData();
      router.push("/?login=true");
    });
    // }
  };

  return (
    <Button
      onClick={handleGoogleLogin}
      className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 transition-colors duration-300"
    >
      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
      Continue with Google
    </Button>
  );
}
