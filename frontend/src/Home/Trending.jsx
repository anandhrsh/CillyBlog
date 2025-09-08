
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Modal from "../components/Modal";

function Trending() {
  const { blogs } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [blogs]);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },

    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const fallbacks = [
    { title: "Action", img: "/action.jpg", category: "Sports", content: "Action highlights the pulse of competition—the rush of sprints, the grit of defense, and the split‑second choices that decide glory. Training shapes instinct, and instinct shapes moments fans never forget. Whether it’s a buzzer‑beater or a comeback, action reminds us why we prepare: to be ready when the chance arrives. Athletes teach us resilience and focus, proving that small efforts, repeated daily, make the spectacular possible." },
    { title: "Business", img: "/bussiness.jpg", category: "Business", content: "Business thrives where curiosity meets discipline. Great teams test assumptions, listen to customers, and iterate boldly. Cash flow and culture are equally strategic: one keeps the lights on; the other keeps people growing. In a world of shifting markets and fast technology, clarity is a competitive edge. Build products that solve real problems, and tell stories that earn trust. Measure what matters, and keep learning." },
    { title: "Cricket", img: "/cricket.jpg", category: "Sports", content: "Cricket blends patience with drama—from tight Test sessions to explosive T20 finishes. Captains gamble with fields; bowlers craft angles and deception; batters balance risk and timing. Fans study form, celebrate spirit, and cherish rivalries that span generations. It’s a game of memory and imagination, where every delivery is a conversation and every partnership a new chapter in a shared story." },
    { title: "Music", img: "/music.jpg", category: "Entertainment", content: "Music is a companion to every mood: the quiet mornings, the long drives, the nights that feel endless. Melodies spark memories; rhythms reset our focus. Sharing tracks becomes a way of saying, ‘this is me—right now.’ Collecting sounds is collecting feelings. Curate your day with intention, and let songs carry you when words won’t." },
    { title: "Code", img: "/code4.jpg", category: "Tech", content: "Good code reads like thoughtful prose: clear structure, meaningful names, and purpose in every line. Review with empathy, test to learn, and refactor often. Complexity grows quietly—fight it with small modules and strong boundaries. Tools evolve, fundamentals endure. Keep improving a little each day, and the codebase becomes a place people enjoy working in." },
    { title: "Devotional", img: "/mahadev.jpg", category: "Devotion", content: "Devotional practice invites stillness in a noisy world. Rituals and stories connect us to values that outlast trends—compassion, courage, gratitude. Whether you light a lamp or pause for breath, the intention matters. In remembering what’s sacred, we find space to be gentle with ourselves and generous with others." },
  ];
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Trending</h1>
      <Carousel responsive={responsive}>
        {loading ? (
          <div className="flex h-40 items-center justify-center">Loading....</div>
        ) : blogs && blogs.length > 0 ? (
          blogs.slice(0, 6).map((element) => (
            <div
              key={element._id}
              className="p-4 bg-white border border-gray-400 rounded-lg shadow-md mx-2"
            >
              <Link to={`/blog/${element._id}`}>
                <div className="relative">
                  <img
                    src={element.blogImage.url}
                    alt="blog"
                    className="w-full h-56 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                    {element.category}
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-b-lg h-40 flex flex-col justify-between">
                  <h1
                    className="text-lg font-bold mb-2 overflow-hidden text-ellipsis"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    {element.title}
                  </h1>
                  <p className="text-xs text-gray-500 mb-2">
                    By {element.author || element.createdBy?.name || "Author"} • {new Date(element.publishDate || element.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-700 line-clamp-2">
                    {(element.about || "").split(/\s+/).slice(0, 150).join(" ")}
                  </p>
                </div>
              </Link>
            </div>
          ))
        ) : (
          fallbacks.map((f, i) => (
            <div
              key={i}
              className="p-4 bg-white border border-gray-400 rounded-lg shadow-md mx-2 cursor-pointer"
              onClick={() => {
                setActive(f);
                setOpen(true);
              }}
            >
              <div className="relative">
                <img src={f.img} alt={f.title} className="w-full h-56 object-cover rounded-t-lg" />
                <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                  {f.category}
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-b-lg h-36 flex flex-col justify-between">
                <h1 className="text-lg font-bold mb-2 overflow-hidden text-ellipsis" style={{ whiteSpace: "nowrap" }}>
                  {f.title}
                </h1>
              </div>
            </div>
          ))
        )}
      </Carousel>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={active?.title}
        image={active?.img}
        content={active?.content}
        author={active?.author || "Aarav Mehta"}
        date={active?.date || "2024-08-10"}
      />
    </div>
  );
}

export default Trending;
// filepath: c:\Users\harsh\Downloads\Desktop\blog-app-main\frontend\src\Home\Trending.jsx