import dayjs from 'dayjs'
import { useState } from 'react'
import { Chatbot } from 'supersimpledev'
import './ChatInput.css'

function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState("");
  
  function saveInputText(event) {
    setInputText(event.target.value);
  }

  function sendMessage() {
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

    const response = Chatbot.getResponse(inputText);
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
        >
          Send
      </button>
    </div>
  );
}

export default ChatInput;