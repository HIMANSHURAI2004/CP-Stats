// hooks/useUserDetails.ts
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const getUserDetails = async () => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/get-user`, {
    withCredentials: true,
  })
  return response.data
}

export const useUserDetails = () => {
  return useQuery({
    queryKey: ["userDetails"],
    queryFn: getUserDetails,
    staleTime: 0, // Consider data stale immediately
    refetchOnMount: true, // Refetch when component mounts
    refetchOnWindowFocus: true, // Refetch when window regains focus
    refetchOnReconnect: true, // Refetch when reconnecting
  })
}
