import { SignIn } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export const dynamic = "force-dynamic"

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function SignInPage({ searchParams }: PageProps) {
  const { userId } = await auth()
  const resolvedParams = await searchParams

  if (userId) {
    const redirectUrl = resolvedParams.redirect_url || resolvedParams.redirectUrl
    if (typeof redirectUrl === "string" && redirectUrl.startsWith("/") && !redirectUrl.startsWith("//")) {
      redirect(redirectUrl)
    }
    redirect("/dashboard")
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center" }}>
      <SignIn fallbackRedirectUrl="/dashboard" />
    </div>
  )
}
