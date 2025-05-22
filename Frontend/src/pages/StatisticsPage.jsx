import { Card, CardContent, CardHeader } from '../components/ui/card'
import Navbar from '../components/Navbar'
import React from 'react'
import { useUserDetails } from '../hooks/userDetails'
import LanguageStatsCard from '../components/languageStatsChart'
import ProblemStatsPieCharts from '../components/ProblemStatsPieCharts'
import ContestRatingLineChart from '../components/ContestRatingLineChart'
import BadgeDisplayCard from '../components/BadgeDisplayCard'
import UserSkillCardLeetcode from '../components/UserSkillCardLeetcode'
import CodeforcesRatingChart from '../components/CodeforcesRatingChart'
import CodeforcesStats from '../components/CodeforcesStats'

function StatisticsPage() {
  const { data, isLoading, isError, error } = useUserDetails()
  
  const leetcodeUsername = data?.data?.leetcodeUsername
  const codeforcesUsername = data?.data?.codeforcesUsername


  if (isLoading) return <p>Loading...</p>

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
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 font-[poppins] pb-10">
      <Navbar />
        {/* Glow effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-40 -right-20 h-60 w-60 rounded-full bg-purple-500/10 blur-3xl"></div>
            <div className="absolute -bottom-20 -left-40 h-60 w-60 rounded-full bg-blue-500/10 blur-3xl"></div>
          </div>

          <h1 className="text-3xl font-bold m-8 text-white">Coding Statistics</h1>
      <div>
        <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 shadow-lg shadow-indigo-500/5 mx-10 md:mx-24 mt-10 p-5 ">
          <CardHeader className="">
            <h2 className="text-2xl font-bold text-white">Leetcode Stats</h2>
            <p className="text-gray-400 mt-2">Your Leetcode coding statistics will be displayed here.</p>
          </CardHeader>
          <CardContent className="text-white">
            <LanguageStatsCard leetcodeUsername={leetcodeUsername}/>
            <ProblemStatsPieCharts leetcodeUsername={leetcodeUsername}/>
            <ContestRatingLineChart leetcodeUsername={leetcodeUsername}/>
            <BadgeDisplayCard leetcodeUsername={leetcodeUsername}/>
            <UserSkillCardLeetcode leetcodeUsername={leetcodeUsername}/>
          </CardContent>
        </Card>
        <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 shadow-lg shadow-indigo-500/5 mx-10 md:mx-24 mt-10 p-5 ">
          <CardHeader className="">
            <h2 className="text-2xl font-bold text-white">Codeforces Stats</h2>
            <p className="text-gray-400 mt-2">Your Codeforces coding statistics will be displayed here.</p>
          </CardHeader>
          <CardContent className="text-white">
            <CodeforcesRatingChart codeforcesUsername={codeforcesUsername}/>
            <CodeforcesStats codeforcesUsername={codeforcesUsername}/>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default StatisticsPage