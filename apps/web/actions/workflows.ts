"use server"

import { auth } from "@clerk/nextjs/server"
import { dbConnect } from "@/lib/mongodb"
import { Workflow } from "@/models/workflow"
import { revalidatePath } from "next/cache"

async function getRequiredOrgId() {
  const { orgId, userId } = await auth()
  if (!userId) {
    throw new Error("Unauthorized: User is not logged in")
  }
  if (!orgId) {
    throw new Error("Organization Required: Please select or create an organization")
  }
  return { orgId, userId }
}

export async function getWorkflows() {
  await dbConnect()
  const { orgId } = await getRequiredOrgId()
  
  const workflows = await Workflow.find({ organizationId: orgId }).sort({ updatedAt: -1 })
  return JSON.parse(JSON.stringify(workflows))
}

export async function createWorkflow(data: { name: string; description?: string; state?: Record<string, any> }) {
  await dbConnect()
  const { orgId, userId } = await getRequiredOrgId()

  const newWorkflow = await Workflow.create({
    name: data.name,
    description: data.description,
    state: data.state || {},
    organizationId: orgId,
    createdBy: userId,
  })

  revalidatePath("/dashboard")
  return JSON.parse(JSON.stringify(newWorkflow))
}

export async function updateWorkflow(id: string, data: Partial<{ name: string; description: string; state: Record<string, any> }>) {
  await dbConnect()
  const { orgId } = await getRequiredOrgId()

  const updated = await Workflow.findOneAndUpdate(
    { _id: id, organizationId: orgId },
    { $set: data },
    { new: true }
  )

  if (!updated) {
    throw new Error("Workflow not found or user unauthorized to modify it")
  }

  revalidatePath("/dashboard")
  return JSON.parse(JSON.stringify(updated))
}

export async function deleteWorkflow(id: string) {
  await dbConnect()
  const { orgId } = await getRequiredOrgId()

  const deleted = await Workflow.findOneAndDelete({ _id: id, organizationId: orgId })

  if (!deleted) {
    throw new Error("Workflow not found or user unauthorized to delete it")
  }

  revalidatePath("/dashboard")
  return { success: true }
}
