import {Router} from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getCurrentUser, refreshAccessToken, registerUser, logoutUser } from "../controllers/user.controller.js";


const router = Router()

router.route("/register").post(registerUser);
router.route("/refresh-token").post(refreshAccessToken)
router.route("/get-user").get(getCurrentUser);
router.route("/logout").get(logoutUser);




export default router