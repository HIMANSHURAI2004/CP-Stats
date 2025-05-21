import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import HomePage from "./pages/HomePage";
import ContestsPage from "./pages/ContestsPage";
import ProfilePage from "./pages/ProfilePage";
import SubmissionPage from "./pages/SubmissionPage";
import StatisticsPage from "./pages/StatisticsPage";
import BlogsPage from "./pages/BlogsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contests" element={<ContestsPage/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path="/submissions" element={<SubmissionPage/>}/>
        <Route path="/statistics" element={<StatisticsPage/>}/>
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
