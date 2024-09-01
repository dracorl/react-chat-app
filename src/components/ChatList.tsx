import React from "react"
import styled from "styled-components"
import ChatItem from "./ChatItem"
import {Chat} from "../types/Chat"

const ChatListContainer = styled.div`
  overflow-y: auto;
  flex: 1;
`

interface ChatListProps {
  chats: Chat[]
  onSelectChat: (chatId: string) => void
}

const ChatList: React.FC<ChatListProps> = ({chats, onSelectChat}) => (
  <ChatListContainer>
    {chats.map(chat => (
      <ChatItem
        key={chat.partnerId}
        chat={chat}
        onClick={() => onSelectChat(chat.partnerId)}
      />
    ))}
  </ChatListContainer>
)

export default ChatList
