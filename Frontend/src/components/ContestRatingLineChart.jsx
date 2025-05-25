import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card"
import { ArrowDown, ArrowUp } from "lucide-react"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"


export default function ContestRatingLineChart({leetcodeUsername}) {
    
  const fetchLeetcodeContestStats = async () => {
    const response = await axios.get(`http://localhost:3000/api/v1/leetcode/lcprofile/userContestRankingInfo/?username=${leetcodeUsername}`,{
        withCredentials: true,
    })
    return response?.data;
  }

  const {data, isLoading , isError, error} = useQuery({
    queryKey : ["leetcodeContestStats"],
    queryFn : fetchLeetcodeContestStats,
  })
//   console.log(data);
    
  const history = data?.data?.userContestRankingHistory?.filter(
    (contest) => contest.attended
  ) || []



  const formatUnixToDate = (unixSeconds) => {
  const date = new Date(unixSeconds * 1000)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

  const chartData = history.map((contest) => ({
    title: contest.contest.title,
    rating: Math.round(contest.rating),
    ranking: contest.ranking,
    problemsSolved: contest.problemsSolved,
    trendDirection: contest.trendDirection,
    date: formatUnixToDate(contest.contest.startTime),
  }))

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const contest = payload[0].payload
      return (
        <div className="bg-gray-800 text-white p-3 rounded shadow-lg text-sm space-y-1">
          <p className="font-semibold">{contest.title}</p>
          <p>Date: {contest.date}</p>
          <p>Problems Solved: {contest.problemsSolved}</p>
          <p>Ranking: {contest.ranking}</p>
          <p>Rating: {contest.rating}</p>
          <p>{contest.trendDirection === "UP" ? <ArrowUp color="#008000"/> : <ArrowDown color="#FF0000"/> }</p>
        </div>
      )
    }
    return null
  }

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
    <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 shadow-lg shadow-indigo-500/5 mx-10 mt-10 p-5 w-[1000px] max-w-full">
      <CardHeader>
        <CardTitle className="text-white pt-3">LeetCode Contest Rating Progress</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px]">
        {chartData.length === 0 ? (
          <p className="text-white">No contests attended yet.</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
              <XAxis stroke="#cbd5e1" />
              <YAxis stroke="#cbd5e1" />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="rating"
                stroke="#60a5fa"
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
        <CardContent className="mt-6 text-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
            <div className="bg-gray-800 rounded-lg p-4 shadow">
                <p className="text-sm text-gray-400">Attended Contests</p>
                <p className="text-lg font-semibold">{data?.data?.userContestRanking?.attendedContestsCount || 0}</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 shadow">
                <p className="text-sm text-gray-400">Current Rating</p>
                <p className="text-lg font-semibold">{Math.round(data?.data?.userContestRanking?.rating || 0)}</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 shadow">
                <p className="text-sm text-gray-400">Top %</p>
                <p className="text-lg font-semibold">{data?.data?.userContestRanking?.topPercentage?.toFixed(2) || "N/A"}%</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 shadow">
                <p className="text-sm text-gray-400">Global Rank</p>
                <p className="text-lg font-semibold">{data?.data?.userContestRanking?.globalRanking?.toLocaleString()  || "N/A"} / {data?.data?.userContestRanking?.totalParticipants?.toLocaleString() || "N/A"}</p>
            </div>
        </CardContent>
    </Card>
  )
}
