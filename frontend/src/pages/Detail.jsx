import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [blogs, setblogs] = useState({});
  console.log(blogs);
  useEffect(() => {
    const fetchblogs = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4001/api/blogs/single-blog/${id}`,

          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(data);
        setblogs(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchblogs();
  }, [id]);
  return (
    <div>
      <div>
        {blogs && (
          <section className="container mx-auto p-4">
            <div className="text-blue-500 uppercase text-xs font-bold mb-2">
              {blogs?.category}
            </div>
            <h1 className="text-4xl font-bold mb-2">{blogs?.title}</h1>
            <p className="text-sm text-gray-500 mb-6">
              By {blogs?.author || blogs?.createdBy?.name || "Author"} • {new Date(blogs?.publishDate || blogs?.createdAt).toLocaleDateString()}
            </p>


            <div className="flex flex-col md:flex-row">
              {blogs?.blogImage && (
                <img
                  src={blogs?.blogImage?.url}
                  alt="mainblogsImg"
                  className="md:w-1/2 w-full h-[500px] mb-6 rounded-lg shadow-lg cursor-pointer border"
                />
              )}
              <div className="md:w-1/2 w-full md:pl-6">
                <p className="text-lg mb-6 whitespace-pre-line">{blogs?.about}</p>
                {/* Add more content here if needed */}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default Detail;
