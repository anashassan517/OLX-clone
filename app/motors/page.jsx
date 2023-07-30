"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import MainLayout from "@/components/layout/RootLayout";

const Motors = () => {
  const [ads, setAds] = useState([]);

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
        <div className="px-80 grid grid-cols-4 ">
          {ads.map((ad) => (
            <Link key={ad.id} href={`/ad/${ad.id}`}>
              <div className="p-2 w-60 border border-gray-300 rounded-md">
                <Image
                  src={ad.images[0]} // Displaying only the first image for each ad
                  alt={ad.title}
                  width={200}
                  height={200}
                  objectFit="cover"
                />
                <p className="text-gray-800 font-bold mt-1">Rs {ad.price}</p>
                <h3 className="text-black text-lg font-semibold mt-2">
                  {ad.title}
                </h3>
                <p className="text-gray-600">{ad.location}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Motors;
