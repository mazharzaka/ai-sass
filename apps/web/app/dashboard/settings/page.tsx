"use client"

import * as React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Settings, Save, ShieldAlert, KeyRound } from "lucide-react"
import { toast } from "sonner"

export default function SettingsPage() {
  const [loading, setLoading] = React.useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast.success("Settings saved successfully!")
    }, 800)
  }

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-extrabold tracking-tight">Settings</h1>
        <p className="text-muted-foreground text-sm">
          Configure your workspace parameters and developer options.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6 mt-4">
        {/* Workspace Config */}
        <Card className="border-border/80 shadow-xs">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/5 text-primary">
              <Settings className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>Workspace Properties</CardTitle>
              <CardDescription>Update name and basic info of this SaaS workspace.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="org-name">Organization / Team Name</Label>
              <Input id="org-name" defaultValue="My SaaS Organization" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="notify-email">Notification Email</Label>
              <Input id="notify-email" type="email" placeholder="notifications@example.com" />
            </div>
          </CardContent>
        </Card>

        {/* Security & Access */}
        <Card className="border-border/80 shadow-xs">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>Security & Access Control</CardTitle>
              <CardDescription>Manage security levels and triggers permissions.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-dashed border-border/80 rounded-lg bg-muted/5">
              <div className="space-y-1">
                <p className="text-sm font-semibold leading-none">Developer Access Token</p>
                <p className="text-xs text-muted-foreground">Used for triggering workflows via external Webhooks.</p>
              </div>
              <Button type="button" variant="outline" className="cursor-pointer gap-2">
                <KeyRound className="h-4 w-4" />
                Regenerate
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Save footer */}
        <div className="flex justify-end pt-2">
          <Button type="submit" disabled={loading} className="cursor-pointer gap-2">
            <Save className="h-4 w-4" />
            {loading ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </form>
    </div>
  )
}
