import React, {useState, useRef, useEffect} from "react"
import styled from "styled-components"
import {MdSend} from "react-icons/md"
import ComboBox from "./ComboBox"
import useAutoComplete from "../hooks/useAutoComplete"

const InputContainer = styled.div`
  padding: 10px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  position: relative; // Relative pozisyon ekleyelim
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

const ComboBoxContainer = styled.div`
  margin-bottom: 10px;
`
const SuggestionsContainer = styled.div`
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  max-height: 150px;
  overflow-y: auto;
  z-index: 1000; // Yüksek bir z-index ekleyelim
`

const SuggestionItem = styled.div`
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`

interface ChatInputProps {
  onSendMessage: (message: string) => void
}

const ChatInput: React.FC<ChatInputProps> = ({onSendMessage}) => {
  const [message, setMessage] = useState("")
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [showComboBox, setShowComboBox] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const {suggestions, error: autoCompleteError} = useAutoComplete(message)

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto"
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
    }

    // Check for "/image" command
    const imageMatch = message.match(/^\/image\s+(\d+)$/)
    if (imageMatch) {
      const imageNumber = imageMatch[1]
      setPreviewImage(`https://picsum.photos/seed/${imageNumber}/300/200`)
    } else {
      setPreviewImage(null)
    }

    // Check for "/select" command
    if (message.trim() === "/select") {
      setShowComboBox(true)
    } else {
      setShowComboBox(false)
    }
  }, [message])

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
    setError(null)
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      try {
        onSendMessage(message.trim())
        setMessage("")
        setPreviewImage(null)
        setShowComboBox(false)
        setError(null)
      } catch (err) {
        console.error("Error sending message:", err)
        setError("Failed to send message. Please try again.")
      }
    } else {
      setError("Message cannot be empty")
    }
  }

  const handleComboBoxSelect = (selected: string) => {
    try {
      onSendMessage(selected)
      setMessage("")
      setShowComboBox(false)
      setError(null)
    } catch (err) {
      console.error("Error sending quick reply:", err)
      setError("Failed to send quick reply. Please try again.")
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion)
    if (textAreaRef.current) {
      textAreaRef.current.focus()
    }
  }

  return (
    <>
      {error && <div style={{color: "red", marginBottom: "10px"}}>{error}</div>}
      {autoCompleteError && (
        <div style={{color: "red", marginBottom: "10px"}}>
          {autoCompleteError}
        </div>
      )}
      {previewImage && (
        <PreviewContainer>
          <PreviewImage src={previewImage} alt="Preview" />
        </PreviewContainer>
      )}
      {showComboBox && (
        <ComboBoxContainer>
          <ComboBox onSelect={handleComboBoxSelect} />
        </ComboBoxContainer>
      )}
      <InputContainer>
        {suggestions.length > 0 && (
          <SuggestionsContainer>
            {suggestions.map((suggestion: string, index: number) => (
              <SuggestionItem
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </SuggestionItem>
            ))}
          </SuggestionsContainer>
        )}
        <TextArea
          ref={textAreaRef}
          value={message}
          onChange={handleInputChange}
          placeholder="Type your message, use /image command, or /select for quick replies..."
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
