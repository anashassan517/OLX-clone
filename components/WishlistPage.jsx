<<<<<<< HEAD
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

=======
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
>>>>>>> ccb6945de2b4500ddc46968aa706cf0deedffd88

const WishlistPage = () => {
  const [wishlistAds, setWishlistAds] = useState([]);
  const [loading, setLoading] = useState(true);
<<<<<<< HEAD

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
=======
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
>>>>>>> ccb6945de2b4500ddc46968aa706cf0deedffd88
      setWishlistAds((prevWishlistAds) =>
        prevWishlistAds.filter((ad) => ad.adId !== adId)
      );

<<<<<<< HEAD
      alert("Ad removed from the user's wishlist.");
    } catch (error) {
      console.error("Error removing ad from the user's wishlist:", error);
=======
      console.log("Ad removed from wishlist:", adId);
    } catch (error) {
      console.error("Error removing ad from wishlist:", error);
>>>>>>> ccb6945de2b4500ddc46968aa706cf0deedffd88
    }
  };

  return (
<<<<<<< HEAD
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
=======
    <div className="text-black p-4">
      <h2 className="text-black text-center text-2xl font-bold mb-4">My Wishlist</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="text-black px-80 grid grid-cols-4 gap-4">
          {wishlistAds.map((ad) => (
            <Link key={ad.id} href={`/ad/${ad.id}`}>
              <div className="text-black p-2 w-60 border border-gray-300 rounded-md">
>>>>>>> ccb6945de2b4500ddc46968aa706cf0deedffd88
                <Image
                  className="object-cover h-48 w-96"
                  src={ad.images[0]}
                  alt={ad.title}
                  width={200}
                  height={200}
                />
<<<<<<< HEAD
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
=======
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
>>>>>>> ccb6945de2b4500ddc46968aa706cf0deedffd88
          ))}
        </ul>
      )}
    </div>
<<<<<<< HEAD
    </MainLayout>

  );
};

=======
  );
};
>>>>>>> ccb6945de2b4500ddc46968aa706cf0deedffd88
export default WishlistPage;
