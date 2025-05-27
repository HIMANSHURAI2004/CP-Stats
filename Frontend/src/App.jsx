import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp.jsx";
import HomePage from "./pages/HomePage.jsx";
import ContestsPage from "./pages/ContestsPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import SubmissionPage from "./pages/SubmissionPage.jsx";
import StatisticsPage from "./pages/StatisticsPage.jsx";
import AboutUs from "./pages/AboutUs.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contests" element={<ContestsPage/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path="/submissions" element={<SubmissionPage/>}/>
        <Route path="/statistics" element={<StatisticsPage/>}/>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}

export default App;
