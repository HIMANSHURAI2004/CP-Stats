import { Calendar, Clock, ExternalLink } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"

const PastContest = ({ contests }) => {
  // console.log("Past contests data:", contests);
  
  const formatDate = (dateString) => {
    const options = {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }


  
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {contests?.map((item) => (
        item.site === "leetcode" ? (
          <Card key={item.id} className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="from-yellow-500 to-orange-500 bg-gradient-to-r text-white border-0 text-xs uppercase">
                  {item.site}
                </Badge>
              </div>
              <CardTitle className="text-xl font-semibold text-white mt-2">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center text-gray-400">
                  <Calendar className="h-4 w-4 mr-2 text-indigo-600" />
                  <div className="flex gap-x-2">
                    <span>Ended on - </span>
                    <span>{
                      formatDate(new Date(item?.startTime * 1000))
                      }</span>
                  </div>
                </div>
                <div className="flex items-center text-gray-400">
                  <Clock className="h-4 w-4 mr-2 text-indigo-600" />
                  <div className="flex gap-x-2">
                    <span>Duration - </span>
                    <span>1.5 hours</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 border-none text-white hover:from-violet-700 hover:to-indigo-700 transition-all duration-300"                
                asChild
              >
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Contest
                </a>
              </Button>
            </CardFooter>
          </Card>
        ) : (
        <Card key={item.id} className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="from-red-500 to-rose-600 bg-gradient-to-r text-white border-0 text-xs uppercase">
                  Codeforces
                </Badge>
              </div>
              <CardTitle className="text-xl font-semibold text-white mt-2">{item.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center text-gray-400">
                  <Calendar className="h-4 w-4 mr-2 text-indigo-600" />
                  <div className="flex gap-x-2">
                    <span>Ended on - </span>
                    <span>{formatDate(item.startTime)}</span>
                  </div>
                </div>
                <div className="flex items-center text-gray-400">
                  <Clock className="h-4 w-4 mr-2 text-indigo-600" />
                  <div className="flex gap-x-2">
                    <span>Duration - </span>
                    <span>{
                        Math.floor((new Date(item?.endTime) - new Date(item?.startTime)) / 3600000)
                      } hours</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 border-none text-white hover:from-violet-700 hover:to-indigo-700 transition-all duration-300"                
                asChild
              >
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Contest
                </a>
              </Button>
            </CardFooter>
          </Card>
        )
      ))}
    </div>
  )
}

export default PastContest;