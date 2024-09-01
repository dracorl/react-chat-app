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
const PreviewContainer = styled.div`
  margin-bottom: 10px;
`

const PreviewImage = styled.img`
  max-width: 200px;
  max-height: 200px;
  border-radius: 8px;
`

interface ChatInputProps {
  onSendMessage: (message: string) => void
}

const ChatInput: React.FC<ChatInputProps> = ({onSendMessage}) => {
  const [message, setMessage] = useState("")
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto"
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
    }

    // "/image" komutunu kontrol et
    const imageMatch = message.match(/^\/image\s+(\d+)$/)
    if (imageMatch) {
      const imageNumber = imageMatch[1]
      setPreviewImage(`https://picsum.photos/seed/${imageNumber}/300/200`)
    } else {
      setPreviewImage(null)
    }
  }, [message])

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message.trim())
      setMessage("")
      setPreviewImage(null)
    }
  }

  return (
    <>
      {previewImage && (
        <PreviewContainer>
          <PreviewImage src={previewImage} alt="Preview" />
        </PreviewContainer>
      )}
      <InputContainer>
        <TextArea
          ref={textAreaRef}
          value={message}
          onChange={handleInputChange}
          placeholder="Type your message or use /image command"
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
    </>
  )
}

export default ChatInput
