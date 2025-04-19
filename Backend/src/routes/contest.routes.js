import {Router} from "express";
import { getUpcomingContests } from "../controllers/contest.controller.js";


const router = Router()

router.route("/upcomingContests").get(getUpcomingContests);




export default router