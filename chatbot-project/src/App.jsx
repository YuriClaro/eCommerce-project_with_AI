import { useState } from 'react'
import ChatMessages from './components/ChatMessages.jsx'
import ChatInput from './components/ChatInput.jsx'
import './App.css'  

function App() {
  const [chatMessages, setChatMessages] = useState([ ]);

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
