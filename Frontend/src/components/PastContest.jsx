import { Calendar, Clock, ExternalLink } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"

const PastContest = ({ contest }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {contest?.map((item) => (
        <Card key={item.id} className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="bg-indigo-600/20 text-indigo-400 border-indigo-600/50">
                {item.site}
              </Badge>
              <Badge variant="secondary" className="bg-gray-600/20 text-gray-400 border-gray-600/50">
                Past
              </Badge>
            </div>
            <CardTitle className="text-xl font-semibold text-white mt-2">{item.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center text-gray-400">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{new Date(item.startTime).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Clock className="h-4 w-4 mr-2" />
                <span>{item.duration} minutes</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              className="w-full border-gray-700 hover:bg-gray-800 hover:text-white"
              asChild
            >
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Contest
              </a>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default PastContest;