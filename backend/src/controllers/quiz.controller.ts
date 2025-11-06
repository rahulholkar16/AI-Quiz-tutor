import type { Request, Response } from "express";
import { generateQuizWithGemini } from "../services/AI.services.js";
import { QuizModel } from "../models/quiz.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { formatQuizData } from "../utils/quizFormatter.js";


export const createQuiz = asyncHandler(async (req: Request, res: Response) => {
    const { title, topic, type, questionNo } = req.body;
    const user = (req as any).user;

    if (!topic || !type) throw new ApiError(400, "Topic and type are required!");
    if (!["mcq", "fillup", "codeerror"].includes(type))
        throw new ApiError(400, "Invalid quiz type");

    const orgId = user?.organizationId;
    const userId = user?._id;

    const quizData = await generateQuizWithGemini(topic, type, questionNo);
    if (!quizData) throw new ApiError(400, "Quiz generation failed!");

    const formatted = formatQuizData(quizData, type);

    const quiz = await QuizModel.create({
        organizationId: orgId,
        createdBy: userId,
        quizType: type,
        title: title || formatted.topic,
        topic: formatted.topic,
        questions: formatted.questions,
        status: "ready",
    });

    return res
        .status(201)
        .json(new ApiResponse(201, quiz, "Quiz generated successfully!"));
});


export const listQuizzes = asyncHandler(async (req: Request, res: Response) => {
    const orgId = (req as any).user.organizationId;
    const quizzes = await QuizModel.find({ organizationId: orgId })
        .select("title topic quizType status createdAt")
        .sort({ createdAt: -1 })
        .lean();

    if (!quizzes.length) throw new ApiError(404, "No quizzes found!");
    res.status(200).json(new ApiResponse(200, quizzes));
});


export const getQuiz = asyncHandler(async (req: Request, res: Response) => {
    const quiz = await QuizModel.findById(req.params.id).lean();
    if (!quiz) throw new ApiError(404, "Quiz not found!");
    res.status(200).json(new ApiResponse(200, quiz));
});


export const deleteQuiz = asyncHandler(async (req: Request, res: Response) => {
    const orgId = (req as any).user.organizationId;
    const result = await QuizModel.deleteOne({ _id: req.params.id, organizationId: orgId });
    if (result.deletedCount === 0) throw new ApiError(404, "Quiz not found or already deleted!");
    res.json(new ApiResponse(200, { id: req.params.id }, "Quiz deleted successfully"));
});


export const updateQuiz = asyncHandler(async (req: Request, res: Response) => {
    const orgId = (req as any).user.organizationId;
    const quiz = await QuizModel.findOneAndUpdate(
        { _id: req.params.id, organizationId: orgId },
        { $set: req.body },
        { new: true }
    );
    if (!quiz) throw new ApiError(404, "Quiz not found!");
    res.status(200).json(new ApiResponse(200, quiz, "Quiz updated successfully"));
});
