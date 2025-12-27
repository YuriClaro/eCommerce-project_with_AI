import dayjs from 'dayjs'
import { useState } from 'react'
import { getAIResponse } from '../services/aiService.js'
import './ChatInput.css'

function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  
  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    if (inputText.trim() === "") return;

    const newChatMessages = [ 
      ...chatMessages,
      {
        message: inputText,
        sender: "user",
        id: crypto.randomUUID(),
        time: dayjs().valueOf(),
      }
    ]

    setChatMessages(newChatMessages);
    setLoading(true);

    const response = await getAIResponse(inputText);
    setChatMessages([ 
      ...newChatMessages,
      {
        message: response,
        sender: "robot",
        id: crypto.randomUUID(),
        time: dayjs().valueOf(),
      }
    ]);

    setInputText("");
    setLoading(false);
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  }
  
  return (
    <div className="chat-input-container">
      <input 
        placeholder="Send a message to Chatbot" 
        size="30"
        onChange={saveInputText}
        onKeyPress={handleKeyPress}
        value={inputText}
        className="chat-input"
      />
      <button 
        onClick={sendMessage}
        className="send-button"
        disabled={loading}
        >
          {loading ? 'Sending...' : 'Send'}
      </button>
    </div>
  );
}

export default ChatInput;