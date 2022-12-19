/// <reference types="react-scripts" />
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    PUBLIC_URL: string;
    REACT_APP_FIREBASE_APIKEY: string;
    REACT_APP_FIREBASE_VAPIDKEY: string;
    REACT_APP_FIREBASE_FCMKEY: string;
  }
}
