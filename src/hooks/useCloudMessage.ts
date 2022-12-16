import { messaging } from "service/firebase";
import { useEffect } from "react";

const useCloudMessage = () => {
  useEffect(() => {
    Notification.requestPermission().then(function (permission) {
      if (permission === "granted") {
        console.log("Notification permission granted.");
      } else {
        console.log("Unable to get permission to notify.");
      }
    });

    messaging
      .getToken({ vapidKey: process.env.REACT_APP_FIREBASE_VAPIDKEY })
      .then((token) => {
        console.log(token);
      });
    messaging.onMessage((payload) => {
      console.log("Message received. ", payload);
    });
  });
};

export default useCloudMessage;
