import { Schema, model, Document } from 'mongoose'

export interface IChatMessage extends Document {
  userId: Schema.Types.ObjectId
  farmId?: Schema.Types.ObjectId
  userMessage: string
  assistantResponse: string
  context?: any
  createdAt: Date
}

const chatMessageSchema = new Schema<IChatMessage>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    farmId: { type: Schema.Types.ObjectId, ref: 'Farm' },
    userMessage: { type: String, required: true },
    assistantResponse: { type: String, required: true },
    context: Schema.Types.Mixed,
  },
  { timestamps: true }
)

export const ChatMessage = model<IChatMessage>('ChatMessage', chatMessageSchema)
