import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const TaskManage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [taskName, setTaskName] = useState("");
  const [status, setStatus] = useState("active");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id !== "NEW") {
      // Fetch the task details if editing an existing task
      const fetchTaskDetails = async () => {
        setLoading(true);
        try {
          const accessToken = localStorage.getItem("accessToken");
          const response = await fetch(
            `https://todo-backend-q5q9.onrender.com/tasks/${id}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          const data = await response.json();
          setTaskName(data.data.taskName);
          setStatus(data.data.status);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

      fetchTaskDetails();
    }
  }, [id]);

  const handleSaveTask = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const method = id === "NEW" ? "POST" : "PUT"; // POST for new task, PUT for editing
      const endpoint = id === "NEW" ? "create-task" : `tasks/${id}`;

      const response = await fetch(
        `https://todo-backend-q5q9.onrender.com/${endpoint}`,
        {
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            taskName,
            status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save task");
      }

      Swal.fire({
        title: "Success!",
        text:
          id === "NEW"
            ? "Task created successfully."
            : "Task updated successfully.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/tasks");
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
      console.log({ error });
    }
  };

  const handleCancel = () => {
    navigate("/tasks"); // Navigate back to the tasks list
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-lg mx-auto mt-20">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-6">
          {id === "NEW" ? "Create New Task" : "Edit Task"}
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Task Name
          </label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="active">Active</option>
            <option value="done">Done</option>
            <option value="pending">Pending</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={handleSaveTask}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save Task
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskManage;
