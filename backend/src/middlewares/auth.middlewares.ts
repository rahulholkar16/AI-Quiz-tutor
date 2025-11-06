import { OrgModel } from "../models/organization.model.js";
import { UserModel, type I_UserDocument } from "../models/user.model.js";
import type { JwtPayload } from "../types/jwtPayload.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const auth = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const token: string = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if(!token) throw new ApiError(401, "Unauthorized request");

    try {
        const decode = jwt.verify(token, process.env.ACCESS_JWT_SECRET!) as JwtPayload;
        const user = await UserModel.findById(decode?._id).select(
            "-password -verificationToken -resetPasswordToken -refreshToken"
        ).exec();
        
        if(!user) throw new ApiError(401, "Invalid access token");
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, "Invalid access token");
    }
});

