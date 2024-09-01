import React, {useState} from "react"
import styled from "styled-components"

const Select = styled.select`
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 14px;
`

interface ComboBoxProps {
  onSelect: (selected: string) => void
}

const ComboBox: React.FC<ComboBoxProps> = ({onSelect}) => {
  const [selected, setSelected] = useState("")

  const options = [
    "I'm busy at the moment, I'll call you back later.",
    "In a meeting, will get back to you soon.",
    "Can't talk right now, text you in a bit.",
    "On my way, be there in 10 minutes.",
    "Thanks for your message, I'll respond when I'm free.",
    "Currently unavailable, will contact you later."
  ]

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value)
    onSelect(e.target.value)
  }

  return (
    <Select value={selected} onChange={handleChange}>
      <option value="" disabled>
        Select a quick reply...
      </option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </Select>
  )
}

export default ComboBox
