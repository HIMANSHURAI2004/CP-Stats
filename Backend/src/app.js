import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
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

export {app}