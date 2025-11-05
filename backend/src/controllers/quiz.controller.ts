import type { Request, Response } from "express";
import { generateQuiz } from "../services/AI.services.js";
import { QuizModel } from "../models/quiz.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createQuiz = asyncHandler(async (req: Request, res: Response) => {
    const { input, numQuestions } = req.body;
    const orgId = (req as any).organization._id;
    const userId = (req as any).user._id;

    const questions = await generateQuiz(input, numQuestions || 5);
    if(!questions) throw new ApiError(400, "Quiz generation failed!");
    const quiz = await QuizModel.create({
        organizationId: orgId,
        createdBy: userId,
        title: input,
        topic: input,
        questions,
        status: "ready"
    });
    res.status(200).json(new ApiResponse(200, quiz));
});

export const listQuizzes = asyncHandler(async (req: Request, res: Response) => {
    const orgId = (req as any).organization._id;
    const quizzes = await QuizModel.find({ organizationId: orgId }).lean();
    if (!quizzes) throw new ApiError(400, "Quiz list not found!");
    res.status(200).json(new ApiResponse(200, quizzes));
});

export const getQuiz = asyncHandler(async (req: Request, res: Response) => {
    const quiz = await QuizModel.findById(req.params.id).lean();
    if (!quiz) throw new ApiError(400, "Not found!");
    res.status(200).json(new ApiResponse(200, quiz));
});
