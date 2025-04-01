import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    const { email, password ,name } = req.body;

    if (!email) {
        throw new ApiError(400, "Email is required");
    }

    if (!name) {
        throw new ApiError(400, "Name is required");
    }
    
    if (!password) {
        throw new ApiError(400, "Password is required");
    }

    const user = await User.create({
        name,
        email,
        password
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );
    if (!createdUser) {
        throw new ApiError(500, "Failed to create User");
    }

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                createdUser,
                "User Registered Successfully"
            )
        );
})

const loginUser = asyncHandler(async (req, res) => {
    const {email, password } = req.body;

    if (!email) {
        throw new ApiError(400, "Email is required");
    }

    const user = await User.findOne({
        email
    });

    if (!user) {
        throw new ApiError(404, "Invalid Email or Password");
    }

    // check if password is correct
    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid credentials");
    }

    // generate and refresh and access token
    const { accessToken, refreshToken: refreshToken } =
        await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User.findOne(user._id).select(
        "-password -refreshToken"
    );

    // set cookie options
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken,
                },
                "User logged in successfully"
            )
        );

});

const logoutUser = asyncHandler(async (req, res) => {
    // get user id from the user in the request object (attached by the auth middleware)
    const user_id = req.user._id;

    // remove refresh token from db (i.e. make it undefined)
    await User.findByIdAndUpdate(
        user_id,
        {
            $unset: {
                refreshToken: 1, // passing the 1 flag unsets the refresh token
            },
        },
        {
            new: true,
        }
    );

    // set cookie options
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "production",
    };

    // return response
    return res
        .status(200)
        .clearCookie("accessToken", cookieOptions)
        .clearCookie("refreshToken", cookieOptions)
        .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
    // get the new password & old password
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user?._id);
    const isOldPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if (!isOldPasswordCorrect) {
        throw new ApiError(400, "Invalid Old Password");
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password Changed Successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    // get refresh token from cookies
    const incomingRefreshToken =
        req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(
        incomingRefreshToken,
        process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id).select("-password");

    if (!user) {
        throw new ApiError(401, "Invalid Refresh Token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
        throw new ApiError(401, "Refresh Token is expired or used");
    }

    const cookieOptions = {
        httpOnly: true,
        // secure: true,
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
    loginUser,
    logoutUser,
    refreshAccessToken,
    getCurrentUser,
    changeCurrentPassword,
};