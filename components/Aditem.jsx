import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { collection, query, where, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";

const AdItem = ({ ad }) => {
  const auth = getAuth();
  const [isWishlist, setIsWishlist] = useState(false);

  useEffect(() => {
    // Check if the ad is in the user's wishlist
    const checkWishlist = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const adRef = doc(db, "users", user.uid, "wishlist", ad.id);
          const adSnapshot = await getDoc(adRef);
          setIsWishlist(adSnapshot.exists());
        }
      } catch (error) {
        console.error("Error checking wishlist:", error);
      }
    };
    checkWishlist();
  }, [ad.id, auth]);
 
  const handleToggleWishlist = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        alert("User is not logged in.");
        return;
      }

      const adRef = doc(db, "users", user.uid, "wishlist", ad.id);
      if (isWishlist) {
        await deleteDoc(adRef);
      } else {
        await setDoc(adRef, { adId: ad.id });
      }

      setIsWishlist((prevState) => !prevState); // Toggle the wishlist state
    } catch (error) {
      console.error("Error toggling wishlist:", error);
    }
  };

  const heartImageSrc = isWishlist
    ? "/images/wishlist-heart-filled.png" // Filled heart image
    : "/images/wishlist-heart.png"; // Unfilled heart image

  return (
    <div className="border border-gray-300 rounded-md">
      <Link href={`/ad/${ad.id}`}>
        <Image
          className="object-cover h-48 w-full"
          src={ad.images[0]}
          alt={ad.title}
          width={200}
          height={200}
        />
      </Link>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button onClick={handleToggleWishlist}>
          <Image
            className={`py-2 flex items-end`}
            src={heartImageSrc}
            height={30}
            width={30}
            alt="wishlist heart"
          />
        </button>
      </div>
      <p className="text-gray-800 font-bold mt-1 px-5">Rs {ad.price}</p>
      <h3 className="text-black text-lg font-semibold mt-2 px-5">{ad.title}</h3>
      <p className="text-gray-600 px-5">{ad.location}</p>
    </div>
  );
};

export default AdItem;
