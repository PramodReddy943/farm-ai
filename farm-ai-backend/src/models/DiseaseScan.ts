import { Schema, model, Document } from 'mongoose'

export interface IDiseaseScan extends Document {
  userId: Schema.Types.ObjectId
  farmId?: Schema.Types.ObjectId
  imageUrl: string
  diseaseName: string
  confidence: number
  geminiResponse: any
  symptoms?: string[]
  treatments: string[]
  severity: 'mild' | 'moderate' | 'severe'
  cropType: string
  createdAt: Date
  updatedAt: Date
}

const diseaseScanSchema = new Schema<IDiseaseScan>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    farmId: { type: Schema.Types.ObjectId, ref: 'Farm' },
    imageUrl: String,
    diseaseName: { type: String, required: true },
    confidence: { type: Number, min: 0, max: 100 },
    geminiResponse: Schema.Types.Mixed,
    symptoms: [String],
    treatments: [String],
    severity: { type: String, enum: ['mild', 'moderate', 'severe'], default: 'moderate' },
    cropType: String,
  },
  { timestamps: true }
)

export const DiseaseScan = model<IDiseaseScan>('DiseaseScan', diseaseScanSchema)
