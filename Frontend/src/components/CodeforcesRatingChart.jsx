import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function CodeforcesRatingLineChart({ codeforcesUsername }) {
  const fetchCodeforcesContestStats = async () => {
    const response = await axios.get(
      `http://localhost:3000/api/v1/codeforces/user/rating?handle=${codeforcesUsername}`,
      { withCredentials: true }
    );
    return response?.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["codeforcesContestStats"],
    queryFn: fetchCodeforcesContestStats,
  });

  const chartData =
    data?.data?.map((contest) => ({
      contestName: contest.contestName,
      rank: contest.rank,
      newRating: contest.newRating,
      oldRating: contest.oldRating,
      date: new Date(contest.ratingUpdateTimeSeconds * 1000).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    })) || [];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const contest = payload[0].payload;
      const trendUp = contest.newRating > contest.oldRating;

      return (
        <div className="bg-gray-800 text-white p-3 rounded shadow-lg text-sm space-y-1">
          <p className="font-semibold">{contest.contestName}</p>
          <p>{contest.date}</p>
          <p>Rating: {contest.newRating}</p>
          <p>Rank: {contest.rank}</p>
          <p>
            {trendUp ? (
              <span className="flex items-center text-green-400">
                <ArrowUp size={22} className="mr-1" />
              </span>
            ) : (
              <span className="flex items-center text-red-400">
                <ArrowDown size={22} className="mr-1" />
              </span>
            )}
          </p>
        </div>
      );
    }
    return null;
  };

  if (isLoading) return <p>Loading...</p>;

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 font-[poppins]">
        <div className="text-white text-center py-10">
          <h1 className="text-2xl font-bold">Error: {error.message}</h1>
        </div>
      </div>
    );
  }

  return (
    <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 shadow-lg shadow-indigo-500/5 mx-10 mt-10 p-5 w-[1000px] max-w-full">
      <CardHeader>
        <CardTitle className="text-white pt-3">Codeforces Contest Rating Progress</CardTitle>
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
                dataKey="newRating"
                stroke="#60a5fa"
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
