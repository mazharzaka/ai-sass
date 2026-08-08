import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@workspace/ui/components/sidebar"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Separator } from "@workspace/ui/components/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@workspace/ui/components/breadcrumb"

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
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-sidebar/50">

        <DashboardSidebar />
        <SidebarInset className="border border-border bg-background shadow-sm dark:border-border/10 overflow-hidden">
          {/* Header toolbar */}
          <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border/40 bg-card/45 px-4 backdrop-blur-md">
            <SidebarTrigger className="cursor-pointer -ml-1 text-muted-foreground hover:text-foreground transition-colors" />
            <Separator orientation="vertical" className="mr-2 h-4 bg-border/50" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-sm font-medium text-muted-foreground/80">
                    Workspace
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>

          {/* Main content body */}
          <main className="flex-1 overflow-y-auto bg-muted/5 p-6 md:p-8">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
