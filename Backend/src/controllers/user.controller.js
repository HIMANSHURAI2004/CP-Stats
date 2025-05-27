import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefreshTokens = (userData) => {
    try {
        const accessToken = jwt.sign(
            {
                name: userData.name,
                leetcodeUsername: userData.leetcodeUsername,
                codeforcesUsername: userData.codeforcesUsername
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
            }
        );

        const refreshToken = jwt.sign(
            {
                name: userData.name
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
            }
        );

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

    const userData = {
        name,
        leetcodeUsername,
        codeforcesUsername
    };

    // Generate tokens
    const { accessToken, refreshToken } = generateAccessAndRefreshTokens(userData);

    // Set cookie options
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none", 
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    };

    return res
        .status(201)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .cookie("name", name, cookieOptions)
        .cookie("leetcodeUsername", leetcodeUsername, cookieOptions)
        .cookie("codeforcesUsername", codeforcesUsername, cookieOptions)
        .json(
            new ApiResponse(
                201,
                userData,
                "User Registered Successfully"
            )
        );
});

const getCurrentUser = asyncHandler(async (req, res) => {
    // Check if we have the required cookies
    const name = req.cookies.name;
    const leetcodeUsername = req.cookies.leetcodeUsername;
    const codeforcesUsername = req.cookies.codeforcesUsername;

    if (!name) {
        return res
            .status(200)
            .json(
                new ApiResponse(200, {}, "No user data found")
            );
    }

    const userData = {
        name,
        leetcodeUsername,
        codeforcesUsername
    };

    return res
        .status(200)
        .json(
            new ApiResponse(200, userData, "Current User Fetched Successfully")
        );
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request");
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const userData = {
            name: decodedToken.name,
            leetcodeUsername: req.cookies.leetcodeUsername,
            codeforcesUsername: req.cookies.codeforcesUsername
        };

        const tokens = generateAccessAndRefreshTokens(userData);

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none", 
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        };

        return res
            .status(200)
            .cookie("accessToken", tokens.accessToken, cookieOptions)
            .cookie("refreshToken", tokens.refreshToken, cookieOptions)
            .json(new ApiResponse(200, { userData, ...tokens }, "Access Token Refreshed"));
    } catch (error) {
        throw new ApiError(401, "Invalid Refresh Token");
    }
});

const logoutUser = asyncHandler(async (req, res) => {
    // Clear all user-related cookies
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none", 
        path: "/",
        expires: new Date(0) // Set expiration to past date to clear cookie
    };

    return res
        .status(200)
        .clearCookie("accessToken", cookieOptions)
        .clearCookie("refreshToken", cookieOptions)
        .clearCookie("name", cookieOptions)
        .clearCookie("leetcodeUsername", cookieOptions)
        .clearCookie("codeforcesUsername", cookieOptions)
        .json(
            new ApiResponse(200, {}, "User logged out successfully")
        );
});

const updateProfile = asyncHandler(async (req, res) => {
    const { leetcodeUsername, codeforcesUsername } = req.body;
    const name = req.cookies.name;

    if (!name) {
        throw new ApiError(401, "User not authenticated");
    }

    const userData = {
        name,
        leetcodeUsername,
        codeforcesUsername
    };

    // Generate new tokens with updated data
    const { accessToken, refreshToken } = generateAccessAndRefreshTokens(userData);

    // Set cookie options
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none", 
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .cookie("leetcodeUsername", leetcodeUsername, cookieOptions)
        .cookie("codeforcesUsername", codeforcesUsername, cookieOptions)
        .json(
            new ApiResponse(
                200,
                userData,
                "Profile Updated Successfully"
            )
        );
});

export {
    registerUser,
    refreshAccessToken,
    getCurrentUser,
    logoutUser,
    updateProfile
};