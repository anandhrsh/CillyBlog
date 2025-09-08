import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider.jsx"; // correct path
import toast, { Toaster } from "react-hot-toast"; // ✅ imported toast

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // ✅ added role field to match backend
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setIsAuthenticated, setProfile } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:4001/api/users/login",
        { email, password, role }, // ✅ sending role as backend requires it
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      // ✅ Both login & register now send { message, user, token }
      setProfile(data.user);
      setIsAuthenticated(true);

      // Optionally store token if you want to use it for API calls
      localStorage.setItem("token", data.token);

      // ✅ Show success notification
      toast.success("Login successful!");

      navigate("/");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed";
      setError(errorMessage);

      // ✅ Show error notification
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* ✅ Toaster component to show toast notifications */}
      <Toaster position="top-right" reverseOrder={false} />

      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <div className="font-semibold text-2xl text-center mb-6">
          Cilli<span className="text-blue-500">Blog</span>
        </div>
        <h2 className="text-xl font-semibold mb-6">Login</h2>
        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* ✅ Added dropdown for role selection */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="w-full p-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
