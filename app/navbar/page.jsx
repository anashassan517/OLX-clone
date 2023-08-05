"use client";
import Link from "next/link";
import styles from "./Navbar.module.css";
import Image from "next/image";
import CategoriesDropdown from "../../components/CategoriesDropdown";
import Searchbox from "../../components/Seacrhbox";
import LocationSearch from "../../components/LocationSearch";
import { useEffect } from "react";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useState } from "react";

const handleLogout = () => {
  auth.signOut();
  <link href="/" />;
};

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [user] = useAuthState(auth);
  const handleProfileDropdown = () => {
    setShowDropdown((prevShowDropdown) => !prevShowDropdown);
  };
  const [filteredAds, setFilteredAds] = useState([]);
  const [allAds, setAllAds] = useState([]);
  const [filteredLocation, setFilteredLocation] = useState([]);
  const [allLocation, setAllLocation] = useState([]);
  const [locationQuery, setlocationQuery] = useState("");

  useEffect(() => {
    // Fetch all ads data from Firestore
    const fetchAds = async () => {
      try {
        const adsRef = collection(db, "posts");
        const snapshot = await getDocs(adsRef);
        const adsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllAds(adsData);
      } catch (error) {
        console.error("Error fetching ads:", error);
      }
    };
    fetchAds();
  }, []);

  useEffect(() => {
    // Filter ads based on the search query
    const filteredLocation = allLocation.filter((ad) =>
      ad.location.toLowerCase().includes(locationQuery.toLowerCase())
    );
    setFilteredLocation(filteredLocation);
  }, [locationQuery, allLocation]);

  useEffect(() => {
    // Filter ads based on the search query
    const filteredAds = allAds.filter((ad) =>
      ad.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredAds(filteredAds);
  }, [searchQuery, allAds]);

  return (
    <nav className="bg-slate-50">
      <title>OLX - Buy And Sell For Free Enywhere</title>
      <div className={styles.topLine}>
        <div>
          <Link href="/">
            <Image src="/logo.svg" height={70} width={70} alt="Company Logo" />
          </Link>
        </div>
        <div className="text-black px-7 flex-auto">
          <Link href="/motors">Motors</Link>
          <Link className="text-black px-5" href="/property-for-sale">
            Property
          </Link>
        </div>
      </div>
      <div className={styles.bottomLine}>
        <div className={styles.searchBox}>
          <LocationSearch
            searchQuery={locationQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>

        <div className={styles.searchBox}>
          <Searchbox
            searchQuery={searchQuery}
            setSearchQuery={setlocationQuery}
          />
        </div>

        {user ? (
          <div className="relative">
            <div
              className="w-20 flex items-center cursor-pointer"
              onClick={handleProfileDropdown}
            >
              <Image
                src="/images/iconProfilePicture.png"
                alt="Profile image"
                width={40}
                height={40}
                className=" rounded-full"
              />
            </div>
            {showDropdown && (
              <div>
                <ul className="w-56 absolute top-12 right-0 bg-white rounded shadow py-5">
                  <Image
                    className="rounded-full"
                    src="/images/iconProfilePicture.png"
                    alt="Profile image"
                    width={60}
                    height={60}
                  />
                  <h2 className="px-2 text-black text-center text-1x1">
                    Hello,
                  </h2>
                  <h3 className="text-black text-center text-1xl font-bold mb-4">
                    {user.displayName}
                  </h3>

                  <li>
                    <Link
                      href="/profile"
                      // href="<Profile user={user}/>"
                      className="text-gray-800 block px-4 py-2 hover:bg-sky-100"
                    >
                      View and Edit Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/my-ads"
                      className="text-gray-800 block px-4 py-2 hover:bg-sky-100"
                    >
                      My Ads
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/wishlist"
                      className="text-gray-800 block px-4 py-2 hover:bg-sky-100"
                    >
                      WishList
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/buy-package"
                      className="text-gray-800 block px-4 py-2 hover:bg-sky-100"
                    >
                      Buy Package
                    </Link>
                  </li>
                  <li className="hover:bg-sky-100">
                    <button
                      onClick={handleLogout}
                      className="text-red-600 block px-4 py-2"
                    >
                      Log Out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <Link className="flex items-center text-1xl" href="/login">
            Login
          </Link>
        )}
        <Link
          href="/sellform"
          className=" bg-slate-300 text-black font-bold py-3 px-3 rounded"
        >
          Sell
        </Link>
      </div>
      <div className={styles.thirdLine}>
        <div className={styles.categoriesDropdown}>
          <CategoriesDropdown />
        </div>
        <div className={styles.categories}>
          <Link href="/mobile-phones">Mobile Phones</Link>
          <Link href="/motors">Cars</Link>
          <Link href="/bikes">Motorcycles</Link>
          <Link href="/property-for-rent">Houses</Link>
          <Link href="/property-for-sale">Land & Plots</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
