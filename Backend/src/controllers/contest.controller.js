import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import axios from "axios";
dotenv.config();

const getUpcomingContests = asyncHandler(async (req,res) => {
    const response = await axios.get("https://competeapi.vercel.app/contests/upcoming/");
    if(response.status==200)
    {
        const data = response.data;
        const upcomingContests = data?.map((contest) => ({
            ...contest,
            status:"upcoming",
        }));
        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                upcomingContests,
                "Upcoming Contests Fetched Successfully"
            )
        );
    }
    else{
        throw new ApiError(401, "Error Fetching Upcoming Contests from server");
    }
})

export { getUpcomingContests };