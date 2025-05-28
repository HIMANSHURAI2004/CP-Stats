import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Code,
  Menu,
  User,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import axios from "axios";

export default function Navbar() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();

  const getUserDetails = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/get-user`, { 
        withCredentials: true 
      });
      if (response.status === 200 && response.data.data && response.data.data.name) {
        setUserData(response.data.data);
      } else {
        setUserData(null);
      }
    } catch (error) {
      console.error("Error ", error);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/logout`, {
        withCredentials: true
      });
      setUserData(null);
      navigate("/signup");
    } catch (error) {
      console.error("Error", error);
    }
  };
  useEffect(() => {
    getUserDetails();
  }, [pathname]); // Refresh user data when pathname changes

  // Show loading state
  if (loading) {
    return (
      <div className="relative font-[poppins]">
        <nav className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-900/80 backdrop-blur-md md:px-5">
          <div className=" flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Link to="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-indigo-500/30">
                  <Code className="h-4 w-4 text-white" />
                </div>
                <span className="font-bold text-xl text-white hidden sm:inline-block">
                  CP-stats
                </span>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    );
  }

  return (
    <div className="relative font-[poppins] bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800">
      {/* Glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl"></div>
      </div>

      <nav className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-900/80 backdrop-blur-md md:px-5">
        <div className=" flex h-16 items-center justify-between mx-0">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-indigo-500/30">
                <Code className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-xl text-white hidden sm:inline-block">
                CP-stats
              </span>
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
              <SheetContent
                side="right"
                className="border-gray-800 bg-gray-900/95 backdrop-blur-md"
              >
                <div className="grid gap-6 py-6">
                  <div className="flex flex-col space-y-3 pl-2">
                    <NavLink to="/contests" currentPath={pathname} mobile>
                      Contests
                    </NavLink>
                    <NavLink to="/submissions" currentPath={pathname} mobile>
                      Submissions
                    </NavLink>
                    <NavLink to="/statistics" currentPath={pathname} mobile>
                      Statistics
                    </NavLink>
                    <NavLink to="/profile" currentPath={pathname} mobile>
                      Profile
                    </NavLink>
                    <NavLink to="/about" currentPath={pathname} mobile>
                      About us
                    </NavLink>
                  </div>
                  {!userData && (
                    <div className="flex flex-col space-y-2 px-2">
                      <Link to="/signup">
                        <Button className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700 transition-all duration-300">
                          Get Started
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-14">
            <NavLink to="/contests" currentPath={pathname}>
              Contests
            </NavLink>
            <NavLink to="/submissions" currentPath={pathname}>
              Submissions
            </NavLink>
            <NavLink to="/statistics" currentPath={pathname}>
              Statistics
            </NavLink>
            <NavLink to="/profile" currentPath={pathname}>
              Profile
            </NavLink>
            <NavLink to="/about" currentPath={pathname} mobile>
              About us
            </NavLink>
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {userData ? (
              <DropdownMenu>
                <DropdownMenuTrigger >
                  <Button
                    variant="ghost"
                    className="relative flex items-center gap-2 text-gray-300 hover:text-white hover:bg-gray-800"
                  >
                    <Avatar className="h-8 w-8 border border-gray-700">
                      <AvatarFallback className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white">
                        {userData?.name
                          ? userData.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                          : "U"}
                      </AvatarFallback>
                    </Avatar>
                    <ChevronDown className="h-4 w-4 opacity-60" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-52 mr-4 border-gray-800 bg-gray-900/95 backdrop-blur-md">
                  <DropdownMenuItem
                    className="text-gray-300 focus:bg-gray-800 focus:text-white cursor-pointer"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Reset
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700 transition-all duration-300">
                  Get Started
                </Button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

function NavLink({ to, children, currentPath, mobile }) {
  const isActive = currentPath === to;
  const baseClasses = "text-sm font-medium transition-colors";
  const activeClasses = "text-white";
  const inactiveClasses = "text-gray-400 hover:text-white";
  const mobileClasses = mobile ? "px-4 py-2" : "";

  return (
    <Link
      to={to}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses} ${mobileClasses}`}
    >
      {children}
    </Link>
  );
}
