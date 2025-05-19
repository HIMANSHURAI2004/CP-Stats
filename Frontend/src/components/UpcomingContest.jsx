import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ContestCard from "./ContestCard";
import { useEffect, useState } from "react";

export default function UpcomingContests() {
  const [upcomingContests, setUpcomingContests] = useState([]);

  const fetchUpcomingContests = async () => {
    const response = await axios.get(
      "http://localhost:3000/api/v1/contest/upcomingContests",
      {
        withCredentials: true,
      }
    );
    return response.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["upcomingContests"],
    queryFn: fetchUpcomingContests,
  });

  useEffect(() => {
    if (data?.data) {
      setUpcomingContests(data.data);
    }
  }, [data]);

  if (isLoading) {
    return <div className="text-white text-center py-10">Loading...</div>;
  }

  if (isError) {
    return <div className="text-white text-center py-10">Error: {error.message}</div>;
  }

  return (
    <div className="w-full p-4">
      {upcomingContests.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400">
            No Upcoming contests found for the selected platforms.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingContests.map((contest) => (
            <ContestCard key={contest.id} contest={contest} status="upcoming" />
          ))}
        </div>
      )}
    </div>
  );
}
