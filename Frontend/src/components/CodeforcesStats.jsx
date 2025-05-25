import React from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"

export default function CodeforcesStats({ codeforcesUsername }) {
  const fetchCodeforcesStats = async () => {
    const response = await axios.get(
      `http://localhost:3000/api/v1/codeforces/user/stats?handle=${codeforcesUsername}`,
      {
        withCredentials: true,
      }
    )
    return response.data
  }

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["codeforcesStats"],
    queryFn: fetchCodeforcesStats,
  })

  // if (isLoading) return <p>Loading...</p>
  if (isError)
    return (
      <div className="text-red-500 text-center py-5">
        <p>Error: {error.message}</p>
      </div>
    )

  const user = data?.data
  const problemTags = user?.problemTags || {}
  const problemRatings = user?.problemRatings || {}

  const ratingChartData = Object.entries(problemRatings).map(([rating, solved]) => ({
    rating,
    solved,
  }))

  return (
    <div className="space-y-8 p-6">
      <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 shadow-lg shadow-indigo-500/5 mx-10 mt-10 p-10 w-[1000px] max-w-full">
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-white">
          <div className="bg-gray-800 rounded-lg p-4 shadow">
            <p className="text-sm text-green-600">Rating</p>
            <p className="text-lg font-semibold">{user?.rating}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 shadow">
            <p className="text-sm text-green-600">Max Rating</p>
            <p className="text-lg font-semibold">{user?.maxRating}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 shadow">
            <p className="text-sm text-gray-400">Solved Problems</p>
            <p className="text-lg font-semibold">{user?.solvedProblems}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 shadow">
            <p className="text-sm text-amber-400">Rank</p>
            <p className="text-lg font-semibold capitalize ">{user?.rank}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 shadow">
            <p className="text-sm text-amber-400">Max Rank</p>
            <p className="text-lg font-semibold capitalize">{user?.maxRank}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 shadow">
            <p className="text-sm text-gray-400">Contribution</p>
            <p className="text-lg font-semibold">{user?.contribution}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 shadow-lg shadow-indigo-500/5 mx-10 mt-10 p-10 w-[1000px] max-w-full">
        <CardHeader>
          <CardTitle className="text-white">Problems Solved by Rating</CardTitle>
        </CardHeader>
        <CardContent className="h-[450px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ratingChartData} margin={{ top: 10, right: 30, left: 20, bottom: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
              <XAxis dataKey="rating" stroke="#cbd5e1" label={{ value: "Problem Rating", position: "bottom", offset: 10, fill: "#ffffff" }}/>
              <YAxis stroke="#cbd5e1" label={{
            value: "Problems Solved",
            angle: -90,
            position: "Left",
            offset: -20,
            fill: "#cbd5e1",
          }}/>
              <Tooltip
                contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: "8px" }}
          labelStyle={{ color: "#fff" }}
          itemStyle={{ color: "#fff" }}
              />
              <Bar dataKey="solved" fill="#4f39f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 shadow-lg shadow-indigo-500/5 mx-10 mt-10 p-10 w-[1000px] max-w-full">
        <CardHeader>
          <CardTitle className="text-white">Problem Solved Tags</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          {Object.entries(problemTags).map(([tag, count]) => (
            <Badge key={tag} className="bg-indigo-600/60 text-white py-1.5 capitalize">
              {tag} - {count}
            </Badge>
          ))}
        </CardContent>
      </Card>

    </div>
  )
}
