import {
  statsQuery,
  publicProfileQuery,
  languageStatsQuery,
  userContestRankingInfoQuery,
  userBadgesQuery,
  userProfileCalendarQuery,
  recentAcSubmissionsQuery,
  getStreakCounterQuery,
  pastContestsQuery,
  skillStatsQuery,
} from "../queries/query.js";

import { handleRequest } from "../httpRequests/request.js";

const getLeetCodeStats = async (username) => {
  const data = await handleRequest(statsQuery, { username });
  return data.matchedUser;
};

const getPublicProfile = async (username) => {
  const data = await handleRequest(publicProfileQuery, { username });
  return data.matchedUser;
};

const getLanguageStats = async (username) => {
  const data = await handleRequest(languageStatsQuery, { username });
  return data.matchedUser;
};

const getContestRankingInfo = async (username) => {
  const data = await handleRequest(userContestRankingInfoQuery, { username });
  return data;
};

const getUserBadges = async (username) => {
  const data = await handleRequest(userBadgesQuery, { username });
  return data.matchedUser;
};

const getUserProfileCalendar = async (username, year) => {
  const data = await handleRequest(userProfileCalendarQuery, { username, year });
  return data.matchedUser.userCalendar;
};

const getRecentAcSubmissions = async (username, limit = 10) => {
  const data = await handleRequest(recentAcSubmissionsQuery, { username, limit });
  return data;
};

const getStreakCounter = async () => {
  const data = await handleRequest(getStreakCounterQuery);
  return data;
};

const getPastContests = async (pageNo = 1, numPerPage = 10) => {
  try {
    const data = await handleRequest(pastContestsQuery, { pageNo, numPerPage });
    console.log("LeetCode API Response:", data); // Debug log
    
    if (!data || !data.pastContests) {
      throw new Error("Invalid response format from LeetCode API");
    }
    
    const contests = data.pastContests.data.map(contest => ({
      title: contest.title,
      titleSlug: contest.titleSlug,
      startTime: contest.startTime,
      originStartTime: contest.originStartTime,
      cardImg: contest.cardImg,
      sponsors: contest.sponsors,
      url: `https://leetcode.com/contest/${contest.titleSlug}`
    }));

    return {
      contests,
      pagination: {
        pageNum: data.pastContests.pageNum,
        currentPage: data.pastContests.currentPage,
        totalNum: data.pastContests.totalNum,
        numPerPage: data.pastContests.numPerPage
      }
    };
  } catch (error) {
    console.error("Error fetching past contests:", error);
    throw error;
  }
};

const getSkillStats = async (username) => {
  const data = await handleRequest(skillStatsQuery, { username });
  return data.matchedUser;
};

export {
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
};

