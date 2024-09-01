import React, {useState, useRef, useEffect} from "react"
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
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
  }, [messages])

  const handleSendMessage = (message: string) => {
    if (message.trim()) {
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
  }

  return (
    <ChatContainer>
      <ChatBackground />
      {selectedChat ? (
        <ChatContent>
          <ChatHeader selectedChat={selectedChat} onBack={onBack} />
          <MessageList messages={messages} messagesEndRef={messagesEndRef} />
          <ChatInput onSendMessage={handleSendMessage} />
        </ChatContent>
      ) : (
        <WelcomeScreen />
      )}
    </ChatContainer>
  )
}

export default Chat
