import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { OrganizationSwitcher } from "@clerk/nextjs"
import Link from "next/link"
import { LayoutDashboard } from "lucide-react"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId, orgId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  if (!orgId) {
    redirect("/choose-organization")
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card flex flex-col">
        {/* Sidebar Header with Switcher */}
        <div className="p-4 border-b flex items-center justify-between">
          <OrganizationSwitcher 
            hidePersonal
            afterCreateOrganizationUrl="/dashboard"
            afterSelectOrganizationUrl="/dashboard"
            appearance={{
              elements: {
                rootBox: "w-full",
                organizationSwitcherTrigger: "w-full border px-3 py-2 rounded-md hover:bg-accent",
              }
            }}
          />
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-md bg-accent text-accent-foreground text-sm font-medium">
            <LayoutDashboard className="h-4 w-4" />
            <span>Workflows</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-muted/10">
        {children}
      </main>
    </div>
  )
}
