import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../components/ui/card";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const getVerdictColor = (verdict) => {
  switch (verdict) {
    case "OK":
      return "bg-green-600";
    case "WRONG_ANSWER":
      return "bg-red-600";
    case "TIME_LIMIT_EXCEEDED":
      return "bg-yellow-600";
    case "COMPILATION_ERROR":
      return "bg-gray-600";
    default:
      return "bg-blue-600";
  }
};

const formatBytes = (bytes) => {
  if (bytes === 0) return "0 B";
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
};

const RecentSubmissionCodeforces = ({codeforcesUsername}) => {
  const [submissionsCount, setSubmissionsCount] = useState(5);
  
  const fetchCodeforcesRecentSubmissions = async () => {
    const response = await axios.get(`https://codeforces.com/api/user.status?handle=${codeforcesUsername}&from=1&count=${submissionsCount}`)
    return response?.data;
  }

  const {data, isLoading , isError, error} = useQuery({
    queryKey : ["codeforcesRecentSubmissions",submissionsCount],
    queryFn : fetchCodeforcesRecentSubmissions,
  })    

  const submissions = data?.result || [];

  if (isLoading) return <p>Loading...</p>
  
    if(isError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 font-[poppins]">
          <div className="text-white text-center py-10">
            <h1 className="text-2xl font-bold">Error: {error.message}</h1>
          </div>
        </div>
      )
    }

  return (
    <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 shadow-lg shadow-indigo-500/5 text-white">
        <CardHeader>
            <h2 className="text-lg font-bold text-white">Codeforces Recent Submissions</h2>
            <p className="text-gray-400 mt-2 text-sm">Your Codeforces recent submissions will be displayed here.</p>
        </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {submissions.map((sub) => {
            const { problem, programmingLanguage,contestId, verdict, passedTestCount, timeConsumedMillis, memoryConsumedBytes } = sub;

            const problemUrl = `https://codeforces.com/problemset/problem/${contestId}/${problem.index}`;
            return (
              <div
                key={sub.id}
                className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition"
              >
                {/* Top row: Index + Name and Rating */}
                <div className="flex justify-between items-center mb-2">
                  <div className="text-left text-base font-medium">
                    {problem.index}. {problem.name}
                  </div>
                  <a
                      href={problemUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-3 py-1.5 rounded-md transition"
                    >
                      View Problem
                    </a>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {problem.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-700 text-xs px-2 py-1 rounded-full text-gray-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Details Row */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                  <div>
                    <span className="text-gray-400">Language:</span>{" "}
                    {programmingLanguage}
                  </div>
                  <div>
                    <span className="text-gray-400">Verdict:</span>{" "}
                    <span
                      className={`px-2 py-1 rounded-md text-white text-xs ${getVerdictColor(verdict)}`}
                    >
                      {verdict}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Passed Tests:</span>{" "}
                    {passedTestCount}
                  </div>
                  <div>
                    <span className="text-gray-400">Time:</span>{" "}
                    {timeConsumedMillis} ms
                  </div>
                  <div>
                    <span className="text-gray-400">Memory:</span>{" "}
                    {formatBytes(memoryConsumedBytes)}
                  </div>
                  <div className="text-sm text-yellow-400">
                    Rating: {problem.rating || "N/A"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
      <CardFooter>
        {
            submissionsCount > 5 ? (
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm px-3 py-2 rounded-md" onClick={() => setSubmissionsCount(5)}>
                    See Less
                </button>
            ) : (
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm px-3 py-2 rounded-md" onClick={() => setSubmissionsCount(10)}>
                    See More
                </button>
            )
        }
        
      </CardFooter>
    </Card>
  );
};

export default RecentSubmissionCodeforces;
