import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/" element={<SignUp />} /> */}
        {/* <Route path="/" element={<SignIn />} /> */}

      </Routes>
    </Router>
  );
}

export default App;
