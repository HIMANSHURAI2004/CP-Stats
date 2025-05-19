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
    console.log("Response status:", response.status);

    const data = await response.json();
    return data.data;
  } catch (e) {
    console.error("error:", e);
    throw e; // optionally rethrow
  }
};

export { handleRequest };
