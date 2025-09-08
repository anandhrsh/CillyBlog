import React from "react";
import { useAuth } from "../context/AuthProvider.jsx";
import { Link } from "react-router-dom";

export default function UserSection() {
  const { isAuthenticated, profile } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  const user = profile?.user || profile; // accommodate both shapes

  return (
    <div className="container mx-auto px-6 py-6">
      <div className="flex items-center justify-between bg-white rounded-lg shadow p-4">
        <div className="flex items-center gap-4">
          <img
            src={user?.photo?.url || "/user.jpg"}
            alt={user?.name || "User"}
            className="w-14 h-14 rounded-full object-cover"
          />
          <div>
            <p className="text-sm text-gray-500">Welcome back</p>
            <h2 className="text-lg font-semibold">{user?.name || "User"}</h2>
            <p className="text-sm text-gray-600">{user?.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/create"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Write a Post
          </Link>
          <Link
            to="/myposts"
            className="px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
          >
            My Posts
          </Link>
        </div>
      </div>
    </div>
  );
}


