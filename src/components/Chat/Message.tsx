import you from "assets/images/you.png";
import { MessageType } from "store/interface";

interface MessageProps {
  message: MessageType;
}

function Message({ message }: MessageProps) {
  const createdTime = message.createdAt.slice(11, 16);

  return (
    <div className="message">
      <img src={you} alt="user-profile" className="user-profile" />
      <div className="message-content">
        <p className="chat-user">{message.userName}</p>
        <div className="message-balloon">
          <pre className="chat-content">{message.content}</pre>
          <div>
            <span className="created-at">{createdTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
