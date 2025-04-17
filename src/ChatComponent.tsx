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
    <div className="flex flex-col h-[80vh] bg-white border rounded shadow-md">
      <h2 className="p-4 font-semibold text-lg text-center bg-blue-100 flex text-blue-800 justify-center items-center gap-2">
        React + Gemini Chatbot <LuBot size={25} />
      </h2>

      <div ref={ref} className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg max-w-xs ${
              msg.sender === "user"
                ? "bg-blue-500 text-white ml-auto"
                : "bg-gray-300 text-gray-800"
            }`}
          >
            <Markdown>{msg.text}</Markdown>
          </div>
        ))}
      </div>

      <div className="flex items-center p-4 bg-gray-50 gap-2">
        <input
          type="text"
          className="flex-1 p-2 border rounded-lg focus:outline-none"
          placeholder="Your message here"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isSending}
        />
        <button
          onClick={handleSend}
          className={`p-2 rounded ${isSending ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={isSending}
        >
          <LuSendHorizontal size={25} />
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
