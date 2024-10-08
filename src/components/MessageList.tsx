import React, {useEffect, useRef} from "react"
import styled from "styled-components"
import MessageBubble from "./MessageBubble"
import {Message} from "../types/Message"

const MessageListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
  @media (max-width: 768px) {
    padding-top: 60px;
    height: calc(100vh - 120px); // 60px üst başlık, 60px alt giriş alanı için
    overflow-y: auto;
  }
`

interface MessageListProps {
  messages: Message[]
}

const MessageList: React.FC<MessageListProps> = ({messages}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (
      messagesEndRef.current &&
      typeof messagesEndRef.current.scrollIntoView === "function"
    ) {
      messagesEndRef.current.scrollIntoView({behavior: "smooth"})
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <MessageListContainer>
      {messages.map(msg => (
        <MessageBubble
          key={msg.id}
          text={msg.text}
          isOutgoing={msg.isOutgoing}
          timestamp={msg.timestamp}
          isImage={msg.isImage}
        />
      ))}
      <div ref={messagesEndRef} />
    </MessageListContainer>
  )
}

export default MessageList
