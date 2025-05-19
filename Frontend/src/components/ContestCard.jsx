import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Calendar, Clock, ExternalLink } from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from "../components/ui/badge"
function ContestCard({
  contest,
  status,
}) {

  // Get platform badge color
  const getPlatformColor = (platform) => {
    switch (platform?.toLowerCase()) {
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
  
  return (
    <div>
      <Card
        key={contest.id}
        className="border-gray-800 bg-gray-900/50 backdrop-blur-sm overflow-hidden hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300"
      >
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <Badge className={`bg-gradient-to-r ${getPlatformColor(contest.site)} text-white border-0 text-xs uppercase`}>
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
              <span>Duration: {formatDate(contest.duration)}</span>
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
            <a href={contest.url} target="_blank" rel="noopener noreferrer">
              <span>
                {status === "upcoming"
                  ? "Register"
                  : status === "ongoing"
                    ? "Join Now"
                    : "View Results"}
              </span>
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ContestCard