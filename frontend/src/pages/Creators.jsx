import React from "react";

function Creators() {
  return (
    <div className="flex flex-col items-center justify-center my-20 bg-gray-100 min-h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Creators</h1>
        <p className="text-lg text-gray-600 mb-8">
          This page has been simplified. All users can now create and manage blogs.
        </p>
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Blog Creation
          </h2>
          <p className="text-gray-600">
            Any registered user can create, edit, and manage their own blogs through the dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Creators;
