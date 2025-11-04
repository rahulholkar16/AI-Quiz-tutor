import { Schema, model } from "mongoose";

const AttemptSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    quiz: { type: Schema.Types.ObjectId, ref: "Quiz" },
    answers: [{ questionId: Schema.Types.ObjectId, selectedOption: String }],
    score: Number,
    correctCount: Number,
    durationSeconds: Number,
    createdAt: { type: Date, default: Date.now },
});

export default model("Attempt", AttemptSchema);
