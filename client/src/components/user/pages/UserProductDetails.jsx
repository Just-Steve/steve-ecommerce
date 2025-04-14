import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Dummy product data for demonstration purposes
const dummyProduct = {
  id: 101,
  name: "Elegant Red Dress",
  price: 79.99,
  description:
    "This elegant red dress is perfect for special occasions. It features a flattering silhouette, exquisite detailing, and high-quality fabric that ensures comfort and style. Pair it with heels for a stunning evening look.",
  images: [
    "https://shopzetu.com/cdn/shop/files/NViGurJjzh-758909_120x.jpg?v=1733830592",
    "https://shopzetu.com/cdn/shop/files/EYSxi6PR1D-371213_360x.jpg?v=1733830592",
    "https://shopzetu.com/cdn/shop/files/Adt8DA0wXY-327769_1800x1800.jpg?v=1733830592",
    "https://shopzetu.com/cdn/shop/files/Svdz1Uaq9c_360x.jpg?v=1741757861"
  ],
  rating: 4.5,
  reviews: [
    {
      id: 1,
      reviewer: "Alice",
      comment: "Absolutely stunning dress! The fit was perfect and the quality exceeded my expectations.",
      rating: 5,
    },
    {
      id: 2,
      reviewer: "Beth",
      comment: "Lovely design but a bit tight. Overall, a great purchase!",
      rating: 4,
    },
  ],
  relatedProducts: [
    {
      id: 102,
      name: "Floral Summer Dress",
      imageUrl: "https://shopzetu.com/cdn/shop/files/7cezqlUlqe_360x.jpg?v=1741067674",
      price: 69.99,
    },
    {
      id: 103,
      name: "Classic Black Gown",
      imageUrl: "https://shopzetu.com/cdn/shop/files/25799_2d69ff19-51c3-4e93-b844-46c0f66b85e0_360x.jpg?v=1741340897",
      price: 99.99,
    },
    {
      id: 104,
      name: "Chic Cocktail Dress",
      imageUrl: "https://shopzetu.com/cdn/shop/files/5250_5ea9da03-cb4e-4181-bd85-3cac3ed1d4d2_360x.jpg?v=1741516159",
      price: 89.99,
    },
  ],
};

const UserProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);

  // Simulate fetching product details
  const fetchProductDetails = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setProduct(dummyProduct);
    setSelectedImage(dummyProduct.images[0]);
    setReviews(dummyProduct.reviews);
    setLoading(false);
  };

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const handleAddToCart = () => {
    // In a real application, dispatch an action or call API to add product to cart
    alert(`Added ${quantity} item(s) of "${product.name}" to your cart.`);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewText) return;
    const newReview = {
      id: Date.now(),
      reviewer: "You",
      comment: reviewText,
      rating: 5,
    };
    setReviews([newReview, ...reviews]);
    setReviewText("");
  };

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      {loading ? (
        <div className="py-20 text-center">
          <p className="text-2xl text-gray-600">Loading product details...</p>
        </div>
      ) : product ? (
        <>
          {/* Product Header */}
          <header className="mb-10">
            <h1 className="text-5xl font-extrabold text-gray-900">{product.name}</h1>
            <p className="text-xl text-gray-700 mt-4">${product.price.toFixed(2)}</p>
            <div className="flex items-center mt-2">
              <span className="text-yellow-500">
                {"★".repeat(Math.floor(product.rating))}
                {"☆".repeat(5 - Math.floor(product.rating))}
              </span>
              <span className="text-gray-600 ml-2">({product.rating} / 5)</span>
            </div>
          </header>

          {/* Main Product Section */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
            {/* Image Carousel */}
            <div>
              <div className="w-full h-96 bg-white rounded-lg shadow-lg flex items-center justify-center overflow-hidden">
                <img
                  src={selectedImage}
                  alt="Product"
                  className="object-cover h-full w-full"
                />
              </div>
              <div className="mt-4 flex space-x-4">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    className={`border-2 rounded-md overflow-hidden transition-transform duration-300 ${
                      selectedImage === img ? "border-blue-600" : "border-transparent"
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${index + 1}`} className="w-20 h-20 object-cover" />
                  </button>
                ))}
              </div>
            </div>
            {/* Product Details */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Product Details</h2>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
              <div className="mt-6">
                <label className="block text-gray-700 font-medium mb-2">Quantity:</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="w-24 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mt-6">
                <button
                  onClick={handleAddToCart}
                  className="px-8 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </section>

          {/* Customer Reviews Section */}
          <section className="mb-10 bg-white p-8 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Customer Reviews</h2>
            {/* Review Form */}
            <form onSubmit={handleReviewSubmit} className="mb-6">
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Write your review here..."
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
              ></textarea>
              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Submit Review
                </button>
              </div>
            </form>
            {/* List of Reviews */}
            <div className="space-y-6">
              {reviews.length === 0 ? (
                <p className="text-gray-600">No reviews yet. Be the first to review!</p>
              ) : (
                reviews.map((review) => (
                  <div key={review.id} className="border-b pb-4">
                    <div className="flex items-center">
                      <span className="font-bold text-gray-800">{review.reviewer}</span>
                      <span className="ml-4 text-yellow-500">
                        {"★".repeat(review.rating)}
                        {"☆".repeat(5 - review.rating)}
                      </span>
                    </div>
                    <p className="text-gray-700 mt-2">{review.comment}</p>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Related Products Section */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {product.relatedProducts.map((related) => (
                <div
                  key={related.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-4"
                >
                  <img
                    src={related.imageUrl}
                    alt={related.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <h3 className="text-xl font-bold text-gray-800 mt-4">{related.name}</h3>
                  <p className="text-green-600 font-semibold mt-2">${related.price.toFixed(2)}</p>
                  <Link
                    to={`/product/${related.id}`}
                    className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          </section>

         
          {/* Footer */}
          <footer className="mt-16 border-t pt-6">
            <p className="text-center text-gray-500 text-base">
              User Product Details &copy; {new Date().getFullYear()} - All rights reserved.
            </p>
          </footer>
        </>
      ) : null}
    </div>
  );
};

export default UserProductDetails;
