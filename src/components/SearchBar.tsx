import React from "react"
import styled from "styled-components"
import {FaSearch} from "react-icons/fa"

const SearchBarContainer = styled.div`
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

const SearchBar: React.FC = () => (
  <SearchBarContainer>
    <SearchInput placeholder="Search or start new chat" />
    <SearchIcon />
  </SearchBarContainer>
)

export default SearchBar
