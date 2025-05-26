import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import errorHandler from "./utils/ErrorHandler.js";
const app = express();

dotenv.config()

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173", // Frontend URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Set-Cookie'],
    optionsSuccessStatus: 200,
}))


app.use(express.json({ limit:"5mb" }));
app.use(express.urlencoded({extended :true,limit : "5mb"}));
app.use(express.static("public"));
app.use(cookieParser());


app.use(errorHandler);

import userRouter from "./routes/user.routes.js";


app.use("/user",userRouter);


import contestRouter from "./routes/contest.routes.js";

app.use("/contest",contestRouter);


import leetcodeRouter from "./routes/leetcode.routes.js";
import codeforcesRoutes from './routes/codeforces.routes.js';

app.use("/leetcode", leetcodeRouter);
app.use('/codeforces', codeforcesRoutes);

export {app}