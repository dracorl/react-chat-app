import React, {useState} from "react"
import styled from "styled-components"
import {FaPlus, FaEllipsisV, FaSearch} from "react-icons/fa"

// Styled components for layout and responsiveness
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

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #ededed;
`

const Title = styled.h2`
  margin: 0;
  font-size: 1.2rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const IconContainer = styled.div`
  display: flex;
  gap: 15px;
`

const Icon = styled.div`
  cursor: pointer;
  font-size: 1.2rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const SearchBar = styled.div`
  padding: 10px;
  background-color: #f6f6f6;
  position: relative;
`

const SearchInput = styled.input`
  width: 100%;
  padding: 8px 30px 8px 10px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`

const SearchIcon = styled(FaSearch)`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    right: 15px;
  }
`

const ChatList = styled.div`
  overflow-y: auto;
  flex: 1;
`

const ChatItem = styled.div`
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  &:hover {
    background-color: #eee;
  }
`

const ProfilePic = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
`

const ChatInfo = styled.div`
  flex: 1;
  min-width: 0;
`

const ChatName = styled.div`
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const LastMessage = styled.div`
  color: #999;
  font-size: 0.9em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    font-size: 0.8em;
  }
`

const ChatDate = styled.div`
  font-size: 0.8em;
  color: #999;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 0.7em;
  }
`

// Chat interface definition
interface Chat {
  id: string
  name: string
  lastMessage: string
  date: string
}

// Props interface for Sidebar component
interface SidebarProps {
  onSelectChat: (chatId: string) => void
}

// Main Sidebar component
const Sidebar: React.FC<SidebarProps> = ({onSelectChat}) => {
  const [chats, setChats] = useState<Chat[]>([
    {id: "1", name: "Alice", lastMessage: "Hello!", date: "14:30"},
    {id: "2", name: "Bob", lastMessage: "What's up?", date: "Yesterday"},
    {id: "3", name: "Charlie", lastMessage: "See ya!", date: "Monday"}
  ])

  return (
    <SidebarContainer>
      {/* Header with title and action icons */}
      <Header>
        <Title>Chats</Title>
        <IconContainer>
          <Icon>
            <FaPlus />
          </Icon>
          <Icon>
            <FaEllipsisV />
          </Icon>
        </IconContainer>
      </Header>
      {/* Search bar */}
      <SearchBar>
        <SearchInput placeholder="Search or start new chat" />
        <SearchIcon />
      </SearchBar>
      {/* List of chat items */}
      <ChatList>
        {chats.map(chat => (
          <ChatItem key={chat.id} onClick={() => onSelectChat(chat.id)}>
            {/* Chat item content */}
            <ProfilePic
              src={`https://picsum.photos/seed/${chat.id}/50`}
              alt={chat.name}
            />
            <ChatInfo>
              <ChatName>{chat.name}</ChatName>
              <LastMessage>{chat.lastMessage}</LastMessage>
            </ChatInfo>
            <ChatDate>{chat.date}</ChatDate>
          </ChatItem>
        ))}
      </ChatList>
    </SidebarContainer>
  )
}

export default Sidebar
