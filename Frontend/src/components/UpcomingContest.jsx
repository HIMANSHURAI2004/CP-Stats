import ContestCard from "./ContestCard.jsx";

export default function UpcomingContests({contests:upcomingContests}) {


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
