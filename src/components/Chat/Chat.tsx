import { useState, useRef, useEffect } from "react";
import useChats from "hooks/useChats";
import { User } from "service/firebase";
import you from "../../assets/images/you.png";

interface ChatProps {
  user: User;
}

function Chat({ user }: ChatProps) {
  const [messageBody, setMessageBody] = useState("");
  const {
    sendMessage,
    createChat,
    myActiveChats,
    sortedMessages,
    currentChat,
    chatLists,
  } = useChats(user);
  const messagesRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const chatRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (
      line1Ref.current !== null &&
      line2Ref.current !== null &&
      chatRef.current !== null
    ) {
      var chatHeight = chatRef.current.style.height;
      console.log(chatHeight);
      line1Ref.current.style.height = chatHeight;
      line2Ref.current.style.height = chatHeight;
    }
  }, []);

  useEffect(() => {
    messagesRef.current?.scrollIntoView(false);
  }, [sortedMessages]);

  const onEnterPress = (event: any) => {
    if (event.keyCode == 13 && event.shiftKey == false) {
      event.preventDefault();
      messageBody
        ? sendMessage(currentChat, messageBody)
        : alert("내용을 입력하세요...ㅠㅠ 제발요...");
      setMessageBody("");
    }
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
                {/* <span ref={line1Ref} className="line-1"></span> */}
                <span ref={line2Ref} className="line-2"></span>
                <span ref={line2Ref} className="line-3"></span>
                <span ref={chatRef} className="chat-content">
                  {message.content}
                </span>
                <span ref={line2Ref} className="line-3"></span>
                <span ref={line2Ref} className="line-2"></span>
                {/* <span ref={line1Ref} className="line-1"></span> */}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="send-message">
        <textarea
          className="message-input"
          ref={textareaRef}
          value={messageBody}
          onChange={(event) => {
            setMessageBody(event.target.value);
            // resizeTextareaHandler();
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
