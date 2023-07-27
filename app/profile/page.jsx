"use client";

import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase"; // Update the path to your Firebase configuration file
// import MainLayout from "@/components/layout/RootLayout";
import MainLayout from "../../components/layout/RootLayout";


const Profile = ({ user }) => {
  
  console.log({ user });
  const [formData, setFormData] = useState({
    full_name: user?.full_name || "",
    gender: user?.gender || "",
    contact_no: user?.contact_no || "",
    email: user?.email || "",
    about_me: user?.about_me || "",
  });

  const handleChange = (e) => {
    console.log("Handle change clicked");
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure the user is authenticated before updating the profile
      if (!user) {
        console.error("User not authenticated.");
        return;
      }

      const profileRef = doc(db, "profiles", user.uid); // Assuming 'profiles' is the collection name
      await updateDoc(profileRef, formData);
      console.log("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <MainLayout>

    <div>
      <h1> Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div class="mb-70">
          <label htmlFor="full_name">Full Name</label>
          <input
            type="text"
            id="full_name"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
          />
        </div>
        <div class="mb-4">
          <label htmlFor="gender">Gender</label>
          <input
            type="text"
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          />
        </div>
        <div class="mb-4">
          <label htmlFor="contact_no">Contact No</label>
          <input
            type="tel"
            id="contact_no"
            name="contact_no"
            value={formData.contact_no}
            onChange={handleChange}
          />
        </div>
        <div class="mb-4">
          <label htmlFor="about_me">About Me</label>
          <textarea
            id="about_me"
            name="about_me"
            value={formData.about_me}
            onChange={handleChange}
          />
        </div>
        <button type="submit" class="w-full">
          Save Changes
        </button>
      </form>
    </div>
            </MainLayout>
  );
};

export default Profile;

// import React, { useState } from "react";
// import { db } from "../../firebase"; // Update the path to your Firebase configuration file

// const Profile = ({ user }) => {
//   const [formData, setFormData] = useState({
//     name: user?.name || "",
//     email: user?.email || "",
//     contactNo: user?.contactNo || "",
//     aboutMe: user?.aboutMe || "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     console.log("submit button clicked");
//     e.preventDefault();

//     // Update the user profile information in the Firebase Firestore database
//     try {
//       await db.collection("profile").doc(user.uid).set({
//         full_name: formData.name,
//         email: formData.email,
//         contact_no: formData.contactNo,
//         about_me: formData.aboutMe,
//       });

//       console.log("Profile information updated successfully!");
//     } catch (error) {
//       console.error("Error updating profile information:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Edit Profile</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="name">Name</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="contactNo">Contact No</label>
//           <input
//             type="tel"
//             id="contactNo"
//             name="contactNo"
//             value={formData.contactNo}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="aboutMe">About Me</label>
//           <textarea
//             id="aboutMe"
//             name="aboutMe"
//             value={formData.aboutMe}
//             onChange={handleChange}
//           />
//         </div>
//         <button type="submit">Save Changes</button>
//       </form>
//     </div>
//   );
// };

// export default Profile;
