import React, {useState, useEffect, useCallback} from "react"
import styled from "styled-components"
import ChatHeader from "./ChatHeader"
import MessageList from "./MessageList"
import ChatInput from "./ChatInput"
import WelcomeScreen from "./WelcomeScreen"
import {Chat as ChatType} from "../types/Chat"
import {ChatUser} from "../types/ChatUser"
import {Message} from "../types/Message"
import {getBackgroundImage} from "../utils/imageImports"

const backgroundImage = getBackgroundImage()

const ChatContainer = styled.div`
  flex: 1;
  background-image: url(${backgroundImage});
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  height: 100%;
`

const ChatBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url(${backgroundImage});
  background-repeat: repeat;
  opacity: 0;
  z-index: 0;
`

const ChatContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
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
  chats: (ChatType & ChatUser)[]
}

const Chat: React.FC<ChatProps> = ({selectedChat, onBack, chats}) => {
  const [chatMessages, setChatMessages] = useState<{[key: string]: Message[]}>(
    {}
  )
  const [error, setError] = useState<string | null>(null)

  const addMessage = useCallback(
    (
      userId: string,
      text: string,
      isOutgoing: boolean,
      isImage: boolean = false
    ) => {
      setChatMessages(prevMessages => ({
        ...prevMessages,
        [userId]: [
          ...(prevMessages[userId] || []),
          {
            id: (prevMessages[userId]?.length || 0) + 1,
            text,
            isOutgoing,
            timestamp: new Date(),
            isImage
          }
        ]
      }))
    },
    []
  )

  useEffect(() => {
    if (selectedChat) {
      const lastMessage = chatMessages[selectedChat]?.slice(-1)[0]
      if (lastMessage && lastMessage.isOutgoing) {
        let response: string | null = null

        if (lastMessage.isImage) {
          response = "Very lovely picture!"
        }

        if (response) {
          setTimeout(() => {
            addMessage(selectedChat, response, false)
          }, 500)
        }
      }
    }
  }, [chatMessages, selectedChat, addMessage])

  const handleSendMessage = (message: string) => {
    if (selectedChat) {
      try {
        if (message.trim()) {
          const imageMatch = message.match(/^\/image\s+(\d+)$/)
          if (imageMatch) {
            const imageNumber = imageMatch[1]
            const imageUrl = `https://picsum.photos/seed/${imageNumber}/300/200`
            addMessage(selectedChat, imageUrl, true, true)
          } else {
            addMessage(selectedChat, message, true)
          }
          setError(null)
        }
      } catch (err) {
        console.error("Error sending message:", err)
        setError("Failed to send message. Please try again.")
      }
    }
  }

  const handleComboBoxSelect = (selected: string) => {
    if (selectedChat) {
      addMessage(selectedChat, selected, true)
      setTimeout(() => {
        addMessage(selectedChat, "Ok", false)
      }, 500)
    }
  }

  const selectedChatData = chats.find(chat => chat.id === selectedChat)

  return (
    <ChatContainer>
      <ChatBackground />
      {selectedChat && selectedChatData ? (
        <ChatContent>
          <ChatHeader selectedChat={selectedChatData} onBack={onBack} />
          <ScrollableContent>
            {error && (
              <div style={{color: "red", padding: "10px"}}>{error}</div>
            )}
            <MessageList messages={chatMessages[selectedChat] || []} />
          </ScrollableContent>
          <ChatInput
            onSendMessage={handleSendMessage}
            onComboBoxSelect={handleComboBoxSelect}
          />
        </ChatContent>
      ) : (
        <WelcomeScreen />
      )}
    </ChatContainer>
  )
}

export default Chat
