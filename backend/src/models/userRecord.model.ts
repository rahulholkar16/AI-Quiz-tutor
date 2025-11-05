import mongoose, { Schema } from "mongoose";

const UsageRecordSchema = new Schema({
    organizationId: { type: Schema.Types.ObjectId, ref: "Organization", required: true },
    feature: { type: String, required: true },
    tokensEstimated: { type: Number, default: 0 },
    costCentsEstimated: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    meta: Schema.Types.Mixed
});

export const UserRecordModel = mongoose.model("UsageRecord", UsageRecordSchema);
