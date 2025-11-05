import mongoose, { Schema, Types, type Date, type Mixed } from "mongoose";

interface I_Organization extends mongoose.Document {
    "name": string,
    "slug": string,
    "billingCustomerId": string,
    "planSku": string,
    "seats": number,
    "settings": Mixed,
    "status": string,
    createdAt: Date
}

const OrgSchema = new Schema<I_Organization>({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    billingCustomerId: { type: String },
    planSku: { type: String, default: "free" },
    seats: { type: Number, default: 1 },
    status: { type: String, enum: ["active", "trial", "suspended", "cancelled"], default: "trial" },
    settings: { type: Schema.Types.Mixed, default: {} },
    createdAt: { type: Date, default: Date.now }
});

export const OrgModel = mongoose.model<I_Organization>("Organization", OrgSchema);
