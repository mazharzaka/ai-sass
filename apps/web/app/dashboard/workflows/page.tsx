"use client"

import * as React from "react"
import { type IWorkflow } from "@/models/workflow"
import { getWorkflows, createWorkflow, deleteWorkflow } from "@/actions/workflows"
import { EmptyState } from "@/components/empty-state"
import { Button } from "@workspace/ui/components/button"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@workspace/ui/components/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@workspace/ui/components/dialog"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Textarea } from "@workspace/ui/components/textarea"
import { Workflow, Plus, Trash2, ArrowRight, Play, Loader2 } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

export default function WorkflowsPage() {
  const [workflows, setWorkflows] = React.useState<IWorkflow[]>([])
  const [loading, setLoading] = React.useState(true)
  const [isCreateOpen, setIsCreateOpen] = React.useState(false)
  const [name, setName] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [submitting, setSubmitting] = React.useState(false)

  const fetchWorkflows = React.useCallback(async () => {
    try {
      setLoading(true)
      const data = await getWorkflows()
      setWorkflows(data)
    } catch (err: any) {
      toast.error(err.message || "Failed to load workflows")
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => {
    fetchWorkflows()
  }, [fetchWorkflows])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    try {
      setSubmitting(true)
      await createWorkflow({ name, description })
      toast.success("Workflow created successfully")
      setIsCreateOpen(false)
      setName("")
      setDescription("")
      fetchWorkflows()
    } catch (err: any) {
      toast.error(err.message || "Failed to create workflow")
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete workflow "${name}"?`)) return

    try {
      await deleteWorkflow(id)
      toast.success("Workflow deleted successfully")
      fetchWorkflows()
    } catch (err: any) {
      toast.error(err.message || "Failed to delete workflow")
    }
  }

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-extrabold tracking-tight">Workflows</h1>
          <p className="text-muted-foreground text-sm">
            Create, edit, and monitor your automation workflows.
          </p>
        </div>

        {workflows.length > 0 && (
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="cursor-pointer gap-2 shadow-xs">
                <Plus className="h-4 w-4" />
                Create Workflow
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create Workflow</DialogTitle>
                <DialogDescription>
                  Define your new workflow name and optional description.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreate} className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="E.g. Lead Ingestion Flow"
                    required
                    autoFocus
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe what this workflow automates..."
                    rows={3}
                  />
                </div>
                <DialogFooter className="pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsCreateOpen(false)}
                    disabled={submitting}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={submitting} className="cursor-pointer">
                    {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Create
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {workflows.length === 0 ? (
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <EmptyState
            title="No workflows created"
            description="You don't have any automation workflows in this organization yet. Let's create your first one!"
            icon={<Workflow className="h-8 w-8 stroke-[1.5]" />}
            actionLabel="Create Workflow"
            onAction={() => setIsCreateOpen(true)}
          />
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Workflow</DialogTitle>
              <DialogDescription>
                Define your new workflow name and optional description.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="E.g. Lead Ingestion Flow"
                  required
                  autoFocus
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what this workflow automates..."
                  rows={3}
                />
              </div>
              <DialogFooter className="pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreateOpen(false)}
                  disabled={submitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={submitting} className="cursor-pointer">
                  {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workflows.map((flow) => (
            <Card key={flow._id.toString()} className="group relative flex flex-col justify-between overflow-hidden border-border/80 hover:border-primary/40 hover:shadow-md transition-all duration-300">
              <CardHeader className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/5 text-primary group-hover:bg-primary/10 transition-colors">
                    <Workflow className="h-5 w-5" />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="cursor-pointer opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200"
                    onClick={() => handleDelete(flow._id.toString(), flow.name)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <CardTitle className="line-clamp-1 font-bold text-lg pt-2 group-hover:text-primary transition-colors">
                  {flow.name}
                </CardTitle>
                <CardDescription className="line-clamp-2 min-h-[40px] text-sm leading-relaxed">
                  {flow.description || "No description provided."}
                </CardDescription>
              </CardHeader>
              <CardFooter className="border-t border-border/30 bg-muted/5 px-6 py-4 flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  Updated {new Date(flow.updatedAt).toLocaleDateString()}
                </span>
                <Link href={`/dashboard/workflows/${flow._id}`} className="cursor-pointer flex items-center gap-1.5 font-semibold text-primary hover:underline group/btn">
                  Open
                  <ArrowRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
