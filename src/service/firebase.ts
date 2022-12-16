import firebase from "firebase/compat/app";
import "firebase/compat/messaging";
import "firebase/compat/auth";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  databaseURL: process.env.REACT_APP_FIREBASE_DATA_BASEURL,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
};

firebase.initializeApp(firebaseConfig);

export const messaging = firebase.messaging();

export type User = firebase.UserInfo;
export type eventType = firebase.database.EventType;

export default firebase;
