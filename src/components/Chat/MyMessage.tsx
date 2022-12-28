import { MessageType } from "store/interface";

interface MessageProps {
  message: MessageType;
}

function MyMessage({ message }: MessageProps) {
  const createdTime = message.createdAt.slice(11, 16);

  return (
    <div className="message mine">
      <div className="message-content">
        <div className="message-balloon">
          <div>
            <span className="created-at">{createdTime}</span>
          </div>
          <pre className="chat-content">{message.content}</pre>
        </div>
      </div>
    </div>
  );
}

export default MyMessage;
