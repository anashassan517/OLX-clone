"use client";
// // components/Adds.js
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../firebase";

// const Adds = () => {
//   const [ads, setAds] = useState([]);

//   useEffect(() => {
//     // Fetch ads data from Firestore
//     const fetchAds = async () => {
//       try {
//         const adsRef = collection(db, "posts");
//         const snapshot = await getDocs(adsRef);
//         const adsData = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setAds(adsData);
//       } catch (error) {
//         console.error("Error fetching ads:", error);
//       }
//     };
//     fetchAds();
//   }, []);

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-16 pd:300 flex space-x-10"></h2>
//       <h2 className="text-2xl font-bold mb-10">Ads List</h2>

//       <div className="grid grid-cols-4 ">
//         {ads.map((ad) => (
//           <Link key={ad.id} href={`/ad/${ad.id}`}>
//             <div className="p-2 w-60 border border-gray-300 rounded-md">
//               <Image
//                 src={ad.images[0]} // Displaying only the first image for each ad
//                 alt={ad.title}
//                 width={200}
//                 height={200}
//                 objectFit="cover"
//               />
//               <p className="text-gray-800 font-bold mt-1">Rs {ad.price}</p>
//               <h3 className="text-lg font-semibold mt-2">{ad.title}</h3>
//               <p className="text-gray-600">{ad.location}</p>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Adds;

// components/Add.jsx
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../firebase";

// const Adds = () => {
//   const [ads, setAds] = useState([]);

//   useEffect(() => {
//     // Fetch ads data from Firestore
//     const fetchAds = async () => {
//       try {
//         const adsRef = collection(db, "posts");
//         const snapshot = await getDocs(adsRef);
//         const adsData = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setAds(adsData);
//       } catch (error) {
//         console.error("Error fetching ads:", error);
//       }
//     };
//     fetchAds();
//   }, []);

//   return (
//     <div>
//       <h2 className="px-80 text-2xl font-bold mb-10  py-20">Ads List</h2>
//       <div className="px-80 grid grid-cols-4 gap-4">
//         {ads.map((ad) => (
//           <Link key={ad.id} href={`/ad/${ad.id}`}>
//             <div className="p-2 w-60 border border-gray-300 rounded-md">
//               <Image
//                 src={ad.images[0]} // Displaying only the first image for each ad
//                 alt={ad.title}
//                 width={200}
//                 height={200}
//                 objectFit="cover"
//               />
//               <p className="text-gray-800 font-bold mt-1">Rs {ad.price}</p>
//               <h3 className="text-lg font-semibold mt-2">{ad.title}</h3>
//               <p className="text-gray-600">{ad.location}</p>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Adds;
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { collection, query, where, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const Adds = () => {
  const [mobileAds, setMobileAds] = useState([]);
  const [carAds, setCarAds] = useState([]);
  const [watchAds, setWatchAds] = useState([]);
  const auth = getAuth();

  // Function to handle adding an ad to the user's wishlist
  const handleAddToWishlist = async (adId) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.error("User is not logged in.");
        return;
      }

      const adRef = doc(db, "users", user.uid, "wishlist", adId);
      await setDoc(adRef, { adId });

      console.log(`Ad with ID ${adId} added to the user's wishlist.`);
    } catch (error) {
      console.error("Error adding ad to the user's wishlist:", error);
    }
  };
  useEffect(() => {
    // Fetch ads data from Firestore for each category
    const fetchAds = async () => {
      try {
        const adsRef = collection(db, "posts");
        const mobilePhonesCategoryId = "sjOQd9a6uKO3wBc4JYe3"; // Replace with the actual category ID for mobile phones
        const carsCategoryId = "uybc5bdmm1oC7rFvxmeh"; // Replace with the actual category ID for cars
        const watchesCategoryId = "YTGpHYVF9S4j0vsY0BFG"; // Replace with the actual category ID for watches

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
    };
    fetchAds();
  }, []);

  return (
    <div>
      <div>
        <h2 className="text-black px-80 text-2xl font-bold mb-10 py-10">
          Mobile Phones
        </h2>
        <div className="px-80 grid grid-cols-4 gap-4">
        {mobileAds.map((ad) => (
          <div key={ad.id} className="p-2 w-60 border border-gray-300 rounded-md">
            <Image src={ad.images[0]} alt={ad.title} width={200} height={200} />
            <p className="text-gray-800 font-bold mt-1">Rs {ad.price}</p>
            <h3 className="text-black text-lg font-semibold mt-2">{ad.title}</h3>
            <p className="text-gray-600">{ad.location}</p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
              onClick={() => handleAddToWishlist(ad.id)}
            >
              Add to Wishlist
            </button>
          </div>
        ))}
        </div>
      </div>

      <div>
        <h2 className="text-black px-80 text-2xl font-bold mb-10 py-5">Cars</h2>
        <div className="px-80 grid grid-cols-4 gap-4">
          {carAds.map((ad) => (
            <Link key={ad.id} href={`/ad/${ad.id}`}>
              <div className="p-2 w-60 border border-gray-300 rounded-md">
                <Image
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
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-black px-80 text-2xl font-bold mb-10 py-5">
          Watch
        </h2>
        <div className="px-80 grid grid-cols-4 gap-4">
          {watchAds.map((ad) => (
            <Link key={ad.id} href={`/ad/${ad.id}`}>
              <div className="p-2 w-60 border border-gray-300 rounded-md">
                <Image
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
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Adds;
