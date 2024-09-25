import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import BottomNavBar from "./components/BottomNavBar";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";
import Users from "./pages/Users";
import UserManage from "./pages/UserManage";
import TaskManage from "./pages/TaskManage";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/users" element={<Users />} />
          <Route path="/userManage/:userId" element={<UserManage />} />{" "}
          <Route path="/tasks-manage/:id" element={<TaskManage />} />
          {/* Capture userId */}
        </Routes>
        <BottomNavBar />
      </div>
    </Router>
  );
};

export default App;
