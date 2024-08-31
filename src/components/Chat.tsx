import React, {useState, useRef, useEffect} from "react"
import styled from "styled-components"
import MessageBubble from "./MessageBubble"
import backgroundImage from "../assets/background.png"
import WelcomeSVG from "./WelcomeSVG"

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  padding: 20px;
`

const StyledWelcomeSVG = styled(WelcomeSVG)`
  width: 250px;
  height: 250px;
  margin-bottom: 20px;
`

const WelcomeTitle = styled.h1`
  font-size: 32px;
  margin-bottom: 16px;
`

const WelcomeText = styled.p`
  font-size: 14px;
  color: #667781;
  max-width: 500px;
`

const ChatContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
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

const ChatHeader = styled.div`
  padding: 10px;
  background-color: #ededed;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
`

const BackButton = styled.button`
  display: none;
  margin-right: 10px;

  @media (max-width: 768px) {
    display: block;
  }
`

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
`

const InputContainer = styled.div`
  padding: 10px;
  background-color: #f0f0f0;
  display: flex;
  align-items: flex-end;
  position: relative;
  z-index: 1;
`

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: none;
  max-height: 100px;
  min-height: 20px;
  overflow-y: auto;
`

interface Message {
  id: number
  text: string
  isOutgoing: boolean
  timestamp: Date
}

interface ChatProps {
  selectedChat: string | null
  onBack: () => void
}

const Chat: React.FC<ChatProps> = ({selectedChat, onBack}) => {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {id: 1, text: "Merhaba!", isOutgoing: false, timestamp: new Date()},
    {id: 2, text: "Selam, nasılsın?", isOutgoing: true, timestamp: new Date()}
  ])
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Adjust textarea height dynamically
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto"
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
    }
  }, [message])

  // Scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
  }, [messages])

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
  }

  // Send message and update state
  const handleSendMessage = () => {
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
      setMessage("")
    }
  }

  // Render welcome screen if no chat is selected
  if (!selectedChat) {
    return (
      <ChatContainer>
        <ChatBackground />
        <WelcomeContainer>
          <StyledWelcomeSVG />
          <WelcomeTitle>ChatApp Web</WelcomeTitle>
          <WelcomeText>Please select a chat to start messaging.</WelcomeText>
        </WelcomeContainer>
      </ChatContainer>
    )
  }

  return (
    <ChatContainer>
      <ChatBackground />
      <ChatHeader>
        <BackButton onClick={onBack}>Back</BackButton>
        {selectedChat}
      </ChatHeader>
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
      <InputContainer>
        <TextArea
          ref={textAreaRef}
          value={message}
          onChange={handleInputChange}
          placeholder="Type your message here..."
          rows={1}
          onKeyPress={e => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              handleSendMessage()
            }
          }}
        />
      </InputContainer>
    </ChatContainer>
  )
}

export default Chat
