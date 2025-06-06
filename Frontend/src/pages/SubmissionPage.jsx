import { Card, CardContent, CardHeader } from '../components/ui/card'
import Navbar from '../components/Navbar.jsx'
import React, { useEffect } from 'react'
import { useUserDetails } from '../hooks/userDetails.js'
import RecentSubmissionsCard from '../components/RecentSubmissionsCard.jsx'
import RecentSubmissionCodeforces from '../components/RecentSubmissionCodeforces.jsx'
import { Button } from '../components/ui/button'
import { Link } from 'react-router-dom'
import { CodeIcon } from 'lucide-react'


function SubmissionPage() {
  const { data, isLoading, isError, error, refetch } = useUserDetails()
  // const queryClient = useQueryClient()
  
  const leetcodeUsername = data?.data?.leetcodeUsername
  const codeforcesUsername = data?.data?.codeforcesUsername

  // Refetch data when component mounts
  useEffect(() => {
    refetch()
  }, [refetch])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 font-[poppins]">
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-violet-600 border-t-transparent"></div>
        </div>
      </div>
    )
  }

  if(isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 font-[poppins]">
        <div className="text-white text-center py-10">
          <h1 className="text-2xl font-bold">Error: {error.message}</h1>
        </div>
      </div>
    )
  }

  // Check if user is logged in
  if (!data?.data?.name) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 font-[poppins]">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-40 -right-20 h-60 w-60 rounded-full bg-purple-500/10 blur-3xl"></div>
            <div className="absolute -bottom-20 -left-40 h-60 w-60 rounded-full bg-blue-500/10 blur-3xl"></div>
          </div>
          
          <div className="relative w-full max-w-md text-center">
            <div className="absolute z-40 -top-9 left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-indigo-500/30">
              <CodeIcon className="h-8 w-8 text-white" />
            </div>
            
            <Card className="border-0 bg-gray-900/80 backdrop-blur-sm shadow-2xl shadow-black/10 pt-10">
              <CardHeader className="space-y-1">
                <h2 className="text-xl font-bold text-white">Connect Your Coding Profiles</h2>
                <p className="text-gray-400 text-sm">No coding data yet. Add your LeetCode and Codeforces usernames to get started!</p>
              </CardHeader>
              <CardContent className="pt-4">
                <Link to="/signup">
                  <Button className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700 transition-all duration-300">
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 font-[poppins] pb-10">
        {/* Glow effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-40 -right-20 h-60 w-60 rounded-full bg-purple-500/10 blur-3xl"></div>
            <div className="absolute -bottom-20 -left-40 h-60 w-60 rounded-full bg-blue-500/10 blur-3xl"></div>
          </div>

          <h1 className="text-2xl font-bold m-8 mt-0 pt-8 text-white">Recent Problem Submissions</h1>
      <div className='mx-16 mt-8 flex flex-col gap-4'>
            <RecentSubmissionCodeforces codeforcesUsername={codeforcesUsername}/>
            <RecentSubmissionsCard leetcodeUsername={leetcodeUsername}/>
      </div>
    </div>
  )
}

export default SubmissionPage