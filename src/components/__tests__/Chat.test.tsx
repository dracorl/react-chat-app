import React from "react"
import {render, fireEvent, screen} from "@testing-library/react"
import Chat from "../Chat"
import {Chat as ChatType} from "../../types/Chat"
import {ChatUser} from "../../types/ChatUser"

// Mock the getBackgroundImage function
jest.mock("../../utils/imageImports", () => ({
  getBackgroundImage: () => "test-background-image"
}))

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = jest.fn()

// Create mock data
const mockChats: (ChatType & ChatUser)[] = [
  {
    partnerId: "1",
    partnerName: "Test User 1",
    lastMessage: "Hello, how are you?",
    timestamp: "2023-05-15T10:30:00Z",
    id: "1",
    name: "Test User 1",
    lastSeen: "2 hours ago"
  },
  {
    partnerId: "2",
    partnerName: "Test User 2",
    lastMessage: "See you tomorrow!",
    timestamp: "2023-05-14T18:45:00Z",
    id: "2",
    name: "Test User 2",
    lastSeen: "1 day ago"
  }
]

describe("Chat", () => {
  it("renders welcome screen when no chat is selected", () => {
    render(<Chat selectedChat={null} onBack={jest.fn()} chats={mockChats} />)
    expect(
      screen.getByText(/Please select a chat to start messaging./i)
    ).toBeInTheDocument()
  })

  it("renders chat interface when a chat is selected", () => {
    render(<Chat selectedChat="1" onBack={jest.fn()} chats={mockChats} />)
    expect(screen.getByText("Test User 1")).toBeInTheDocument()
  })

  it("calls onBack when back button is clicked", () => {
    const mockOnBack = jest.fn()
    render(<Chat selectedChat="1" onBack={mockOnBack} chats={mockChats} />)

    const backButton =
      screen.getByLabelText(/go back/i) || screen.getByTestId("back-button")
    fireEvent.click(backButton)

    expect(mockOnBack).toHaveBeenCalled()
  })

  it("allows sending new messages", () => {
    render(<Chat selectedChat="1" onBack={jest.fn()} chats={mockChats} />)

    const input = screen.getByPlaceholderText(/Type your message/i)
    fireEvent.change(input, {target: {value: "New test message"}})

    const sendButton = screen.getByRole("button", {name: /send/i})
    fireEvent.click(sendButton)

    expect(screen.getByText("New test message")).toBeInTheDocument()
  })

  it("scrolls to bottom when new message is added", () => {
    const scrollIntoViewMock = jest.fn()
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock

    render(<Chat selectedChat="1" onBack={jest.fn()} chats={mockChats} />)

    const input = screen.getByPlaceholderText(/Type your message/i)
    fireEvent.change(input, {target: {value: "New test message"}})

    const sendButton =
      screen.getByLabelText(/send message/i) ||
      screen.getByTestId("send-button")
    fireEvent.click(sendButton)

    expect(scrollIntoViewMock).toHaveBeenCalledWith({behavior: "smooth"})
  })
})
