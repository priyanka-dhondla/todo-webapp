import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BottomNavBar from "./components/BottomNavBar";
import Jobs from "./pages/Jobs";
import BookMarks from "./pages/BookMarks";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/bookmarks" element={<BookMarks />} />
        </Routes>
        <BottomNavBar />
      </div>
    </Router>
  );
};

export default App;
