import React, { useState, useEffect } from "react";
import not1 from "../asse/not-1.jpeg";
import not2 from "../asse/not-2.jpeg";
import not3 from "../asse/not-3.jpg";
import not4 from "../asse/not-4.jpg";
import not5 from "../asse/not-5.jpeg";
import not6 from "../asse/not-6.jpeg";
import not7 from "../asse/not-7.jpeg";
import not8 from "../asse/not-8.jpeg";
import not9 from "../asse/not-9.jpeg";
import not10 from "../asse/not-10.jpeg";

const dealImages = [not1, not2, not3, not4, not5, not6, not7, not8, not9, not10];

const DealSection = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % dealImages.length);
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex flex-col md:flex-row items-center justify-between gap-8 px-6 py-10 bg-gray-100 rounded-lg shadow-lg">
      {/* Image Slideshow */}
      <div className="w-full md:w-1/2 flex justify-center relative">
        <img
          src={dealImages[currentImage]}
          alt="Deals"
          className="w-80 md:w-96 rounded-lg shadow-md transition-opacity duration-700 opacity-100"
        />
      </div>

      {/* Content Section */}
      <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
        <h5 className="text-blue-500 font-bold text-lg">Get up to 20% Discount</h5>
        <h3 className="text-3xl font-extrabold text-gray-800">Deals of the Month</h3>
        <p className="text-gray-600 leading-relaxed">
          Hurry up! Grab your favorite products at unbeatable prices before the offer ends. Limited-time deals just for you!
        </p>

        {/* Countdown Timer */}
        <div className="grid grid-cols-4 gap-4 mt-4">
          {[
            { time: "20", label: "Days" },
            { time: "18", label: "Hours" },
            { time: "45", label: "Mins" },
            { time: "14", label: "Sec" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-blue-500 text-white p-4 rounded-lg shadow-md transition-transform duration-300 hover:scale-110"
            >
              <h4 className="text-2xl font-bold">{item.time}</h4>
              <p className="text-sm">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DealSection;
