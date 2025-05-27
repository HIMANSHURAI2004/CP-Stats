import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
  } from "../components/ui/card";
  import { Link } from "react-router-dom";
  import { Github, Linkedin } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
  const contributors = [
    {
      name: 'Himanshu Rai',
      college: 'NITD\'26',
      description: 'Full Stack Developer',
      github: 'https://github.com/HIMANSHURAI2004',
      linkedin : "https://www.linkedin.com/in/himanshu-rai-25193a2a9"
    },
    {
      name: 'Kshitij Singh',
      college: 'NITD\'26',
      description: 'Full Stack Developer',
      github: 'https://github.com/Kshitij269',
      linkedin : "https://www.linkedin.com/in/kshitij-singh-720177244/"
    }
  ];
  const AboutUs = () => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 font-[poppins]">
        <Navbar />
      <div className="lg:mb-20">

        {/* Hero Section */}
        <div
        className="bg-gradient-to-br from-violet-700 via-indigo-700 to-indigo-800 w-full pb-10 text-white py-10 text-center"
        >
          <h1 className="text-3xl font-bold mb-4 ">Meet Our Awesome Team</h1>
          <p className="text-lg">
            We are a passionate group of developers who strive to create amazing user experiences and powerful functionalities.
          </p>
        </div>
  
        {/* About Us Section */}
        <div className="container mx-auto py-12 px-4 text-white">
          <h2 className="text-2xl text-center font-bold mb-6">About Us</h2>
          <p className="text-center max-w-2xl mx-auto mb-8 ">
            Our team combines expertise from different areas, including front-end development, back-end development, and user interface design.
          </p>
  
          <div className="flex flex-wrap justify-center gap-10">
            {contributors.map((contributor, index) => (
              <Card key={index} className="w-[220px] text-center shadow-md transform hover:-translate-y-2 bg-indigo-800 transition-all duration-300 border-2 border-blue-200">
                <CardHeader className="flex flex-col items-center">
                  <CardTitle className="text-lg font-semibold text-white">{contributor.name}</CardTitle>
                  <CardDescription className="text-sm text-gray-300">{contributor.description}</CardDescription>
                  <CardDescription className="text-sm text-gray-300">{contributor.college}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center gap-x-3">
                    <Link to={contributor.github} className="p-2 border-white border-2 rounded-full">
                      <Github className="w-5 h-5 text-white  hover:text-gray-400 cursor-pointer" />
                    </Link>
                    <Link to={contributor.linkedin} className="p-2 border-white border-2 rounded-full">
                      <Linkedin className="w-5 h-5 text-white  hover:text-gray-400 cursor-pointer" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      </div>
    );
  };
  
  export default AboutUs;
  
