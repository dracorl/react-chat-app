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

  useEffect(() => {
    if (input.length > 0) {
      const matchedPhrases = commonPhrases.filter(phrase =>
        phrase.toLowerCase().startsWith(input.toLowerCase())
      )
      setSuggestions(matchedPhrases)
      console.log("Suggestions:", matchedPhrases) // Eklenen log
    } else {
      setSuggestions([])
    }
  }, [input])

  return suggestions
}

export default useAutoComplete
