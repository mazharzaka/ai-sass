"use server"
import { currentUser } from "@clerk/nextjs/server"
import { getWorkflows } from "@/actions/workflows"
import { EmptyState } from "@/components/empty-state"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { Workflow, Plus, Play, Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"

export default async function DashboardPage() {
  const user = await currentUser()
  let workflows = []

  try {
    workflows = await getWorkflows()
  } catch (e) {
    // Silent catch, fallback to empty list
  }

  const activeWorkflowsCount = workflows.length
  const recentWorkflows = workflows.slice(0, 3)

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight">Overview</h1>
        <p className="text-muted-foreground text-sm">
          Welcome back, <span className="font-semibold text-foreground">{user?.firstName || user?.username || "User"}</span>!
        </p>
      </div>

      {/* Stats Cards */}
      {/* <div className="grid gap-6 md:grid-cols-3 mt-2">
        <Card className="border-border/80 shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Active Workflows</CardTitle>
            <Workflow className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeWorkflowsCount}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Automated workflows configured
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/80 shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Active Session</CardTitle>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">Secured via Clerk</div>
            <p className="text-xs text-muted-foreground mt-1.5">
              Refreshed and fully encrypted session
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/80 shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-semibold text-muted-foreground">SaaS Engine</CardTitle>
            <Sparkles className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">Next.js App Router</div>
            <p className="text-xs text-muted-foreground mt-1.5">
              MERN Stack & Next.js Server Actions
            </p>
          </CardContent>
        </Card>
      </div> */}

      {/* Content Area */}
      <div className="mt-4">
        {workflows.length === 0 ? (
          <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-foreground">Getting Started</h2>
            <EmptyState
              title="No active workflows"
              description="To start automating your operations, you need to create your first workflow diagram flow."
              icon={<Workflow className="h-8 w-8 stroke-[1.5]" />}
              actionLabel="Create a Workflow"
              href="/dashboard/workflows"
            />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight text-foreground">Recent Workflows</h2>
              <Link href="/dashboard/workflows" className="cursor-pointer text-sm font-semibold text-primary hover:underline flex items-center gap-1">
                View all workflows
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recentWorkflows.map((flow: any) => (
                <Card key={flow._id} className="border-border/80 hover:border-primary/40 transition-all shadow-xs flex flex-col justify-between">
                  <CardHeader className="pb-3">
                    <CardTitle className="line-clamp-1 font-bold text-base">{flow.name}</CardTitle>
                    <CardDescription className="line-clamp-2 min-h-[32px] text-xs">
                      {flow.description || "No description provided."}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 flex justify-between items-center text-xs text-muted-foreground border-t border-border/30 px-6 py-3 bg-muted/5 rounded-b-xl">
                    <span>
                      Updated {new Date(flow.updatedAt).toLocaleDateString()}
                    </span>
                    <Link href={`/dashboard/workflows/${flow._id}`} className="cursor-pointer font-semibold text-primary hover:underline">
                      Open Workflow
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
