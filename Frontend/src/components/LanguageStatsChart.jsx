import axios from "axios"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { useQuery } from "@tanstack/react-query"

export default function LanguageStatsCard({ leetcodeUsername }) {

  const fetchLeetcodeLanguageStats = async () => {
    
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/leetcode/lcprofile/languageStats/?username=${leetcodeUsername}`,{
        withCredentials: true,
    })
    return response?.data;
  }

  const {data, isLoading , isError, error} = useQuery({
    queryKey : ["leetcodeLanguageStats"],
    queryFn : fetchLeetcodeLanguageStats,
  })
//   console.log(data);
  
  const chartData = data?.data?.languageProblemCount.map((lang) => ({
    name: lang.languageName,
    value: lang.problemsSolved,
  }))

  // if (isLoading) {return <p>Loading...</p>}
  
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
        <CardTitle className="text-white pt-3">Language-wise Problems Solved</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} >
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#4f39f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
