'use client'

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Badge } from '@/app/components/ui/badge'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'

const roles = ['technical', 'non-technical', 'designer', 'product'] as const
const commitments = ['part-time', 'full-time'] as const
const communications = ['sync', 'async'] as const
const values = [
  'Innovation', 'Impact', 'Growth', 'Collaboration', 'Excellence', 
  'Integrity', 'Creativity', 'Leadership', 'Learning', 'Sustainability'
]

type FormField = keyof typeof initialFormData;
const initialFormData = {
  name: '',
  role: '' as typeof roles[number] | '',
  skills: [] as string[],
  commitment: '' as typeof commitments[number] | '',
  values: [] as string[],
  motivation: '',
  communication: '' as typeof communications[number] | '',
  industry: '',
  timezone: '',
  availability: 10,
  linkedin: '',
  github: '',
  personal_site: ''
}

export default function OnboardingPage() {
  const { user } = useUser()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState(initialFormData)

  const updateFormData = <K extends keyof typeof initialFormData>(field: K, value: typeof initialFormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const addSkill = (skill: string) => {
    if (skill && !formData.skills.includes(skill)) {
      updateFormData('skills', [...formData.skills, skill])
    }
  }

  const removeSkill = (skill: string) => {
    updateFormData('skills', formData.skills.filter(s => s !== skill))
  }

  const toggleValue = (value: string) => {
    if (formData.values.includes(value)) {
      updateFormData('values', formData.values.filter(v => v !== value))
    } else if (formData.values.length < 3) {
      updateFormData('values', [...formData.values, value])
    }
  }

  const handleSubmit = async () => {
    if (!user) return

    try {
      // TODO: Save to Supabase
      console.log('Saving profile:', formData)
      // Redirect to dashboard after successful save
      window.location.href = '/dashboard'
    } catch (error) {
      console.error('Error saving profile:', error)
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateFormData('name', e.target.value)}
                className="w-full p-3 border rounded-md bg-background"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Role</label>
              <div className="grid grid-cols-2 gap-3">
                {roles.map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => updateFormData('role', role)}
                    className={`p-3 border rounded-md text-left capitalize ${
                      formData.role === role ? 'border-primary bg-primary/10' : ''
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Skills</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  placeholder="Add a skill"
                  className="flex-1 p-2 border rounded-md bg-background"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addSkill(e.currentTarget.value)
                      e.currentTarget.value = ''
                    }
                  }}
                />
                <Button onClick={() => {
                  const input = document.querySelector('input[placeholder=\'Add a skill\']') as HTMLInputElement
                  if (input) {
                    addSkill(input.value)
                    input.value = ''
                  }
                }}>
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="cursor-pointer" onClick={() => removeSkill(skill)}>
                    {skill} ×
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Time Commitment</label>
              <div className="grid grid-cols-2 gap-3">
                {commitments.map((commitment) => (
                  <button
                    key={commitment}
                    type="button"
                    onClick={() => updateFormData('commitment', commitment)}
                    className={`p-3 border rounded-md text-left capitalize ${
                      formData.commitment === commitment ? 'border-primary bg-primary/10' : ''
                    }`}
                  >
                    {commitment}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Values (Select 3)</label>
              <div className="grid grid-cols-2 gap-3">
                {values.map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => toggleValue(value)}
                    className={`p-3 border rounded-md text-left ${
                      formData.values.includes(value) ? 'border-primary bg-primary/10' : ''
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Selected: {formData.values.length}/3
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Motivation</label>
              <textarea
                value={formData.motivation}
                onChange={(e) => updateFormData('motivation', e.target.value)}
                className="w-full p-3 border rounded-md bg-background h-24"
                placeholder="What drives you to build something meaningful?"
              />
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Communication Style</label>
              <div className="grid grid-cols-2 gap-3">
                {communications.map((comm) => (
                  <button
                    key={comm}
                    type="button"
                    onClick={() => updateFormData('communication', comm)}
                    className={`p-3 border rounded-md text-left capitalize ${
                      formData.communication === comm ? 'border-primary bg-primary/10' : ''
                    }`}
                  >
                    {comm}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Industry Focus</label>
              <input
                type="text"
                value={formData.industry}
                onChange={(e) => updateFormData('industry', e.target.value)}
                className="w-full p-3 border rounded-md bg-background"
                placeholder="e.g., Fintech, Healthcare, Education"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Timezone</label>
              <select
                value={formData.timezone}
                onChange={(e) => updateFormData('timezone', e.target.value)}
                className="w-full p-3 border rounded-md bg-background"
              >
                <option value="">Select timezone</option>
                <option value="UTC-8">Pacific Time (UTC-8)</option>
                <option value="UTC-7">Mountain Time (UTC-7)</option>
                <option value="UTC-6">Central Time (UTC-6)</option>
                <option value="UTC-5">Eastern Time (UTC-5)</option>
                <option value="UTC+0">UTC</option>
                <option value="UTC+1">Central European Time (UTC+1)</option>
                <option value="UTC+5:30">India Standard Time (UTC+5:30)</option>
                <option value="UTC+8">China Standard Time (UTC+8)</option>
              </select>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Weekly Availability (hours)</label>
              <input
                type="range"
                min="1"
                max="40"
                value={formData.availability}
                onChange={(e) => updateFormData('availability', parseInt(e.target.value))}
                className="w-full"
              />
              <p className="text-sm text-muted-foreground">{formData.availability} hours per week</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">LinkedIn Profile</label>
              <input
                type="url"
                value={formData.linkedin}
                onChange={(e) => updateFormData('linkedin', e.target.value)}
                className="w-full p-3 border rounded-md bg-background"
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">GitHub Profile (optional)</label>
              <input
                type="url"
                value={formData.github}
                onChange={(e) => updateFormData('github', e.target.value)}
                className="w-full p-3 border rounded-md bg-background"
                placeholder="https://github.com/yourusername"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Personal Website (optional)</label>
              <input
                type="url"
                value={formData.personal_site}
                onChange={(e) => updateFormData('personal_site', e.target.value)}
                className="w-full p-3 border rounded-md bg-background"
                placeholder="https://yourwebsite.com"
              />
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Complete Your Profile</CardTitle>
          <CardDescription>
            Step {step} of 5 - Let&apos;s find your perfect cofounder match
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderStep()}
          
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            {step < 5 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={
                  (step === 1 && (!formData.name || !formData.role)) ||
                  (step === 2 && (formData.skills.length === 0 || !formData.commitment)) ||
                  (step === 3 && (formData.values.length !== 3 || !formData.motivation)) ||
                  (step === 4 && (!formData.communication || !formData.industry || !formData.timezone))
                }
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleSubmit}>
                Complete Profile
                <Check className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 