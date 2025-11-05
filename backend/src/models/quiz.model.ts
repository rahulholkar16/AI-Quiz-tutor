import mongoose, { Schema } from "mongoose";

const OptionSchema = new Schema({
    id: String,
    text: String
});

const QuestionSchema = new Schema({
    text: { type: String, required: true },
    options: [OptionSchema],
    answer: { type: String }, // e.g. "A"
    explanation: { type: String }
});

const QuizSchema = new Schema({
    organizationId: { type: Schema.Types.ObjectId, ref: "Organization", required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String },
    topic: { type: String },
    questions: [QuestionSchema],
    meta: Schema.Types.Mixed,
    status: { type: String, enum: ["pending", "ready", "failed"], default: "pending" },
    createdAt: { type: Date, default: Date.now }
});

export const QuizModel = mongoose.model("Quiz", QuizSchema);
