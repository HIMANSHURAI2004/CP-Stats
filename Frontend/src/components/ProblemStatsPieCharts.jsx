import axios from "axios"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"
import { useQuery } from "@tanstack/react-query"

const COLORS = ["#34d399", "#60a5fa", "#f472b6", "#fcd34d"]

export default function ProblemStatsPieCharts({leetcodeUsername}) {

  const fetchLeetcodeProblemStats = async () => {
    
    const response = await axios.get(`http://localhost:3000/api/v1/leetcode/lcprofile/profile/?username=${leetcodeUsername}`,{
        withCredentials: true,
    })
    return response?.data;
  }

  const {data, isLoading , isError, error} = useQuery({
    queryKey : ["leetcodeProblemStats"],
    queryFn : fetchLeetcodeProblemStats,
  })
//   console.log(data);


  const beatStats = data?.data?.problemsSolvedBeatsStats?.map((item) => ({
    name: item.difficulty,
    value: item.percentage,
  }))

  const acSubmissions = data?.data?.submitStatsGlobal?.acSubmissionNum
    ?.filter((item) => item.difficulty !== "All")
    .map((item) => ({
      name: item.difficulty,
      value: item.count,
    }))

  // if (isLoading) return <p>Loading...</p>
  
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
          Submission Stats Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row justify-center items-center gap-6">
        <div className="w-full md:w-1/2 h-72">
          <h3 className="text-center text-white mb-2 font-medium">Acceptance Rate by Difficulty</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={beatStats}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {beatStats?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full md:w-1/2 h-64">
          <h3 className="text-center mb-2 text-white font-medium">Submissions by Difficulty</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={acSubmissions}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {acSubmissions?.map((entry, index) => (
                  <Cell key={`cell2-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
