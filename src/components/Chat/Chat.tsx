import { useState, useRef, useEffect } from "react";
import useChats from "hooks/useChats";
import { User } from "service/firebase";
import you from "../../assets/images/you.png";

interface ChatProps {
  user: User;
}

function Chat({ user }: ChatProps) {
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
      messageBody
        ? sendMessage(currentChat, messageBody)
        : alert("내용을 입력하세요...ㅠㅠ 제발요...");
      setMessageBody("");
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
        {sortedMessages.map((message, index) => (
          <div key={index} className="message">
            <img src={you} alt="user-profile" className="user-profile" />
            <div className="message-content">
              <p className="chat-user">{message.userName}</p>
              <div className="message-balloon">
                <pre className="chat-content">{message.content}</pre>
              </div>
            </div>
          </div>
        ))}
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
            messageBody
              ? sendMessage(currentChat, messageBody)
              : alert("내용을 입력하세요...ㅠㅠ 제발요...");
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
