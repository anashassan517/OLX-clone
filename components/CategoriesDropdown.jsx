// import React, { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// const CategoriesDropdown = () => {
//   const router = useRouter();

//   const handleCategoryChange = (event) => {
//     const selectedCategory = event.target.value;
//     if (selectedCategory) {
//       router.push(
//         `/${encodeURIComponent(
//           selectedCategory.toLowerCase().replace(/ /g, "-")
//         )}`
//       );
//     } else {
//       router.push("/");
//     }
//   };
//   return (
//     <div>
//       <select id="category">
//         <option value="">All Categories</option>
//         <optgroup label="Mobiles">
//           <option value="mobile-phones">Mobile Phones</option>
//           <option value="Accessories">Accessories</option>
//           <option value="Smart Watches">Smart Watches</option>
//           <option value="Tablets">Tablets</option>
//         </optgroup>
//         <optgroup label="Vehicles">
//           <option value="Cars">Cars</option>
//           <option value="Buses, Vans & Trucks">Buses, Vans & Trucks</option>
//         </optgroup>
//         <optgroup label="Property for Sale">
//           <option value="Land & Plots">Land & Plots</option>
//           <option value="Houses">Houses</option>
//           <option value="Apartments & Flats">Apartments & Flats</option>

//           <option value="Portions & Floors">Portions & Floors</option>
//         </optgroup>
//         <optgroup label="Property for Rent">
//           <option value="Portions & Floors">Portions & Floors</option>
//           <option value="Houses">Houses</option>
//           <option value="Apartments & Flats">Apartments & Flats</option>
//           <option value="Land & Plots">Land & Plots</option>
//         </optgroup>
//         <optgroup label="Bikes">
//           <option value="Motorcycles">Motorcycles</option>
//           <option value="Bicycles">Bicycles</option>
//         </optgroup>
//       </select>
//     </div>
//   );
// };

// export default CategoriesDropdown;

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CategoriesDropdown = () => {
  const router = useRouter();

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    if (selectedCategory) {
      console.log(selectedCategory);
      if (
        selectedCategory === "mobile-phones" ||
        selectedCategory === "Accessories" ||
        selectedCategory === "Tablets" ||
        selectedCategory === "Smart Watches"
      )
        router.push(`/mobile-phones`);
      else if (
        selectedCategory === "Cars" ||
        selectedCategory === "Buses, Vans & Trucks"
      )
        router.push(`/motors`);
      else if (
        selectedCategory === "bikes" ||
        selectedCategory === "Motorcycles" ||
        selectedCategory === "Bicycles"
      )
        router.push(`/bikes`);
      else if (selectedCategory === "Plots" || selectedCategory === "Portions")
        router.push(`/property-for-sale`);
      else if (
        selectedCategory === "Land & Plots" ||
        selectedCategory === "Portions & Floors"
      )
        router.push(`/property-for-rent`);
    } else {
      router.push("/");
    }
  };

  return (
    <div>
      <select id="category" onChange={handleCategoryChange}>
        <option value="">All Categories</option>
        <optgroup label="Mobiles">
          <option value="mobile-phones">Mobile Phones</option>
          <option value="Accessories">Accessories</option>
          <option value="Smart Watches">Smart Watches</option>
          <option value="Tablets">Tablets</option>
        </optgroup>
        <optgroup label="Vehicles">
          <option value="Cars">Cars</option>
          <option value="Buses, Vans & Trucks">Buses, Vans & Trucks</option>
        </optgroup>
        <optgroup label="Property for Sale">
          <option value="Plots">Plots</option>
          <option value="Portions">Portions</option>
        </optgroup>
        <optgroup label="Property for Rent">
          <option value="Portions & Floors">Portions & Floors</option>
          <option value="Land & Plots">Land & Plots</option>
        </optgroup>
        <optgroup label="Bikes">
          <option value="Motorcycles">Motorcycles</option>
          <option value="Bicycles">Bicycles</option>
        </optgroup>
      </select>
    </div>
  );
};

export default CategoriesDropdown;
