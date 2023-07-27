"use client";

import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import Link from "next/link";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { auth } from "../../firebase";

const SellForm = () => {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);

  const [selectedMainCategory, setSelectedMainCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [mainCategories, setMainCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [showSubcategories, setShowSubcategories] = useState(false);
  const [showNestedSubcategories, setshowNestedSubcategories] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    condition: "",
    price: "",
    location: "",
  });

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
  useEffect(() => {
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

    if (selectedMainCategory) {
      fetchSubCategories(selectedMainCategory).then((subCategoriesData) => {
        setSubCategories(subCategoriesData);
        setShowSubcategories(true);
        setSelectedSubCategory(""); // Reset selected subcategory when a new main category is selected
      });
    } else {
      setSubCategories([]);
      setShowSubcategories(false);
    }
  }, [selectedMainCategory]);
  if (loading) {
    // You can show a loading indicator here if needed
    return <div>Loading...</div>;
  }

  if (error || !user) {
    // User is not authenticated, redirect to the login page
    router.push("/login"); // Replace "/login" with the actual path to your login page
    return null;
  }

  const handleMainCategoryChange = (e) => {
    setSelectedMainCategory(e.target.value);
    setShowForm(false); // Reset form visibility when a new main category is selected
  };

  const handleSubCategoryChange = (e) => {
    console.log("sub category clicked");
    setSelectedSubCategory(e.target.value);
    setShowForm(true); // Show the form when a subcategory is selected
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
    } catch (error) {
      console.error("Error adding post:", error);
      alert("Error adding post:", error);
    }
  };

  return (
    <div>
      <div>
        <Link href="/">
          <Image src="/logo.jpg" height={50} width={50} alt="Company Logo" />
        </Link>
      </div>

      <h3 className="py-10 text-center text-2xl font-bold mb-10">
        POST YOUR AD
      </h3>
      <h3 className="py-1 text-2xl mb-10">Choose Your Category</h3>
      <div className="grid grid-cols-3 gap-8 px-3 py-3">
        {/* Show main categories */}
        <div className="col-span-1 ">
          {mainCategories.map((category) => (
            <div
              key={category.id}
              className="hover:bg-sky-100 p-1 border border-gray-300 rounded-md cursor-pointer mb-4"
              onMouseEnter={() =>
                handleMainCategoryChange({ target: { value: category.id } })
              }
            >
              <h3 className=" text-lg">{category.name}</h3>
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

        {/* Show subcategories when the user hovers over a main category */}
        {showSubcategories && (
          <div className="col-span-1">
            {subCategories.map((category) => (
              <div
                key={category.id}
                className="hover:bg-sky-100 p-1 border border-gray-300 rounded-md cursor-pointer mb-4"
                onMouseEnter={() =>
                  handleSubCategoryChange({ target: { value: category.id } })
                }
              >
                <h3 className=" text-lg mt-2">{category.name}</h3>
              </div>
            ))}
          </div>
        )}

        {/* Show nested subcategories when the user hovers over a subcategory */}
        {/* {showNestedSubcategories && (
    <div className="col-span-1">
      {nestedSubCategories.map((category) => (
        <div
          key={category.id}
          className="p-2 border border-gray-300 rounded-md cursor-pointer mb-4"
          onMouseEnter={() => handleNestedSubCategoryChange({ target: { value: category.id } })}
        >
          <h3 className="text-lg mt-2">{category.name}</h3>
        </div>
      ))}
    </div>
  )} */}
      </div>

      {/* Show form when the user selects a subcategory */}
      {showForm && selectedSubCategory && (
        <div className="max-w-screen-xl mx-auto p-6">
          {/* ... (existing code for the form) */}
          <form onSubmit={handleSubmit} className="dropzone space-y-4">
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

// import Link from "next/link";
// import Image from "next/image";
// import { storage } from "../../firebase";
// import React, { useState, useEffect } from "react";
// import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
// import { db } from "../../firebase";
// import { ref, uploadString, getDownloadURL } from "firebase/storage";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { useRouter } from "next/navigation";
// import { auth } from "../../firebase";

// const SellForm = () => {
//   const [mainCategories, setMainCategories] = useState([]);
//   const [selectedMainCategory, setSelectedMainCategory] = useState("");
//   const [subCategories, setSubCategories] = useState([]);
//   const [selectedSubCategory, setSelectedSubCategory] = useState("");
//   const [showSubcategories, setShowSubcategories] = useState(false);
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     condition: "",
//     price: "",
//     location: "",
//   });

//   useEffect(() => {
//     // Fetch main categories from Firestore
//     const fetchMainCategories = async () => {
//       try {
//         const categoriesRef = collection(db, "categories");
//         const mainCategoriesQuery = query(
//           categoriesRef,
//           where("level", "==", 0)
//         );
//         const snapshot = await getDocs(mainCategoriesQuery);
//         const mainCategoriesData = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setMainCategories(mainCategoriesData);
//       } catch (error) {
//         console.error("Error fetching main categories:", error);
//       }
//     };
//     fetchMainCategories();
//   }, []);

//   const fetchSubCategories = async (parentId) => {
//     try {
//       const categoriesRef = collection(db, "categories");
//       const subCategoriesQuery = query(
//         categoriesRef,
//         where("parentid", "==", parentId)
//       );
//       const snapshot = await getDocs(subCategoriesQuery);
//       const subCategoriesData = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       return subCategoriesData;
//     } catch (error) {
//       console.error("Error fetching subcategories:", error);
//       return [];
//     }
//   };

//   const handleMainCategoryClick = async (categoryId) => {
//     setSelectedMainCategory(categoryId);
//     setSelectedSubCategory(""); // Reset selected subcategory when a new main category is clicked

//     // Fetch and set subcategories for the selected main category
//     const subCategoriesData = await fetchSubCategories(categoryId);
//     setSubCategories(subCategoriesData);
//     setShowSubcategories(subCategoriesData.length > 0);
//     setShowForm(false); // Reset form visibility when a new main category is clicked
//   };

//   const handleSubCategoryClick = async (categoryId) => {
//     setSelectedSubCategory(categoryId);
//     // setShowForm(true); // Show the form when a subcategory is clicked

//     // Check if the selected subcategory has further nested subcategories
//     const hasFurtherSubcategories = await checkFurtherSubcategories(categoryId);
//     console.log("checkFurtherSubcategories length:", checkFurtherSubcategories);
//     if (hasFurtherSubcategories != null) {
//       setSubCategories(hasFurtherSubcategories);
//       setShowSubcategories(hasFurtherSubcategories);
//       setShowForm(false);
//     }
//     setShowForm(true);
//     // Show the form when a subcategory is clicked
//   };

//   const checkFurtherSubcategories = async (selectedCategoryId) => {
//     try {
//       console.log("Subcategories id:", selectedCategoryId);

//       const categoriesRef = collection(db, "categories");
//       const subCategoriesQuery = query(
//         categoriesRef,
//         where("parentid", "==", selectedCategoryId)
//       );
//       const snapshot = await getDocs(subCategoriesQuery);
//       const subCategoriesData = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));

//       return subCategoriesData;
//     } catch (error) {
//       console.error("Error fetching subcategories:", error);
//       return false;
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
//   };

//   const handleImageUpload = (e) => {
//     const files = e.target.files;
//     const images = [];
//     for (let i = 0; i < files.length; i++) {
//       const file = files[i];
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         images.push({ name: file.name, data: reader.result });
//         if (images.length === files.length) {
//           setBase64Images(images);
//         }
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     alert("Post adding Please Wait....");

//     // Store images in Firebase Storage and get their URLs
//     const imageUrls = [];
//     for (const image of base64Images) {
//       const imageRef = ref(storage, `images/${formData.title}${image.name}`);
//       await uploadString(imageRef, image.data, "data_url");
//       const imageUrl = await getDownloadURL(imageRef);
//       if (imageUrl) {
//         imageUrls.push(imageUrl);
//       }
//     }

//     // Create a new document in the "posts" collection with form data and image URLs
//     try {
//       if (imageUrls.length === 0) {
//         console.error("No valid images found.");
//         alert("No valid images found.");
//         return;
//       }

//       const post = {
//         mainCategory: selectedMainCategory,
//         subCategory: selectedSubCategory,
//         title: formData.title,
//         description: formData.description,
//         condition: formData.condition,
//         price: formData.price,
//         location: formData.location,
//         images: imageUrls,
//         // Add other relevant fields as needed
//       };
//       console.log(
//         "mainCategories,sub category",
//         selectedMainCategory,
//         selectedSubCategory
//       );
//       const postsRef = collection(db, "posts");
//       await addDoc(postsRef, post);

//       console.log("Post added successfully!");
//       alert("Post added successfully!");
//     } catch (error) {
//       console.error("Error adding post:", error);
//       alert("Error adding post:", error);
//     }
//   };

//   return (
//     <div>
//       <div>
//         <Link href="/">
//           <Image src="/logo.jpg" height={50} width={50} alt="Company Logo" />
//         </Link>
//       </div>
//       <h3 className="py-10 text-center text-2xl font-bold mb-10">
//         POST YOUR AD
//       </h3>
//       <h3 className="py-1 text-2xl mb-10">Choose Your Category</h3>
//       <div className="grid grid-cols-3 gap-8 px-5 py-1">
//         {/* Show main categories */}
//         <div className="col-span-1">
//           {mainCategories.map((category) => (
//             <div
//               key={category.id}
//               className="hover:bg-sky-100 p-1 border border-gray-300 rounded-md cursor-pointer mb-4"
//               onClick={() => handleMainCategoryClick(category.id)}
//             >
//               <h3 className="text-lg mt-2">{category.name}</h3>
//               <div style={{ display: "flex", justifyContent: "flex-end" }}>
//                 <Image
//                   className="flex items-end"
//                   src="/images/right-arrow.png"
//                   height={10}
//                   width={10}
//                   alt="arrow"
//                 />
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Show subcategories when the user hovers over a main category */}
//         {showSubcategories && (
//           <div className="col-span-1">
//             {subCategories.map((category) => (
//               <div
//                 key={category.id}
//                 className="hover:bg-sky-100 p-1 border border-gray-300 rounded-md cursor-pointer mb-4"
//                 onClick={() => handleSubCategoryClick(category.id)}
//               >
//                 <h3 className="text-lg mt-2">{category.name}</h3>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//       {showForm && selectedSubCategory && (
//         <div className="max-w-screen-xl mx-auto p-6">
//           {/* ... (existing code for the form) */}
//           <form onSubmit={handleSubmit} className="dropzone space-y-4">
//             <label className="px-4 py-4">
//               Ad Title:
//               <input
//                 type="text"
//                 name="title"
//                 placeholder="Title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-2 border border-gray-300 rounded-md"
//               />
//             </label>
//             <label className="h-32 w-32 p-4 px-4 py-4">
//               Description:
//               <input
//                 type="text"
//                 width={300}
//                 name="description"
//                 placeholder="Add Details"
//                 value={formData.description}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-2 border border-gray-300 rounded-md"
//               />
//             </label>
//             <label className="px-4 py-4">
//               Condition:
//               <input
//                 type="text"
//                 name="condition"
//                 placeholder="New or Used?"
//                 value={formData.condition}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-2 border border-gray-300 rounded-md"
//               />
//             </label>
//             <label className="px-4 py-4">
//               Price:
//               <input
//                 type="number"
//                 name="price"
//                 placeholder="Price"
//                 value={formData.price}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-2 border border-gray-300 rounded-md"
//               />
//             </label>
//             <label className="px-4 py-4">
//               Location:
//               <input
//                 type="text"
//                 name="location"
//                 placeholder="Add Location"
//                 value={formData.location}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-2 border border-gray-300 rounded-md"
//               />
//               <input
//                 type="file"
//                 accept="image/*"
//                 multiple
//                 required
//                 onChange={handleImageUpload}
//               />
//             </label>
//             <button
//               type="submit"
//               className="  py-2 px-4 bg-black text-white rounded-md"
//             >
//               Post Now
//             </button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SellForm;
