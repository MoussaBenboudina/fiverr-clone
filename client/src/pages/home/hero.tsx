import React, { FormEvent, useRef, useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FiGift } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const images = [
  "https://images.unsplash.com/photo-1551434678-e076c223a692",
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
  "https://images.unsplash.com/photo-1545235617-9465d2a55698",
  "https://images.unsplash.com/photo-1518779578993-ec3579fee39f",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
];

const Hero = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [index, setIndex] = useState(0);

  const customFont =
    '"IBM Plex Sans", sans-serif, system-ui, -apple-system, "Segoe UI"';

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = inputRef.current!.value; // ✅ علامة ! تخبر TypeScript "أنا متأكد أنها ليست null"
if (text.trim()) {
  navigate(`/search?query=${encodeURIComponent(text)}`);
  inputRef.current!.value = "";
}
  };

  return (
    <div
      className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[#020617] overflow-hidden"
      style={{ fontFamily: customFont }}
    >
      {/* 🔥 Background */}
      <div className="absolute inset-0 z-0">
        {images.map((img, i) => (
          <img
            key={i}
            src={`${img}?q=80&w=1920&auto=format&fit=crop`}
            className={`absolute w-full h-full object-cover transition-all duration-[2500ms] ${
              i === index
                ? "opacity-70 scale-105 animate-zoom"
                : "opacity-0 scale-100"
            }`}
          />
        ))}

        {/* overlay */}
        <div className="absolute inset-0 bg-[#020617]/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/70 via-transparent to-[#020617]" />
      </div>

    

      {/* Main Content */}
      <section className="relative z-10 w-full max-w-5xl px-6 pt-32 pb-20 flex flex-col items-center text-center">
        {/* Badge */}
        <div className="mb-20 flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
          <FiGift className="text-emerald-600 animate-bounce" />
          <span className="text-gray-100 text-[11px] font-bold uppercase tracking-widest">
            Free Registration
          </span>
        </div>

        {/* Title */}
        <h1 className="mb-6 text-3xl md:text-6xl font-black text-white leading-tight">
          The best platform <br />
          <span className="text-emerald-400">
            for freelancers in Algeria
          </span>
        </h1>

        <p className="mb-12 text-gray-200 text-lg md:text-xl max-w-2xl">
          Connect with local experts to get your projects done quickly and efficiently.
        </p>

     {/* Search Bar Section */}
{/* Search Bar Container */}
<div className="w-full max-w-3xl mb-16 px-4 animate-fade-in-up">
  <form
    onSubmit={handleSubmit}
    className="group relative flex flex-col md:flex-row items-center bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl md:rounded-full p-2 shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-500 focus-within:border-main-color-1/60 focus-within:bg-white/10"
  >
    {/* Input Area */}
    <div className="flex flex-1 items-center w-full px-5">
      <IoSearch className="text-white/40 text-2xl group-focus-within:text-main-color-1 transition-colors duration-300" />
      <input
        ref={inputRef}
        type="text"
        className="w-full p-4 bg-transparent text-white outline-none text-lg placeholder:text-white/30 font-light tracking-wide"
        placeholder="What service are you looking for today?"
      />
    </div>

    {/* Vertical Divider (Hidden on Mobile) */}
    <div className="hidden md:block w-[1px] h-8 bg-white/10 mx-2" />

    {/* Search Button - The 'Action' Element */}
    <button className="relative w-full md:w-auto overflow-hidden bg-main-color-1 hover:bg-olive text-dark-color-1 font-bold px-10 py-4 rounded-xl md:rounded-full transition-all duration-300 active:scale-95 group/btn">
      <span className="relative text-emerald-400 z-10 flex items-center justify-center gap-2 uppercase tracking-tighter">
        Search
      </span>
      {/* Light Sweep Effect */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite]"></div>
    </button>
  </form>

  {/* Popular Tags - Minimalist White Style */}
  <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
    <span className="text-white/40 text-sm font-medium tracking-wide">Popular in Algeria:</span>
    {["Logo Design", "Web Development", "Video Editing", "Translation"].map((tag) => (
      <button
        key={tag}
        type="button"
        onClick={() => { if (inputRef.current) inputRef.current.value = tag; }}
        className="text-white/80 text-sm border-b border-transparent hover:border-main-color-1 hover:text-main-color-1 transition-all duration-300 pb-0.5"
      >
        {tag}
      </button>
    ))}
  </div>
</div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 md:gap-20 border-t border-white/20 pt-12 w-full">
          <div>
            <p className="text-2xl md:text-3xl font-bold text-white">Free</p>
            <p className="text-xs text-gray-400">Sign Up</p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-bold text-white">15k+</p>
            <p className="text-xs text-gray-400">Experts</p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-bold text-white">4.9</p>
            <p className="text-xs text-gray-400">Rating</p>
          </div>
        </div>
      </section>

      {/* ✨ Animations */}
      <style>
        {`
          @keyframes zoom {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1.15); }
          }
          .animate-zoom {
            animation: zoom 40s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Hero;