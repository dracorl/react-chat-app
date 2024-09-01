import React from "react"
import styled from "styled-components"
import WelcomeSVG from "./WelcomeSVG"

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  text-align: center;
  padding: 20px;
  background-color: #f8f9fa;
`

const ContentWrapper = styled.div`
  max-width: 500px;
  width: 100%;
`

const StyledWelcomeSVG = styled(WelcomeSVG)`
  width: 250px;
  height: 250px;
  margin-bottom: 20px;
`

const WelcomeTitle = styled.h1`
  font-size: 32px;
  margin-bottom: 16px;
  color: #41525d;
`

const WelcomeText = styled.p`
  font-size: 14px;
  color: #667781;
`

const WelcomeScreen: React.FC = () => (
  <WelcomeContainer>
    <ContentWrapper>
      <StyledWelcomeSVG />
      <WelcomeTitle>ChatApp Web</WelcomeTitle>
      <WelcomeText>Please select a chat to start messaging.</WelcomeText>
    </ContentWrapper>
  </WelcomeContainer>
)

export default WelcomeScreen
