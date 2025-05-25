import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);

        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while generating refresh and access tokens"
        );
    }
};

const registerUser = asyncHandler(async (req, res) => {
    const { name, leetcodeUsername, codeforcesUsername } = req.body;

    if (!name) {
        throw new ApiError(400, "Name is required");
    }

    const user = await User.create({
        name,
        leetcodeUsername,
        codeforcesUsername
    });

    const createdUser = await User.findById(user._id);
    if (!createdUser) {
        throw new ApiError(500, "Failed to create User");
    }

    // Generate tokens
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    // Set cookie options
    const cookieOptions = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(201)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .cookie("leetcodeUsername", leetcodeUsername, cookieOptions)
        .cookie("codeforcesUsername", codeforcesUsername, cookieOptions)
        .json(
            new ApiResponse(
                201,
                createdUser,
                "User Registered Successfully"
            )
        );
})

const logoutUser = asyncHandler(async (req, res) => {
    const user_id = req.user._id;

    await User.findByIdAndUpdate(
        user_id,
        {
            $unset: {
                refreshToken: 1,
            },
        },
        {
            new: true,
        }
    );

    const cookieOptions = {
        httpOnly: true,
        secure: true
    };

    return res
        .status(200)
        .clearCookie("accessToken", cookieOptions)
        .clearCookie("refreshToken", cookieOptions)
        .clearCookie("leetcodeUsername", cookieOptions)
        .clearCookie("codeforcesUsername", cookieOptions)
        .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(
        incomingRefreshToken,
        process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
        throw new ApiError(401, "Invalid Refresh Token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
        throw new ApiError(401, "Refresh Token is expired or used");
    }

    const cookieOptions = {
        httpOnly: true,
        secure: true,
    };

    const tokens = await generateAccessAndRefreshTokens(user._id);

    return res
        .status(200)
        .cookie("accessToken", tokens.accessToken, cookieOptions)
        .cookie("refreshToken", tokens.refreshToken, cookieOptions)
        .json(new ApiResponse(200, { user, ...tokens }, "Access Token Refreshed"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
    const currentUser = req.user;
    return res
        .status(200)
        .json(
            new ApiResponse(200, currentUser, "Current User Fetched Successfully")
        );
});

export {
    registerUser,
    logoutUser,
    refreshAccessToken,
    getCurrentUser,
};