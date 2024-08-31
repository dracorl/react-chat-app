import React, {useState} from "react"
import Chat from "./components/Chat"
import Sidebar from "./components/Sidebar"
import {ThemeProvider} from "styled-components"
import {GlobalStyle, theme} from "./styles/globalStyles"
import styled from "styled-components"

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const App: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  React.useEffect(() => {
    // Handle responsive layout changes
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppContainer>
        {/* Conditional rendering for Sidebar based on mobile and chat selection */}
        {(!isMobile || !selectedChat) && (
          <Sidebar onSelectChat={setSelectedChat} />
        )}
        {/* Conditional rendering for Chat based on mobile and chat selection */}
        {(!isMobile || selectedChat) && (
          <Chat
            selectedChat={selectedChat}
            onBack={() => setSelectedChat(null)}
          />
        )}
      </AppContainer>
    </ThemeProvider>
  )
}

export default App
