import React from "react";
import { Link } from "react-router-dom";
import instaImg1 from "../asse/ins-1.jpg";
import instaImg2 from "../asse/ins-2.jpg";
import instaImg3 from "../asse/ins-3.jpg";
import instaImg4 from "../asse/ins-4.jpg";
import instaImg5 from "../asse/ins-5.jpg";
import instaImg6 from "../asse/instagram-5.jpg";
import { BsTwitter } from 'react-icons/bs'
import { BsFacebook } from 'react-icons/bs'
import { BsSlack, BsGithub } from 'react-icons/bs'
import playstore from '../asse/images/pay/play.jpg'
import appstore from '../asse/images/pay/app.jpg'
import visa from '../asse/images/pay/pay.png'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
        
        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-4">CONTACT INFO</h4>
          <p className="flex items-center gap-2">
            <i className="ri-map-pin-2-fill text-yellow-500"></i>
            <span>123, Nairobi Bridge Street, Kenya</span>
          </p>
          <p className="flex items-center gap-2">
            <i className="ri-mail-fill text-yellow-500"></i>
            <a href="mailto:support@steve.com" className="hover:text-yellow-400">support@steve.com</a>
          </p>
          <p className="flex items-center gap-2">
            <i className="ri-phone-fill text-yellow-500"></i>
            <a href="tel:+25423456789" className="hover:text-yellow-400">(+254) 3456 7889</a>
          </p>
        </div>

        {/* Account Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Account</h4>
          <ul className="space-y-2">
            <li><Link to='#' className="hover:text-yellow-400">Profile</Link></li>
            <li><Link to='#' className="hover:text-yellow-400">Cart</Link></li>
            <li><Link to='#' className="hover:text-yellow-400">Help</Link></li>
            <li><Link to='#' className="hover:text-yellow-400">Payments</Link></li>
            <li><Link to='#' className="hover:text-yellow-400">My Wishlist</Link></li>
            <li><Link to='#' className="hover:text-yellow-400">Coupons</Link></li>
          </ul>
        </div>

        {/* Install App & Payments */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Install App</h4>
          <p className="mb-3">Available on Google Play & App Store</p>
          <div className="flex gap-4">
            <a href="https://play.google.com/store/games?hl=en_US&gl=US" target="_blank" rel="noopener noreferrer">
              <img src={playstore} alt="Google Play Store" className="w-32" />
            </a>
            <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
              <img src={appstore} alt="App Store" className="w-32" />
            </a>
          </div>
          <h4 className="text-lg font-semibold mt-4">Payment Methods</h4>
          <div className="flex gap-4 mt-2">
            <a href="https://www.paypal.com/signin" target="_blank" rel="noopener noreferrer">
              <img src={visa} alt="Payment Methods" className="w-20" />
            </a>
          </div>
        </div>

        {/* Instagram Grid */}
        <div>
          <h4 className="text-lg font-semibold mb-4">INSTAGRAM</h4>
          <div className="grid grid-cols-3 gap-2">
            {[instaImg1, instaImg2, instaImg3, instaImg4, instaImg5, instaImg6].map((img, index) => (
              <img key={index} src={img} alt={`Instagram post ${index + 1}`} 
                className="w-full h-20 object-cover rounded-lg hover:scale-105 transition-transform duration-300 cursor-pointer" />
            ))}
          </div>
        </div>
      </div>

      {/* Copyright & Policies */}
      <div className="text-center text-sm mt-8 border-t border-gray-700 pt-4 flex flex-col md:flex-row justify-between px-6">
        <p>&copy; {new Date().getFullYear()} Steve. All rights reserved.</p>
        <ul className="flex gap-4 justify-center mt-2 md:mt-0">
          <li><Link to="#" className="hover:text-yellow-400">Privacy Policy</Link></li>
          <li><Link to="#" className="hover:text-yellow-400">Terms of Use</Link></li>
          <li><Link to="#" className="hover:text-yellow-400">Contact Us</Link></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;