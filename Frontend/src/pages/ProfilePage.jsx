import { User, Mail, Award, Code, Terminal, MoveRight, ChevronsLeftRight, MapPin, GraduationCap, Github, Linkedin, View, Eye, Star, Handshake, Twitter } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Progress } from "../components/ui/progress"
import Navbar from "../components/navbar"
import {  useState } from "react"
import { useUserDetails } from "../hooks/userDetails"
import { Button } from "../components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../components/ui/drawer"
import { Input } from "../components/ui/input"
import axios from "axios"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { toast, Toaster } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Link } from "react-router-dom"
import "../loader.css"

export default function ProfilePage() {
  const { data, isLoading, isError, error } = useUserDetails()
  const queryClient = useQueryClient();
  
  const userDetails = data?.data;
  const name = data?.data?.name;
  const [leetcodeUsername, setLeetcodeUsername] = useState(userDetails?.leetcodeUsername || "");
  const [codeforcesUsername, setCodeforcesUsername] = useState(userDetails?.codeforcesUsername || "");
  const [isVerifying, setIsVerifying] = useState(false);

  // Store original values
  const originalLeetcodeUsername = userDetails?.leetcodeUsername || "";
  const originalCodeforcesUsername = userDetails?.codeforcesUsername || "";
  console.log("Leetcode Username:", leetcodeUsername);
  console.log("Codeforces Username:", codeforcesUsername);
  
  // Function to reset input fields to original values
  const resetInputFields = () => {
    setLeetcodeUsername(originalLeetcodeUsername);
    setCodeforcesUsername(originalCodeforcesUsername);
  };

  const fetchLeetcodeProfile = async () => {
      
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/leetcode/lcprofile/publicProfile?username=${leetcodeUsername}`, {
        withCredentials: true,
      });
      return response.data;
  }

  const {data: leetcodeProfile, isLoading: isLeetcodeLoading} = useQuery({
    queryKey: ["leetcodeProfile"],
    queryFn: fetchLeetcodeProfile,
    staleTime: 0,
    refetchOnMount: true,
  });
  
  const leetcodeUserProfile=leetcodeProfile?.data;
  
  const fetchCodeforcesProfile = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/codeforces/user/info?handle=${codeforcesUsername}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching Codeforces profile:", error);
      throw error;
    }
  }
  
  const {data: codeforcesProfile, isLoading: isCodeforcesLoading} = useQuery({
    queryKey: ["codeforcesProfile"],
    queryFn: fetchCodeforcesProfile,
    staleTime: 0,
    refetchOnMount: true,
  });

  const codeforcesUserProfile=codeforcesProfile?.data[0];
  
  // Function to verify Codeforces handle
  const verifyCodeforcesHandle = async (handle) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/codeforces/user/info`,
        {
          params: { handle },
          withCredentials: true,
        }
      );
      
      return response.status === 200;
    } catch (error) {
      return false;
    }
  };

  const handleUpdatePlatformUsername = async () => {
    try {
      setIsVerifying(true);

      // If Codeforces username is provided, verify it first
      if (codeforcesUsername) {
        const isValid = await verifyCodeforcesHandle(codeforcesUsername);
        if (!isValid) {
          toast.error("Invalid Codeforces handle. Please check and try again.");
          resetInputFields();
          setIsVerifying(false);
          return;
        }
      }

      // If verification passed or no Codeforces username provided, proceed with update
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/update-profile`,
        {
          leetcodeUsername,
          codeforcesUsername,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.statusCode === 200) {
        toast.success("Profile updated successfully");
        // Invalidate and refetch user details
        queryClient.invalidateQueries(["userDetails"]);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
      resetInputFields();
    } finally {
      setIsVerifying(false);
    }
  };

  if (isLoading || isCodeforcesLoading || isLeetcodeLoading) {
    return (
          <div className="min-h-screen text-white bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800">
            <Navbar />
            <div className="flex items-center justify-center w-full h-[85vh]">
              <span className="loader"></span>
            </div>
          </div>)
  }

  if (isError) {
    return <div className="text-white text-center py-10">Error: {error.message}</div>;
  }

  // If user is not logged in, show login prompt
  if (!userDetails?.name) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 scrollbar-hide">
        <Toaster position="top-right" richColors />
        <Navbar />
        <main className="container py-10 px-5">
          <div className="relative">
            {/* Glow effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-40 -right-20 h-60 w-60 rounded-full bg-purple-500/10 blur-3xl"></div>
              <div className="absolute -bottom-20 -left-40 h-60 w-60 rounded-full bg-blue-500/10 blur-3xl"></div>
            </div>

            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
              <h1 className="text-3xl font-bold mb-4 text-white">Welcome to CP Stats</h1>
              <p className="text-gray-400 mb-8 max-w-md">
                Please log in to view your profile and track your coding progress across different platforms.
              </p>
              <Button 
                className="bg-indigo-600 text-white hover:bg-indigo-700"
                onClick={() => window.location.href = "/login"}
              >
                Get Started
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 scrollbar-hide">
      <Toaster position="top-right" richColors />
      <Navbar />

      <main className="container py-10 px-5">
        <div className="relative">
          {/* Glow effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-40 -right-20 h-60 w-60 rounded-full bg-purple-500/10 blur-3xl"></div>
            <div className="absolute -bottom-20 -left-40 h-60 w-60 rounded-full bg-blue-500/10 blur-3xl"></div>
          </div>
          <div className="flex items-center justify-between mb-8 flex-wrap">
            <h1 className="text-3xl font-bold text-white font-[poppins]">My Profile</h1>
            <div>
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="primary" className=" bg-indigo-600 text-white text-sm">Update username</Button>
                </DrawerTrigger>
                <DrawerContent className="bg-gray-900 ">
                  <div className="mx-auto w-full max-w-md ">
                    <DrawerHeader>
                      <DrawerTitle className="text-indigo-400 text-center text-xl ">Update Platform Username</DrawerTitle>
                      <DrawerDescription className="text-gray-300 mb-2 text-sm">You can update your username of various coding platforms here.</DrawerDescription>
                    </DrawerHeader>
                    <div className="flex flex-col gap-4 px-4 py-2">
                      <div className="flex justify-between gap-x-4">
                        <p className="w-full text-white">Leetcode username</p>
                        <p className="text-white">:</p>
                        <Input
                          id="leetcodeUsername"
                          value={leetcodeUsername}
                          defaultValue={leetcodeUsername}
                          onChange={(e) => setLeetcodeUsername(e.target.value)}
                          className="text-white"
                        />
                      </div>
                    <div className="flex justify-between gap-x-4">
                        <p className="w-full text-white">Codeforces username</p>
                        <p className="text-white">:</p>
                      <Input
                        id="codeforcesUsername"
                        value={codeforcesUsername}
                        defaultValue={codeforcesUsername}
                        onChange={(e) => setCodeforcesUsername(e.target.value)}
                        className="text-white"

                      />
                    </div>
                  </div>
                    <DrawerFooter>
                      <Button 
                        className="bg-indigo-600 my-2" 
                        onClick={handleUpdatePlatformUsername}
                        disabled={isVerifying}
                      >
                        {isVerifying ? "Verifying..." : "Submit"}
                      </Button>
                      <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
          </div>

          {/* User Profile Card */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mx-6 mb-2 font-[poppins]">
            <Card className="border-gray-800 col-span-2  bg-gray-900/50 backdrop-blur-sm mb-8 overflow-hidden hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-white text-xl">Leetcode Profile information</CardTitle>
                <CardDescription className="text-gray-400">Your Leetcode Profile Details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-x-6">
                  <div className="flex-shrink-0">
                    <Avatar className="h-20 rounded-md w-20">
                      <AvatarImage src={leetcodeUserProfile?.profile?.userAvatar} />
                      <AvatarFallback>{
                        name ? name
                        .split(" ")
                        .map((n) => n[0])
                        .join("") : ""}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="space-y-4">
                    <div className="">
                      <div className="flex items-center">
                        <span className="text-white text-xl">{leetcodeUserProfile?.profile?.realName}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-300 text-sm">{leetcodeUserProfile?.username}</span>
                      </div>
                      <div className="flex items-center gap-2 pt-2">
                        <span className="text-white ">Rank - </span>
                        <span className="text-white"> {leetcodeUserProfile?.profile?.ranking}</span>
                      </div>
                    </div>
                  </div>

                </div>
                    <div className="pl-2">
                      <div className="flex flex-col  gap-x-1">
                      <div className="flex items-center gap-2 pt-2">
                        <MapPin className="text-indigo-400 h-4 w-4 mr-1" />
                        <span className="text-gray-300 ">{leetcodeUserProfile?.profile?.countryName}</span>
                      </div>
                      <div className="flex items-center gap-2 pt-2">
                        <GraduationCap className="text-indigo-400 h-4 w-4 mr-1" />
                        <span className="text-gray-300 ">{leetcodeUserProfile?.profile?.school}</span>
                      </div>
                      <div className="flex items-center gap-2 pt-2">
                          <Star className="text-yellow-400 h-4 w-4 mr-1" />
                          <span className="text-white ">Reputation - </span>
                          <span className="text-white capitalize"> {leetcodeUserProfile?.profile?.reputation}</span>
                        </div>
                      <div className="flex pt-3 gap-x-3">
                        <Link to={leetcodeUserProfile?.githubURL} className="p-2 border-indigo-600 border-2 rounded-full">
                          <Github className="w-3 h-3 text-white  hover:text-gray-400 cursor-pointer" />
                        </Link>
                        <Link to={leetcodeUserProfile?.linkedinURL} className="p-2 border-indigo-600 border-2 rounded-full">
                          <Linkedin className="w-3 h-3 text-white  hover:text-gray-400 cursor-pointer" />
                        </Link>
                        <Link to={leetcodeUserProfile?.twitterUrl} className="p-2 border-indigo-600 border-2 rounded-full">
                          <Twitter className="w-3 h-3 text-white  hover:text-gray-400 cursor-pointer" />
                        </Link>
                  </div>
                      </div>
                        
                  </div>
              </CardContent>
            </Card>
            <Card className="border-gray-800 col-span-2 bg-gray-900/50 backdrop-blur-sm mb-8 overflow-hidden hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-white text-xl">Codeforces Profile information</CardTitle>
                <CardDescription className="text-gray-400">Your Codeforces Profile Details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-x-6">
                  <div className="flex-shrink-0">
                    <Avatar className="h-20 rounded-md w-20">
                      <AvatarImage src={codeforcesUserProfile?.avatar} />
                      <AvatarFallback>{
                        name ? name
                        .split(" ")
                        .map((n) => n[0])
                        .join("") : ""}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="space-y-4">
                    <div className="">
                      <div className="flex items-center">
                        <span className="text-white text-xl">{codeforcesUserProfile?.firstName} {codeforcesUserProfile?.lastName}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-300 text-sm">{codeforcesUserProfile?.handle}</span>
                      </div>
                      <div className="flex items-center gap-2 pt-2">
                        <span className="text-white ">Rank - </span>
                        <span className="text-white capitalize"> {codeforcesUserProfile?.rank}</span>
                      </div>
                    </div>
                  </div>

                </div>
                    <div className="pl-2">
                      <div className="flex flex-col  gap-x-1">
                        <div className="flex items-center gap-2 pt-2">
                          <MapPin className="text-indigo-400 h-4 w-4 mr-1" />
                          <span className="text-gray-300 ">{codeforcesUserProfile?.country}</span>
                        </div>
                        <div className="flex items-center gap-2 pt-2">
                          <Star className="text-indigo-400 h-4 w-4 mr-1" />
                          <span className="text-white ">Rating - </span>
                          <span className="text-white capitalize"> {codeforcesUserProfile?.rating} ( max. {codeforcesUserProfile?.maxRank}, {codeforcesUserProfile?.maxRating})</span>
                        </div>
                        <div className="flex items-center gap-2 pt-2">
                          <Star className="text-yellow-400 h-4 w-4 mr-1" />
                          <span className="text-white ">Contribution - </span>
                          <span className="text-white capitalize"> {codeforcesUserProfile?.contribution}</span>
                        </div>    
                        <div className="flex items-center gap-2 pt-2">
                          <Handshake className="text-indigo-400 h-4 w-4 mr-1" />
                          <span className="text-white ">Friend of - </span>
                          <span className="text-white capitalize">{codeforcesUserProfile?.friendOfCount}</span>
                        </div>
                      </div>
                  </div>
              </CardContent>
            </Card>
                      
          </div>
          {/* Platform Cards */}
          
        </div>
      </main>
    </div>
  )
}

