"use client";
import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import { db, auth } from "../firebase";
import Image from "next/image";
import Link from "next/link";
import { deleteDoc } from "firebase/firestore";
import MainLayout from "@/components/layout/RootLayout";


const WishlistPage = () => {
  const [wishlistAds, setWishlistAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlistAds = async () => {
      try {
        const user = auth.currentUser;
          const userRef = doc(db, "users", user.uid);
        const wishlistRef = collection(userRef, "wishlist");
        const snapshot = await getDocs(wishlistRef);
        const adIds = snapshot.docs.map((doc) => doc.data().adId);

        // Fetch details for each ad in the wishlist
        const wishlistAdsData = [];
        for (const adId of adIds) {
          const adRef = doc(db, "posts", adId);
          const adSnapshot = await getDoc(adRef);
          if (adSnapshot.exists()) {
            const adData = adSnapshot.data();
            wishlistAdsData.push({ adId, ...adData });
          }
        }

        setWishlistAds(wishlistAdsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching wishlist ads:", error);
        setLoading(false);
      }
    };

    fetchWishlistAds();
  }, []);
  const removeFromWishlist = async (adId) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        alert("User is not logged in.");
        return;
      }

      const adRef = doc(db, "users", user.uid, "wishlist", adId);
      await deleteDoc(adRef);

      // Update the wishlistAds state by filtering out the removed ad
      setWishlistAds((prevWishlistAds) =>
        prevWishlistAds.filter((ad) => ad.adId !== adId)
      );

      alert("Ad removed from the user's wishlist.");
    } catch (error) {
      console.error("Error removing ad from the user's wishlist:", error);
    }
  };

  return (
    <MainLayout>

    <div className="p-4">
      <h2 className="py-10 text-black text-center text-2xl font-bold mb-4">My Wishlist</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="px-80 grid grid-cols-4 gap-4">
           {wishlistAds.map((ad) => (
      <li key={ad.adId} className="border p-4 rounded-lg shadow-md">
              <Link href={`/ad/${ad.adId}`} className="text-xl font-bold mb-2">
                <Image
                  className="object-cover h-48 w-96"
                  src={ad.images[0]}
                  alt={ad.title}
                  width={200}
                  height={200}
                />
                {ad.title}
              </Link>
              <p className="text-gray-600 mb-2">Price: Rs {ad.price}</p>
              <p className="text-gray-600">Location: {ad.location}</p>
              <button
          className="bg-red-500 text-white py-2 px-4 mt-4 rounded-md"
          onClick={() => removeFromWishlist(ad.adId)}
        >
          Remove from Wishlist
        </button>
            </li>
          ))}
        </ul>
      )}
    </div>
    </MainLayout>

  );
};

export default WishlistPage;
