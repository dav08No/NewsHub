import * as React from "react";
import useChatbot from "../hooks/useChatbot";
import Markdown from 'react-markdown';
import useChatScroll from "../hooks/useChatScroll";
import { useTranslation } from "react-i18next";
import 'Chatbot.css';

const ChatComponent: React.FC = () => {
  const [input, setInput] = React.useState("");
  const [isSending, setIsSending] = React.useState(false);
  const { messages, sendMessage } = useChatbot();
  const messagesEndRef = useChatScroll(messages);
  const { t } = useTranslation();
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Mobile viewport height fix
  React.useEffect(() => {
    const updateViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Initial calculation
    updateViewportHeight();

    // Update on resize and orientation change
    window.addEventListener('resize', updateViewportHeight);
    window.addEventListener('orientationchange', updateViewportHeight);

    return () => {
      window.removeEventListener('resize', updateViewportHeight);
      window.removeEventListener('orientationchange', updateViewportHeight);
    };
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    setIsSending(true);
    await sendMessage(input.trim());
    setInput("");
    setIsSending(false);

    // Focus input after sending on desktop (avoid on mobile due to keyboard issues)
    if (window.innerWidth >= 768 && inputRef.current) {
      inputRef.current.focus();
    }
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
        {t('chatbot.title')}
      </h2>

      <div ref={messagesEndRef} className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-bubble ${msg.sender === "user" ? "chat-bubble-user" : "chat-bubble-bot"}`}
          >
            <Markdown remarkPlugins={[]}>{msg.text}</Markdown>
          </div>
        ))}
      </div>

      <div className="chat-input-container">
        <input
          ref={inputRef}
          type="text"
          className="chat-input"
          placeholder={t('chatbot.question')}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isSending}
          aria-label={t('chatbot.question')}
        />
        <button
          onClick={handleSend}
          className={`chat-send-btn ${isSending ? "chat-send-btn-disabled" : ""}`}
          disabled={isSending || !input.trim()}
          aria-label={t('chatbot.send')}
        >
          <span className="sending">
            <img src="senden.png" className="send-img" alt={t('chatbot.send')} />
          </span>
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;