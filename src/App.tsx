import React, {useState, useEffect} from "react"
import styled from "styled-components"
import Chat from "./components/Chat"
import Sidebar from "./components/Sidebar"
import {exampleChats} from "./data/chats"

const AppContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  overflow: hidden;
`

interface WrapperProps {
  $isVisible: boolean
}

const SidebarWrapper = styled.div<WrapperProps>`
  width: 30%;
  min-width: 300px;
  max-width: 420px;
  height: 100%;
  border-right: 1px solid #e0e0e0;
  overflow-y: auto;

  @media (max-width: 768px) {
    width: 100%;
    max-width: none;
    display: ${props => (props.$isVisible ? "block" : "none")};
  }
`

const ChatWrapper = styled.div<WrapperProps>`
  flex: 1;
  height: 100%;
  overflow: hidden;

  @media (max-width: 768px) {
    display: ${props => (props.$isVisible ? "block" : "none")};
    width: 100%;
  }
`

const App: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleSelectChat = (chatId: string) => {
    setSelectedChat(chatId)
  }

  const handleBack = () => {
    setSelectedChat(null)
  }

  return (
    <AppContainer>
      <SidebarWrapper $isVisible={!isMobile || !selectedChat}>
        <Sidebar chats={exampleChats} onSelectChat={handleSelectChat} />
      </SidebarWrapper>
      <ChatWrapper $isVisible={!isMobile || !!selectedChat}>
        <Chat
          selectedChat={selectedChat}
          onBack={handleBack}
          chats={exampleChats}
        />
      </ChatWrapper>
    </AppContainer>
  )
}

export default App
