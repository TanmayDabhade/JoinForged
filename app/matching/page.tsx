"use client"

import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import { Linkedin, Github } from "lucide-react"

const acceptedMatches = [
  {
    id: "1",
    name: "Alex Kim",
    role: "designer",
    industry: "Fintech",
    timezone: "UTC-5",
    skills: ["UI/UX", "Branding", "Figma"],
    linkedin: "https://linkedin.com/in/alexkim",
    github: "https://github.com/alexkim",
    ai_summary: "Strong complement to your technical skills. Shares your values and time commitment.",
  },
  {
    id: "2",
    name: "Priya Singh",
    role: "non-technical",
    industry: "Healthcare",
    timezone: "UTC+5:30",
    skills: ["Operations", "Fundraising", "Strategy"],
    linkedin: "https://linkedin.com/in/priyasingh",
    github: "",
    ai_summary: "Great industry overlap and compatible communication style.",
  },
]

export default function MatchingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center p-6">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-2">Your Mutual Matches</h1>
        <p className="text-muted-foreground mb-8">These cofounders have accepted your connection request!</p>
        <div className="space-y-6">
          {acceptedMatches.length === 0 && (
            <div className="text-center text-muted-foreground py-12">No mutual matches yet. Keep connecting!</div>
          )}
          {acceptedMatches.map(match => (
            <Card key={match.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{match.name}</CardTitle>
                  <CardDescription className="capitalize">{match.role} &bull; {match.industry} &bull; {match.timezone}</CardDescription>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-green-600 font-semibold">Connected</span>
                  <span className="text-xs text-muted-foreground">Mutual Match</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-2">
                  {match.skills.map(skill => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4">{match.ai_summary}</p>
                <div className="flex gap-4 items-center">
                  {match.linkedin && (
                    <a href={match.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-600 hover:underline">
                      <Linkedin className="w-5 h-5" />
                      <span className="hidden sm:inline">LinkedIn</span>
                    </a>
                  )}
                  {match.github && (
                    <a href={match.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gray-800 dark:text-gray-200 hover:underline">
                      <Github className="w-5 h-5" />
                      <span className="hidden sm:inline">GitHub</span>
                    </a>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex gap-4">
                <span className="text-green-700 font-medium flex-1">You are now connected! You can reach out via LinkedIn, GitHub, or chat below.</span>
                <Link href={`/chat/${match.id}`}>
                  <Button variant="secondary">Chat</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
} 