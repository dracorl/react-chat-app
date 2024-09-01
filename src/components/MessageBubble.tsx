import React from "react"
import styled from "styled-components"

const BubbleContainer = styled.div<{isOutgoing: boolean}>`
  max-width: 60%;
  padding: 8px 12px;
  border-radius: 8px;
  margin-bottom: 8px;
  position: relative;
  align-self: ${props => (props.isOutgoing ? "flex-end" : "flex-start")};
  background-color: ${props => (props.isOutgoing ? "#dcf8c6" : "#ffffff")};
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
`

const MessageText = styled.p`
  margin: 0;
  margin-bottom: 15px;
`

const MessageTime = styled.span`
  display: block;
  font-size: 0.75rem;
  color: #999;
  text-align: right;
  margin-top: 4px;
`

const MessageImage = styled.img`
  max-width: 100%;
  border-radius: 8px;
  margin-bottom: 4px;
`

const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
`

interface MessageBubbleProps {
  text: string
  isOutgoing: boolean
  timestamp: Date
  isImage?: boolean
}

const formatTime = (date: Date) => {
  return date.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  text,
  isOutgoing,
  timestamp,
  isImage = false
}) => {
  return (
    <BubbleContainer isOutgoing={isOutgoing}>
      <MessageContent>
        {isImage ? (
          <MessageImage src={text} alt="Sent Image" />
        ) : (
          <MessageText>{text}</MessageText>
        )}
        <MessageTime>{formatTime(timestamp)}</MessageTime>
      </MessageContent>
    </BubbleContainer>
  )
}

export default MessageBubble
