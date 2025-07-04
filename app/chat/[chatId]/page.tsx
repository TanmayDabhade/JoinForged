"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/app/components/ui/button"

const mockMessages = [
  { id: 1, sender: "You", content: "Hey! Excited to connect.", created_at: "10:00 AM" },
  { id: 2, sender: "Alex Kim", content: "Same here! Looking forward to chatting.", created_at: "10:01 AM" },
]

export default function ChatPage() {
  const [messages, setMessages] = useState(mockMessages)
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return
    setMessages([
      ...messages,
      { id: messages.length + 1, sender: "You", content: input, created_at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ])
    setInput("")
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-background p-4">
      <div className="w-full max-w-2xl flex flex-col flex-1 border rounded-lg bg-card shadow-md">
        <div className="p-4 border-b font-bold text-lg">Chat</div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ minHeight: 400 }}>
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}>
              <div className={`rounded-lg px-4 py-2 max-w-xs ${msg.sender === "You" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
                <div className="text-xs mb-1 font-medium">{msg.sender}</div>
                <div>{msg.content}</div>
                <div className="text-[10px] text-muted-foreground mt-1 text-right">{msg.created_at}</div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form
          className="flex items-center gap-2 border-t p-4"
          onSubmit={e => {
            e.preventDefault()
            handleSend()
          }}
        >
          <input
            type="text"
            className="flex-1 border rounded-md p-2 bg-background"
            placeholder="Type your message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            autoFocus
          />
          <Button type="submit" disabled={!input.trim()}>Send</Button>
        </form>
      </div>
    </div>
  )
} 