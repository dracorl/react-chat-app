import React from "react"
import styled from "styled-components"
import {MdOutlineChat, MdMoreVert} from "react-icons/md"

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  background-color: #f0f2f5;
  height: 60px;
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

const SidebarHeader: React.FC = () => (
  <Header>
    <Title>Chats</Title>
    <IconContainer>
      <Icon>
        <MdOutlineChat />
      </Icon>
      <Icon>
        <MdMoreVert />
      </Icon>
    </IconContainer>
  </Header>
)

export default SidebarHeader
