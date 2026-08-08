"use client"

import * as React from "react"
import { EmptyState } from "@/components/empty-state"
import { Play } from "lucide-react"

export default function RunsPage() {
  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-extrabold tracking-tight">Executions</h1>
        <p className="text-muted-foreground text-sm">
          Monitor your automated workflow execution runs and logs.
        </p>
      </div>

      <div className="mt-4">
        <EmptyState
          title="No execution history"
          description="Your workflow runs and logs will be recorded here once they are triggered manually or via automate schedules."
          icon={<Play className="h-8 w-8 stroke-[1.5]" />}
          actionLabel="Go to Workflows"
          href="/dashboard/workflows"
        />
      </div>
    </div>
  )
}
