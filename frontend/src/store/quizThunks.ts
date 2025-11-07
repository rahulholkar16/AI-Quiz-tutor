import { createAsyncThunk } from "@reduxjs/toolkit";

export interface QuizQuestionType {
    type: "mcq" | "fillup" | "codeerror";
    title: string;
    question: string;
    options?: string[];
    correctAnswer?: string;
    explanation?: string;
    errorCode?: string;
    task?: string;
    correctCode?: string;
}

export interface QuizResponse {
    _id?: string;
    topic: string;
    quizType: "mcq" | "fillup" | "codeerror";
    questions: QuizQuestionType[];
}

export const createQuiz = createAsyncThunk<
    QuizResponse,
    { topic: string; quizType: "mcq" | "fillup" | "codeerror"; questionNo: number },
    { rejectValue: string }
>("quiz/createQuiz", async (payload, { rejectWithValue }) => {
    try {
        const res = await fetch("http://localhost:3000/api/v1/quizzes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Quiz generation failed!");

        return data.data as QuizResponse;
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});
