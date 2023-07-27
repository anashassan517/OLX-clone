import React, { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "./../firebase"; // Update the path to your Firebase configuration file

import { collection, query, where, orderBy } from "firebase/firestore";

const CategoriesDropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleToggleDropdown = () => {
    setShowDropdown((prevShowDropdown) => !prevShowDropdown);
  };

  const categoriesRef = collection(db, "categories");
  const q = query(
    categoriesRef,
    // where('parentid', '==', 'NULL'),
    // where('level', '==', 0),
    orderBy("level")
  );

  const [categories] = useCollectionData(q, { idField: "id" });

  return (
    <div className="relative">
      <button
        className="category all-categories"
        onClick={handleToggleDropdown}
      >
        All Categories
      </button>
      {showDropdown && (
        <ul className="absolute z-70 top-58 left-0 w-48 bg-white shadow-md">
          {categories &&
            categories.map((category) => (
              <li key={category.id}>
                <button className="category">{category.name}</button>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};


export default CategoriesDropdown;
