import { generateQuizWithGemini } from "../services/AI.services.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const GernerateAi = asyncHandler(async (req, res) => {
    const { topic, type, questionNo } = req.body;
    if (!topic || !type) throw new ApiError(400, "Please provide 'topic' and 'type'.");
    const quiz = await generateQuizWithGemini(topic, type, questionNo);
    res.status(200).json(new ApiResponse(200, quiz));
});
