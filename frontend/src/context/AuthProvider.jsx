import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

// ✅ Create Auth Context
export const AuthContext = createContext();

// ✅ AuthProvider wraps the app and provides blogs, profile & authentication state
export const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [profile, setProfile] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ✅ Fetch blogs and user profile on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch blogs and profile in parallel
        const [blogsRes, profileRes] = await Promise.all([
          axios.get("http://localhost:4001/api/blogs/all-blogs", {
            withCredentials: true,
          }),
          axios.get("http://localhost:4001/api/users/my-profile", {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }),
        ]);

        setBlogs(blogsRes.data); // Set blogs
        setProfile(profileRes.data.user); // Set user profile
        setIsAuthenticated(true); // Mark as logged in
      } catch (err) {
        console.error("Error fetching data:", err);
        setBlogs([]);
        setProfile(null);
        setIsAuthenticated(false);
      }
    };

    fetchData();
  }, []); // Run only once on mount

  return (
    <AuthContext.Provider
      value={{
        blogs,
        profile,
        setProfile,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook to use Auth Context
export const useAuth = () => useContext(AuthContext);
