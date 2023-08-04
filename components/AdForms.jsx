import Link from "next/link";
import Image from "next/image";
import { storage } from "../firebase";
import React, { useState, useEffect } from "react";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { auth } from "../firebase";
const AdForms = ({ selectedMainCategory, selectedSubCategory }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    condition: "",
    price: "",
    location: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [base64Images, setBase64Images] = useState([]);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    const images = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onloadend = () => {
        images.push({ name: file.name, data: reader.result });
        if (images.length === files.length) {
          setBase64Images(images);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Set isSubmitting to true when the form is being submitted
    // alert("Post adding Please Wait....");

    // Store images in Firebase Storage and get their URLs
    const imageUrls = [];
    for (const image of base64Images) {
      const imageRef = ref(storage, `images/${formData.title}${image.name}`);
      await uploadString(imageRef, image.data, "data_url");
      const imageUrl = await getDownloadURL(imageRef);
      if (imageUrl) {
        imageUrls.push(imageUrl);
      }
    }

    // Create a new document in the "posts" collection with form data and image URLs
    try {
      if (imageUrls.length === 0) {
        console.error("No valid images found.");
        alert("Please upload atleast 1 image");
        return;
      }

      const post = {
        mainCategory: selectedMainCategory,
        subCategory: selectedSubCategory,
        title: formData.title,
        description: formData.description,
        condition: formData.condition,
        price: formData.price,
        location: formData.location,
        images: imageUrls,
      };
      const postsRef = collection(db, "posts");
      const docRef = await addDoc(postsRef, post);
      setIsSubmitting(false); // Reset isSubmitting to false after the submission is complete
      // console.log("Post added successfully!");
      alert("Post added successfully!\nRedirecting to your Post..");
      const postId = docRef.id;

      // Navigate to the post details page with the ID

      setFormData({
        title: "",
        description: "",
        condition: "",
        price: "",
        location: "",
      });
      router.push(`/ad/${postId}`);
    } catch (error) {
      console.error("Error adding post:", error);
      alert("Error adding post:", error);
      setFormData({
        title: "",
        description: "",
        condition: "",
        price: "",
        location: "",
      });
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="dropzone space-y-4">
        <h4 className="text-black py-1 text-center text-2xl font-bold">
          Include Details
        </h4>
        <label className="px-4 py-4">
          Ad Title:
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </label>
        <label className="h-32 w-32 p-4 px-4 py-4">
          Description:
          <input
            type="text"
            width={300}
            name="description"
            placeholder="Add Details"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </label>
        <label className="px-4 py-4">
          Condition:
          <input
            type="text"
            name="condition"
            placeholder="New or Used?"
            value={formData.condition}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </label>
        <label className="px-4 py-4">
          Price:
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </label>
        <label className="px-4 py-4">
          Location:
          <input
            type="text"
            name="location"
            placeholder="Add Location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="file"
            accept="image/*"
            multiple
            required
            onChange={handleImageUpload}
          />
        </label>
        {/* <button
              type="submit"
              className="  py-2 px-4 bg-black text-white rounded-md"
            >
              Post Now
            </button> */}
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            disabled={isSubmitting} // Disable the button while submitting
            className="py-2 px-4 bg-black text-white rounded-md"
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <span className="mr-2">Submitting...</span>
                <div className="animate-spin w-5 h-5 border-t-2 border-b-2 border-white"></div>
              </div>
            ) : (
              "Post Now"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdForms;
