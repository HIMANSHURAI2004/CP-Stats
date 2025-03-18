import Navbar from "../components/navbar"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800">
      <Navbar />
      <main className="container md:px-10 sm:px-4 py-10">
        <h1 className="text-3xl font-bold mb-6 text-white">Welcome to CP-stats</h1>
        <p className="text-gray-400">Your competitive Programming platform where you can find all the stats of various platforms at one place</p>

        {/* Sample content cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="rounded-lg border border-gray-800 bg-gray-900/50 backdrop-blur-sm p-6 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300">
            <h2 className="text-xl font-semibold text-white mb-3">Upcoming Contests</h2>
            <p className="text-gray-400 text-sm">
              Participate in our weekly coding challenges and compete with others.
            </p>
          </div>

          <div className="rounded-lg border border-gray-800 bg-gray-900/50 backdrop-blur-sm p-6 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300">
            <h2 className="text-xl font-semibold text-white mb-3">Leaderboard</h2>
            <p className="text-gray-400 text-sm">Check your ranking and see how you compare to other coders.</p>
          </div>

          <div className="rounded-lg border border-gray-800 bg-gray-900/50 backdrop-blur-sm p-6 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300">
            <h2 className="text-xl font-semibold text-white mb-3">Learning Resources</h2>
            <p className="text-gray-400 text-sm">
              Access tutorials, articles, and practice problems to improve your skills.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

