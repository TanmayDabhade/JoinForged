"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import { Linkedin, Github } from "lucide-react"

const mockMatches = [
  {
    id: "1",
    name: "Alex Kim",
    role: "designer",
    industry: "Fintech",
    timezone: "UTC-5",
    skills: ["UI/UX", "Branding", "Figma"],
    score: 87,
    ai_summary: "Strong complement to your technical skills. Shares your values and time commitment.",
    linkedin: "https://linkedin.com/in/alexkim",
    github: "https://github.com/alexkim",
  },
  {
    id: "2",
    name: "Priya Singh",
    role: "non-technical",
    industry: "Healthcare",
    timezone: "UTC+5:30",
    skills: ["Operations", "Fundraising", "Strategy"],
    score: 78,
    ai_summary: "Great industry overlap and compatible communication style.",
    linkedin: "https://linkedin.com/in/priyasingh",
    github: "",
  },
  {
    id: "3",
    name: "Jordan Lee",
    role: "technical",
    industry: "Edtech",
    timezone: "UTC+0",
    skills: ["Fullstack", "AI", "APIs"],
    score: 65,
    ai_summary: "Shared motivation and strong technical background.",
    linkedin: "",
    github: "https://github.com/jordanlee",
  },
]

export default function DashboardPage() {
  const { isSignedIn } = useAuth()
  const router = useRouter()
  const [skipped, setSkipped] = useState<string[]>([])
  const [requested, setRequested] = useState<string[]>([])

  useEffect(() => {
    if (isSignedIn === false) {
      router.push("/sign-in")
    }
  }, [isSignedIn, router])

  if (!isSignedIn) return null

  const handleSkip = (id: string) => setSkipped([...skipped, id])
  const handleRequest = (id: string) => setRequested([...requested, id])

  return (
    <div className="min-h-screen bg-background flex flex-col items-center p-0 sm:p-6">
      {/* Nav Bar */}
      <div className="w-full max-w-3xl mt-8">
        <h1 className="text-3xl font-bold mb-2">Your Top Matches</h1>
        <p className="text-muted-foreground mb-8">AI-ranked cofounder matches based on your profile</p>
        <div className="space-y-6">
          {mockMatches.filter(m => m.score >= 60 && !skipped.includes(m.id)).map(match => (
            <Card key={match.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{match.name}</CardTitle>
                  <CardDescription className="capitalize">{match.role} &bull; {match.industry} &bull; {match.timezone}</CardDescription>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-lg font-semibold text-primary">{match.score}%</span>
                  <span className="text-xs text-muted-foreground">Compatibility</span>
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
                <Button
                  variant="default"
                  disabled={requested.includes(match.id)}
                  onClick={() => handleRequest(match.id)}
                >
                  {requested.includes(match.id) ? "Request Sent" : "Send Connection Request"}
                </Button>
                <Button variant="outline" onClick={() => handleSkip(match.id)}>
                  Skip
                </Button>
              </CardFooter>
            </Card>
          ))}
          {mockMatches.filter(m => m.score >= 60 && !skipped.includes(m.id)).length === 0 && (
            <div className="text-center text-muted-foreground py-12">No more matches to show right now.</div>
          )}
        </div>
      </div>
    </div>
  )
} 