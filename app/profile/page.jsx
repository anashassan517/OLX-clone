"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { collection, doc, setDoc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import MainLayout from "@/components/layout/RootLayout";
import Footer from "@/components/Footer";

const Profile = () => {
  const [displayName, setDisplayName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Fetch the user's profile details from Firestore and populate the form fields
    const fetchUserProfile = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          
          // return;
          router.push("/login");
          return null;
        }
        if (user) {
          const userRef = doc(
            collection(db, "users"),
            user.uid,
            "user_profile",
            user.uid
          );
          const docSnapshot = await userRef.get();

          if (docSnapshot.exists()) {
            const userData = docSnapshot.data();
            setDisplayName(userData.displayName || "");
            setContactNo(userData.contact_no || "");
            setAboutMe(userData.about_me || "");
            setGender(userData.gender || "");
            setLocation(userData.location || "");
          }
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(
          collection(db, "users"),
          user.uid,
          "user_profile",
          user.uid
        );
        await setDoc(
          userRef,
          {
            displayName,
            contact_no: contactNo,
            about_me: aboutMe,
            gender,
            location,
          },
          { merge: true }
        );

        alert("Profile updated successfully!");
        setFormData({
          displayName: "",
          contact_no: "",
          about_me: "",
          gender: "",
          location: "",
        });
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };
  const handleDeleteAccount = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(
          collection(db, "users"),
          user.uid,
          "user_profile",
          user.uid
        );
        await deleteDoc(userRef); // Delete user data from Firestore
        // await deleteUser(user); // Delete user account from Firebase

        alert("Account deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting user account:", error);
    }
  };

  return (
    <>
      <MainLayout>
        <div className="p-4">
          <h2 className="py-0 text-center text-2xl font-bold mb-1">
            Edit Profile
          </h2>
          <form
            onSubmit={handleSubmit}
            className="px-96 grid grid-cols-1 gap-4"
          >
            <label className="block mb-0">Display Name:</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Enter Display Name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
            <label className="block mb-0">Contact Number:</label>
            <input
              type="text"
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
              placeholder="Enter Contact Number"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
            <label className="block mb-0">About Me:</label>
            <textarea
              value={aboutMe}
              onChange={(e) => setAboutMe(e.target.value)}
              placeholder="Tell something about yourself"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
            <label className="block mb-0">Gender:</label>
            <input
              type="text"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              placeholder="Enter Gender"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
            <label className="block mb-0">Location:</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter Location"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
            <div className="container py-2 px-10 mx-0 min-w-full flex flex-col items-center">
              <button
                type="submit"
                className="bg-black text-white py-4 px-4 rounded-md"
              >
                Save
              </button>
            </div>
          </form>
          <h1 className="py-2 text-center text-black text-2xl">
            Delete this account
          </h1>
          <h1 className="text-center text-black text-2xl">
            Are you sure you want to delete your account?
          </h1>
          <div className="container px-10 mx-0 min-w-full flex flex-col items-center">
            <button
              onClick={handleDeleteAccount}
              className="bg-red-600 text-white py-2 px-9 rounded-md mt-4"
            >
              Delete Your Account
            </button>
          </div>
        </div>
      </MainLayout>
      <Footer />
    </>
  );
};

export default Profile;
