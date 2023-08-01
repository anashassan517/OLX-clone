"use client";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-50 text-black py-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h4 className="text-sm font-bold mb-4">POPULAR CATEGORIES</h4>
            <ul className="text-sm pl-4">
              <li>Cars</li>
              <li>Flats for rent</li>
              <li>Mobile Phones</li>
              <li>Jobs</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold mb-4">TRENDING SEARCHES</h4>
            <ul className="text-sm pl-4">
              <li>Bikes</li>
              <li>Watches</li>
              <li>Books</li>
              <li>Dogs</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold mb-4">ABOUT US</h4>
            <ul className="text-sm pl-4">
              <li>About Dubizzle Group</li>
              <li>OLX Blog</li>
              <li>Contact Us</li>
              <li>OLX for Businesses</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold mb-4">FOLLOW US</h4>
            <div className="text-sm flex space-x-4">
              <a
                href="#"
                className="hover:text-indigo-500 transition-colors duration-300"
              >
                Facebook
              </a>
              <a
                href="#"
                className="hover:text-indigo-500 transition-colors duration-300"
              >
                Twitter
              </a>
              <a
                href="#"
                className="hover:text-indigo-500 transition-colors duration-300"
              >
                Youtube
              </a>
              <a
                href="#"
                className="hover:text-indigo-500 transition-colors duration-300"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="mt-4 text-right">
          <p className="px-96 mt-2">
            Free Classifieds in Pakistan . © 2006-2023 OLX
          </p>
        </div>
      </div>

      {/* Add the following CSS for sticking the footer to the bottom */}
      <style jsx>{`
        footer {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
