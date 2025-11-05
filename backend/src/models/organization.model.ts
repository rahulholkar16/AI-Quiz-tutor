import mongoose, { Schema } from "mongoose";

const OrgSchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    billingCustomerId: { type: String },
    planSku: { type: String, default: "free" },
    seats: { type: Number, default: 1 },
    status: { type: String, enum: ["active", "trial", "suspended", "cancelled"], default: "trial" },
    settings: { type: Schema.Types.Mixed, default: {} },
    createdAt: { type: Date, default: Date.now }
});

export const OrgModel = mongoose.model("Organization", OrgSchema);
