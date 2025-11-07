import type { Request, Response } from "express";
import { UserModel } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
    emailVerificationContent,
    forgotPasswordContent,
    sendEmail,
} from "../services/sendMail.services.js";
import { ApiResponse } from "../utils/apiResponse.js";
import type { Types } from "mongoose";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "../types/jwtPayload.js";
import { OrgModel } from "../models/organization.model.js";

const generateAccessAndRefreshToken = async (
    userId: string | Types.ObjectId
) => {
    try {
        const user = await UserModel.findById(userId);
        if (!user) throw new ApiError(404, "User not found");
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while generating access token."
        );
    }
};

export const register = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, password } = req.validateData;
    const { organizationName } = req.body;
    const isExist = await UserModel.findOne({ email });
    if (isExist) throw new ApiError(409, "User already exists.");
    const isOrg = await OrgModel.findOne({ name: organizationName });
    console.log(isOrg);
    
    if (!isOrg) throw new ApiError(400, "Org is not found!");
    const newUser = await UserModel.create({
        name,
        email,
        password,
        organizationId: isOrg?._id
    });
    const { unHashedToken, hasedToken, tokenExpiry } =
        newUser.generateTempToken();
    newUser.verificationToken = hasedToken;
    newUser.verificationTokenExpire = tokenExpiry;
    await sendEmail({
        email: newUser.email,
        subject: "Plesase verify your email.",
        mailgenContent: emailVerificationContent(
            newUser.name,
            `${req.protocol}://${req.get(
                "host"
            )}/api/vi/user/verify-email/${unHashedToken}`
        ),
    });
    const data = await UserModel.findById(newUser._id).select(
        "-password -verificationToken -resetPasswordToken -refreshToken"
    );

    if (!data)
        throw new ApiError(500, "Something went wrong while Register a User.");
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { user: data },
                "User added successfully and verification email send"
            )
        );
});

export const login = asyncHandler(async (req: Request, res: Response) => {
    console.log(req.body);
    
    const { email, password } = req.body;
    if (!email || !password)
        throw new ApiError(401, "Email and Password required.");

    const user = await UserModel.findOne({ email });
    if (!user) throw new ApiError(404, "User not found!");

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) throw new ApiError(401, "Invalid Password!");

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
        user._id
    );

    const loggedUser = await UserModel.findById(user._id).select(
        "-password -verificationToken -resetPasswordToken -refreshToken"
    );

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedUser,
                    accessToken,
                    refreshToken,
                },
                "User logged in successfully."
            )
        );
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
    await UserModel.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                refreshToken: "",
            },
        },
        {
            new: true,
        },
    );

    const options = {
        httpOnly: true,
        secure: true
    };

    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out."));
});

export const getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
    return res.status(200).json(new ApiResponse(200, req.user, "Current User fetched successfully."));
});

export const verifyEmail = asyncHandler(async (req: Request, res: Response) => {
    const { verificationToken } = req.params;
    if (!verificationToken) throw new ApiError(400, "Email verfication token is missing.");

    let hashedToken = crypto.createHash("sha256").update(verificationToken).digest("hex");

    const user = await UserModel.findOne({ verificationToken: hashedToken, verificationTokenExpire: { $gt: Date.now() } });
    if (!user) throw new ApiError(400, "Token is invalid or expired");

    user.verificationToken = undefined;
    user.verificationTokenExpire = undefined;
    user.isVerified = true;
    await user.save({ validateBeforeSave: false });

    return res.status(200)
        .json(
            new ApiResponse(
                200,
                {
                    isEmailVerified: true
                },
                "Email is verified"
            )
        );
});

export const resendEmailVerification = asyncHandler(async (req: Request, res: Response) => {
    const user = await UserModel.findById(req.user?._id);
    if(!user) throw new ApiError(404, "User does not exist.");

    if(user.isVerified) throw new ApiError(400, "User alredy verified.");

    const { unHashedToken, hasedToken, tokenExpiry } = user.generateTempToken();
    user.verificationToken = hasedToken;
    user.verificationTokenExpire = tokenExpiry;
    await user.save({ validateBeforeSave: false });
    await sendEmail({
        email: user.email,
        subject: "Please verify your email.",
        mailgenContent: emailVerificationContent(
            user?.name,
            `${req.protocol}://${req.get("host")}/api/v1/user/verify-email/${unHashedToken}`
        )
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Mail has been sent to your email ID."
        )
    );
});

export const refreshAccessToken = asyncHandler(async (req: Request, res: Response) => {
    const incomingrefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    if(!incomingrefreshToken) throw new ApiError(400, "Unauthorized acces");

    try {
        const decode = jwt.verify(incomingrefreshToken, process.env.REFRESH_JWT_SECRET as string) as JwtPayload;
        const user = await UserModel.findById(decode?._id);
        if (!user) throw new ApiError(401, "Invalid refresh token");
        if (incomingrefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired");
        };
        const options = {
            httpOnly: true,
            secure: true
        }

        const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshToken(user._id)

        user.refreshToken = newRefreshToken;

        await user.save({ validateBeforeSave: false });

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken: newRefreshToken },
                    "Access token refreshed."
                )
            );
    } catch (error) {
        throw new ApiError(401, "Invalid refresh token.");
    }
});

export const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) throw new ApiError(400, "User does not exists");

    const { unHashedToken, hasedToken, tokenExpiry } = user.generateTempToken();
    user.resetPasswordToken = hasedToken;
    user.resetPasswordTokenExpire = tokenExpiry;

    await user.save({ validateBeforeSave: false });

    await sendEmail({
        email: user.email,
        subject: "Password reset request.",
        mailgenContent: forgotPasswordContent(
            user.name,
            `${process.env.FORGOT_PASSWORD_REDIRECT_URL}/${unHashedToken}`,
        )
    });

    return res.status(200).json(
        new ApiResponse(200, {}, "Password reset mail has been sent on your mail.")
    );
});

export const resetForgotPassword = asyncHandler(async (req: Request, res: Response) => {
    const { resetToken } = req.params;
    const { password: newPassword } = req.body;
    if (!resetToken) throw new ApiError(400, "Reset token is missing.")

    let hashedToken = crypto.createHash("sha256")
        .update(resetToken)
        .digest("hex");
    
    const user = await UserModel.findOneAndUpdate(
        {
            resetPasswordToken: hashedToken,
            resetPasswordTokenExpire: { $gt: Date.now() }
        },
        {
            password: newPassword,
            resetPasswordToken: undefined,
            resetPasswordTokenExpire: undefined
        }
    );
    if (!user) throw new ApiError(404, "Token is invalid or expired.");
    return res.status(200).json(
        new ApiResponse(200, {}, "Password reset successfully.")
    );
});

export const changeCurrentPassword = asyncHandler(async (req: Request, res: Response) => {
    const { oldPassword, password: newPassword } = req.body;
    const user = await UserModel.findById(req.user?._id);
    if (!user) throw new ApiError(400, "User not found.");
    const isPasswordValid = await user?.isPasswordCorrect(oldPassword);
    if(!isPasswordValid) throw new ApiError(400, "Invalid Old Password.");
    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res.status(200).json(
        new ApiResponse(
            200, 
            {
                oldPassword,
                newPassword
            },
            "Password Change successfully."
        )
    );
});