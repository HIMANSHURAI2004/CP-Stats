"use client"

import { User, Mail, Award, Code, Terminal } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Progress } from "../components/ui/progress"
import Navbar from "../components/navbar"

// Sample user data
const userData = {
  name: "Himanshu Rai",
  email: "himanshu@gmail.com",
  platforms: [
    {
      name: "LeetCode",
      icon: Code,
      color: "from-yellow-500 to-orange-500",
      totalSolved: 387,
      maxProblems: 2500,
      easy: 175,
      medium: 162,
      hard: 50,
    },
    {
      name: "CodeForces",
      icon: Terminal,
      color: "from-red-500 to-rose-600",
      totalSolved: 243,
      maxProblems: 1500,
      easy: 98,
      medium: 112,
      hard: 33,
    },
    {
      name: "CodeChef",
      icon: Award,
      color: "from-emerald-500 to-teal-600",
      totalSolved: 156,
      maxProblems: 1000,
      easy: 82,
      medium: 61,
      hard: 13,
    },
  ],
}

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 scrollbar-hide">
      <Navbar />

      <main className="container py-10 px-5">
        <div className="relative">
          {/* Glow effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-40 -right-20 h-60 w-60 rounded-full bg-purple-500/10 blur-3xl"></div>
            <div className="absolute -bottom-20 -left-40 h-60 w-60 rounded-full bg-blue-500/10 blur-3xl"></div>
          </div>

          <h1 className="text-3xl font-bold mb-8 text-white">My Profile</h1>

          {/* User Profile Card */}
          <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm mb-8 overflow-hidden hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-white text-2xl">Profile Information</CardTitle>
              <CardDescription className="text-gray-400">Your personal details and coding statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold">
                    {userData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-400">Full Name</div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-indigo-400" />
                      <span className="text-white">{userData.name}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-400">Email Address</div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-indigo-400" />
                      <span className="text-white">{userData.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Platform Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {userData.platforms.map((platform, index) => {
              const PlatformIcon = platform.icon
              const percentage = Math.round((platform.totalSolved / platform.maxProblems) * 100)

              return (
                <Card
                  key={index}
                  className="border-gray-800 bg-gray-900/50 backdrop-blur-sm overflow-hidden hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300"
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-6 w-6 rounded-full bg-gradient-to-r ${platform.color} flex items-center justify-center`}
                      >
                        <PlatformIcon className="h-3 w-3 text-white" />
                      </div>
                      <CardTitle className="text-white">{platform.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-6">
                      {/* Circle showing total solved */}
                      <div className="relative flex-shrink-0">
                        <div className="w-28 h-28 rounded-full border-4 border-gray-800 flex items-center justify-center">
                          <svg className="w-full h-full absolute -rotate-90">
                            <circle cx="56" cy="56" r="52" className="stroke-gray-800 fill-none" strokeWidth="8" />
                            <circle
                              cx="56"
                              cy="56"
                              r="52"
                              className={`stroke-current fill-none text-gradient-to-r ${platform.color}`}
                              strokeWidth="8"
                              strokeDasharray={`${percentage * 3.27} 327`}
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-white">{platform.totalSolved}</div>
                            <div className="text-xs text-gray-400">solved</div>
                          </div>
                        </div>
                      </div>

                      {/* Difficulty breakdown */}
                      <div className="flex-grow space-y-4">
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-green-400">Easy</span>
                            <span className="text-sm text-white">{platform.easy}</span>
                          </div>
                          <Progress value={(platform.easy / platform.totalSolved) * 100} className="h-1.5 bg-gray-800">
                            <div className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full" />
                          </Progress>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-yellow-400">Medium</span>
                            <span className="text-sm text-white">{platform.medium}</span>
                          </div>
                          <Progress
                            value={(platform.medium / platform.totalSolved) * 100}
                            className="h-1.5 bg-gray-800"
                          >
                            <div className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full" />
                          </Progress>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-red-400">Hard</span>
                            <span className="text-sm text-white">{platform.hard}</span>
                          </div>
                          <Progress value={(platform.hard / platform.totalSolved) * 100} className="h-1.5 bg-gray-800">
                            <div className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full" />
                          </Progress>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}

