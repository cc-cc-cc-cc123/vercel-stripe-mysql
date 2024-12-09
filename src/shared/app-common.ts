export const currentHost = () => {
  if (typeof window === "undefined") {
    return "";
  }

  if (window.location.host.includes("localhost")) {
    return `localhost:3000`;
  } else if (window.location.host.includes("-test")) {
    return `www-test.recentlyfolowed.com`;
  } else {
    return `www.recentlyfolowed.com`;
  }
};

const getFirebaseConfig = () => {
  // const host = currentHost();
  return {
    apiKey: "AIzaSyAUIGGrdcuB0K8MyrK65Q5h9rumQc07gWo",
    // authDomain: !host.includes("localhost")
    //   ? "recentlyfolowed.firebaseapp.com"
    //   : `${host}/fb-auth`,
    authDomain: "recentlyfolowed.firebaseapp.com",
    projectId: "recentlyfolowed",
    storageBucket: "recentlyfolowed.firebasestorage.app",
    messagingSenderId: "319144500075",
    appId: "1:319144500075:web:1433b3890a70ff0bd48a2e",
    measurementId: "G-7QLVQCQ1N7",
  };
};

interface AppSettings {
  type: number;
  name: string;
  logoUrl: string;
  logoPath: string;
  namePath: string;
  icoPath: string;
  title: string;
  headSubTitle: string;
  desc: string;
  firebaseConfig: any;
  navItems: [];
  webHost: string;
  clarityId: string;
}

export const AppSettings = {
  firebaseConfig: getFirebaseConfig(),
};

export const commonImgPath = `https://res-front.pumpsoul.com/prod-erasa/image`;
