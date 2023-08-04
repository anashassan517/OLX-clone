"use client";
import React, { useState, useEffect } from "react";
import { collection, query, where, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import AdItem from "@/components/Aditem";
import AdSkeleton from "@/components/AdSkeleton";

import Footer from "@/components/Footer";
const Adds = () => {
  const [mobileAds, setMobileAds] = useState([]);
  const [carAds, setCarAds] = useState([]);
  const [watchAds, setWatchAds] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch ads data from Firestore for each category
    const fetchAds = async () => {
      setLoading[true];
      try {
        const adsRef = collection(db, "posts");
        const mobilePhonesCategoryId = "sjOQd9a6uKO3wBc4JYe3";
        const carsCategoryId = "uybc5bdmm1oC7rFvxmeh";
        const watchesCategoryId = "YTGpHYVF9S4j0vsY0BFG";

        // Use the where clause to filter ads for each category and limit to 4 ads
        const mobileAdsQuery = query(
          adsRef,
          where("subCategory", "==", mobilePhonesCategoryId),
          limit(4)
        );
        const carAdsQuery = query(
          adsRef,
          where("subCategory", "==", carsCategoryId),
          limit(4)
        );
        const watchAdsQuery = query(
          adsRef,
          where("subCategory", "==", watchesCategoryId),
          limit(4)
        );

        const mobileSnapshot = await getDocs(mobileAdsQuery);
        const carSnapshot = await getDocs(carAdsQuery);
        const watchSnapshot = await getDocs(watchAdsQuery);

        const mobileAdsData = mobileSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const carAdsData = carSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const watchAdsData = watchSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setMobileAds(mobileAdsData);
        setCarAds(carAdsData);
        setWatchAds(watchAdsData);
      } catch (error) {
        console.error("Error fetching ads:", error);
      }
      setLoading[false];
    };
    fetchAds();
  }, []);

  return (
    <>
      <div>
        <div>
          <h2 className="text-black px-80 text-2xl font-bold py-5">
            Mobile Phones
          </h2>
          <div className="px-80 grid grid-cols-4 gap-4">
            {!mobileAds.length ? (
              Array.from({ length: 4 }).map((_, idx) => (
                <AdSkeleton loading={true} key={idx} />
              ))
            ) : (
              <></>
            )}
            {mobileAds.map((ad) => (
              <AdItem key={ad.id} ad={ad} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-black px-80 text-2xl font-bold py-5">Cars</h2>
          <div className="px-80 grid grid-cols-4 gap-4">
            {!carAds.length ? (
              Array.from({ length: 4 }).map((_, idx) => (
                <AdSkeleton loading={true} key={idx} />
              ))
            ) : (
              <></>
            )}
            {carAds.map((ad) => (
              <AdItem key={ad.id} ad={ad} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-black px-80 text-2xl font-bold py-5">Watch</h2>
          <div className="px-80 grid grid-cols-4 gap-4">
            {!watchAds.length ? (
              Array.from({ length: 4 }).map((_, idx) => (
                <AdSkeleton loading={true} key={idx} />
              ))
            ) : (
              <></>
            )}
            {watchAds.map((ad) => (
              <AdItem key={ad.id} ad={ad} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Adds;
