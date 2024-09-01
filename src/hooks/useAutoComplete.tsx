import {useState, useEffect} from "react"

const commonPhrases = [
  "How are you?",
  "What's up?",
  "Good morning",
  "Good afternoon",
  "Good evening",
  "Thank you",
  "You're welcome",
  "See you later",
  "Have a nice day",
  "Take care",
  "I'm fine, thanks",
  "Nice to meet you",
  "How's it going?",
  "What do you think?",
  "That sounds good",
  "I agree",
  "I disagree",
  "Can you help me?",
  "No problem",
  "I'm sorry"
]

const useAutoComplete = (input: string) => {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      if (input.length > 0) {
        const matchedPhrases = commonPhrases.filter(phrase =>
          phrase.toLowerCase().startsWith(input.toLowerCase())
        )
        setSuggestions(matchedPhrases)
        setError(null)
      } else {
        setSuggestions([])
      }
    } catch (err) {
      console.error("Error generating suggestions:", err)
      setError("Failed to generate suggestions. Please try again.")
      setSuggestions([])
    }
  }, [input])

  return {suggestions, error}
}

export default useAutoComplete
