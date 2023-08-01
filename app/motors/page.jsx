"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase";
import MainLayout from "@/components/layout/RootLayout";

const Motors = () => {
  const [ads, setAds] = useState([]);
  const auth = getAuth();

  // Function to handle adding an ad to the user's wishlist
  const handleAddToWishlist = async (adId) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        alert("User is not logged in.");
        return;
      }

      const adRef = doc(db, "users", user.uid, "wishlist", adId);
      await setDoc(adRef, { adId });

      alert(`Ad added to the user's wishlist.`);
    } catch (error) {
      console.error("Error adding ad to the user's wishlist:", error);
    }
  };

  useEffect(() => {
    // Fetch ads data from Firestore
    const fetchAds = async () => {
      try {
        const adsRef = collection(db, "posts");
        const carsSubcategoryId = "uybc5bdmm1oC7rFvxmeh";

        // Use the where clause to filter ads for the mobile phones subcategory
        const mobilePhonesAdsQuery = query(
          adsRef,
          where("subCategory", "==", carsSubcategoryId)
        );

        const snapshot = await getDocs(mobilePhonesAdsQuery);
        const adsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAds(adsData);
      } catch (error) {
        console.error("Error fetching ads:", error);
      }
    };
    fetchAds();
  }, []);

  return (
    <MainLayout>
      <div>
        <h2 className="text-black px-80 text-2xl font-bold mb-10 py-20">
          Motors List
        </h2>
        <div className="px-80 grid grid-cols-4 gap-4">
          {ads.map((ad) => (
          <div key={ad.id} className="border border-gray-300 rounded-md">   
            <Link href={`/ad/${ad.id}`}>
                  <Image
                    className="object-cover h-48 w-96"
                    src={ad.images[0]}
                    alt={ad.title}
                    width={200}
                    height={200}
                  />
                </Link>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>                 
                 <button onClick={() => handleAddToWishlist(ad.id)}>
                   <Image
                     className="py-5 flex items-end"
                     src="/images/wishlist-heart.png"
                     height={45}
                     width={45}
                     alt="wishlist heart"
                   />
                 </button>
               </div>
            <p className="text-gray-800 font-bold mt-1">Rs {ad.price}</p>
            <h3 className="text-black text-lg font-semibold mt-2">{ad.title}</h3>
            <p className="text-gray-600">{ad.location}</p>
          
          </div>
        ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Motors;
