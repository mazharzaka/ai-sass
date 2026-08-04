"use client"

import { SignInButton, Show, UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { Button } from "@workspace/ui/components/button"

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur-md sticky top-0 z-50">
      <Link href="/" className="font-bold text-xl">
        Relay AI
      </Link>

      <div className="flex items-center gap-4">
        {/* يظهر فقط لو المستخدم مسجل دخوله */}
        <Show when="signed-in">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-sm font-medium hover:underline"
            >
              Dashboard
            </Link>
            {/* القائمة دي فيها خيار Sign Out جاهز من Clerk */}
            <UserButton />
          </div>
        </Show>

        {/* يظهر فقط لو المستخدم مش مسجل دخول */}
        <Show when="signed-out">
          <SignInButton mode="modal">
            <Button size="sm">
              Sign In
            </Button>
          </SignInButton>
        </Show>
      </div>
    </header>
  )
}
