import card1 from "../asse/card-1.png";
import card2 from "../asse/card-2.png";
import card3 from "../asse/card-3.png";

const cards = [
  {
    id: 1,
    image: card1,
    trend: "Spring 2025 Collection",
    title: "Elegant Women’s Shirt",
    description:
      "A timeless blend of sophistication and comfort, crafted with breathable fabric for effortless style.",
  },
  {
    id: 2,
    image: card2,
    trend: "Luxury 2025 Edition",
    title: "Chic Evening Dress",
    description:
      "Turn heads with this stunning evening dress, designed for elegance, confidence, and a touch of glamour.",
  },
  {
    id: 3,
    image: card3,
    trend: "Summer Exclusive 2025",
    title: "Classic Floral Dress",
    description:
      "Stay effortlessly stylish with this lightweight floral dress, designed for sunny days and breezy evenings.",
  },
];

const HeroSection = () => {
  return (
    <section className="max-w-screen-xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
      {cards.map((card) => (
        <div
          key={card.id}
          className="relative group overflow-hidden rounded-xl shadow-xl transition-transform transform hover:scale-105"
        >
          {/* Image Section */}
          <img
            src={card.image}
            alt={card.title}
            className="w-full h-80 object-cover transition-opacity duration-300 group-hover:opacity-75"
          />

          {/* Content Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent p-6 flex flex-col justify-end">
            <h2 className="text-xs text-green-400 uppercase font-bold tracking-widest">
              {card.trend}
            </h2>
            <h3 className="text-xl font-extrabold text-white mt-2">{card.title}</h3>
            <p className="text-sm text-gray-300 mt-2">{card.description}</p>

            {/* Discover More Button */}
            <a
              href="https://www.lestyleparfait.co.ke/collections/official-dresses-ladies?srsltid=AfmBOooaiqMSC7KL9L7ZJszLEvVkkqbP6BL9K70lNxydkobRuhsvskyX"
              className="mt-4 inline-block bg-green-500 text-white font-semibold text-sm px-5 py-2 rounded-full hover:bg-green-600 transition duration-300"
            >
              Discover More
            </a>
          </div>
        </div>
      ))}
    </section>
  );
};

export default HeroSection;
