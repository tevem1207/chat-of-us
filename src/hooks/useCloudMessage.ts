import firebase, { messaging, User } from "service/firebase";
import { useState, useEffect } from "react";
import axios from "axios";

const useCloudMessage = (user: User | null) => {
  const [token, setToken] = useState<string>();
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
        setToken(token);
        // if (user) {
        //   firebase.database().ref(`/fcmtokens/${token}`).set(true);
        // }
      });

    messaging.onMessage((payload) => {
      console.log("Message received. ", payload);
    });
  }, [user]);

  const sendCloudMessage = (message: string) => {
    if (user) {
      firebase
        .database()
        .ref(`/fcmtokens/`)
        .on("value", (snapshot) => {
          if (snapshot.val()) {
            const tokens = Object.keys(snapshot.val());
            const url = "https://fcm.googleapis.com/fcm/send";
            const headers = {
              "Content-type": "application/json",
              Authorization: "Bearer " + process.env.REACT_APP_FIREBASE_FCMKEY,
            };
            tokens.forEach((token) => {
              const data = {
                notification: {
                  body: message,
                  title: "메세지가 도착했습니다.",
                },
                to: token,
              };
              axios({ method: "post", url, data, headers });
            });
          } else {
          }
        });
    }
  };

  return { sendCloudMessage };
};

export default useCloudMessage;
