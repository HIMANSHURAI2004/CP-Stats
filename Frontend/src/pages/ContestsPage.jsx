import { useState, useEffect } from "react"
import { Calendar, Clock, ExternalLink } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Checkbox } from "../components/ui/checkbox"
import { Label } from "../components/ui/label"
import Navbar from "../components/navbar"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import UpcomingContests from "../components/UpcomingContest"
import OngoingContest from "../components/OngoingContest"
import PastContest from "../components/PastContest"

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
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(10)

  const fetchUpcomingContests = async () => {
    const response = await axios.get("http://localhost:3000/api/v1/contest/upcomingContests", {
      withCredentials: true,
    });
    return response.data;
  }

  const fetchPastContests = async () => {
    const response = await axios.get(`http://localhost:3000/api/v1/leetcode/lcprofile/pastContests?page=${currentPage}&perPage=${perPage}`, {
      withCredentials: true,
    });
    return response.data;
  }

  const { data: upcomingData, isLoading: upcomingLoading, isError: upcomingError, error: upcomingErrorMsg } = useQuery({
    queryKey: ["upcomingContests"],
    queryFn: fetchUpcomingContests,
  })

  const { data: pastData, isLoading: pastLoading, isError: pastError, error: pastErrorMsg } = useQuery({
    queryKey: ["pastContests", currentPage, perPage],
    queryFn: fetchPastContests,
  })

  useEffect(() => {
    let filtered = [];
    if (activeTab === "upcoming") {
      filtered = upcomingData?.data || [];
    } else if (activeTab === "past") {
      filtered = pastData?.data?.contests || [];
    } else {
      filtered = data?.data || [];
    }

    if (!selectedPlatforms.includes("all")) {
      filtered = filtered.filter((contest) => selectedPlatforms.includes(contest.site?.toLowerCase() || "leetcode"))
    }
    setFilteredContests(filtered)
  }, [selectedPlatforms, activeTab, upcomingData, pastData, currentPage, perPage])

  if (upcomingLoading || pastLoading) {
    return <div className="text-white text-center py-10">Loading...</div>
  }

  if (upcomingError || pastError) {
    return <div className="text-white text-center py-10">Error: {upcomingErrorMsg?.message || pastErrorMsg?.message}</div>
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
                {filteredContests?.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-400">No {status} contests found for the selected platforms.</p>
                  </div>
                ) : (
                  <div>
                    {status === "upcoming" && (
                      <UpcomingContests contest={filteredContests} />
                    )}
                    {status === "ongoing" && (
                      <OngoingContest contest={filteredContests} />
                    )}
                    {status === "past" && (
                      <>
                        <PastContest contest={filteredContests} />
                        {pastData?.data?.pagination && (
                          <div className="flex justify-center items-center gap-4 mt-6">
                            <Button
                              variant="outline"
                              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                              disabled={currentPage === 1}
                              className="border-gray-700 hover:bg-gray-800 hover:text-white"
                            >
                              Previous
                            </Button>
                            <span className="text-gray-400">
                              Page {currentPage} of {Math.ceil(pastData.data.pagination.totalNum / perPage)}
                            </span>
                            <Button
                              variant="outline"
                              onClick={() => setCurrentPage(prev => prev + 1)}
                              disabled={currentPage >= Math.ceil(pastData.data.pagination.totalNum / perPage)}
                              className="border-gray-700 hover:bg-gray-800 hover:text-white"
                            >
                              Next
                            </Button>
                          </div>
                        )}
                      </>
                    )}
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

