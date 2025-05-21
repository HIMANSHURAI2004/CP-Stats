// hooks/useUserDetails.ts
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const getUserDetails = async () => {
  const response = await axios.get("http://localhost:3000/api/v1/user/get-user", {
    withCredentials: true,
  })
  return response.data
}

export const useUserDetails = () => {
  return useQuery({
    queryKey: ["userDetails"],
    queryFn: getUserDetails,
    staleTime: Infinity, // don't refetch unless explicitly needed
    cacheTime: Infinity, // keep data in memory forever until browser/tab refresh
  })
}
