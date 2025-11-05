import type { Request, Response } from "express";
import { PlanModel } from "../models/plan.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const listPlans = asyncHandler(async (req: Request, res: Response) => {
    const plans = await PlanModel.find({}).lean();
    res.status(200).json(new ApiResponse(200, plans));
});

export const getPlanBySku = asyncHandler(async (req: Request, res: Response) => {
    const sku = req.params.sku;
    const plan = await PlanModel.findOne({ sku }).lean();
    if (!plan) throw new ApiError(400, "Plan not found!");
    res.status(200).json(new ApiResponse(200, plan));
});
