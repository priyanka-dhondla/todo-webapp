
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const BottomNavBar = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/"); 
  };

  
  if (!accessToken) {
    return null;
  }

  return (
    <div className="fixed bottom-0 w-full bg-white">
      <div className="sm:block">
        <div className="border-t border-gray-200">
          <nav className="-mb-px flex justify-around" aria-label="Tabs">
            <Link
              to="/tasks"
              className="group inline-flex items-center border-b-2 border-transparent px-1 py-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
              <svg
                className="-ml-0.5 mr-2 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M4 16.5v-13h-.25a.75.75 0 010-1.5h12.5a.75.75 0 010 1.5H16v13h.25a.75.75 0 010 1.5h-3.5a.75.75 0 01-.75-.75v-2.5a.75.75 0 00-.75-.75h-2.5a.75.75 0 00-.75.75v2.5a.75.75 0 01-.75.75h-3.5a.75.75 0 010-1.5H4zm3-11a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5h-1a.5.5v-1zM7.5 9a.5.5 0 00-.5.5v1a.5.5h1a.5.5v-1zM11 5.5a.5.5 0 01.5-.5h1a.5.5v1h-1a.5.5v-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Todo List</span>
            </Link>
            <Link
              to="/users"
              className="group inline-flex items-center border-b-2 border-indigo-500 px-1 py-4 text-sm font-medium text-indigo-600"
              aria-current="page"
            >
              <svg
                className="-ml-0.5 mr-2 h-5 w-5 text-indigo-500"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M7 8a3 3 0 100-6 3 3 0 000 6zM14.5 9a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM1.615 16.428a1.224 1.224 0 01-.569-1.175 6.002 6.002 0 0111.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 017 18a9.953 9.953 0 01-5.385-1.572zM14.5 16h-.106c.07-.297.088-.611.048-.933a7.47 7.47 0 00-1.588-3.755 4.502 4.502 0 015.874 2.636.818.818 0 01-.36.98A7.465 7.465 0 0114.5 16z" />
              </svg>
              <span>Users</span>
            </Link>
            <button
              onClick={handleLogout}
              className="group inline-flex items-center border-b-2 border-transparent px-1 py-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
              <svg
                className="-ml-0.5 mr-2 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v5a1 1 0 11-2 0V4a1 1 0 011-1zM15 5h-1V3a1 1 0 00-1-1H7a1 1 0 00-1 1v2H5a1 1 0 100 2h10a1 1 0 100-2z"
                  clipRule="evenodd"
                />
                <path d="M10 8a1 1 0 100 2h2.5a5.502 5.502 0 01-1.715 3.5A1 1 0 0011 14h-.002a1 1 0 00-.998 1.183A7.502 7.502 0 0010 8z" />
              </svg>
              <span>Logout</span>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default BottomNavBar;
