import axios from 'axios';

const CODEFORCES_API_BASE = 'https://codeforces.com/api';

const handleRequest = async (query, variables = {}) => {
  try {
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });
    // Log status code or status text, not the whole response
    // console.log("Response status:", response.status);

    const data = await response.json();
    return data.data;
  } catch (e) {
    console.error("error:", e);
    throw e; // optionally rethrow
  }
};

// Helper function to handle API requests
const handleCodeforcesRequest = async (endpoint, params = {}) => {
  try {
    const response = await axios.get(`${CODEFORCES_API_BASE}/${endpoint}`, { params });
    if (response.data.status === 'OK') {
      return response.data.result;
    }
    throw new Error(response.data.comment || 'Failed to fetch data from Codeforces');
  } catch (error) {
    console.error('Codeforces API Error:', error);
    throw error;
  }
};

export { handleRequest, handleCodeforcesRequest };
