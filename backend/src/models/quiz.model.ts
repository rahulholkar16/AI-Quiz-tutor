import { Schema, model } from "mongoose";

const OptionSchema = new Schema({
    id: String, // local option id (A/B/C/D)
    text: String,
});

const QuestionSchema = new Schema({
    text: { type: String, required: true },
    options: [OptionSchema],
    answer: { type: String, required: true },
    explanation: { type: String }, 
});

const QuizSchema = new Schema({
    title: String,
    topic: String,
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    questions: [QuestionSchema],
    meta: {
        difficulty: { type: String },
        sourceText: { type: String }, 
    },
    createdAt: { type: Date, default: Date.now },
});

export default model("Quiz", QuizSchema);
