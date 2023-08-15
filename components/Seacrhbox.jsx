import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Link from "next/link";

const Searchbox = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAds, setFilteredAds] = useState([]);
  const [allAds, setAllAds] = useState([]);
  const [showSearchbox, setShowSearchbox] = useState(false);

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
    // Debounce the search API call
    const delaySearch = setTimeout(() => {
      // Filter ads based on the search query
      if (allAds.length > 0) {
        const filteredAds = allAds.filter((ad) =>
          ad.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredAds(filteredAds);
      }
    }, 1000); // delay(e.g., 1000ms = 1 second)

    // Cleanup function to clear the timer on each change of searchQuery
    return () => clearTimeout(delaySearch);
  }, [searchQuery, allAds]);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    setShowSearchbox(e.target.value !== ""); // Toggle the showSearchbox based on search query
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Find Cars, Mobile Phones and more..."
        value={searchQuery}
        onChange={handleSearchInputChange}
      />
      {showSearchbox && (
        <div className="absolute z-100 w-full px-1">
          {filteredAds.map((ad) => (
            <Link key={ad.id} href={`/ad/${ad.id}`}>
              <div className=" text-black p-2 border border-gray-300 rounded-md bg-white">
                <h5 className="text-black mt-0">{ad.title}</h5>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Searchbox;
