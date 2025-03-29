import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import HomePage from "./pages/HomePage";
import ContestsPage from "./pages/ContestsPage";
import ProfilePage from "./pages/ProfilePage";
import SubmissionPage from "./pages/SubmissionPage";
import StatisticsPage from "./pages/StatisticsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contests" element={<ContestsPage/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path="/submissions" element={<SubmissionPage/>}/>
        <Route path="/statistics" element={<StatisticsPage/>}/>

        {/* <Route path="/" element={<SignUp />} /> */}
        {/* <Route path="/" element={<SignIn />} /> */}

      </Routes>
    </Router>
  );
}

export default App;
