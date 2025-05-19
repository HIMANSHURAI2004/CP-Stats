import {
  statsQuery,
  publicProfileQuery,
  languageStatsQuery,
  userContestRankingInfoQuery,
  userBadgesQuery,
  userProfileCalendarQuery,
  recentAcSubmissionsQuery,
  getStreakCounterQuery,
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

export {
  getLeetCodeStats,
  getPublicProfile,
  getLanguageStats,
  getContestRankingInfo,
  getUserBadges,
  getUserProfileCalendar,
  getRecentAcSubmissions,
  getStreakCounter,
};

