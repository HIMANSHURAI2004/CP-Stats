import { useState } from "react"
import {Link} from "react-router-dom"
import { Code, ArrowRight, Menu, User, LogOut, Settings, ChevronDown } from "lucide-react"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Toggle login state (for demo purposes)
  const toggleLogin = () => setIsLoggedIn(!isLoggedIn)

  return (
    <div className="relative font-[poppins]">
      {/* Glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl"></div>
      </div>

      <nav className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-900/80 backdrop-blur-md lg:px-5">
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-indigo-500/30">
                <Code className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-xl text-white hidden sm:inline-block">CP-stats</span>
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="flex md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="border-gray-800 bg-gray-900/95 backdrop-blur-md">
                <div className="grid gap-6 py-6">
                  <div className="flex flex-col space-y-3">
                    <Link
                      href="/contests"
                      className="text-lg font-medium text-gray-300 transition-colors hover:text-indigo-400"
                    >
                      Contests
                    </Link>
                    
                    <Link
                      href="/submissions"
                      className="text-lg font-medium text-gray-300 transition-colors hover:text-indigo-400"
                    >
                      Submissions
                    </Link>
                    <Link
                      href="/statistics"
                      className="text-lg font-medium text-gray-300 transition-colors hover:text-indigo-400"
                    >
                      Statistics
                    </Link>
                    <Link
                      href="/profile"
                      className="text-lg font-medium text-gray-300 transition-colors hover:text-indigo-400"
                    >
                      Profile
                    </Link>
                  </div>
                  <div className="flex flex-col space-y-2">
                    {isLoggedIn ? (
                      <Button
                        onClick={toggleLogin}
                        variant="outline"
                        className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Log Out
                      </Button>
                    ) : (
                      <Button
                        onClick={toggleLogin}
                        className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700 transition-all duration-300"
                      >
                        <span>Sign in</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-14">
            <Link
              href="/contests"
              className="text-sm font-medium text-gray-300 transition-colors px-2 border-b py-1 border-gray-300 hover:bg-indigo-600 hover:border-none hover: hover:text-white hover:py-2 hover:rounded-md"
            >
              Contests
            </Link>
            
            <Link
              href="/submissions"
              className="text-sm font-medium text-gray-300 transition-colors px-2 border-b py-1 border-gray-300 hover:bg-indigo-600 hover:border-none hover: hover:text-white hover:py-2 hover:rounded-md"
            >
              Submissions
            </Link>
            <Link
              href="/statistics"
              className="text-sm font-medium text-gray-300 transition-colors px-2 border-b py-1 border-gray-300 hover:bg-indigo-600 hover:border-none hover: hover:text-white hover:py-2 hover:rounded-md"
            >
              Statistics
            </Link>
            <Link href="/profile" 
              className="text-sm font-medium text-gray-300 transition-colors px-2 border-b py-1 border-gray-300 hover:bg-indigo-600 hover:border-none hover: hover:text-white hover:py-2 hover:rounded-md"
            >
              Profile
            </Link>
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative flex items-center gap-2 text-gray-300 hover:text-white hover:bg-gray-800"
                  >
                    <Avatar className="h-8 w-8 border border-gray-700">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@user" />
                      <AvatarFallback className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white">
                        HR
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline-block">Himanshu</span>
                    <ChevronDown className="h-4 w-4 opacity-60" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 border-gray-800 bg-gray-900/95 backdrop-blur-md text-gray-300"
                  align="end"
                >
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none text-white">Himanshu</p>
                      <p className="text-xs leading-none text-gray-400">himanshu@gmail.com</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-800" />
                  <DropdownMenuItem className="hover:bg-gray-800 hover:text-white focus:bg-gray-800 cursor-pointer">
                    <User className="mr-2 h-4 w-4 text-gray-400" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-800 hover:text-white focus:bg-gray-800 cursor-pointer">
                    <Settings className="mr-2 h-4 w-4 text-gray-400" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-800" />
                  <DropdownMenuItem
                    onClick={toggleLogin}
                    className="hover:bg-gray-800 hover:text-white focus:bg-gray-800 cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4 text-gray-400" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                // onClick={toggleLogin}
                className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700 transition-all duration-300">
                  <Link
                    to='/signin'
                    className="flex items-center justify-between"
                  >
                    <span>Sign in</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>

                </Button>
            )}
          </div>
        </div>
      </nav>
    </div>
  )
}

