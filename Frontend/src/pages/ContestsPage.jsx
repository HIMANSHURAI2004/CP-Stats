import { useState, useEffect } from "react"
import {Link} from "react-router-dom"
import { Calendar, Clock, ExternalLink } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Checkbox } from "../components/ui/checkbox"
import { Label } from "../components/ui/label"
import Navbar from "../components/navbar"

// Sample contest data
const contestsData = [
  {
    id: 1,
    site: "LeetCode",
    title: "Weekly Contest 345",
    startTime: "2023-11-05T02:30:00Z",
    duration: 90, // minutes
    endTime: "2023-11-05T04:00:00Z",
    url: "https://leetcode.com/contest/weekly-contest-345",
    status: "ongoing",
  },
  {
    id: 2,
    site: "CodeForces",
    title: "Codeforces Round #898 (Div. 2)",
    startTime: "2023-11-10T17:35:00Z",
    duration: 120, // minutes
    endTime: "2023-11-10T19:35:00Z",
    url: "https://codeforces.com/contests/1873",
    status: "ongoing",
  },
  {
    id: 3,
    site: "CodeChef",
    title: "Starters 100",
    startTime: "2023-11-15T14:30:00Z",
    duration: 150, // minutes
    endTime: "2023-11-15T17:00:00Z",
    url: "https://www.codechef.com/START100",
    status: "ongoing",
  },
  {
    id: 4,
    site: "LeetCode",
    title: "Biweekly Contest 117",
    startTime: "2023-11-25T14:30:00Z",
    duration: 90, // minutes
    endTime: "2023-11-25T16:00:00Z",
    url: "https://leetcode.com/contest/biweekly-contest-117",
    status: "upcoming",
  },
  {
    id: 5,
    site: "CodeForces",
    title: "Codeforces Round #900 (Div. 1)",
    startTime: "2023-11-28T17:35:00Z",
    duration: 120, // minutes
    endTime: "2023-11-28T19:35:00Z",
    url: "https://codeforces.com/contests/1875",
    status: "upcoming",
  },
  {
    id: 6,
    site: "CodeChef",
    title: "Starters 101",
    startTime: "2023-11-22T14:30:00Z",
    duration: 150, // minutes
    endTime: "2023-11-22T17:00:00Z",
    url: "https://www.codechef.com/START101",
    status: "upcoming",
  },
  {
    id: 7,
    site: "LeetCode",
    title: "Weekly Contest 346",
    startTime: "2023-11-12T02:30:00Z",
    duration: 90, // minutes
    endTime: "2023-11-12T04:00:00Z",
    url: "https://leetcode.com/contest/weekly-contest-346",
    status: "past",
  },
  {
    id: 8,
    site: "CodeForces",
    title: "Educational Codeforces Round 158",
    startTime: "2023-11-17T14:35:00Z",
    duration: 120, // minutes
    endTime: "2023-11-17T16:35:00Z",
    url: "https://codeforces.com/contests/1877",
    status: "ongoing",
  },
]

// Platform filter options
const platforms = [
  { id: "all", label: "All" },
  { id: "leetcode", label: "LeetCode" },
  { id: "codeforces", label: "CodeForces" },
  { id: "codechef", label: "CodeChef" },
]

export default function ContestsPage() {
  const [activeTab, setActiveTab] = useState("upcoming")
  const [selectedPlatforms, setSelectedPlatforms] = useState(["all"])
  const [filteredContests, setFilteredContests] = useState(contestsData)

  // Format date function
  const formatDate = (dateString) => {
    const options = {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  // Format duration function
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours > 0 ? `${hours}h ` : ""}${mins > 0 ? `${mins}m` : ""}`
  }

  // Handle platform filter change
  const handlePlatformChange = (platform) => {
    setSelectedPlatforms((prev) => {
      if (platform === "all") {
        return ["all"]
      } else {
        const newSelection = prev.includes(platform)
          ? prev.filter((p) => p !== platform)
          : [...prev.filter((p) => p !== "all"), platform]

        return newSelection.length === 0 ? ["all"] : newSelection
      }
    })
  }

  // Filter contests based on selected platforms and active tab
  useEffect(() => {
    let filtered = contestsData.filter((contest) => contest.status === activeTab)

    if (!selectedPlatforms.includes("all")) {
      filtered = filtered.filter((contest) => selectedPlatforms.includes(contest.site.toLowerCase()))
    }

    setFilteredContests(filtered)
  }, [selectedPlatforms, activeTab])

  // Get platform badge color
  const getPlatformColor = (platform) => {
    switch (platform.toLowerCase()) {
      case "leetcode":
        return "from-yellow-500 to-orange-500"
      case "codeforces":
        return "from-red-500 to-rose-600"
      case "codechef":
        return "from-emerald-500 to-teal-600"
      default:
        return "from-violet-600 to-indigo-600"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 font-[poppins]">
      <Navbar />

      <main className="container py-10 lg:px-10 sm:px-4">
        <div className="relative">
          {/* Glow effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-40 -right-20 h-60 w-60 rounded-full bg-purple-500/10 blur-3xl"></div>
            <div className="absolute -bottom-20 -left-40 h-60 w-60 rounded-full bg-blue-500/10 blur-3xl"></div>
          </div>

          <h1 className="text-3xl font-bold mb-8 text-white">Coding Contests</h1>

          {/* Platform filters */}
          <div className="mb-8 rounded-lg border border-gray-800 bg-gray-900/50 backdrop-blur-sm p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Filter by Platform</h2>
            <div className="flex flex-wrap gap-6">
              {platforms.map((platform) => (
                <div key={platform.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={platform.id}
                    checked={selectedPlatforms.includes(platform.id)}
                    onCheckedChange={() => handlePlatformChange(platform.id)}
                    className="border-gray-700 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                  />
                  <Label htmlFor={platform.id} className="text-gray-300 cursor-pointer">
                    {platform.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs for contest status */}
          <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-900/50 border border-gray-800">
              <TabsTrigger value="past" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white text-gray-400">
                Past Contests
              </TabsTrigger>
              <TabsTrigger value="ongoing" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white text-gray-400">
                Ongoing Contests
              </TabsTrigger>
              <TabsTrigger
                value="upcoming"
                className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white text-gray-400"
              >
                Upcoming Contests
              </TabsTrigger>
            </TabsList>

            {/* Tab content */}
            {["past", "ongoing", "upcoming"].map((status) => (
              <TabsContent key={status} value={status} className="mt-6">
                {filteredContests.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-400">No {status} contests found for the selected platforms.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredContests.map((contest) => (
                      <Card
                        key={contest.id}
                        className="border-gray-800 bg-gray-900/50 backdrop-blur-sm overflow-hidden hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300"
                      >
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start">
                            <Badge className={`bg-gradient-to-r ${getPlatformColor(contest.site)} text-white border-0`}>
                              {contest.site}
                            </Badge>
                            {status === "ongoing" && (
                              <Badge className="bg-green-600 text-white border-0 animate-pulse">Live</Badge>
                            )}
                          </div>
                          <CardTitle className="text-white mt-2 line-clamp-2">{contest.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="pb-3">
                          <div className="space-y-3 text-gray-400">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-indigo-400" />
                              <span>Starts: {formatDate(contest.startTime)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-indigo-400" />
                              <span>Duration: {formatDuration(contest.duration)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-indigo-400" />
                              <span>Ends: {formatDate(contest.endTime)}</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button
                            asChild
                            className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700 transition-all duration-300"
                          >
                            <Link href={contest.url} target="_blank" rel="noopener noreferrer">
                              <span>
                                {status === "upcoming"
                                  ? "Register"
                                  : status === "ongoing"
                                    ? "Join Now"
                                    : "View Results"}
                              </span>
                              <ExternalLink className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </div>
  )
}

