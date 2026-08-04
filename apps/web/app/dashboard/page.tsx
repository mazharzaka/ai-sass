import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { Button } from "@workspace/ui/components/button"
import Link from "next/link"

export default async function DashboardPage() {
  const { userId } = await auth()
  const user = await currentUser()

  if (!userId) {
    redirect("/sign-in")
  }

  return (
    <div className="flex flex-col gap-6 p-8 max-w-7xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-sm">
          Welcome back, <span className="font-semibold text-foreground">{user?.firstName || user?.username || "User"}</span>!
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mt-4">
        {/* Card 1 */}
        <div className="rounded-xl border bg-card p-6 shadow-sm flex flex-col gap-3">
          <div className="flex items-center gap-2 font-semibold">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Active Session</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Your workspace authentication session is fully managed with Clerk. Secure token refreshes are handling automatically.
          </p>
        </div>

        {/* Card 2 */}
        <div className="rounded-xl border bg-card p-6 shadow-sm flex flex-col gap-3">
          <div className="flex items-center gap-2 font-semibold">
            <span>Profile Details</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Logged in as <strong className="text-foreground">{user?.emailAddresses[0]?.emailAddress}</strong>. You can update your security details using the profile button in the top header.
          </p>
        </div>

        {/* Card 3 */}
        <div className="rounded-xl border bg-card p-6 shadow-sm flex flex-col gap-3">
          <div className="flex items-center gap-2 font-semibold">
            <span>SaaS Architecture</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            This dashboard uses async Next.js Server Actions and MERN schema components to manage workspaces efficiently.
          </p>
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <Link href="/">
          <Button variant="outline">Go back to Landing</Button>
        </Link>
      </div>
    </div>
  )
}
