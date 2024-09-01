import React, {useState} from "react"
import styled from "styled-components"
import ChatHeader from "./ChatHeader"
import MessageList from "./MessageList"
import ChatInput from "./ChatInput"
import WelcomeScreen from "./WelcomeScreen"
import {Message} from "../types/Message"
import backgroundImage from "../assets/background.png"

const ChatContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  height: 100%; // Tam yükseklik kullan
`

const ChatBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url(${backgroundImage});
  background-repeat: repeat;
  opacity: 0.05;
  z-index: 0;
`

const ChatContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
  height: 100%; // Tam yükseklik kullan
`

const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`

interface ChatProps {
  selectedChat: string | null
  onBack: () => void
}

const Chat: React.FC<ChatProps> = ({selectedChat, onBack}) => {
  const [messages, setMessages] = useState<Message[]>([
    {id: 1, text: "Hello!", isOutgoing: false, timestamp: new Date()},
    {id: 2, text: "Hi, how are you?", isOutgoing: true, timestamp: new Date()}
  ])
  const [error, setError] = useState<string | null>(null)

  const handleSendMessage = (message: string) => {
    try {
      if (message.trim()) {
        const imageMatch = message.match(/^\/image\s+(\d+)$/)
        if (imageMatch) {
          const imageNumber = imageMatch[1]
          const imageUrl = `https://picsum.photos/seed/${imageNumber}/300/200`
          setMessages([
            ...messages,
            {
              id: messages.length + 1,
              text: imageUrl,
              isOutgoing: true,
              timestamp: new Date(),
              isImage: true
            }
          ])
        } else {
          setMessages([
            ...messages,
            {
              id: messages.length + 1,
              text: message,
              isOutgoing: true,
              timestamp: new Date()
            }
          ])
        }
        setError(null)
      }
    } catch (err) {
      console.error("Error sending message:", err)
      setError("Failed to send message. Please try again.")
    }
  }

  return (
    <ChatContainer>
      <ChatBackground />
      {selectedChat ? (
        <ChatContent>
          <ChatHeader selectedChat={selectedChat} onBack={onBack} />
          <ScrollableContent>
            {error && (
              <div style={{color: "red", padding: "10px"}}>{error}</div>
            )}
            <MessageList messages={messages} />
          </ScrollableContent>
          <ChatInput onSendMessage={handleSendMessage} />
        </ChatContent>
      ) : (
        <WelcomeScreen />
      )}
    </ChatContainer>
  )
}

export default Chat
