import mongoose, { Schema } from "mongoose";

const AnswerSchema = new Schema({
    questionId: Schema.Types.ObjectId,
    selectedOption: String
});

const AttemptSchema = new Schema({
    organizationId: { type: Schema.Types.ObjectId, ref: "Organization", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    quiz: { type: Schema.Types.ObjectId, ref: "Quiz", required: true },
    answers: [AnswerSchema],
    score: Number,
    correctCount: Number,
    durationSeconds: Number,
    createdAt: { type: Date, default: Date.now }
});

export const AttemptModel = mongoose.model("Attempt", AttemptSchema);
