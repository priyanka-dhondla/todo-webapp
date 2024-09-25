import React, { useEffect, useState, useCallback } from "react";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaDollarSign,
  FaPhone,
  FaStar,
  FaRegStar,
} from "react-icons/fa";
import Swal from "sweetalert2";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [bookmarked, setBookmarked] = useState(new Set());
  const [pagesToShow, setPagesToShow] = useState([]);

  // Default total pages (you can adjust this based on your needs)
  const totalPages = 10; // For example, assume 10 pages total

  // Fetch jobs data for the current page
  const fetchJobs = useCallback(async (pageNumber) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://testapi.getlokalapp.com/common/jobs?page=${pageNumber}`
      );
      const data = await response.json();
      setJobs(data.results);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
      setLoading(false);
    }
  }, []);

  // Fetch jobs when the component mounts or page changes
  useEffect(() => {
    fetchJobs(page);
  }, [fetchJobs, page]);

  // Fetch bookmarks from localStorage
  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setBookmarked(new Set(storedBookmarks.map((job) => job.id)));
  }, []);

  // Calculate pages to show (5 pages at a time)
  useEffect(() => {
    const calculatePagesToShow = () => {
      const pages = [];
      const startPage = Math.max(1, page - 2);
      const endPage = Math.min(totalPages, startPage + 4); // Show up to 5 pages

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      setPagesToShow(pages);
    };

    calculatePagesToShow();
  }, [page, totalPages]);

  const toggleBookmark = (job) => {
    const storedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    const jobId = job.id;
    const jobTitle = job.title;

    if (bookmarked.has(jobId)) {
      const updatedBookmarks = storedBookmarks.filter(
        (bookmark) => bookmark.id !== jobId
      );
      localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
      setBookmarked((prev) => {
        const newSet = new Set(prev);
        newSet.delete(jobId);
        return newSet;
      });
      Swal.fire({
        icon: "info",
        title: "Removed from Bookmarks",
        text: `Job "${jobTitle}" has been removed from bookmarks.`,
        confirmButtonText: "OK",
      });
    } else {
      storedBookmarks.push(job);
      localStorage.setItem("bookmarks", JSON.stringify(storedBookmarks));
      setBookmarked((prev) => {
        const newSet = new Set(prev);
        newSet.add(jobId);
        return newSet;
      });
      Swal.fire({
        icon: "success",
        title: "Added to Bookmarks",
        text: `Job "${jobTitle}" has been added to bookmarks.`,
        confirmButtonText: "OK",
      });
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage !== page) {
      setPage(newPage);
    }
  };

  if (loading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  return (
    <>
      <div className="pb-20">
        <h1 className="text-2xl text-center font-bold text-green-500 mb-6">
          Jobs
        </h1>
        {jobs.length === 0 ? (
          <div className="text-center text-gray-500">No jobs found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 flex flex-col justify-between h-full relative"
              >
                <button
                  onClick={() => toggleBookmark(job)}
                  className="absolute top-2 right-2 text-yellow-400 hover:text-yellow-500 focus:outline-none"
                >
                  {bookmarked.has(job.id) ? (
                    <FaStar className="h-6 w-6" />
                  ) : (
                    <FaRegStar className="h-6 w-6" />
                  )}
                </button>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    Job Name: {job.title}
                  </h2>
                  <div className="flex items-center text-gray-600 mb-2">
                    <FaBriefcase className="h-5 w-5 mr-2 text-indigo-600" />
                    <span className="truncate">
                      Company Name: {job.company_name}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <FaMapMarkerAlt className="h-5 w-5 mr-2 text-green-500" />
                    <span className="truncate">
                      Location: {job.job_location_slug}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <FaDollarSign className="h-5 w-5 mr-2 text-yellow-500" />
                    <span className="truncate">
                      Salary: {job.salary_max || "Not Disclosed"}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <FaPhone className="h-5 w-5 mr-2 text-blue-500" />
                    <span className="truncate">
                      Phone Number: {job.whatsapp_no}
                    </span>
                  </div>
                </div>
                <a
                  href={job.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-indigo-600 text-white text-sm font-medium py-2 px-4 rounded hover:bg-indigo-500"
                >
                  View Details
                </a>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <nav
          aria-label="Page navigation example"
          className="mt-6 flex justify-center"
        >
          <ul className="flex items-center -space-x-px h-8 text-sm">
            <li>
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <svg
                  className="w-2.5 h-2.5 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 1 1 5l4 4"
                  />
                </svg>
                <span className="">Previous</span>
              </button>
            </li>

            {/* Page Numbers */}
            {pagesToShow.map((pageNumber) => (
              <li key={pageNumber}>
                <button
                  onClick={() => handlePageChange(pageNumber)}
                  className={`flex items-center justify-center px-3 h-8 leading-tight ${
                    page === pageNumber
                      ? "text-blue-600 border border-blue-300 bg-blue-50"
                      : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  } dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                >
                  {pageNumber}
                </button>
              </li>
            ))}

            <li>
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="">Next</span>
                <svg
                  className="w-2.5 h-2.5 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 9l4-4-4-4"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Jobs;
