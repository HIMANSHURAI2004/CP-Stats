import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const UserSkillCardLeetcode = ({leetcodeUsername}) => {
    const fetchLeetcodeSkillStats = async () => {
    
    const response = await axios.get(`http://localhost:3000/api/v1/leetcode/lcprofile/skillStats/?username=${leetcodeUsername}`,{
        withCredentials: true,
    })
    return response?.data;
  }

  const {data, isLoading , isError, error} = useQuery({
    queryKey : ["leetcodeSillStats"],
    queryFn : fetchLeetcodeSkillStats,
  })
    const [fundamentalsSkillsCount, setFundamentalsSkillsCount] = useState(8);
    const [intermediateSkillsCount, setIntermediateSkillsCount] = useState(8);
    const [advancedSkillsCount, setAdvancedSkillsCount] = useState(8);  

  const { fundamental = [], intermediate = [], advanced = [] } = data?.data?.tagProblemCounts || {};

  const renderSkills = (skills,skillsCount) =>
    skills?.slice(0,skillsCount)?.map((skill, index) => (
      <Badge
        key={index}
        variant="secondary"
        className="text-xs px-3 py-1 rounded-xl whitespace-nowrap"
      >
        {skill.tagName} — {skill.problemsSolved}
      </Badge>
    ));

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
    <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 shadow-lg shadow-indigo-500/5 mx-10 mt-10 p-10 w-[1000px] max-w-full">
      <CardHeader>
        <CardTitle className="text-white">
          User skills stats
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold mb-2 text-green-600">🟢 Fundamental Skills</h3>
          <div className="flex flex-wrap gap-2">
            {renderSkills(fundamental,fundamentalsSkillsCount)}
            {fundamental.length > 8 && (
                fundamentalsSkillsCount > 8 ? (
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-3 py-1 rounded-xl" onClick={() => setFundamentalsSkillsCount(8)}>
                    See Less
                    </button>
                ) : (<button className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-3 py-1 rounded-xl" onClick={() => setFundamentalsSkillsCount(fundamental.length)}>
                See More
            </button>)
            )}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2 text-yellow-600">🟡 Intermediate Skills</h3>
          <div className="flex flex-wrap gap-2">
            {renderSkills(intermediate,intermediateSkillsCount)}
            {intermediate.length > 8 && (
                intermediateSkillsCount > 8 ? (
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-3 py-1 rounded-xl" onClick={() => setIntermediateSkillsCount(8)}>
                    See Less
                    </button>
                ) : (<button className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-3 py-1 rounded-xl" onClick={() => setIntermediateSkillsCount(intermediate.length)}>
                See More
            </button>)
            )}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2 text-red-600">🔴 Advanced Skills</h3>
          <div className="flex flex-wrap gap-2">
            {renderSkills(advanced,advancedSkillsCount)}
            {advanced.length > 8 && (
                advancedSkillsCount > 8 ? (
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-3 py-1 rounded-xl" onClick={() => setAdvancedSkillsCount(8)}>
                    See Less
                    </button>
                ) : (<button className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-3 py-1 rounded-xl" onClick={() => setAdvancedSkillsCount(advanced.length)}>
                See More
            </button>)
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserSkillCardLeetcode;
