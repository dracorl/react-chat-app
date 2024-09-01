import React from "react"
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
  messagesEndRef: React.RefObject<HTMLDivElement>
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  messagesEndRef
}) => (
  <MessagesContainer>
    {messages.map(msg => (
      <MessageBubble
        key={msg.id}
        text={msg.text}
        isOutgoing={msg.isOutgoing}
        timestamp={msg.timestamp}
      />
    ))}
    <div ref={messagesEndRef} />
  </MessagesContainer>
)

export default MessageList
