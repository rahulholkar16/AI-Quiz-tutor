import mongoose, { Schema, Document } from "mongoose";

const OptionSchema = new Schema({
    id: { type: String },
    text: { type: String },
});

const QuestionSchema = new Schema({
    type: {
        type: String,
        enum: ["mcq", "fillup", "codeerror"],
        required: true,
    },

    // Common fields
    title: { type: String },
    question: { type: String, required: true },
    explanation: { type: String },

    // MCQ specific
    options: [OptionSchema],
    answer: { type: String }, // "A" or text

    // Fill-in-the-blank specific
    correctAnswer: { type: String }, // e.g. "const"

    // Code error specific
    errorCode: { type: String }, // buggy code snippet
    task: { type: String }, // what to fix
    correctCode: { type: String }, // corrected code
});

const QuizSchema = new Schema(
    {
        quizType: {
            type: String,
            enum: ["mcq", "fillup", "codeerror", "mixed"],
            required: true,
            default: "mcq",
        },
        topic: { type: String, required: true },
        title: { type: String },
        organizationId: {
            type: Schema.Types.ObjectId,
            ref: "Organization",
            required: true,
        },
        createdBy: { type: Schema.Types.ObjectId, ref: "User" },
        questions: [QuestionSchema],
        meta: Schema.Types.Mixed,
        status: {
            type: String,
            enum: ["pending", "ready", "failed"],
            default: "pending",
        },
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export const QuizModel = mongoose.model("Quiz", QuizSchema);