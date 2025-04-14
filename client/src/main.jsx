import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { Toaster } from "./components/ui/toaster.jsx";
import Footer from "./components/Footer.jsx";
import Blogs from './pages/blogs/Blogs';
import HeroSection from "./pages/HeroSection.jsx";
import DealSection from "./pages/DealSection.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <Toaster />
      <DealSection />
      <Blogs />
      <HeroSection />
    </Provider>

    <Footer />
  </BrowserRouter>
);
