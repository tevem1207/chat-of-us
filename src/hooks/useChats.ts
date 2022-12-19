import { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useSearchParams } from "react-router-dom";
import { messagesState } from "store/atom";
import { sortedMessagesState } from "store/selector";
import firebase, { User, eventType } from "service/firebase";
import { v4 as uuidv4 } from "uuid";
import { MessageType } from "store/interface";

const useChats = (user: User) => {
  const [myActiveChats, setMyActiveChats] = useState<string[]>([]);
  const [chatLists, setChatLists] = useState<string[]>([]);
  const [, setMessages] = useRecoilState(messagesState);
  const sortedMessages = useRecoilValue(sortedMessagesState);
  const [searchParams, setSearchParams] = useSearchParams();
  const roomId = searchParams.get("roomId");
  const currentChat = roomId ? roomId : "0";

  useEffect(() => {
    getFromDatabase("/chats", "value", (res) => {
      setChatLists(Object.keys(res));
    });

    getFromDatabase(`/${user.uid}/chats`, "value", (res) => {
      setMyActiveChats(Object.keys(res));
    });

    getFromDatabase(`/chats/${currentChat}/messages`, "value", (res) => {
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
    saveToDatabase(`/chats/${fullChatName}/messages`, {} as MessageType);
    setSearchParams({ roomId: fullChatName });
  };

  return {
    sendMessage,
    createChat,
    currentChat,
    myActiveChats,
    sortedMessages,
    chatLists,
  };
};

const getFromDatabase = (
  dbString: string,
  method: eventType,
  callback: (data: { [chatId: string]: MessageType }) => void
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

const saveToDatabase = (dbString: string, value: MessageType | string) => {
  firebase.database().ref(dbString).set(value);
};

export default useChats;
