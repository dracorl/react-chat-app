export interface Message {
  id: number
  text: string
  isOutgoing: boolean
  timestamp: Date
  isImage?: boolean
}
