"use client";
import Link from "next/link";
import styles from "./Navbar.module.css";
import Image from "next/image";

import CategoriesDropdown from "../../components/CategoriesDropdown";
import Searchbox from "../../components/Seacrhbox";
import { useEffect } from "react";
// arrow function () => {}
// function name() {}

// Class based or Functional based

// States --> What/Why/How
// Props
// Hooks --> Why/How/How many --> useState/useEffect
// Component Lifecycle events in functional components
// Composable / Higher Order Component
// Conditional Rendering
// Mapping Data

import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useState } from "react";
// import { profile } from "./";

const handleLogout = () => {
  auth.signOut();
  <link href="/" />;
};

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [user] = useAuthState(auth);
  const handleProfileDropdown = () => {
    setShowDropdown((prevShowDropdown) => !prevShowDropdown);
  };
  const [filteredAds, setFilteredAds] = useState([]);
  const [allAds, setAllAds] = useState([]);

  useEffect(() => {
    // Fetch all ads data from Firestore
    const fetchAds = async () => {
      try {
        const adsRef = collection(db, "posts");
        const snapshot = await getDocs(adsRef);
        const adsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllAds(adsData);
      } catch (error) {
        console.error("Error fetching ads:", error);
      }
    };
    fetchAds();
  }, []);

  useEffect(() => {
    // Filter ads based on the search query
    const filteredAds = allAds.filter((ad) =>
      ad.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredAds(filteredAds);
  }, [searchQuery, allAds]);
  return (
    <nav className="bg-slate-50">
      <title>OLX - Buy And Sell For Free Enywhere</title>
      <div className={styles.topLine}>
        <div>
          <Link href="/">
            <Image src="/logo.jpg" height={50} width={50} alt="Company Logo" />
          </Link>
        </div>
        <div className="px-7 flex-auto">
          <Link href="/motors">Motors</Link>
          <Link className="px-5" href="/property">
            Property
          </Link>
        </div>
      </div>
      <div className={styles.bottomLine}>
        <div className={styles.searchBox}>
          <input type="text" placeholder="Pakistan" />
        </div>

        <div className={styles.searchBox}>
          <Searchbox
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>

        {user ? (
          <div className="relative">
            <div
              className="flex items-center cursor-pointer"
              onClick={handleProfileDropdown}
            >
              <Image
                src="/images/iconProfilePicture.png"
                alt="Profile image"
                width={200}
                height={100}
                className="rounded-full"
              />
            </div>
            {showDropdown && (
              <ul className="p-7 absolute top-12 right-0 bg-white rounded shadow">
                <h2 className="text-center text-1x1">Hello,</h2>
                <h3 className="text-center text-1xl font-bold mb-4">
                  {user.displayName}
                </h3>

                <li>
                  <Link
                    href="/profile"
                    // href="<Profile user={user}/>"
                    className="text-gray-800 block px-4 py-2 hover:bg-sky-100"
                  >
                    View and Edit Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/my-ads"
                    className="text-gray-800 block px-4 py-2 hover:bg-sky-100"
                  >
                    My Ads
                  </Link>
                </li>
                <li>
                  <Link
                    href="/buy-package"
                    className="text-gray-800 block px-4 py-2 hover:bg-sky-100"
                  >
                    Buy Package
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-red-600 block px-4 py-2 hover:bg-sky-100"
                  >
                    Log Out
                  </button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <div className="text-black">
            <Link href="/login">Login</Link>
          </div>
        )}

        <div className={styles.sellButton}>
          {/* <button>Sell</button> */}
          <Link
            href="/sellform"
            className="bg-slate-200 text-black font-bold py-4 px-3 rounded"
          >
            Sell
          </Link>
        </div>
      </div>
      <div className={styles.thirdLine}>
        <div className={styles.categoriesDropdown}>
          <CategoriesDropdown />
        </div>
        <div className={styles.categories}>
          <Link href="/mobile-phones">Mobile Phones</Link>
          <Link href="/motors">Cars</Link>
          <Link href="/bikes">Motorcycles</Link>
          <Link href="/property-for-rent">Houses</Link>
          {/* <Link href="/tv-audio">TV - Video - Audio</Link> */}
          {/* <Link href="/electronics-and-home-appliances">Appliances</Link> */}
          <Link href="/property-for-sale">Land & Plots</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// import React from "react";
// import { Image, Button, Dropdown, DropdownItem } from "react-bootstrap";
// import { auth } from "../../firebase";
// import { useAuthState } from "react-firebase-hooks/auth";
// import styles from

// const handleLogout = () => {
//   auth.signOut();
// };

// const Navbar = () => {
//   const [user] = useAuthState(auth);

//   return (
//     <nav className={styles.navbar}>
//       <title>OLX - Buy And Sell For Free Enywhere</title>
//       <div className={styles.topLine}>
//         <div>
//           <Link href="/">
//             <Image src="/logo.jpg" height={50} width={50} alt="Company Logo" />
//           </Link>
//         </div>
//         <div className={styles.categoriesProp}>
//           <Link href="/motors">Motors</Link>
//           <Link href="/property">Property</Link>
//         </div>
//       </div>
//       <div className={styles.bottomLine}>
//         <div className={styles.searchBox}>
//           <input type="text" placeholder="Pakistan" />
//         </div>

//         <div className={styles.searchBox}>
//           <input
//             type="text"
//             placeholder="Find Cars, Mobile Phones and more..."
//           />
//         </div>

//         {user ? (
//           <>
//             {
//               <Image
//                 src="/images/iconProfilePicture.png"
//                 alt="Profile image"
//                 width={20}
//                 height={50}
//               >
//                 <Dropdown
//                   title={user.name}
//                   id="profile-dropdown"
//                   onSelect={handleLogout}
//                 >
//                   <DropdownItem href="/profile">View and edit profile</DropdownItem>
//                   <DropdownItem href="/my-adds">My adds</DropdownItem>
//                   <DropdownItem href="/buy-package">Buy package</DropdownItem>
//                   <DropdownItem href="/logout">Log out</DropdownItem>
//                 </Dropdown>
//             }
//           }
//         ) : (
//           <div className={styles.login}>
//             <Link href="/login">Login</Link>
//           </div>
//         )}

//         <div className={styles.sellButton}>
//           <button>Sell</button>
//         </div>
//       </div>
//       <div className={styles.thirdLine}>
//         <div className={styles.categoriesDropdown}>
//           <CategoriesDropdown />
//           {/* <a href="#">All categories</a> */}
//           {/* <MultilevelDropdown categories={categoriesData} /> */}
//         </div>
//         <div className={styles.categories}>
//           <Link href="/mobile-phones">Mobile Phones</Link>
//           <Link href="/vehicles">Cars</Link>
//           <Link href="/bike">Motorcycles</Link>
//           <Link href="/property-for-rent">Houses</Link>
//           <Link href="/tv-audio">TV - Video - Audio</Link>
//           <Link href="/electronics-and-home-appliances">Appliances</Link>
//           <Link href="/property-for-sale">Land & Plots</Link>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
