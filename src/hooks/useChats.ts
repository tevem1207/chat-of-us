import { useState, useEffect } from "react";
import firebase, { User } from "service/firebase";
import { v4 as uuidv4 } from "uuid";

interface Message {
  content: string;
  userId: string;
  userName: string;
  createdAt: string;
}

const useChats = (user: User) => {
  const [currentChat, setCurrentChat] = useState<string>("0");
  const [myActiveChats, setMyActiveChats] = useState<string[]>([]);
  const [currentChatMessages, setCurrentChatMessages] = useState<
    [string, Message][]
  >([]);

  useEffect(() => {
    getFromDatabase(`/${user.uid}/chats`, (res) => {
      setMyActiveChats(Object.keys(res));
    });

    getFromDatabase(`/chats/${currentChat}/messages`, (res) => {
      setCurrentChatMessages(Object.entries(res));
    });
  }, [currentChat, user]);

  const sendMessage = (chatName: string, content: string) => {
    const messageId = uuidv4();
    saveToDatabase(`/chats/${chatName}/messages/${messageId}`, {
      content: content,
      userId: user.uid,
      userName: user.displayName ? user.displayName : "이름 없음",
      createdAt: new Date().toISOString(),
    });
  };

  const createChat = (recipient: string, chatName: string) => {
    const fullChatName = `${chatName}-${uuidv4()}`;
    saveToDatabase(`/${recipient}/chats/${fullChatName}`, fullChatName);
    saveToDatabase(`/${user.uid}/chats/${fullChatName}`, fullChatName);
    saveToDatabase(`/chats/${fullChatName}/messages`, {} as Message);
    setCurrentChat(fullChatName);
  };

  return {
    sendMessage,
    createChat,
    currentChat,
    myActiveChats,
    currentChatMessages,
    setCurrentChat,
  };
};

const getFromDatabase = (
  dbString: string,
  callback: (data: { [chatId: string]: Message }) => void
) => {
  const ref = firebase.database().ref(dbString);
  ref.on("value", (snapshot) => {
    if (snapshot.val()) {
      callback(snapshot.val());
    }
  });
};

const saveToDatabase = (dbString: string, value: Message | string) => {
  firebase.database().ref(dbString).set(value);
};

export default useChats;
