import React from "react"
import {render, fireEvent, screen} from "@testing-library/react"
import ChatInput from "../ChatInput"
import "@testing-library/jest-dom"

describe("ChatInput", () => {
  it("renders input field and send button", () => {
    const mockSendMessage = jest.fn()
    const mockComboBoxSelect = jest.fn()

    render(
      <ChatInput
        onSendMessage={mockSendMessage}
        onComboBoxSelect={mockComboBoxSelect}
      />
    )

    expect(
      screen.getByPlaceholderText(
        "Type your message, use /image command, or /select for quick replies..."
      )
    ).toBeInTheDocument()
    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  it("calls onSendMessage when send button is clicked", () => {
    const mockSendMessage = jest.fn()
    const mockComboBoxSelect = jest.fn()

    render(
      <ChatInput
        onSendMessage={mockSendMessage}
        onComboBoxSelect={mockComboBoxSelect}
      />
    )

    const input = screen.getByPlaceholderText(
      "Type your message, use /image command, or /select for quick replies..."
    )
    fireEvent.change(input, {target: {value: "Hello"}})

    const sendButton = screen.getByRole("button")
    fireEvent.click(sendButton)

    expect(mockSendMessage).toHaveBeenCalledWith("Hello")
  })
})
