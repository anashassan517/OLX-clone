"use client";
import React, { useState } from "react";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import Image from "next/image";
import MainLayout from "../../../components/layout/RootLayout";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Footer from "@/components/Footer";

const AdDetail = async ({ params }) => {
  const { id } = params;
  if (!id) {
    return <div>id not found.{id}</div>;
  }
  const { ad } = await getData(id);
  const { title, description, condition, price, location, images } = ad;

  return (
    <>
      <MainLayout>
        <div className="max-w-screen-xl mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              {images.length > 1 ? (
                <Carousel
                  showThumbs={false}
                  infiniteLoop={true}
                  width={590}
                  height={480}
                >
                  {images.map((image, index) => (
                    <div key={index}>
                      <Image
                        width={590}
                        height={480}
                        src={image}
                        alt={`Image ${index + 1}`}
                        className="mb-4 rounded-md"
                      />
                    </div>
                  ))}
                </Carousel>
              ) : (
                <div className="mb-4 rounded-md">
                  <Image
                    width={590}
                    height={480}
                    src={images[0]}
                    alt="Image 1"
                  />
                </div>
              )}
            </div>
            <div>
              <div className="bg-gray-100 p-4 rounded-md mb-4">
                <p className="text-gray-800 text-3xl font-bold mb-2">
                  Rs {price}
                </p>
                <p className="text-black text-2xl font-semibold mb-2">
                  {title}
                </p>
                <p className="text-gray-600 text-xl mb-2">{location}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-md">
                <h3 className="text-black text-lg font-semibold mb-2">
                  Description:
                </h3>
                <p className="text-gray-600">{description}</p>
              </div>

              <div className="bg-gray-100 p-4 rounded-md">
                <h3 className="text-black text-lg font-semibold mb-2">
                  Condition:
                </h3>
                <p className="text-gray-600">{condition}</p>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
      <Footer />
    </>
  );
};
// ...getData function and export statement

const getData = async (adId) => {
  try {
    const adDocRef = doc(db, "posts", adId);
    const adDocSnapshot = await getDoc(adDocRef);
    if (adDocSnapshot.exists()) {
      const adData = adDocSnapshot.data();
      return { ad: adData ? adData : null }; // Ensure adData is not null
    } else {
      return { ad: null };
    }
  } catch (error) {
    console.error("Error fetching ad:", error);
  }
};
export default AdDetail;
