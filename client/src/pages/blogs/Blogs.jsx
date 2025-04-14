import { useState, useEffect } from "react";
import blogsData from "../../data/blogs.json";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  
  const blogsPerPage = 8;
  
  useEffect(() => {
    setTimeout(() => {
      setBlogs(blogsData);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const currentBlogs = filteredBlogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
          Latest From Our Blog
        </h2>
        <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Elevate your wardrobe with our freshest style tips, trends, and inspiration.
        </p>
        <div className="mt-6 h-1 w-16 bg-green-500 mx-auto rounded-full"></div>
      </div>

      {/* Search Bar */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search blogs..."
          className="w-80 px-4 py-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Blog Grid */}
      {loading ? (
        <div className="text-center text-xl font-semibold text-gray-600 animate-pulse">Loading Blogs...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {currentBlogs.map((blog) => (
            <div
              key={blog.id}
              className="group overflow-hidden rounded-2xl shadow-lg bg-white transition-all duration-500 transform hover:scale-105 hover:shadow-2xl"
            >
              <div className="relative">
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="w-full h-56 object-cover rounded-t-2xl transition-opacity duration-300 group-hover:opacity-80"
                />
                <div className="absolute top-4 left-4 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                  {blog.date}
                </div>
              </div>
              <div className="p-6">
                <h6 className="text-xs font-semibold text-green-600 uppercase tracking-wide">
                  {blog.subtitle}
                </h6>
                <h4 className="text-lg font-bold mt-3 text-gray-900 group-hover:text-green-500 transition-colors duration-300">
                  {blog.title}
                </h4>
                <p className="text-gray-600 mt-3 text-sm line-clamp-3">
                  {blog.description}
                </p>
                <a
                  href="#"
                  className="mt-4 inline-block text-green-600 font-semibold text-sm hover:underline transition-all duration-300"
                >
                  Read More →
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center mt-10 space-x-4">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          className={`px-5 py-3 rounded-lg text-white font-semibold transition-all duration-300 ${currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"}`}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-lg font-semibold">Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          className={`px-5 py-3 rounded-lg text-white font-semibold transition-all duration-300 ${currentPage === totalPages ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"}`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default Blogs;