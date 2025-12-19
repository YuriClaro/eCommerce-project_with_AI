import { useState} from 'react'
import ChatMessages from './components/ChatMessages.jsx'
import ChatInput from './components/ChatInput.jsx'
import './App.css'  

function App() {
  const [chatMessages, setChatMessages] = useState([
    { message: "Hello Chatbot", sender: "user", id: '1' },
    { message: "Hello! How can I help you?", sender: "robot", id: '2' },
    { message: "Can you get me Today's date?", sender: "user", id: '3' },
    { message: "Today is December 15th, 2025", sender: "robot", id: '4' },
  ]);

  return (
      <div className="app-container">
        <ChatMessages chatMessages={chatMessages} 
        />
        <ChatInput 
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
        />
      </div>
  )
}

export default App
