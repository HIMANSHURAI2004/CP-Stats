import express from 'express';
import {
  getUserInfo,
  getUserRating,
  getUserSubmissions,
  getUserSolvedProblems,
  getUpcomingContests,
  getContestStandings,
  getUserBlogEntries,
  getUserRatingChanges,
  getUserStats,
  getPastContests
} from '../controllers/codeforces.controller.js';

const router = express.Router();

// Get user info
router.get('/user/info', async (req, res) => {
  const { handle } = req.query;
  if (!handle) return res.status(400).json({ error: 'Missing handle query parameter' });

  try {
    const data = await getUserInfo(handle);
    res.json({ data });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Error while fetching user info');
  }
});

// Get user rating
router.get('/user/rating', async (req, res) => {
  const { handle } = req.query;
  if (!handle) return res.status(400).json({ error: 'Missing handle query parameter' });

  try {
    const data = await getUserRating(handle);
    res.json({ data });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Error while fetching user rating');
  }
});

// Get user submissions
router.get('/user/submissions', async (req, res) => {
  const { handle, count } = req.query;
  if (!handle) return res.status(400).json({ error: 'Missing handle query parameter' });

  try {
    const data = await getUserSubmissions(handle, parseInt(count) || 10);
    res.json({ data });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Error while fetching user submissions');
  }
});

// Get user solved problems
router.get('/user/solved', async (req, res) => {
  const { handle } = req.query;
  if (!handle) return res.status(400).json({ error: 'Missing handle query parameter' });

  try {
    const data = await getUserSolvedProblems(handle);
    res.json({ data });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Error while fetching solved problems');
  }
});

// Get upcoming contests
router.get('/contests/upcoming', async (req, res) => {
  try {
    const data = await getUpcomingContests();
    res.json({ data });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Error while fetching upcoming contests');
  }
});

// Get contest standings
router.get('/contest/standings', async (req, res) => {
  const { contestId, handle } = req.query;
  if (!contestId) return res.status(400).json({ error: 'Missing contestId query parameter' });

  try {
    const data = await getContestStandings(contestId, handle);
    res.json({ data });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Error while fetching contest standings');
  }
});

// Get user blog entries
router.get('/user/blog', async (req, res) => {
  const { handle } = req.query;
  if (!handle) return res.status(400).json({ error: 'Missing handle query parameter' });

  try {
    const data = await getUserBlogEntries(handle);
    res.json({ data });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Error while fetching user blog entries');
  }
});


// Get user rating changes
router.get('/user/rating-changes', async (req, res) => {
  const { handle } = req.query;
  if (!handle) return res.status(400).json({ error: 'Missing handle query parameter' });

  try {
    const data = await getUserRatingChanges(handle);
    res.json({ data });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Error while fetching rating changes');
  }
});

// Get user statistics
router.get('/user/stats', async (req, res) => {
  const { handle } = req.query;
  if (!handle) return res.status(400).json({ error: 'Missing handle query parameter' });

  try {
    const data = await getUserStats(handle);
    res.json({ data });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Error while fetching user statistics');
  }
});

// Get past contests
router.get('/contests/past', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;

  try {
    const data = await getPastContests(page, perPage);
    res.json({ data });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Error while fetching past contests');
  }
});

export default router; 