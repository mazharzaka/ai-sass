"use client"

import * as React from "react"
import { type LucideIcon, Workflow } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"
import Link from "next/link"

interface EmptyStateProps {
  title: string
  description: string
  icon?: React.ReactNode
  actionLabel?: string
  onAction?: () => void
  href?: string
  className?: string
}

export function EmptyState({
  title,
  description,
  icon,
  actionLabel,
  onAction,
  href,
  className,
}: EmptyStateProps) {
  const IconElement = (
    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/5 text-primary ring-8 ring-primary/2.5 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/10 dark:bg-primary/10 dark:ring-primary/5 dark:group-hover:bg-primary/20">
      {icon || <Workflow className="h-8 w-8 stroke-[1.5]" />}
    </div>
  )

  const ActionButton = actionLabel && (
    <div className="mt-2 transition-all duration-300">
      {href ? (
        <Link href={href} className="cursor-pointer">
          <Button className="cursor-pointer font-medium shadow-sm transition-transform duration-200 active:scale-95">
            {actionLabel}
          </Button>
        </Link>
      ) : (
        <Button
          onClick={onAction}
          className="cursor-pointer font-medium shadow-sm transition-transform duration-200 active:scale-95"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  )

  return (
    <div
      className={cn(
        "group flex min-h-[400px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border/60 bg-muted/20 p-8 text-center transition-all duration-300 hover:border-border/100 hover:bg-muted/30 dark:bg-muted/5 dark:hover:bg-muted/10 md:p-12",
        className
      )}
    >
      <div className="flex flex-col items-center gap-4 max-w-sm">
        {IconElement}
        <div className="space-y-2 mt-2">
          <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary/95">
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
        {ActionButton}
      </div>
    </div>
  )
}
