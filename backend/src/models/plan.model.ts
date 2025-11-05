import mongoose, { Schema } from "mongoose";

const PlanSchema = new Schema({
    sku: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    monthlyPriceCents: { type: Number, default: 0 },
    includedAIRequests: { type: Number, default: 0 },
    aiOverageCentsPerRequest: { type: Number, default: 0 },
    features: [String]
});

export const PlanModel = mongoose.model("Plan", PlanSchema);
