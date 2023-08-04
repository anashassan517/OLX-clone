import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Link from "next/link";

const LocationSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAds, setFilteredAds] = useState([]);
  const [allAds, setAllAds] = useState([]);
  const [showLocationSearch, setShowLocationSearch] = useState(false);

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
          ad.location.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredAds(filteredAds);
      }
    }, 1000); // delay(e.g., 1000ms = 1 second)

    // Cleanup function to clear the timer on each change of searchQuery
    return () => clearTimeout(delaySearch);
  }, [searchQuery, allAds]);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    setShowLocationSearch(e.target.value !== ""); // Toggle the showLocationSearch based on search query
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search City, Karachi, Lahore .."
        value={searchQuery}
        onChange={handleSearchInputChange}
      />
      {showLocationSearch &&
        filteredAds.map((ad) => (
          <Link key={ad.id} href={`/ad/${ad.id}`}>
            <div className=" text-black p-2 border border-gray-300 rounded-md">
              <h5 className="text-black mt-0">{ad.title}</h5>
              <h6 className="text-black text-xs mt-0">{ad.location}</h6>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default LocationSearch;
