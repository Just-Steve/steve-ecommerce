


import { useState, useEffect } from "react";
// Removed image imports and related state logic since we're using a single video.

const Banner = () => {
  // YouTube embed URL – updated with autoplay, mute, and loop parameters.
  const videoUrl =
    "https://www.youtube.com/embed/OWTKNXiHZpA?autoplay=1&mute=1&loop=1&playlist=OWTKNXiHZpA";

  return (
    <div className="relative flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-[#ff7ecb] to-[#fb3007] p-10 md:p-16 rounded-2xl overflow-hidden shadow-2xl h-[600px] sm:h-[600px] md:h-[650px]">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      {/* Content Section */}
      <div className="z-10 max-w-lg text-white text-center md:text-left space-y-4">
        <h4 className="text-xl font-semibold tracking-wide">
          ENJOY UP TO 20% OFF
        </h4>
        <h1 className="text-5xl font-extrabold">Trendy Fashion Deals</h1>
        <p className="mt-2 text-lg leading-relaxed">
          Explore the latest styles, top brands, and must-have fashion pieces!
          <br />
          Fresh arrivals, exclusive collections, and limited-time offers await!
        </p>

        <button className="mt-6 px-6 py-3 bg-white text-red-500 font-bold text-lg rounded-lg hover:bg-red-600 hover:text-white transition-all duration-300 shadow-lg">
          <a href="https://shopzetu.com/collections/womens-dresses?srsltid=AfmBOoqpKsYgrKyelYNP0bz08lTym2i_1Q-b_dYVLDDeQldtlVA8iQsb">
            Explore Now
          </a>
        </button>
      </div>

      {/* Video Section */}
      <div className="w-full md:w-1/3 relative mt-8 md:mt-0">
        <iframe
          src={videoUrl}
          title="Fashion Banner Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-[450px] md:h-[550px] rounded-lg transition-all duration-1000 ease-in-out transform scale-95 hover:scale-100"
        ></iframe>
      </div>

      {/* Tailwind Animation */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0.3; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
};

export default Banner;
