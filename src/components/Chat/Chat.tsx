import { useState } from "react";
import useChats from "hooks/useChats";
import { User } from "service/firebase";

interface ChatProps {
  user: User;
}

function Chat({ user }: ChatProps) {
  const [messageBody, setMessageBody] = useState("");
  const {
    sendMessage,
    createChat,
    currentChat,
    myActiveChats,
    currentChatMessages,
    setCurrentChat,
  } = useChats(user);

  return (
    <div>
      <div className="messages-container">
        {currentChatMessages.map((message) => (
          <div key={message[0]}>
            {message[1].userName} : {message[1].content}
          </div>
        ))}
      </div>
      <div className="message-input">
        <textarea
          value={messageBody}
          onChange={(event) => {
            setMessageBody(event.target.value);
          }}
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
