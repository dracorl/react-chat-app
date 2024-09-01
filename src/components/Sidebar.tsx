import React, {useState} from "react"
import styled from "styled-components"
import SidebarHeader from "./SidebarHeader"
import SearchBar from "./SearchBar"
import ChatList from "./ChatList"
import {Chat} from "../types/Chat"

const SidebarContainer = styled.div`
  width: 30%;
  background-color: #f6f6f6;
  border-right: 1px solid #ddd;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
  }
`

const exampleChats: Chat[] = [
  {
    partnerId: "1",
    partnerName: "John Doe",
    lastMessage: "Hello, how are you today?",
    timestamp: Date.now(),
    isRead: true
  }
]

interface SidebarProps {
  onSelectChat: (chatId: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({onSelectChat}) => {
  const [chats] = useState<Chat[]>(exampleChats)

  return (
    <SidebarContainer>
      <SidebarHeader />
      <SearchBar />
      <ChatList chats={chats} onSelectChat={onSelectChat} />
    </SidebarContainer>
  )
}

export default Sidebar
