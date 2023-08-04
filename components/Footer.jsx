"use client";
import React from "react";
const Footer = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">{/* Your main content goes here */}</div>

      <footer className="bg-slate-100 text-black py-4">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">POPULAR CATEGORIES</h4>
              <ul className=" pl-4">
                <li>
                  <a
                    href="/motors"
                    className="hover:text-indigo-500 transition-colors duration-300"
                  >
                    Cars
                  </a>
                </li>
                <li>
                  <a
                    href="/property-for-rent"
                    className="hover:text-indigo-500 transition-colors duration-300"
                  >
                    Flats for rent
                  </a>
                </li>
                <li>
                  <a
                    href="/mobile-phones"
                    className="hover:text-indigo-500 transition-colors duration-300"
                  >
                    Mobile Phones
                  </a>
                </li>
                <li>
                  <a
                    href="/property-for-sale"
                    className="hover:text-indigo-500 transition-colors duration-300"
                  >
                    Lands
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">TRENDING SEARCHES</h4>
              <ul className=" pl-4">
                <li>
                  <a
                    href="/bikes"
                    className="hover:text-indigo-500 transition-colors duration-300"
                  >
                    Bikes
                  </a>
                </li>
                <li>
                  <a
                    href="/property-for-rent"
                    className="hover:text-indigo-500 transition-colors duration-300"
                  >
                    Property
                  </a>
                </li>
                <li>
                  <a
                    href="/motors"
                    className="hover:text-indigo-500 transition-colors duration-300"
                  >
                    Motors
                  </a>
                </li>
                <li>
                  <a
                    href="/bikes"
                    className="hover:text-indigo-500 transition-colors duration-300"
                  >
                    Motorcycles
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">ABOUT US</h4>
              <ul className=" pl-4">
                <li>
                  <a
                    href="/aboutus"
                    className="hover:text-indigo-500 transition-colors duration-300"
                  >
                    About Dubizzle Group
                  </a>
                </li>
                <li>
                  <a
                    href="/aboutus"
                    className="hover:text-indigo-500 transition-colors duration-300"
                  >
                    OLX Blog
                  </a>
                </li>
                <li>
                  <a
                    href="/aboutus"
                    className="hover:text-indigo-500 transition-colors duration-300"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="/aboutus"
                    className="hover:text-indigo-500 transition-colors duration-300"
                  >
                    OLX for Businesses
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">OLX</h4>
              <div className="flex space-x-4">
                <ul className="pl-4">
                  <li>
                    <a
                      href="/aboutus"
                      className="hover:text-indigo-500 transition-colors duration-300"
                    >
                      Help
                    </a>
                  </li>
                  <li>
                    <a
                      href="/aboutus"
                      className="hover:text-indigo-500 transition-colors duration-300"
                    >
                      Sitemap
                    </a>
                  </li>
                  <li>
                    <a
                      href="/aboutus"
                      className="hover:text-indigo-500 transition-colors duration-300"
                    >
                      Terms of use
                    </a>
                  </li>
                  <li>
                    <a
                      href="/aboutus"
                      className="hover:text-indigo-500 transition-colors duration-300"
                    >
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Follow Us</h4>
              <div className="flex space-x-4 pl-4">
                <a
                  href="https://www.facebook.com/olxpakistan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-500 transition-colors duration-300"
                >
                  Facebook
                </a>
                <a
                  href="https://twitter.com/OLX_Pakistan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-500 transition-colors duration-300"
                >
                  Twitter
                </a>
                <a
                  href="https://www.youtube.com/channel/UCARDDjJnW7IRBpo_AP7WTHQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-500 transition-colors duration-300"
                >
                  Youtube
                </a>
                <a
                  href="https://www.instagram.com/olx.pakistan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-500 transition-colors duration-300"
                >
                  Instagram
                </a>
              </div>
            </div>
            {/* </div> */}
          </div>
          <div className="mt-8 text-center">
            <p className="mt-4">
              Free Classifieds in Pakistan . © 2006-2023 OLX
            </p>
          </div>
        </div>

        {/* Add the following CSS for sticking the footer to the bottom */}
        <style jsx>{`
          footer {
            position: relative;
            margin-top: auto;
            width: 100%;
          }
        `}</style>
      </footer>
    </div>
  );
};

export default Footer;
