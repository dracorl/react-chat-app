import React from "react"
import styled from "styled-components"
import {Chat} from "../types/Chat"

const ChatItemContainer = styled.div`
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

interface ChatItemProps {
  chat: Chat
  onClick: () => void
}

const ChatItem: React.FC<ChatItemProps> = ({chat, onClick}) => (
  <ChatItemContainer onClick={onClick}>
    <ProfilePic
      src={`https://picsum.photos/seed/${chat.partnerId}/50`}
      alt={chat.partnerName}
    />
    <ChatInfo>
      <ChatName>{chat.partnerName}</ChatName>
      <LastMessage>{chat.lastMessage}</LastMessage>
    </ChatInfo>
    <ChatDate>{chat.timestamp}</ChatDate>
  </ChatItemContainer>
)

export default ChatItem
