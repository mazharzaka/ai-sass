import { OrganizationList } from "@clerk/nextjs"

export default function ChooseOrganizationPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold tracking-tight">Choose Workspace</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Select or create an organization to access your workflows
          </p>
        </div>
        <div className="flex justify-center mt-6">
          <OrganizationList 
            hidePersonal
            afterCreateOrganizationUrl="/dashboard"
            afterSelectOrganizationUrl="/dashboard"
          />
        </div>
      </div>
    </div>
  )
}
