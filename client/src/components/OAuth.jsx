import React from "react";
import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../Firebase";
import { useDispatch } from "react-redux";
import { setUser, setError, setSuccess } from "../redux/user/userslice";
import { useNavigate } from "react-router-dom";

export default function OAuth() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        dispatch(setUser(data.result));
        dispatch(setSuccess("Login successful!"));
        navigate("/dashboard");
        console.log("Google sign-in successful:", data);
      } else {
        dispatch(
          setError({
            field: "general",
            message: data.message || "An error occurred",
          })
        );
        console.log("Google sign-in failed:", data);
      }
    } catch (error) {
      dispatch(
        setError({ field: "general", message: "Could not sign in with Google" })
      );
      console.log("Couldn't sign in with Google", error);
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="flex items-center bg-red-500 w-full justify-center text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-600 transition duration-300"
    >
      <FaGoogle className="mr-3" />
      Continue with Google
    </button>
  );
}
