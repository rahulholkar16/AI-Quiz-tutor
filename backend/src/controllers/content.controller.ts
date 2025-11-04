import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";

export const createContent = asyncHandler(async (req: Request, res: Response) => {
    const { title, tags, url } = req.body;
    const userId = req.user?._id;
    if (userId) throw new ApiError(400, "Unauthorized Access.");
});