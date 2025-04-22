import * as React from "react";
import { LuBot, LuSendHorizontal } from "react-icons/lu";
import useChatbot from "./components/hooks/useChatbot";
import Markdown from "react-markdown";
import useChatScroll from "./components/hooks/useChatScroll";

const ChatComponent: React.FunctionComponent = () => {
  const [input, setInput] = React.useState("");
  const [isSending, setIsSending] = React.useState(false);
  const { messages, sendMessage } = useChatbot();
  const ref = useChatScroll(messages);

  const handleSend = async () => {
    if (!input.trim()) return;

    setIsSending(true);
    await sendMessage(input.trim());
    setInput("");
    setIsSending(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-container">
      <h2 className="chat-header">
        Chatbot <LuBot size={25} />
      </h2>

      <div ref={ref} className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-bubble ${
              msg.sender === "user" ? "chat-bubble-user" : "chat-bubble-bot"
            }`}
          >
            <Markdown>{msg.text}</Markdown>
          </div>
        ))}
      </div>

      <div className="chat-input-container">
        <input
          type="text"
          className="chat-input"
          placeholder="Your message here"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isSending}
        />
        <button
          onClick={handleSend}
          className={`chat-send-btn ${isSending ? "chat-send-btn-disabled" : ""}`}
          disabled={isSending}
        >
          <LuSendHorizontal size={25} />
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
