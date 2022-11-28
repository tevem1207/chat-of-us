import { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useSearchParams } from "react-router-dom";
import { messagesState } from "store/atom";
import { sortedMessagesState } from "store/selector";
import firebase, { User } from "service/firebase";
import { v4 as uuidv4 } from "uuid";
import { Message } from "store/interface";

const useChats = (user: User) => {
  const [myActiveChats, setMyActiveChats] = useState<string[]>([]);
  const [, setMessages] = useRecoilState(messagesState);
  const sortedMessages = useRecoilValue(sortedMessagesState);
  const [searchParams, setSearchParams] = useSearchParams();
  const roomId = searchParams.get("roomId");
  const currentChat = roomId ? roomId : "0";

  useEffect(() => {
    console.log(currentChat);
    getFromDatabase(`/${user.uid}/chats`, (res) => {
      setMyActiveChats(Object.keys(res));
    });

    console.log("Get");
    getFromDatabase(`/chats/${currentChat}/messages`, (res) => {
      setMessages(Object.values(res));
    });
  }, [user, currentChat]);

  const sendMessage = (chatName: string, content: string) => {
    const messageId = uuidv4();
    saveToDatabase(`/chats/${chatName}/messages/${messageId}`, {
      content: content,
      userId: user.uid,
      userName: user.displayName ? user.displayName : "이름 없음",
      createdAt: new Date().toISOString(),
    });
  };

  const createChat = () => {
    const fullChatName = `${uuidv4()}`;
    // saveToDatabase(`/${recipient}/chats/${fullChatName}`, fullChatName);
    saveToDatabase(`/${user.uid}/chats/${fullChatName}`, fullChatName);
    saveToDatabase(`/chats/${fullChatName}/messages`, {} as Message);
    setSearchParams({ roomId: fullChatName });
  };

  return {
    sendMessage,
    createChat,
    currentChat,
    myActiveChats,
    sortedMessages,
    // setCurrentChat,
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
    } else {
      callback({});
    }
  });
};

const saveToDatabase = (dbString: string, value: Message | string) => {
  console.log(dbString, value);
  firebase.database().ref(dbString).set(value);
};

export default useChats;
