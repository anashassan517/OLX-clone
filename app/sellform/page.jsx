"use client";
// import Link from "next/link";
// import Image from "next/image";
// import React, { useState, useEffect } from "react";
// import { collection, query, where, getDocs } from "firebase/firestore";
// import { db } from "../../firebase";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { useRouter } from "next/navigation";
// import { auth } from "../../firebase";
// import AdForms from "./../../components/AdForms";
// // import AdForm from "./../adform";
// const SellForm = () => {
//   const [mainCategories, setMainCategories] = useState([]);
//   const [selectedMainCategory, setSelectedMainCategory] = useState("");
//   const [subCategories, setSubCategories] = useState([]);
//   const [selectedSubCategory, setSelectedSubCategory] = useState("");
//   const [showSubcategories, setShowSubcategories] = useState(false);
//   const [showForm, setShowForm] = useState(false);
//   const router = useRouter();
//   const [user, loading, error] = useAuthState(auth); // Assuming 'auth' is your Firebase authentication object
//   const [furtherSubCategories, setFurtherSubCategories] = useState([]);
//   const [showFurtherSubcategories, setShowFurtherSubcategories] =
//     useState(false);
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

//   // Fetch subcategories when the user hovers over a main category
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
//     setShowFurtherSubcategories(false); // Hide further subcategories
//     setShowForm(false); // Reset form visibility when a new main category is clicked
//   };

//   const handleSubCategoryClick = async (categoryId) => {
//     setSelectedSubCategory(categoryId);
//     // Check if the selected subcategory has further nested subcategories
//     const furtherSubCategoriesData = await fetchSubCategories(categoryId);
//     setFurtherSubCategories(furtherSubCategoriesData);
//     setShowFurtherSubcategories(furtherSubCategoriesData.length > 0);
//     setShowForm(furtherSubCategoriesData.length === 0); // Show the form when a subcategory is clicked
//   };
//   const handleFurtherSubCategoryClick = async (categoryId) => {
//     setSelectedSubCategory(categoryId);
//     // Check if the selected subcategory has further nested subcategories
//     const furtherSubCategoriesData = await fetchSubCategories(categoryId);
//     setFurtherSubCategories(furtherSubCategoriesData);
//     setShowFurtherSubcategories(furtherSubCategoriesData.length > 0);
//     setSelectedSubCategory(categoryId);

//     setShowForm(true); // Show the form when a further subcategory is clicked
//   };

//   if (loading) {
//     // You can show a loading indicator here if needed
//     return <div>Loading...</div>;
//   }

//   if (error || !user) {
//     // User is not authenticated, redirect to the login page
//     router.push("/login");
//     return null;
//   }

//   return (
//     <div>
//       <nav className="bg-slate-50">
//         <div className="container mx-auto py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <Link href="/">
//                 <Image
//                   src="/logo.svg"
//                   height={65}
//                   width={65}
//                   alt="Company Logo"
//                 />
//               </Link>
//             </div>
//           </div>
//         </div>
//       </nav>
//       <h3 className="text-black py-1 text-center text-2xl font-bold mb-10">
//         POST YOUR AD
//       </h3>
//       <h3 className="text-black py-1 text-center text-2xl mb-5">
//         Choose Your Category
//       </h3>
//       <div className="text-black px-96 grid grid-cols-3 gap-8 py-0">
//         {/* Show main categories */}
//         <div className="col-span-1">
//           {mainCategories.map((category) => (
//             <div
//               key={category.id}
//               className={`hover:bg-sky-100   p-0 border border-gray-300 rounded-md cursor-pointer mb-0 ${
//                 selectedMainCategory.includes(category.id)
//                   ? "bg-sky-200"
//                   : "text-black"
//               }`}
//               onClick={() => handleMainCategoryClick(category.id)}
//             >
//               <h3 className="text-lg">{category.name}</h3>
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

//         {/* Show subcategories when the user clicks on a main category */}
//         {showSubcategories && (
//           <div className="col-span-1">
//             {subCategories.map((category) => (
//               <div
//                 key={category.id}
//                 className={`hover:bg-sky-100 p-0 border border-gray-300 rounded-md cursor-pointer mb-0 ${
//                   selectedSubCategory.includes(category.id)
//                     ? "bg-sky-200"
//                     : "text-black"
//                 }`}
//                 onClick={() => handleSubCategoryClick(category.id)}
//               >
//                 <h3 className="text-lg mt-2">{category.name}</h3>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Show further subcategories when the user clicks on a subcategory */}
//         {showFurtherSubcategories && (
//           <div className="col-span-1">
//             {furtherSubCategories.map((category) => (
//               <div
//                 key={category.id}
//                 className={`hover:bg-sky-100 p-0 border border-gray-300 rounded-md cursor-pointer mb-0 ${
//                   selectedSubCategory.includes(category.id)
//                     ? "bg-sky-200"
//                     : "text-black"
//                 }`}
//                 onClick={() => handleFurtherSubCategoryClick(category.id)}
//               >
//                 <h3 className="text-lg mt-2">{category.name}</h3>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {!showFurtherSubcategories && showForm && selectedSubCategory && (
//         <div className="text-black max-w-screen-xl mx-auto p-6">
//           <AdForms
//             selectedMainCategory={selectedMainCategory}
//             selectedSubCategory={selectedSubCategory}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default SellForm;

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { auth } from "../../firebase";
import AdForms from "./../../components/AdForms";
// import AdForm from "./../adform";
const SellForm = () => {
  const [mainCategories, setMainCategories] = useState([]);
  const [selectedMainCategory, setSelectedMainCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [showSubcategories, setShowSubcategories] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth); // Assuming 'auth' is your Firebase authentication object
  const [furtherSubCategories, setFurtherSubCategories] = useState([]);
  const [showFurtherSubcategories, setShowFurtherSubcategories] =
    useState(false);
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
    setShowForm(true);
    const furtherSubCategoriesData = await fetchSubCategories(categoryId);

    setFurtherSubCategories(furtherSubCategoriesData);
    setShowForm(furtherSubCategoriesData.length === 0); // Show the form when a subcategory is clicked
    setShowFurtherSubcategories(furtherSubCategoriesData.length > 0);
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

  if (loading) {
    // You can show a loading indicator here if needed
    return <div>Loading...</div>;
  }

  if (error || !user) {
    // User is not authenticated, redirect to the login page
    router.push("/login");
    return null;
  }

  return (
    <div>
      <nav className="bg-slate-50">
        <div className="container mx-auto py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/">
                <Image
                  src="/logo.svg"
                  height={65}
                  width={65}
                  alt="Company Logo"
                />
              </Link>
            </div>
          </div>
        </div>
        <h3 className="text-black py-1 text-center text-2xl font-bold mb-10">
          POST YOUR AD
        </h3>

        {showForm && selectedSubCategory && (
          <div className="text-black max-w-screen-xl mx-auto p-6">
            <AdForms
              selectedMainCategory={selectedMainCategory}
              selectedSubCategory={selectedSubCategory}
            />
          </div>
        )}
      </nav>

      {!showForm && (
        <div className="text-black px-96 grid grid-cols-3 gap-8 py-0">
          {/* Show main categories */}
          <div className="col-span-1">
            {mainCategories.map((category) => (
              <div
                key={category.id}
                className={`hover:bg-sky-100   p-0 border border-gray-300 rounded-md cursor-pointer mb-0 ${
                  selectedMainCategory.includes(category.id)
                    ? "bg-sky-200"
                    : "text-black"
                }`}
                onClick={() => handleMainCategoryClick(category.id)}
              >
                <h3 className="text-lg">{category.name}</h3>
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
      )}
    </div>
  );
};

export default SellForm;
