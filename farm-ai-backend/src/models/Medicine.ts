import { Schema, model, Document } from 'mongoose'

export interface IMedicine extends Document {
  name: string
  activeIngredient: string
  type: string
  dosage: string
  diseases: string[]
  safetyPeriod: string
  price?: number
  localDealers?: string[]
  onlineLinks?: string[]
  description: string
  createdAt: Date
}

const medicineSchema = new Schema<IMedicine>(
  {
    name: { type: String, required: true, unique: true },
    activeIngredient: { type: String, required: true },
    type: String,
    dosage: String,
    diseases: [String],
    safetyPeriod: String,
    price: Number,
    localDealers: [String],
    onlineLinks: [String],
    description: String,
  },
  { timestamps: true }
)

export const Medicine = model<IMedicine>('Medicine', medicineSchema)
