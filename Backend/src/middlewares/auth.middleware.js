import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

export const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Attach user data from cookies to request
        req.user = {
            name: decoded.name,
            leetcodeUsername: decoded.leetcodeUsername,
            codeforcesUsername: decoded.codeforcesUsername
        };

        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
};
