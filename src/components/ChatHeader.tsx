import React from "react"
import styled from "styled-components"
import {MdArrowBack, MdMoreVert, MdSearch} from "react-icons/md"

const Header = styled.div`
  padding: 10px 16px;
  background-color: #f0f2f5;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
`

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-right: 15px;
  display: flex;
  align-items: center;
  color: #54656f;

  @media (min-width: 769px) {
    display: none;
  }
`

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0; // Bu, içeriğin taşmasını önler
`

const ProfilePic = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  flex-shrink: 0;
`

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0; // Bu, içeriğin taşmasını önler
`

const ChatName = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #111b21;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const LastSeen = styled.span`
  font-size: 12px;
  color: #667781;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const RightSection = styled.div`
  display: flex;
  align-items: center;
`

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #54656f;
  padding: 8px;
  margin-left: 8px;
`

interface ChatHeaderProps {
  selectedChat: {
    id: string
    name: string
    lastSeen: string
  }
  onBack: () => void
}

const ChatHeader: React.FC<ChatHeaderProps> = ({selectedChat, onBack}) => (
  <Header>
    <LeftSection>
      <BackButton
        onClick={onBack}
        aria-label="Go back"
        data-testid="back-button"
      >
        <MdArrowBack size={24} />
      </BackButton>
      <ProfileSection>
        <ProfilePic
          src={`https://picsum.photos/seed/${selectedChat.id}/40`}
          alt={selectedChat.name}
        />
        <UserInfo>
          <ChatName>{selectedChat.name}</ChatName>
          <LastSeen>Last seen {selectedChat.lastSeen}</LastSeen>
        </UserInfo>
      </ProfileSection>
    </LeftSection>
    <RightSection>
      <IconButton>
        <MdSearch size={20} />
      </IconButton>
      <IconButton>
        <MdMoreVert size={20} />
      </IconButton>
    </RightSection>
  </Header>
)

export default ChatHeader
