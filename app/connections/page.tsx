"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import { Linkedin, Github } from "lucide-react"

const pendingRequests = [
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

export default function ConnectionsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center p-6">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-2">Pending Connection Requests</h1>
        <p className="text-muted-foreground mb-8">These are the requests you've sent that are still pending acceptance.</p>
        <div className="space-y-6">
          {pendingRequests.length === 0 && (
            <div className="text-center text-muted-foreground py-12">No pending requests. Start connecting with more cofounders!</div>
          )}
          {pendingRequests.map(request => (
            <Card key={request.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{request.name}</CardTitle>
                  <CardDescription className="capitalize">{request.role} &bull; {request.industry} &bull; {request.timezone}</CardDescription>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-yellow-600 font-semibold">Pending</span>
                  <span className="text-xs text-muted-foreground">Awaiting acceptance</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-2">
                  {request.skills.map(skill => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4">{request.ai_summary}</p>
                <div className="flex gap-4 items-center">
                  {request.linkedin && (
                    <a href={request.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-600 hover:underline">
                      <Linkedin className="w-5 h-5" />
                      <span className="hidden sm:inline">LinkedIn</span>
                    </a>
                  )}
                  {request.github && (
                    <a href={request.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gray-800 dark:text-gray-200 hover:underline">
                      <Github className="w-5 h-5" />
                      <span className="hidden sm:inline">GitHub</span>
                    </a>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <span className="text-yellow-700 font-medium">Waiting for the other person to accept your request.</span>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
} 