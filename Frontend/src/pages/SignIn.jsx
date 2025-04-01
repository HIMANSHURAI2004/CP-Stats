import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { ArrowRight, Mail, Lock, CodeIcon } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form"
import { Input } from "../components/ui/input"
import { Link } from "react-router-dom";
import axios from 'axios'

function SignIn() {
    const [isLoading, setIsLoading] = useState(false)
    
    const form = useForm({
        defaultValues: {
          email: "",
          password: "",
        },
      })

    const onSubmit = async () => {
      try {
        setIsLoading(true);
        const formData = form.getValues();
        const { email, password } = formData;
        const data = { email, password };
        const response = await axios.post("http://localhost:3000/api/v1/user/login", data, {}, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("Response:", response);
        if(response.status === 200) {
          console.log("Login successful:", response.data);
          setIsLoading(false);
          window.location.href = "/";
        }
        else {
          console.error("Login failed:", response.data);
          setIsLoading(false);
        }

      } catch (error) {
        console.error("Error during login:", error);
        setIsLoading(false);
      }
    }  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 p-4 font-[poppins]">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl"></div>
          </div>
    
          <div className="relative w-full max-w-md">
            <div className="absolute z-40 -top-10 left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-indigo-500/30">
                <CodeIcon className="h-8 w-8 text-white" />
            </div>
            <Card className="border-0 bg-gray-900/80 backdrop-blur-sm shadow-2xl shadow-black/10">
              <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-2xl pt-4 font-bold text-white">Sign in to your account</CardTitle>
                <CardDescription className="text-gray-400">
                  Enter your credentials to access CP-stats
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <div className="relative">
                            <FormLabel className="absolute -top-2 left-3 bg-gray-900 px-1 text-xs font-medium text-gray-400">
                              Email
                            </FormLabel>
                            <FormControl>
                              <div className="flex items-center rounded-md border border-gray-700 bg-gray-800/50 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                                <Mail className="ml-3 h-4 w-4 text-gray-400" />
                                <Input
                                  type="email"
                                  placeholder="Enter your email"
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
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <div className="relative">
                            <FormLabel className="absolute -top-2 left-3 bg-gray-900 px-1 text-xs font-medium text-gray-400">
                              Password
                            </FormLabel>
                            <FormControl>
                              <div className="flex items-center rounded-md border border-gray-700 bg-gray-800/50 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                                <Lock className="ml-3 h-4 w-4 text-gray-400" />
                                <Input
                                  type="password"
                                  placeholder="Enter your password"
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
                    <Button
                      type="submit"
                      className="mt-6 w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700 transition-all duration-300"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                          <span className="ml-2">Signing in...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <span>Sign in</span>
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </div>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4 border-t border-gray-800 pt-4">
                <div className="text-center text-sm text-gray-400">
                  Don't have an account? {" "}
                  <Link to="/signup" className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
                    Sign up
                  </Link>
                </div>
                <div className="text-center text-xs text-gray-500">
                  By signing in, you agree to our {" "}
                  <Link to="/terms" className="text-gray-400 hover:text-gray-300 transition-colors">
                    Terms of Service
                  </Link>{" "}
                  and {" "}
                  <Link to="/privacy" className="text-gray-400 hover:text-gray-300 transition-colors">
                    Privacy Policy
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
  )
}

export default SignIn