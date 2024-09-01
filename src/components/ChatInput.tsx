import React, {useState, useRef, useEffect} from "react"
import styled from "styled-components"
import {MdSend} from "react-icons/md"

const InputContainer = styled.div`
  padding: 10px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
`

const TextArea = styled.textarea`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 20px;
  resize: none;
  max-height: 100px;
  min-height: 20px;
  overflow-y: auto;
  font-size: 15px;
  margin-right: 10px;

  /* Hide scrollbar for Firefox */
  scrollbar-width: none;

  /* Hide scrollbar for Webkit browsers (Chrome, Safari) */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE and Edge */
  -ms-overflow-style: none;
`

const SendButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #00a884;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`

interface ChatInputProps {
  onSendMessage: (message: string) => void
}

const ChatInput: React.FC<ChatInputProps> = ({onSendMessage}) => {
  const [message, setMessage] = useState("")
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto"
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
    }
  }, [message])

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message.trim())
      setMessage("")
    }
  }

  return (
    <InputContainer>
      <TextArea
        ref={textAreaRef}
        value={message}
        onChange={handleInputChange}
        placeholder="Type your message here..."
        rows={1}
        onKeyDown={e => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
          }
        }}
      />
      <SendButton onClick={handleSendMessage} disabled={!message.trim()}>
        <MdSend />
      </SendButton>
    </InputContainer>
  )
}

export default ChatInput
