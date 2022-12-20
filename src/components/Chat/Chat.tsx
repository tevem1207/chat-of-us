import { useState, useRef, useEffect } from "react";
import useChats from "hooks/useChats";
import { User } from "service/firebase";
import Message from "./Message";
import you from "../../assets/images/you.png";
import MyMessage from "./MyMessage";

interface ChatProps {
  user: User;
  sendCloudMessage: (message: string) => void;
}

function Chat({ user, sendCloudMessage }: ChatProps) {
  const [messageBody, setMessageBody] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);

  const {
    sendMessage,
    createChat,
    myActiveChats,
    sortedMessages,
    currentChat,
    chatLists,
  } = useChats(user);

  const onEnterPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      event.code === "Enter" &&
      event.shiftKey === false &&
      event.nativeEvent.isComposing === false
    ) {
      event.preventDefault();
      sendMessageAll();
      setMessageBody("");
    }
  };

  const sendMessageAll = () => {
    if (messageBody) {
      sendMessage(currentChat, messageBody);
      sendCloudMessage(messageBody);
    } else {
      alert("내용을 입력하세요...ㅠㅠ 제발요...");
    }
  };

  useEffect(() => {
    messagesRef.current?.lastElementChild?.scrollIntoView(false);
  }, [sortedMessages]);

  const scrollCallBack = (event: Event) => {
    // console.log(event);
    // console.log("스크롤중");
  };

  // const resizeTextareaHandler = () => {
  //   if (
  //     messageBody &&
  //     textareaRef.current != null &&
  //     messagesRef.current != null
  //   ) {
  //     textareaRef.current.style.height = "auto";
  //     var inputHeight = textareaRef.current?.scrollHeight;
  //     textareaRef.current.style.height = `${inputHeight + 8}px`;
  //     messagesRef.current.style.height = `calc(100vh - ${inputHeight + 8}px)`;
  //   }
  // };

  return (
    <div className="chat-room">
      <button onClick={createChat}>채팅방 만들기</button>
      <div className="messages-container" ref={messagesRef}>
        {sortedMessages.map((message, index) =>
          user.uid === message.userId ? (
            <MyMessage message={message} key={index} />
          ) : (
            <Message message={message} key={index} />
          )
        )}
      </div>
      <div className="send-message">
        <textarea
          className="message-input"
          value={messageBody}
          onChange={(event) => {
            setMessageBody(event.target.value);
          }}
          onKeyDown={onEnterPress}
        />
        <button
          onClick={() => {
            sendMessageAll();
            setMessageBody("");
          }}
        >
          보내기
        </button>
      </div>
    </div>
  );
}

export default Chat;
