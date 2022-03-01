import mongoose from 'mongoose'
const Schema = mongoose.Schema


export const HouseSchema = new Schema(
  {
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    color: { type: String, required: false },
    price: { type: Number, required: true },
    description: { type: String, required: false },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account' }
  },
  { timestamps: true, toJSON: { virtuals: true } }

)


