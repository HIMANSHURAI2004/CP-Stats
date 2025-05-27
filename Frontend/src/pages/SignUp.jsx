import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form"
import { CodeIcon, ArrowRight, User, Github } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form"
import { Input } from "../components/ui/input"
import axios from 'axios'
import Navbar from "../components/Navbar.jsx"
import { useNavigate } from "react-router-dom"
import { toast, Toaster } from "sonner"

function SignUp() {
    const [isLoading, setIsLoading] = useState(false)
    const [isVerifying, setIsVerifying] = useState(false)
    const navigate = useNavigate()
    
    // Check if user is already logged in
    useEffect(() => {
        const checkUser = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/get-user`, {
                    withCredentials: true
                });
                // Only redirect if we have actual user data
                if (response.status === 200 && response.data.data && response.data.data.name) {
                    navigate("/");
                }
            } catch (error) {
                // User is not logged in, which is fine - stay on signup page
                console.log("User not logged in");
            }
        };
        checkUser();
    }, [navigate]);
    
    const form = useForm({
        defaultValues: {
          name: "",
          leetcodeUsername: "",
          codeforcesUsername: "",
        },
        mode: "onChange",
        rules: {
          name: {
            required: "Name is required",
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters"
            }
          },
          leetcodeUsername: {
            required: "LeetCode username is required",
            minLength: {
              value: 3,
              message: "LeetCode username must be at least 3 characters"
            }
          },
          codeforcesUsername: {
            minLength: {
              value: 3,
              message: "Codeforces username must be at least 3 characters"
            }
          }
        }
      })

    // Function to verify Codeforces handle
    const verifyCodeforcesHandle = async (handle) => {
      if (!handle) return true; // Skip verification if handle is empty
      
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

    // Function to verify LeetCode handle
    const verifyLeetCodeHandle = async (handle) => {
      if (!handle) return true; // Skip verification if handle is empty
      
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/leetcode/verify-username`,
          {
            params: { username: handle },
            withCredentials: true,
          }
        );
        
        return response.data.exists;
      } catch (error) {
        return false;
      }
    };

    const onSubmit = async (data) => {
        try {
          setIsLoading(true);
          setIsVerifying(true);

          // Verify LeetCode handle
          const isLeetCodeValid = await verifyLeetCodeHandle(data.leetcodeUsername);
          if (!isLeetCodeValid) {
            toast.error("Invalid LeetCode handle. Please check and try again.");
            setIsVerifying(false);
            setIsLoading(false);
            return;
          }

          // Verify Codeforces handle if provided
          if (data.codeforcesUsername) {
            const isCodeforcesValid = await verifyCodeforcesHandle(data.codeforcesUsername);
            if (!isCodeforcesValid) {
              toast.error("Invalid Codeforces handle. Please check and try again.");
              setIsVerifying(false);
              setIsLoading(false);
              return;
            }
          }

          const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/register`, data, {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true
          });
          
          if (response.status === 201) {
            toast.success("Account created successfully!");
            // Wait a bit for cookies to be set
            setTimeout(() => {
              navigate("/");
            }, 100);
          }
        } catch (error) {
          console.error("Error during signup:", error);
          form.setError("root", {
            message: error.response?.data?.message || "Something went wrong. Please try again."
          });
        } finally {
          setIsLoading(false);
          setIsVerifying(false);
        }
    }  

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800">
      <Toaster position="top-right" richColors />
      <Navbar />
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4 font-[poppins]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl"></div>
        </div>
  
        <div className="relative w-full max-w-md">
          <div className="absolute z-40 -top-7 left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-indigo-500/30">
            <CodeIcon className="h-8 w-8 text-white" />
          </div>
  
          <Card className="border-0 bg-gray-900/80 backdrop-blur-sm shadow-2xl shadow-black/10">
            <CardHeader className="space-y-1 pt-10 pb-2 text-center">
              <CardTitle className="text-2xl font-bold text-white">Explore CP-stats</CardTitle>
              <CardDescription className="text-gray-400 text-xs">
                Enter your LeetCode and Codeforces usernames to see your contests, ratings, and problem-solving stats 
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <div className="relative">
                          <FormLabel className="absolute -top-2 left-3 bg-gray-900 px-1 text-xs font-medium text-gray-400">
                            Name
                          </FormLabel>
                          <FormControl>
                            <div className="flex items-center rounded-md border border-gray-700 bg-gray-800/50 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                              <User className="ml-3 h-4 w-4 text-gray-400" />
                              <Input
                                placeholder="Enter your Name"
                                {...field}
                                className="border-0 bg-transparent text-gray-100 placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="mt-1 text-xs text-red-400" />
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="leetcodeUsername"
                    render={({ field }) => (
                      <FormItem>
                        <div className="relative">
                          <FormLabel className="absolute -top-2 left-3 bg-gray-900 px-1 text-xs font-medium text-gray-400">
                            LeetCode
                          </FormLabel>
                          <FormControl>
                            <div className="flex items-center rounded-md border border-gray-700 bg-gray-800/50 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                              <Github className="ml-3 h-4 w-4 text-gray-400" />
                              <Input
                                placeholder="Enter your LeetCode username"
                                {...field}
                                className="border-0 bg-transparent text-gray-100 placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="mt-1 text-xs text-red-400" />
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="codeforcesUsername"
                    render={({ field }) => (
                      <FormItem>
                        <div className="relative">
                          <FormLabel className="absolute -top-2 left-3 bg-gray-900 px-1 text-xs font-medium text-gray-400">
                            Codeforces
                          </FormLabel>
                          <FormControl>
                            <div className="flex items-center rounded-md border border-gray-700 bg-gray-800/50 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                              <Github className="ml-3 h-4 w-4 text-gray-400" />
                              <Input
                                placeholder="Enter your Codeforces username"
                                {...field}
                                className="border-0 bg-transparent text-gray-100 placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="mt-1 text-xs text-red-400" />
                        </div>
                      </FormItem>
                    )}
                  />
                  {form.formState.errors.root && (
                    <div className="text-sm text-red-400 text-center">
                      {form.formState.errors.root.message}
                    </div>
                  )}
                  <Button
                    type="submit"
                    className="mt-4 w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700 transition-all duration-300"
                    disabled={isLoading || isVerifying}
                  >
                    {isLoading || isVerifying ? (
                      <div className="flex items-center justify-center">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        <span className="ml-2">{isVerifying ? "Verifying..." : "Proceeding..."}</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <span>Explore</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="text-center text-gray-400 text-sm">
              <p className='text-xs text-gray-500 '>We fetch only public data using your usernames. No passwords needed — your privacy is always respected.</p>
            </CardFooter>

          </Card>
        </div>
      </div>
    </div>
  )
}

export default SignUp