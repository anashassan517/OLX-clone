import React from "react";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import Image from "next/image";
import MainLayout from "../../../components/layout/RootLayout";

const AdDetail = async ({ params }) => {
  const { id } = params;
  if (!id) {
    return <div>id not found.{id}</div>;
  }
  const { ad } = await getData(id);
  const { title, description, condition, price, location, images } = ad;
  return (
    <MainLayout>
      <div className="max-w-screen-xl mx-auto p-6">
        <h2 className="text-black px-80 text-3xl font-bold mb-10">{title}</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            {images.map((image, index) => (
              <Image
                key={index}
                width={500}
                height={500}
                src={image}
                alt={`Image ${index + 1}`}
                className="mb-4 rounded-md"
              />
            ))}
          </div>
          <div>
            <p className="px-52 text-gray-800 text-2xl font-bold mt-1">
              Rs {price}
            </p>
            <h3 className="text-black px-52 text-lg font-semibold mt-2">
              Description:
            </h3>
            <p className="px-52 text-gray-600">{description}</p>
            <h3 className="text-black px-52 text-lg font-semibold mt-2">
              Condition:
            </h3>
            <p className="px-52 text-gray-600">{condition}</p>
            <h3 className="text-black px-52 text-lg font-semibold mt-2">
              Location:
            </h3>
            <p className="px-52 text-gray-600">{location}</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

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
