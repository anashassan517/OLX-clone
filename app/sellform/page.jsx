"use client";
import Link from "next/link";
import Image from "next/image";
import { storage } from "../../firebase";
import React, { useState, useEffect } from "react";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { auth } from "../../firebase";

const SellForm = () => {
  const [mainCategories, setMainCategories] = useState([]);
  const [selectedMainCategory, setSelectedMainCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [showSubcategories, setShowSubcategories] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    condition: "",
    price: "",
    location: "",
  });
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth); // Assuming 'auth' is your Firebase authentication object
  const [furtherSubCategories, setFurtherSubCategories] = useState([]);
  const [showFurtherSubcategories, setShowFurtherSubcategories] =
    useState(false);
  const [base64Images, setBase64Images] = useState([]);
  useEffect(() => {
    // Fetch main categories from Firestore
    const fetchMainCategories = async () => {
      try {
        const categoriesRef = collection(db, "categories");
        const mainCategoriesQuery = query(
          categoriesRef,
          where("level", "==", 0)
        );
        const snapshot = await getDocs(mainCategoriesQuery);
        const mainCategoriesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMainCategories(mainCategoriesData);
      } catch (error) {
        console.error("Error fetching main categories:", error);
      }
    };
    fetchMainCategories();
  }, []);

  // Fetch subcategories when the user hovers over a main category
  const fetchSubCategories = async (parentId) => {
    try {
      const categoriesRef = collection(db, "categories");
      const subCategoriesQuery = query(
        categoriesRef,
        where("parentid", "==", parentId)
      );
      const snapshot = await getDocs(subCategoriesQuery);
      const subCategoriesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return subCategoriesData;
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      return [];
    }
  };

  const handleMainCategoryClick = async (categoryId) => {
    setSelectedMainCategory(categoryId);
    setSelectedSubCategory(""); // Reset selected subcategory when a new main category is clicked

    // Fetch and set subcategories for the selected main category
    const subCategoriesData = await fetchSubCategories(categoryId);
    setSubCategories(subCategoriesData);
    setShowSubcategories(subCategoriesData.length > 0);
    setShowFurtherSubcategories(false); // Hide further subcategories
    setShowForm(false); // Reset form visibility when a new main category is clicked
  };

  const handleSubCategoryClick = async (categoryId) => {
    setSelectedSubCategory(categoryId);
    // Check if the selected subcategory has further nested subcategories
    const furtherSubCategoriesData = await fetchSubCategories(categoryId);
    setFurtherSubCategories(furtherSubCategoriesData);
    setShowFurtherSubcategories(furtherSubCategoriesData.length > 0);
    setShowForm(furtherSubCategoriesData.length === 0); // Show the form when a subcategory is clicked
  };
  const handleFurtherSubCategoryClick = async (categoryId) => {
    setSelectedSubCategory(categoryId);
    // Check if the selected subcategory has further nested subcategories
    const furtherSubCategoriesData = await fetchSubCategories(categoryId);
    setFurtherSubCategories(furtherSubCategoriesData);
    setShowFurtherSubcategories(furtherSubCategoriesData.length > 0);
    setSelectedSubCategory(categoryId);

    setShowForm(true); // Show the form when a further subcategory is clicked
  };

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
    alert("Post adding Please Wait....");

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
        alert("No valid images found.");
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
        // Add other relevant fields as needed
      };
      const postsRef = collection(db, "posts");
      await addDoc(postsRef, post);

      console.log("Post added successfully!");
      alert("Post added successfully!");
      setFormData({
        title: "",
        description: "",
        condition: "",
        price: "",
        location: "",
      });
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

  if (loading) {
    // You can show a loading indicator here if needed
    return <div>Loading...</div>;
  }

  if (error || !user) {
    // User is not authenticated, redirect to the login page
    router.push("/login"); // Replace "/login" with the actual path to your login page
    return null;
  }

  return (
    <div>
      <div>
        <Link href="/">
          <Image src="/logo.jpg" height={50} width={50} alt="Company Logo" />
        </Link>
      </div>
      <h3 className="text-black py-1 text-center text-2xl font-bold mb-10">
        POST YOUR AD
      </h3>
      <h3 className="text-black py-1 text-2xl mb-10">Choose Your Category</h3>
      <div className="text-black grid grid-cols-3 gap-8 px-5 py-0">
        {/* Show main categories */}
        <div className="col-span-1">
          {mainCategories.map((category) => (
            <div
              key={category.id}
              // className="hover:bg-sky-100 p-0 border active:bg-sky-200 border-gray-300 rounded-md cursor-pointer mb-0"
              className={`hover:bg-sky-100 p-0 border border-gray-300 rounded-md cursor-pointer mb-0 ${
                selectedMainCategory.includes(category.id)
                  ? "bg-sky-200"
                  : "text-black"
              }`}
              onClick={() => handleMainCategoryClick(category.id)}
            >
              <h3 className="text-lg mt-2">{category.name}</h3>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Image
                  className="flex items-end"
                  src="/images/right-arrow.png"
                  height={10}
                  width={10}
                  alt="arrow"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Show subcategories when the user clicks on a main category */}
        {showSubcategories && (
          <div className="col-span-1">
            {subCategories.map((category) => (
              <div
                key={category.id}
                className={`hover:bg-sky-100 p-0 border border-gray-300 rounded-md cursor-pointer mb-0 ${
                  selectedSubCategory.includes(category.id)
                    ? "bg-sky-200"
                    : "text-black"
                }`}
                onClick={() => handleSubCategoryClick(category.id)}
              >
                <h3 className="text-lg mt-2">{category.name}</h3>
              </div>
            ))}
          </div>
        )}

        {/* Show further subcategories when the user clicks on a subcategory */}
        {showFurtherSubcategories && (
          <div className="col-span-1">
            {furtherSubCategories.map((category) => (
              <div
                key={category.id}
                className={`hover:bg-sky-100 p-0 border border-gray-300 rounded-md cursor-pointer mb-0 ${
                  selectedSubCategory.includes(category.id)
                    ? "bg-sky-200"
                    : "text-black"
                }`}
                onClick={() => handleFurtherSubCategoryClick(category.id)}
              >
                <h3 className="text-lg mt-2">{category.name}</h3>
              </div>
            ))}
          </div>
        )}
      </div>

      {!showFurtherSubcategories && showForm && selectedSubCategory && (
        <div className="text-black max-w-screen-xl mx-auto p-6">
          {/* ... (existing code for the form) */}
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
            <button
              type="submit"
              className="  py-2 px-4 bg-black text-white rounded-md"
            >
              Post Now
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SellForm;
