
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";

function Hero() {
  const { blogs } = useAuth();
  console.log("All blogs:", blogs);
  const [loading, setLoading] = useState(true);

  const fallback = [
    { title: "Cricket World", img: "/cricket.jpg", content: "Cricket World explores the spirit of the game through the moments that stay with us long after the final ball is bowled. From iconic World Cup clashes to neighborhood tournaments, the sport blends strategy, skill, and emotion. Young talents rise alongside seasoned legends, creating stories of resilience and joy. Stadiums roar, living rooms erupt, and friendships form across continents. Whether you obsess over swing and spin, or simply cheer with family, cricket invites everyone in. The rhythm of overs, the pressure of chases, and the calm between deliveries make it uniquely compelling—uniting people with a language of fair play and heart." },
    { title: "Football Night", img: "/football.jpg", content: "Football Night celebrates the magic under the floodlights, where tactics meet pure adrenaline. From last‑minute winners to sweeping counterattacks, the game thrives on courage and communication. Street games ignite a lifelong passion; professional derbies turn cities electric. Players learn to trust their teammates, read the field, and respond within seconds. Fans sing, argue, and dream in the same breath, drawn by shared belonging. Whether you analyze formations or just love the drama, football rewards attention. Every touch can tilt momentum, every save can change a season, and every stadium carries stories of hope, heartbreak, and unforgettable joy." },
    { title: "Code Tips", img: "/code2.jpg", content: "Code Tips offers simple, practical guidance to help you write software that lasts. Start with readable names and focused functions. Add tests that capture intent, not just lines of code. Use version control to narrate your thinking, and keep pull requests small. Embrace refactoring as a routine, not a rescue. Measure performance with real data, and log thoughtfully. Automate repetitive steps so your energy goes to design. Most of all, communicate—good code mirrors clear ideas and empathetic teamwork. With steady habits, projects stay flexible, and you ship with confidence, sprint after sprint." },
    { title: "Music Vibes", img: "/music.jpg", content: "Music Vibes explores soundtracks for work, rest, and celebration. Lo‑fi beats calm the mind during deep focus; acoustic sets invite reflection; energetic pop sparks movement and laughter. Playlists can turn chores into rhythm and mornings into rituals. Great songs tell stories that feel personal, yet connect us to strangers. They remind us of places and people we miss, and nudge us toward the memories we want to build. Whether you collect vinyl or discover tracks on shuffle, let music frame your day with intention—soft when you need space, loud when you need courage." },
  ];
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  useEffect(() => {
    setLoading(false);
  }, [blogs]);

  return (
    <div className="container mx-auto my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
      {loading ? (
        <div className="flex h-screen items-center justify-center">Loading....</div>
      ) : blogs && blogs.length > 0 ? (
        blogs.slice(0, 4).map((element) => (
          <Link
            to={`/blog/${element._id}`}
            key={element._id}
            className="bg-white rounded-lg hover:shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
          >
            <div className="group relative">
              <img src={element.blogImage.url} alt="" className="w-full h-56 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75 group-hover:opacity-100 transition-transform duration-300"></div>
              <h1 className="absolute bottom-4 left-4 text-white text-xl font-bold group-hover:text-yellow-500 transition-colors duration-300">{element.title}</h1>
            </div>
            <div className="p-6">
              <p className="text-xs text-gray-500">
                By {element.author || element.createdBy?.name || "Author"} • {new Date(element.publishDate || element.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-700 mt-2">
                {(element.about || "").split(/\s+/).slice(0, 150).join(" ")}
              </p>
            </div>
          </Link>
        ))
      ) : (
        fallback.map((f, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg hover:shadow-lg overflow-hidden cursor-pointer"
            onClick={() => {
              setActive(f);
              setOpen(true);
            }}
          >
            <div className="relative">
              <img src={f.img} alt={f.title} className="w-full h-56 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
              <h1 className="absolute bottom-4 left-4 text-white text-xl font-bold">{f.title}</h1>
            </div>
            <div className="p-6">
              <p className="text-xs text-gray-400">Featured</p>
            </div>
          </div>
        ))
      )}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={active?.title}
        image={active?.img}
        content={active?.content}
        author={active?.author || "Aarav Mehta"}
        date={active?.date || "2024-06-15"}
      />
    </div>
  );
}

export default Hero;
// filepath: c:\Users\harsh\Downloads\Desktop\blog-app-main\frontend\src\Home\Hero.jsx