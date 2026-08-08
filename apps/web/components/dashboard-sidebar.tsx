"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, Workflow, Play, Settings } from "lucide-react"
import { OrganizationSwitcher } from "@clerk/nextjs"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  useSidebar,
} from "@workspace/ui/components/sidebar"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"

export function DashboardSidebar() {
  const pathname = usePathname()
  const { toggleSidebar, state } = useSidebar()
  const isCollapsed = state === "collapsed"

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      title: "Workflows",
      href: "/dashboard/workflows",
      icon: Workflow,
      exact: false,
    },
    {
      title: "Executions",
      href: "/dashboard/runs",
      icon: Play,
      exact: false,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
      exact: false,
    },
  ]

  const isItemActive = (href: string, exact: boolean) => {
    if (exact) {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <Sidebar variant="inset" className="mt-10" collapsible="icon">

      <SidebarHeader className="p-4 border-b border-sidebar-border/50">
        <div className="w-full">
          <OrganizationSwitcher
            hidePersonal
            afterCreateOrganizationUrl="/dashboard"
            afterSelectOrganizationUrl="/dashboard"
            appearance={{
              elements: {
                rootBox: "w-full flex items-center justify-between",
                organizationSwitcherTrigger: cn(
                  "w-full border border-sidebar-border px-3 py-2 rounded-lg flex items-center justify-between bg-background shadow-xs hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground cursor-pointer transition-colors text-sm font-medium min-h-[38px]",
                  isCollapsed ? "h-9 w-9 p-0 justify-center" : ""
                ),
                organizationSwitcherTriggerIcon: isCollapsed ? "hidden" : "text-sidebar-foreground/75 cursor-pointer ml-1 shrink-0",
                organizationPreview: "flex items-center gap-2 min-w-0 flex-1 truncate",
                organizationPreviewTextContainer: isCollapsed ? "hidden" : "flex flex-col text-left min-w-0 flex-1 truncate",
                organizationPreviewAvatarBox: "h-5 w-5 shrink-0",
              }
            }}
          />
        </div>
      </SidebarHeader>
      <SidebarContent className="p-3">
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/50">
            Workspace
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-2">
            <SidebarMenu>
              {navItems.map((item) => {
                const active = isItemActive(item.href, item.exact)
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      className="cursor-pointer transition-all duration-200"
                    >
                      <Link href={item.href} className="cursor-pointer">
                        <item.icon className="h-4 w-4 shrink-0" />
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
