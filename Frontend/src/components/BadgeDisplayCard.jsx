import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "../components/ui/tooltip";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const BadgeDisplayCard = ({leetcodeUsername}) => {
  
  const fetchLeetcodeBadges = async () => {
    
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/leetcode/lcprofile/userBadges/?username=${leetcodeUsername}`,{
        withCredentials: true,
    })
    return response?.data;
  }

  const {data, isLoading , isError, error} = useQuery({
    queryKey : ["leetcodeBages"],
    queryFn : fetchLeetcodeBadges,
  })


  const badges = data?.data?.badges || [];
  
    // if (isLoading) return <p>Loading...</p>
  
    if(isError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 font-[poppins]">
          <Navbar />
          <div className="text-white text-center py-10">
            <h1 className="text-2xl font-bold">Error: {error.message}</h1>
          </div>
        </div>
      )
    }

    
  return (
    <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 shadow-lg shadow-indigo-500/5 mx-10 mt-10 p-8 w-[1000px] max-w-full">
        <CardHeader>
        <CardTitle className="text-white">
          User Badges
        </CardTitle>
      </CardHeader>
      <CardContent>
        <h2 className="font-semibold mb-4 text-sm text-white">Total Badges: {badges.length}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <TooltipProvider>
            {badges.map((badge) => (
              <Tooltip key={badge.id}>
                <TooltipTrigger asChild>
                  <div className="flex items-center space-x-4 bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition cursor-pointer">
                    <img
                      src={badge.medal?.config?.iconGif || badge.icon}
                      alt={badge.displayName}
                      className="w-12 h-12 rounded"
                    />
                    <div>
                      <p className="font-medium text-white">{badge.displayName}</p>
                      <p className="text-sm text-gray-400">
                        {formatDate(badge.creationDate)}
                      </p>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{badge.hoverText}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
};

export default BadgeDisplayCard;
