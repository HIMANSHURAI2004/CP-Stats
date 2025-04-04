import {Router} from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { changeCurrentPassword, getCurrentUser, loginUser, logoutUser, refreshAccessToken, registerUser } from "../controllers/user.controller.js";


const router = Router()

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT,logoutUser);
router.route("/refresh-token").post(refreshAccessToken)
router.route("/get-user").get(verifyJWT,getCurrentUser);
router.route("/change-password").patch(verifyJWT,changeCurrentPassword);



export default router