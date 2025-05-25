import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Checkbox } from "../components/ui/checkbox"
import { Label } from "../components/ui/label"
import Navbar from "../components/navbar"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import UpcomingContests from "../components/UpcomingContest"
import PastContest from "../components/PastContest"


// Platform filter options
const platforms = [
  { id: "all", label: "All" },
  { id: "leetcode", label: "LeetCode" },
  { id: "codeforces", label: "CodeForces" },
]

export default function ContestsPage() {
  const [activeTab, setActiveTab] = useState("upcoming")
  const [selectedPlatforms, setSelectedPlatforms] = useState("all")
  const [filteredContests, setFilteredContests] = useState([])

  const fetchUpcomingContests = async () => {
    const response = await axios.get("http://localhost:3000/api/v1/contest/upcomingContests", {
      withCredentials: true,
    });
    return response.data;
  }

  const fetchPastContests = async () => {
    const response = await axios.get(`http://localhost:3000/api/v1/leetcode/lcprofile/pastContests?page=1&perPage=5`, {
      withCredentials: true,
    });
    return response.data;
  }

  const fetchPastContestsCodeforces = async () => {
    const response = await axios.get(`http://localhost:3000/api/v1/codeforces/contests/past`)
    return response.data;
  }

  const { data: pastDataCodeforces, isLoading: pastLoadingCodeforces, isError: pastErrorCodeforces, error: pastErrorMsgCodeforces } = useQuery({
    queryKey: ["pastContestsCodeforces"],
    queryFn: fetchPastContestsCodeforces,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  })

  const { data: upcomingData, isLoading: upcomingLoading, isError: upcomingError, error: upcomingErrorMsg } = useQuery({
    queryKey: ["upcomingContests"],
    queryFn: fetchUpcomingContests,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  })
  
  const { data: pastData, isLoading: pastLoading, isError: pastError, error: pastErrorMsg } = useQuery({
    queryKey: ["pastContests"],
    queryFn: fetchPastContests,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  })

  useEffect(() => {
    let filtered = [];
    if (activeTab === "upcoming") {
      filtered = upcomingData?.data || [];
      filtered = filtered.filter((contest) => contest.site?.toLowerCase()!=="codechef")
      if (selectedPlatforms!=="all") {
        filtered = filtered.filter((contest) => selectedPlatforms===contest.site?.toLowerCase())
      }
    } else if (activeTab === "past") {
      filtered = pastData?.data?.contests;
      if( selectedPlatforms === "codeforces") {
        filtered = pastDataCodeforces?.data?.contests;
      }
      if(selectedPlatforms==="all") {
        filtered = [...filtered, ...(pastDataCodeforces?.data?.contests || [])];
      }
    }

    if(filtered!=filteredContests) {
      setFilteredContests(filtered)
    }
  }, [selectedPlatforms, activeTab, upcomingData, pastData,pastDataCodeforces])

  if (upcomingLoading || pastLoading || pastLoadingCodeforces) {
    return <div className="text-white text-center py-10">Loading...</div>
  }

  if (upcomingError || pastError || pastErrorCodeforces) {
    return <div className="text-white text-center py-10">Error: {upcomingErrorMsg?.message || pastErrorMsg?.message || pastErrorMsgCodeforces?.message}</div>
  }

  // Handle platform filter change
  const handlePlatformChange = (platform) => {
    setSelectedPlatforms(platform)
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
                    className="border-gray-600 data-[state=checked]:bg-violet-600 data-[state=checked]:border-violet-600"
                  />
                  <Label
                    htmlFor={platform.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-300"
                  >
                    {platform.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="upcoming" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 bg-gray-900/50 backdrop-blur-sm border border-gray-800">
              <TabsTrigger
                value="upcoming"
                className="data-[state=active]:bg-violet-600 data-[state=active]:text-white text-gray-400"
              >
                Upcoming
              </TabsTrigger>
              <TabsTrigger
                value="past"
                className="data-[state=active]:bg-violet-600 data-[state=active]:text-white text-gray-400"
              >
                Past
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="mt-6">
              {upcomingLoading ? (
                <div className="flex items-center justify-center min-h-[200px]">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-violet-600 border-t-transparent"></div>
                </div>
              ) : upcomingError ? (
                <div className="text-red-400 text-center py-10">
                  Error: {upcomingErrorMsg?.message}
                </div>
              ) : (
                <UpcomingContests contests={filteredContests} />
              )}
            </TabsContent>

            <TabsContent value="past" className="mt-6">
              {pastLoading ? (
                <div className="flex items-center justify-center min-h-[200px]">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-violet-600 border-t-transparent"></div>
                </div>
              ) : pastError ? (
                <div className="text-red-400 text-center py-10">
                  Error: {pastErrorMsg?.message}
                </div>
              ) : (
                <PastContest contests={filteredContests} />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

