import { MessageType } from "store/interface";

interface MessageProps {
  message: MessageType;
}

function MyMessage({ message }: MessageProps) {
  return (
    <div className="message mine">
      <div className="message-content">
        <div className="message-balloon">
          <pre className="chat-content">{message.content}</pre>
        </div>
      </div>
    </div>
  );
}

export default MyMessage;
