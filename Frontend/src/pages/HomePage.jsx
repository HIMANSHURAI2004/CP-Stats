import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import { Code2, Trophy, BookOpen, TrendingUp, Star, ArrowRight } from "lucide-react";
import axios from "axios";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

export default function HomePage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/get-user`, {
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
      <main className="container mx-auto px-4 py-10">
        {/* Welcome Section */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-600/20 text-indigo-400 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-indigo-600/30">
            <Star className="h-4 w-4" />
            Welcome to your coding journey
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Master{" "}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              Competitive
            </span>
            <br />
            Programming
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed">
            Track your progress across multiple platforms, analyze your performance, and stay ahead in competitive
            programming with comprehensive insights and real-time contest updates.
          </p>
          
        </div>

        {/* User Stats Section */}
        {userData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 px-12">
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
        <div>
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Why Choose CP-Stats?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 text-center">
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 mb-4">
                  <Trophy className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Contest Tracking</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Never miss a contest again. Get real-time notifications and track upcoming competitions across all
                  major platforms.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 text-center">
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 mb-4">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Performance Analytics</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Detailed insights into your coding journey with comprehensive analytics, progress tracking, and
                  performance metrics.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 text-center">
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-yellow-600 to-orange-600 mb-4">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Learning Resources</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Access curated learning materials, practice problems, and expert tips to accelerate your competitive
                  programming skills.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}


