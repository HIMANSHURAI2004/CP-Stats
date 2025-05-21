import axios from 'axios';
import { handleCodeforcesRequest } from '../httpRequests/request.js';



// Get user info
const getUserInfo = async (handles) => {
  const params = {
    handles: Array.isArray(handles) ? handles.join(';') : handles
  };
  return handleCodeforcesRequest('user.info', params);
};

// Get user rating history
const getUserRating = async (handle) => {
  return handleCodeforcesRequest('user.rating', { handle });
};

// Get user submissions
const getUserSubmissions = async (handle, count = 10) => {
  return handleCodeforcesRequest('user.status', { handle, count });
};

// Get user's solved problems
const getUserSolvedProblems = async (handle) => {
  const submissions = await getUserSubmissions(handle, 1000);
  const solvedProblems = new Set();
  
  submissions.forEach(submission => {
    if (submission.verdict === 'OK') {
      solvedProblems.add(`${submission.problem.contestId}${submission.problem.index}`);
    }
  });

  return Array.from(solvedProblems).map(problemId => {
    const submission = submissions.find(s => 
      `${s.problem.contestId}${s.problem.index}` === problemId
    );
    return {
      contestId: submission.problem.contestId,
      index: submission.problem.index,
      name: submission.problem.name,
      rating: submission.problem.rating,
      tags: submission.problem.tags
    };
  });
};

// Get upcoming contests
const getUpcomingContests = async () => {
  return handleCodeforcesRequest('contest.list', { gym: false });
};

// Get contest standings
const getContestStandings = async (contestId, handle) => {
  const params = {
    contestId,
    handles: handle,
    showUnofficial: true
  };
  return handleCodeforcesRequest('contest.standings', params);
};

// Get user's blog entries
const getUserBlogEntries = async (handle) => {
  return handleCodeforcesRequest('user.blogEntries', { handle });
};


// Get user's rating changes
const getUserRatingChanges = async (handle) => {
  const ratingHistory = await getUserRating(handle);
  return ratingHistory.map(contest => ({
    contestId: contest.contestId,
    contestName: contest.contestName,
    oldRating: contest.oldRating,
    newRating: contest.newRating,
    rank: contest.rank,
    date: new Date(contest.ratingUpdateTimeSeconds * 1000)
  }));
};

// Get user's statistics
const getUserStats = async (handle) => {
  const [userInfo, ratingHistory, submissions] = await Promise.all([
    getUserInfo(handle),
    getUserRating(handle),
    getUserSubmissions(handle, 1000)
  ]);

  const user = userInfo[0];
  const solvedProblems = new Set();
  const problemTags = new Map();
  const problemRatings = new Map();

  submissions.forEach(submission => {
    if (submission.verdict === 'OK') {
      const problemId = `${submission.problem.contestId}${submission.problem.index}`;
      solvedProblems.add(problemId);
      
      // Count problems by tag
      submission.problem.tags.forEach(tag => {
        problemTags.set(tag, (problemTags.get(tag) || 0) + 1);
      });

      // Count problems by rating
      if (submission.problem.rating) {
        problemRatings.set(
          submission.problem.rating,
          (problemRatings.get(submission.problem.rating) || 0) + 1
        );
      }
    }
  });

  return {
    handle: user.handle,
    rating: user.rating,
    maxRating: user.maxRating,
    rank: user.rank,
    maxRank: user.maxRank,
    contribution: user.contribution,
    friendOfCount: user.friendOfCount,
    solvedProblems: solvedProblems.size,
    problemTags: Object.fromEntries(problemTags),
    problemRatings: Object.fromEntries(problemRatings),
    ratingHistory: ratingHistory.map(contest => ({
      contestId: contest.contestId,
      contestName: contest.contestName,
      oldRating: contest.oldRating,
      newRating: contest.newRating,
      rank: contest.rank,
      date: new Date(contest.ratingUpdateTimeSeconds * 1000)
    }))
  };
};

// Get past contests
const getPastContests = async (page = 1, perPage = 10) => {
  try {
    const contests = await handleCodeforcesRequest('contest.list', { gym: false });
    
    // Filter past contests (where phase is FINISHED)
    const pastContests = contests.filter(contest => contest.phase === 'FINISHED');
    
    // Sort by start time in descending order (most recent first)
    pastContests.sort((a, b) => b.startTimeSeconds - a.startTimeSeconds);
    
    // Calculate pagination
    const totalContests = pastContests.length;
    const totalPages = Math.ceil(totalContests / perPage);
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    
    // Get contests for current page
    const paginatedContests = pastContests.slice(startIndex, endIndex).map(contest => ({
      id: contest.id,
      name: contest.name,
      type: contest.type,
      phase: contest.phase,
      frozen: contest.frozen,
      durationSeconds: contest.durationSeconds,
      startTimeSeconds: contest.startTimeSeconds,
      relativeTimeSeconds: contest.relativeTimeSeconds,
      preparedBy: contest.preparedBy,
      websiteUrl: contest.websiteUrl,
      description: contest.description,
      difficulty: contest.difficulty,
      kind: contest.kind,
      icpcRegion: contest.icpcRegion,
      country: contest.country,
      city: contest.city,
      season: contest.season,
      startTime: new Date(contest.startTimeSeconds * 1000).toISOString(),
      endTime: new Date((contest.startTimeSeconds + contest.durationSeconds) * 1000).toISOString(),
      url: `https://codeforces.com/contests/${contest.id}`
    }));

    return {
      contests: paginatedContests,
      pagination: {
        currentPage: page,
        totalPages,
        totalContests,
        perPage
      }
    };
  } catch (error) {
    console.error('Error fetching past contests:', error);
    throw error;
  }
};

export {
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
}; 