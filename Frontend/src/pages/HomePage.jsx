import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { Code2, Trophy, BookOpen, TrendingUp } from "lucide-react";
import axios from "axios";
import { Button } from "../components/ui/button";

export default function HomePage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/user/get-user", {
          withCredentials: true
        });
        if (response.status === 200) {
          setUserData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800">
        <Navbar />
        <main className="container mx-auto px-4 py-10">
          <div className="flex items-center justify-center h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800">
      <Navbar />
      <main className="container mx-auto px-4 py-10">
        {/* Welcome Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 text-white">Welcome to CP-stats</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Your competitive programming platform where you can track your progress across LeetCode and Codeforces all in one place
          </p>
        </div>

        {/* User Stats Section */}
        {userData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {userData.leetcodeUsername && (
              <div className="rounded-lg border border-gray-800 bg-gray-900/50 backdrop-blur-sm p-6 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <Code2 className="h-6 w-6 text-indigo-500" />
                  <h2 className="text-xl font-semibold text-white">LeetCode Stats</h2>
                </div>
                <p className="text-gray-400">
                  Username: <span className="text-white">{userData.leetcodeUsername}</span>
                </p>
                <Button 
                  onClick={() => window.location.href = `/statistics?platform=leetcode`}
                  className="mt-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700"
                >
                  View Stats
                </Button>
              </div>
            )}

            {userData.codeforcesUsername && (
              <div className="rounded-lg border border-gray-800 bg-gray-900/50 backdrop-blur-sm p-6 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <Code2 className="h-6 w-6 text-indigo-500" />
                  <h2 className="text-xl font-semibold text-white">Codeforces Stats</h2>
                </div>
                <p className="text-gray-400">
                  Username: <span className="text-white">{userData.codeforcesUsername}</span>
                </p>
                <Button 
                  onClick={() => window.location.href = `/statistics?platform=codeforces`}
                  className="mt-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700"
                >
                  View Stats
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-lg border border-gray-800 bg-gray-900/50 backdrop-blur-sm p-6 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="h-6 w-6 text-indigo-500" />
              <h2 className="text-xl font-semibold text-white">Upcoming Contests</h2>
            </div>
            <p className="text-gray-400 text-sm">
              Stay updated with upcoming coding contests from LeetCode and Codeforces. Never miss a competition!
            </p>
          </div>

          <div className="rounded-lg border border-gray-800 bg-gray-900/50 backdrop-blur-sm p-6 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="h-6 w-6 text-indigo-500" />
              <h2 className="text-xl font-semibold text-white">Performance Analytics</h2>
            </div>
            <p className="text-gray-400 text-sm">
              Track your progress with detailed analytics and insights across different coding platforms.
            </p>
          </div>

          <div className="rounded-lg border border-gray-800 bg-gray-900/50 backdrop-blur-sm p-6 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="h-6 w-6 text-indigo-500" />
              <h2 className="text-xl font-semibold text-white">Learning Resources</h2>
            </div>
            <p className="text-gray-400 text-sm">
              Access curated learning materials and practice problems to improve your competitive programming skills.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

