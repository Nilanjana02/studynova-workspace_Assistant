import React, { useState } from "react";
import axios from "axios";
import { FaPaperPlane } from "react-icons/fa";
import "./AIChatAssistant.css";

function AIChatAssistant() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi 👋 I'm your AI Study Assistant. How can I help with your plan today?" },
  ]);
  const [loading, setLoading] = useState(false);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
    const res = await axios.post(
  `${BACKEND_URL}/api/ai/ask`,
  { userInput: input },
  { headers: { "Content-Type": "application/json" } }
);

     

      const reply = res.data.reply || "Sorry, I couldn’t process that right now.";
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (err) {
      setMessages([...newMessages, { role: "assistant", content: "⚠️ Network or server error." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-chat glass-card mt-4 p-4">
      <h2 className="section-title">
        <span className="dot cyan" /> AI Study Assistant
      </h2>

      <div className="chat-box overflow-y-auto max-h-[250px] custom-scrollbar mb-3">
        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.role}`}>
            {m.content}
          </div>
        ))}
        {loading && <p className="msg assistant">💭 Thinking...</p>}
      </div>

      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          className="flex-grow bg-transparent border border-cyan-500 rounded-xl px-3 py-2 text-white"
          placeholder="Ask AI anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="launch-btn flex items-center gap-2">
          <FaPaperPlane /> Send
        </button>
      </form>
    </div>
  );
}

export default AIChatAssistant;
