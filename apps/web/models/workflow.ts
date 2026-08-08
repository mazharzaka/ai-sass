import mongoose, { Schema, Document, model, models, Model } from "mongoose"

export interface IWorkflow extends Document {
  name: string
  description?: string
  state: Record<string, any>
  organizationId: string
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

const WorkflowSchema = new Schema<IWorkflow>(
  {
    name: { type: String, required: true },
    description: { type: String },
    state: { type: Schema.Types.Mixed, default: {} },
    organizationId: { type: String, required: true, index: true },
    createdBy: { type: String, required: true },
  },
  { timestamps: true }
)

export const Workflow: Model<IWorkflow> = models.Workflow || model<IWorkflow>("Workflow", WorkflowSchema)
