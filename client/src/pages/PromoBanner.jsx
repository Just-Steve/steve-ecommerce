import React from "react";

const PromoBanner = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-3xl shadow-xl mx-6 md:mx-16">
      {/* Free Delivery */}
      <div className="flex flex-col items-center text-center p-8 bg-white/20 backdrop-blur-lg rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
        <span className="text-5xl mb-4 text-yellow-300">
          <i className="ri-truck-line" aria-hidden="true"></i>
        </span>
        <h4 className="text-2xl font-bold">Free Delivery</h4>
        <p className="text-base opacity-95 mt-3">
          Enjoy hassle-free shopping with fast and reliable delivery—right to your doorstep, at no extra cost.
        </p>
      </div>

      {/* Money-Back Guarantee */}
      <div className="flex flex-col items-center text-center p-8 bg-white/20 backdrop-blur-lg rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
        <span className="text-5xl mb-4 text-green-300">
          <i className="ri-money-dollar-circle-line" aria-hidden="true"></i>
        </span>
        <h4 className="text-2xl font-bold">100% Money-Back Guarantee</h4>
        <p className="text-base opacity-95 mt-3">
          Shop with confidence! If you're not satisfied, we offer a full refund—no questions asked.
        </p>
      </div>

      {/* 24/7 Customer Support */}
      <div className="flex flex-col items-center text-center p-8 bg-white/20 backdrop-blur-lg rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
        <span className="text-5xl mb-4 text-red-300">
          <i className="ri-user-voice-line" aria-hidden="true"></i>
        </span>
        <h4 className="text-2xl font-bold">24/7 Customer Support</h4>
        <p className="text-base opacity-95 mt-3">
          Our dedicated support team is here to assist you anytime, ensuring a smooth and satisfying shopping experience.
        </p>
      </div>
    </section>
  );
};

export default PromoBanner;
