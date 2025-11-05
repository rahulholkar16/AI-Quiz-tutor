import type { Request, Response } from "express";
import { QuizModel } from "../models/quiz.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const submitAttempt = asyncHandler(async (req: Request, res: Response) => {
    const { quizId, answers } = req.body;
    const quiz = await QuizModel.findById(quizId);
    if (!quiz) throw new ApiError(404, "Quiz not found!");

    let correct = 0;
    quiz.questions.forEach((q: any, i: number) => {
        if (answers[i] === q.answer) correct++;
    });

    const score = Math.round((correct / quiz.questions.length) * 100);
    res.status(200).json(new ApiResponse(200, { score, correct, total: quiz.questions.length }));
});

export const listAttempts = asyncHandler(async (req: Request, res: Response) => {
    res.json([]); // add DB tracking later
})
