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
  getPastContests,
  getSkillStats,
  getUserProfile,
  verifyLeetCodeUsername
} from "../controllers/leetcodeprofile.controller.js";

const router = express.Router();

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

router.get("/lcprofile/pastContests", async (req, res) => {
  const pageNo = parseInt(req.query.page) || 1;
  const numPerPage = parseInt(req.query.perPage) || 10;
  
  try {
    const data = await getPastContests(pageNo, numPerPage);
    res.json({ data });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Error while fetching past contests data");
  }
});

// Get skill stats
router.get("/lcprofile/skillStats", async (req, res) => {
  const { username } = req.query;
  if (!username) return res.status(400).json({ error: "Missing username query parameter" });

  try {
    const data = await getSkillStats(username);
    res.json({ data });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Error while fetching data for /skillStats");
  }
});

// Get user profile with active badge
router.get("/lcprofile/userProfile", async (req, res) => {
  const { username } = req.query;
  if (!username) return res.status(400).json({ error: "Missing username query parameter" });

  try {
    const data = await getUserProfile(username);
    res.json({ data });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Error while fetching user profile");
  }
});

// Verify LeetCode username
router.get("/verify-username", async (req, res) => {
  const { username } = req.query;
  if (!username) return res.status(400).json({ error: "Missing username query parameter" });

  try {
    const result = await verifyLeetCodeUsername(username);
    res.json(result);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Error while verifying username" });
  }
});

export default router;


