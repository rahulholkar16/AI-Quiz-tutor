import { createSlice } from "@reduxjs/toolkit";
import { createQuiz, type QuizResponse } from "../quizThunks";

interface QuizState {
    currentQuiz: QuizResponse | null;
    loading: boolean;
    error: string | null;
}

const initialState: QuizState = {
    currentQuiz: null,
    loading: false,
    error: null,
};

const quizSlice = createSlice({
    name: "quiz",
    initialState,
    reducers: {
        resetQuiz: (state) => {
            state.currentQuiz = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createQuiz.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createQuiz.fulfilled, (state, action) => {
                state.loading = false;
                state.currentQuiz = action.payload;
            })
            .addCase(createQuiz.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to generate quiz!";
            });
    },
});

export const { resetQuiz } = quizSlice.actions;
export default quizSlice.reducer;
