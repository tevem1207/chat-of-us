import { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { messagesState } from "store/atom";
import { sortedMessagesState } from "store/selector";
import firebase, { User } from "service/firebase";
import { v4 as uuidv4 } from "uuid";
import { Message } from "store/interface";

const useChats = (user: User) => {
  const [currentChat, setCurrentChat] = useState<string>("0");
  const [myActiveChats, setMyActiveChats] = useState<string[]>([]);
  const [, setMessages] = useRecoilState(messagesState);
  const sortedMessages = useRecoilValue(sortedMessagesState);

  useEffect(() => {
    getFromDatabase(`/${user.uid}/chats`, (res) => {
      setMyActiveChats(Object.keys(res));
    });

    getFromDatabase(`/chats/${currentChat}/messages`, (res) => {
      setMessages(Object.values(res));
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
    sortedMessages,
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
