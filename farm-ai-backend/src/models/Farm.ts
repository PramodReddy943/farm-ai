import { Schema, model, Document } from 'mongoose'

export interface IFarm extends Document {
  userId: Schema.Types.ObjectId
  name: string
  size: number
  location: string
  coordinates?: { latitude: number; longitude: number }
  crops: string[]
  soilType?: string
  createdAt: Date
  updatedAt: Date
}

const farmSchema = new Schema<IFarm>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    size: { type: Number, required: true }, // in hectares
    location: { type: String, required: true },
    coordinates: {
      latitude: Number,
      longitude: Number,
    },
    crops: [String],
    soilType: String,
  },
  { timestamps: true }
)

export const Farm = model<IFarm>('Farm', farmSchema)
