import { Card, CardContent, CardHeader } from '../components/ui/card'
import Navbar from '../components/Navbar'
import React from 'react'
import { useUserDetails } from '../hooks/userDetails'
import RecentSubmissionsCard from '../components/RecentSubmissionsCard'
import RecentSubmissionCodeforces from '../components/RecentSubmissionCodeforces'

function SubmissionPage() {
  const { data, isLoading, isError, error } = useUserDetails()
  
  const leetcodeUsername = data?.data?.leetcodeUsername
  const codeforcesUsername = data?.data?.codeforcesUsername


  if (isLoading) return <p>Loading...</p>

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
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 font-[poppins] pb-10">
      <Navbar />
        {/* Glow effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-40 -right-20 h-60 w-60 rounded-full bg-purple-500/10 blur-3xl"></div>
            <div className="absolute -bottom-20 -left-40 h-60 w-60 rounded-full bg-blue-500/10 blur-3xl"></div>
          </div>

          <h1 className="text-2xl font-bold m-8 text-white">Recent Problem Submissions</h1>
      <div className='mx-16 mt-8 flex flex-col gap-4'>
            <RecentSubmissionCodeforces codeforcesUsername={codeforcesUsername}/>
            <RecentSubmissionsCard leetcodeUsername={leetcodeUsername}/>
      </div>
    </div>
  )
}

export default SubmissionPage