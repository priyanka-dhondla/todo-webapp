import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const UserManage = () => {
  const { userId } = useParams(); // Get userId from params
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  // Fetch user details for editing
  useEffect(() => {
    const fetchUserDetails = async () => {
      console.log({ userId });
      if (userId) {
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

          setFirstName(userData.firstName);
          setLastName(userData.lastName);
          setEmail(userData.email);
          setPhoneNumber(userData.phoneNumber);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleSaveUser = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const endpoint = `http://localhost:3000/update-user/${userId}`;

      const response = await axios.post(
        endpoint,
        {
          firstName,
          lastName,
          email,
          password,
          phoneNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data.message) {
        Swal.fire({
          icon: "success",
          title: "User Updated Successfully",
          text: response.data.message,
        });
        navigate("/users");
      }
    } catch (error) {
      console.error("Error saving user:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while saving the user!",
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
          <h1 className="text-2xl font-bold">Edit User</h1>
        </div>
        <div className="border-t border-gray-200">
          <div className="grid grid-cols-6 gap-6 p-5">
            <div className="col-span-6 sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
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
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div className="col-span-6 sm:col-span-3 relative">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type={passwordVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 0 4.474-4.474l-.822-.822a2.5 2.5 0 0 1-2.828 2.828z" />
                    <path d="M1.5 8s.938 1.5 2.5 3.5a11.54 11.54 0 0 0 3.905 2.705l-.77-.77A9.513 9.513 0 0 1 3.5 8.002c-.67-1.5-.75-3.56-.5-4.5-.333-.125-.998-.167-1.857.167a1.5 1.5 0 0 0-1.043 1.75A15.65 15.65 0 0 0 1.5 8z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className="px-4 py-3 text-right">
            <button
              type="button"
              onClick={handleSaveUser}
              className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="ml-2 inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManage;
