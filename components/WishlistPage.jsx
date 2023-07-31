// WishlistPage.jsx
"use client";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase";
import Link from "next/link";
import Image from "next/image";

const WishlistPage = () => {
  const [wishlistAds, setWishlistAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) {
      console.error("User is not logged in.");
      setLoading(false);
      return;
    }

    // Fetch the user's wishlist from Firestore
    const fetchWishlist = async () => {
      try {
        const wishlistRef = collection(db, "users", user.uid, "wishlist");
        const snapshot = await getDocs(wishlistRef);
        const wishlistData = snapshot.docs.map((doc) => doc.data());

        // Fetch the ad data for each ad in the wishlist
        const wishlistWithAdData = await Promise.all(
          wishlistData.map(async (ad) => {
            const adData = await fetchAdData(ad.adId);
            return { ...ad, ...adData };
          })
        );

        setWishlistAds(wishlistWithAdData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        setLoading(false);
      }
    };
    fetchWishlist();
  }, [user]);

  // Function to fetch the ad data for a specific ad ID
  const fetchAdData = async (adId) => {
    try {
      const adRef = doc(db, "posts", adId);
      const adSnapshot = await getDoc(adRef);
      if (adSnapshot.exists()) {
        return { id: adSnapshot.id, ...adSnapshot.data() };
      } else {
        console.error(`Ad with ID ${adId} not found.`);
        return null;
      }
    } catch (error) {
      console.error("Error fetching ad data:", error);
      return null;
    }
  };
  const removeFromWishlist = async (adId) => {
    // Remove the ad from the user's wishlist in Firestore
    try {
      await deleteDoc(doc(db, "users", user.uid, "wishlist", adId));

      // Remove the ad from the wishlistAds state
      setWishlistAds((prevWishlistAds) =>
        prevWishlistAds.filter((ad) => ad.adId !== adId)
      );

      console.log("Ad removed from wishlist:", adId);
    } catch (error) {
      console.error("Error removing ad from wishlist:", error);
    }
  };

  return (
    <div className="text-black p-4">
      <h2 className="text-black text-center text-2xl font-bold mb-4">My Wishlist</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="text-black px-80 grid grid-cols-4 gap-4">
          {wishlistAds.map((ad) => (
            <Link key={ad.id} href={`/ad/${ad.id}`}>
              <div className="text-black p-2 w-60 border border-gray-300 rounded-md">
                <Image
                  className="object-cover h-48 w-96"
                  src={ad.images[0]}
                  alt={ad.title}
                  width={200}
                  height={200}
                />
                <p className="text-gray-800 font-bold mt-1">Rs {ad.price}</p>
                <h3 className="text-black text-lg font-semibold mt-2">
                  {ad.title}
                </h3>
                <p className="text-gray-600">{ad.location}</p>
              </div>
              <button
                className="bg-red-500 text-white py-2 px-4 mt-4 rounded-md"
                onClick={() => removeFromWishlist(ad.adId)}
              >
                Remove from Wishlist
              </button>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};
export default WishlistPage;
