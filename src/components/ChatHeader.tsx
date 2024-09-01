import React from "react"
import styled from "styled-components"
import {MdArrowBack, MdMoreVert} from "react-icons/md"

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
`

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 10px;
  display: flex;
  align-items: center;
  color: #54656f;

  @media (min-width: 769px) {
    display: none;
  }
`

const ChatName = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #111b21;
`

const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #54656f;
`

interface ChatHeaderProps {
  selectedChat: string
  onBack: () => void
}

const ChatHeader: React.FC<ChatHeaderProps> = ({selectedChat, onBack}) => (
  <Header>
    <LeftSection>
      <BackButton onClick={onBack}>
        <MdArrowBack size={24} />
      </BackButton>
      <ChatName>{selectedChat}</ChatName>
    </LeftSection>
    <MenuButton>
      <MdMoreVert size={20} />
    </MenuButton>
  </Header>
)

export default ChatHeader
