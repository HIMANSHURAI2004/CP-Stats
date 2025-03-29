import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import errorHandler from "./utils/ErrorHandler";
const app = express();

dotenv.config()

app.use(cors({
    origin: process.env.FRONTEND_URL, // Frontend URL
    credentials: true,
    optionsSuccessStatus: 200,
}))


app.use(express.json({ limit:"5mb" }));
app.use(express.urlencoded({extended :true,limit : "5mb"}));
app.use(express.static("public"));
app.use(cookieParser());


app.use(errorHandler);

export {app}