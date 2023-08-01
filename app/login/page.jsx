"use client";
import Link from "next/link";
// import styles from "./Login.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { db, auth, googleProvider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import FacebookLoginButton from "./FacebookLoginButton";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

const Login = () => {
  const [user, setUser] = useState(null);

  const router = useRouter();
  const [loading, error] = useAuthState(auth);

  // Check if the user is authenticated and redirect to login page if not
  if (loading) {
    // You can show a loading indicator here if needed
    router.push("/"); // Replace "/login" with the actual path to your login page
    return null;
  }

  const handleSignInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Update user details on Firestore
      const userRef = doc(
        collection(db, "users"),
        user.uid,
        "user_profile",
        user.uid
      );
      await setDoc(
        userRef,
        {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          contact_no: user.phoneNumber,
          location: " ",
          gender: " ",
          about_me: " ",
          // Add any other user details you want to store in Firestore
        },
        { merge: true }
      );

      console.log(user); // You can access user information here
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="mb-6">
        <Link href="/">
          <Image src="/logo.jpg" alt="OLX Logo" width={200} height={200} />
        </Link>
      </div>
      <h2 className="text-black text-3xl font-bold mb-4">WELCOME TO OLX</h2>
      <p className="text-gray-600 mb-8">
        The trusted community of buyers and sellers.
      </p>
      <div className="flex flex-col space-y-4">
        <button
          onClick={handleSignInWithGoogle}
          className="bg-red-600 text-white rounded-md py-2 px-4 w-64 text-center"
        >
          Sign In with Google
        </button>
        <FacebookLoginButton />
        <button className="bg-slate-500 text-white rounded-md py-2 px-4 w-64 text-center">
          Continue with Phone
        </button>
      </div>
    </div>
  );
};

export default Login;
