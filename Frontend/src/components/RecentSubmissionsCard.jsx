import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../components/ui/card";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// Utility to convert UNIX timestamp to "X days ago" etc.
const getTimeAgo = (timestamp) => {
  const now = Date.now();
  const seconds = Math.floor((now - timestamp * 1000) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
  }
  return "just now";
};


const RecentSubmissionsCard = ({leetcodeUsername}) => {
  const [submissionsCount, setSubmissionsCount] = useState(5);
  const fetchLeetcodeRecentSubmissions = async () => {
    
    const response = await axios.get(`http://localhost:3000/api/v1/leetcode/lcprofile/recentAcSubmissions/?username=${leetcodeUsername}`,{
        withCredentials: true,
    })
    return response?.data;
  }

  const {data, isLoading , isError, error} = useQuery({
    queryKey : ["leetcodeRecentSubmissions"],
    queryFn : fetchLeetcodeRecentSubmissions,
  })  


  const submissions = data?.data?.recentAcSubmissionList || [];

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
            <h2 className="text-lg font-bold text-white">Leetcode Recent Submissions</h2>
            <p className="text-gray-400 mt-2 text-sm">Your Leetcode recent submissions will be displayed here.</p>
        </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {submissions?.slice(0,submissionsCount).map((sub) => (
            <div
              key={sub.id}
              className="flex items-center justify-between bg-gray-800 hover:bg-gray-700 transition rounded-lg px-4 py-3"
            >
              <div className="text-left flex-1 text-sm sm:text-base">
                {sub.title}
              </div>
              <div className="text-gray-400 text-xs sm:text-sm mx-4 whitespace-nowrap">
                {getTimeAgo(sub.timestamp)}
              </div>
              <a
                href={`https://leetcode.com/submissions/detail/${sub.id}/`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm px-3 py-2 rounded-md">
                  View Submission
                </button>
              </a>
            </div>
          ))}
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

export default RecentSubmissionsCard;
