import { Link } from "react-router-dom";

function Creator() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6">Blog Community</h1>
      <div className="text-center">
        <p className="text-gray-600 mb-4">
          Join our community of bloggers and share your stories with the world.
        </p>
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md mx-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Start Blogging Today
          </h2>
          <p className="text-gray-600 mb-6">
            Create an account and start writing your own blogs. Share your knowledge, experiences, and stories with our community.
          </p>

          {/* Go to Create Blog page; unauthenticated users will be redirected to login by backend when submitting */}
          <Link
            to="/create"
            className="inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
          >
            Write a Post
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Creator;
