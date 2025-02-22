"use client"

import { Progress } from "@/components/ui/progress"

interface ProgressBarProps {
  currentSection: number
  totalSections: number
}

export function ProgressBar({ currentSection, totalSections }: ProgressBarProps) {
  const progress = (currentSection / totalSections) * 100

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50">
      <Progress value={progress} className="h-2" />
      <p className="mt-2 text-center text-sm text-muted-foreground">Learning Progress: {Math.round(progress)}%</p>
    </div>
  )
}

