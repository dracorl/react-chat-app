import {Chat} from "../types/Chat"
import {ChatUser} from "../types/ChatUser"

export const exampleChats: (Chat & ChatUser)[] = [
  {
    id: "1",
    name: "John Doe",
    lastSeen: "10:35 PM",
    partnerId: "1",
    partnerName: "John Doe",
    lastMessage: "Hello, how are you today?",
    timestamp: "9:30 PM"
  },
  {
    id: "2",
    name: "Jane Smith",
    lastSeen: "11:20 PM",
    partnerId: "2",
    partnerName: "Jane Smith",
    lastMessage: "I am fine, thank you!",
    timestamp: "Monday"
  },
  {
    id: "3",
    name: "Bob Johnson",
    lastSeen: "Yesterday",
    partnerId: "3",
    partnerName: "Bob Johnson",
    lastMessage: "What is the weather like today?",
    timestamp: "10.10.2020"
  }
]
