import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const UserManage = () => {
  const { userId } = useParams(); 
  const navigate = useNavigate();

  
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (userId && userId !== "NEW") {
        try {
          const accessToken = localStorage.getItem("accessToken");
          const response = await axios.get(
            `https://todo-backend-q5q9.onrender.com/get-user-by-id/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          const userData = response.data.data;
          setUserData({
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            password: "", 
            phoneNumber: userData.phoneNumber,
          });
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };

    fetchUserDetails();
  }, [userId]);

 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  
  const handleSaveUser = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const isNewUser = userId === "NEW";
      const endpoint = isNewUser
        ? `https://todo-backend-q5q9.onrender.com/create-user`
        : `https://todo-backend-q5q9.onrender.com/update-user/${userId}`;

      const method = isNewUser ? "post" : "put";

      
      const response = await axios({
        method,
        url: endpoint,
        data: {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          password: userData.password || undefined, 
          phoneNumber: userData.phoneNumber,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      Swal.fire({
        icon: "success",
        title: isNewUser
          ? "User Created Successfully"
          : "User Updated Successfully",
        text: response.data.message,
      });
      navigate("/users");
    } catch (error) {
      console.error("Error saving user:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an issue saving the user. Please try again.",
      });
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <div className="max-w-2xl mx-auto mt-20 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h1 className="text-2xl font-bold">
            {userId === "NEW" ? "Create User" : "Edit User"}
          </h1>
        </div>
        <div className="border-t border-gray-200">
          <div className="grid grid-cols-6 gap-6 p-5">
            <div className="col-span-6 sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={userData.firstName}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={userData.lastName}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={userData.phoneNumber}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div className="col-span-6 sm:col-span-3 relative">
              <label className="block text-sm font-medium text-gray-700">
                Password {userId !== "NEW" && "(Leave blank to keep current)"}
              </label>
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                value={userData.password}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 pr-10"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {passwordVisible ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-eye mt-5"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 3.5C4.692 3.5 1.5 8 1.5 8S4.692 12.5 8 12.5 14.5 8 14.5 8s-3.192-5.5-6.5-5.5zm0 9.5c-2.215 0-4-2.41-4-4s1.785-4 4-4 4 2.41 4 4-1.785 4-4 4z" />
                    <path d="M10.5 8a2.5 2.5 0 0 1-5 0 2.5 2.5 0 0 1 5 0z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-eye-slash mt-5"
                    viewBox="0 0 16 16"
                  >
                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 4.014 1.91 5.299 3.44a12.996 12.996 0 0 1-2.357 2.358l.417.417z" />
                    <path d="M11.242 9.238l1.178 1.179a4.5 4.5 0 0 0-5.656-5.656l.917.917a3.5 3.5 0 0 1 4.561 4.561z" />
                    <path d="M1.643 4.3a.5.5 0 0 1 .707 0L14.7 17.348a.5.5 0 1 1-.707.707L9.1 9.9a12.935 12.935 0 0 1-3.375-1.034A13.008 13.008 0 0 1 .5 8c0-.75 2.693-4.5 7.5-4.5.418 0 .84.032 1.256.094L1.64 4.293a.5.5 0 0 1 0-.707z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="px-4 py-4 sm:px-6 flex justify-end gap-3">
          <button
            onClick={handleSaveUser}
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
          >
            {userId === "NEW" ? "Create" : "Update"}
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserManage;
