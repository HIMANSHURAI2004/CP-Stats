import express from "express";
import {
  getLeetCodeStats,
  getPublicProfile,
  getLanguageStats,
  getContestRankingInfo,
  getUserBadges,
  getUserProfileCalendar,
  getRecentAcSubmissions,
  getStreakCounter,
} from "../controllers/leetcodeprofile.controller.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Leetcode RESTful API",
    github: "https://github.com/siddanth-6365/leetcode-Stats-api",
    info: "For more details, please refer to the API documentation: https://leetcode-restful-api.vercel.app/ApiDocs/setup",
    note: "Pass username as query parameter or route param as per endpoint",
    endpoints: [
      "/profile/:username",
      "/profile?username=",
      "/publicProfile?username=",
      "/languageStats?username=",
      "/userContestRankingInfo?username=",
      "/userBadges?username=",
      "/userProfileCalendar?username=",
      "/streakCounter?username=",
      "/recentAcSubmissions?username=&limit=",
    ],
  });
});

router.get("/lcprofile/profile/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const data = await getLeetCodeStats(username);
    res.json({ data });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Error while fetching data for /profile/:username");
  }
});

router.get("/lcprofile/profile", async (req, res) => {
  const { username } = req.query;
  if (!username) return res.status(400).json({ error: "Missing username query parameter" });

  try {
    const data = await getLeetCodeStats(username);
    res.json({ data });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Error while fetching data for /profile");
  }
});

router.get("/lcprofile/publicProfile", async (req, res) => {
  const { username } = req.query;
  if (!username) return res.status(400).json({ error: "Missing username query parameter" });

  try {
    const data = await getPublicProfile(username);
    res.json({ data });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Error while fetching data for /publicProfile");
  }
});

router.get("/lcprofile/languageStats", async (req, res) => {
  const { username } = req.query;
  if (!username) return res.status(400).json({ error: "Missing username query parameter" });

  try {
    const data = await getLanguageStats(username);
    res.json({ data });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Error while fetching data for /languageStats");
  }
});

router.get("/lcprofile/userContestRankingInfo", async (req, res) => {
  const { username } = req.query;
  if (!username) return res.status(400).json({ error: "Missing username query parameter" });

  try {
    const data = await getContestRankingInfo(username);
    res.json({ data });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Error while fetching data for /userContestRankingInfo");
  }
});

router.get("/lcprofile/userBadges", async (req, res) => {
  const { username } = req.query;
  if (!username) return res.status(400).json({ error: "Missing username query parameter" });

  try {
    const data = await getUserBadges(username);
    res.json({ data });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Error while fetching data for /userBadges");
  }
});

router.get("/lcprofile/userProfileCalendar", async (req, res) => {
  const { username } = req.query;
  if (!username) return res.status(400).json({ error: "Missing username query parameter" });

  try {
    const data = await getUserProfileCalendar(username);
    res.json({ data });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Error while fetching data for /userProfileCalendar");
  }
});

router.get("/lcprofile/streakCounter", async (req, res) => {
  const { username } = req.query;
  if (!username) return res.status(400).json({ error: "Missing username query parameter" });

  try {
    const data = await getStreakCounter(username);
    res.json({ data });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Error while fetching data for /streakCounter");
  }
});

router.get("/lcprofile/recentAcSubmissions", async (req, res) => {
  const { username, limit } = req.query;
  if (!username) return res.status(400).json({ error: "Missing username query parameter" });

  try {
    const data = await getRecentAcSubmissions(username, limit);
    res.json({ data });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Error while fetching data for /recentAcSubmissions");
  }
});

export default router;


