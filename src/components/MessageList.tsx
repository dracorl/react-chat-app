import React, {useEffect, useRef} from "react"
import styled from "styled-components"
import MessageBubble from "./MessageBubble"
import {Message} from "../types/Message"

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
`

interface MessageListProps {
  messages: Message[]
}

const MessageList: React.FC<MessageListProps> = ({messages}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <MessagesContainer>
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
    </MessagesContainer>
  )
}

export default MessageList
