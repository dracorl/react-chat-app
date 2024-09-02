import React from "react"
import styled from "styled-components"
import SidebarHeader from "./SidebarHeader"
import SearchBar from "./SearchBar"
import ChatList from "./ChatList"
import {Chat} from "../types/Chat"
import {ChatUser} from "../types/ChatUser"

const SidebarContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const ChatListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
`

interface SidebarProps {
  chats: (Chat & ChatUser)[]
  onSelectChat: (chatId: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({chats, onSelectChat}) => {
  return (
    <SidebarContainer>
      <SidebarHeader />
      <SearchBar />
      <ChatListContainer>
        <ChatList chats={chats} onSelectChat={onSelectChat} />
      </ChatListContainer>
    </SidebarContainer>
  )
}

export default Sidebar
