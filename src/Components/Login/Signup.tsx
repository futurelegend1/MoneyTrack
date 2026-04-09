import React from "react";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase";
import { db } from "../../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

function Signup({ handleVisible }: { handleVisible: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);

  const defaultPhotoURL =
    "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  // Validate form inputs before attempting signup
  const validateForm = () => {
    if (!email.includes("@")) {
      return "Invalid email address";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }
    if (password !== confirmPassword) {
      return "Passwords do not match";
    }
    if (username.trim() === "") {
      return "Username is required";
    }
    return null;
  };

  //handle signup with email and password, create a new user document in firestore, send email verification
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: username,
        photoURL: defaultPhotoURL,
      });
      await setDoc(doc(db, "users", user!.uid), {
        uid: user!.uid,
        email: user!.email,
        name: user!.displayName,
        username: user!.displayName,
        photoURL: user!.photoURL,
        createdAt: serverTimestamp(),
      });
      await sendEmailVerification(user);
      alert("Signup successful! Please check your email for verification.");
      await auth.signOut();
      handleVisible();
    } catch (error: unknown) {
      setError((error as Error).message);
    }
  };

  return (
    <form
      action="submit"
      className="grid sm:min-w-lg min-w-sm border-2 border-slate-700 rounded-4xl p-10 gap-4 pt-18"
    >
      <div className="relative mb-8">
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="email"
          placeholder="you@example.com"
          className="peer border-b-2 w-full border-slate-600 py-2 px-2 text-xl placeholder-transparent focus:placeholder-slate-400 outline-none"
        />
        <label
          htmlFor="email"
          className="text-white text-xl absolute top-0 left-2 transition-all duration-300 peer-focus:-top-8 peer-not-placeholder-shown:-top-8"
        >
          Email
        </label>
      </div>

      <div className="relative mb-8">
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="password"
          placeholder="••••••••"
          className="peer border-b-2 w-full border-slate-600 py-2 px-2 outline-none text-xl placeholder-transparent focus:placeholder-slate-400"
        />
        <label
          htmlFor="password"
          className="text-white text-xl absolute left-2 top-0 transition-all duration-300 peer-focus:-top-8 peer-not-placeholder-shown:-top-8"
        >
          Password
        </label>
      </div>

      <div className="relative mb-8">
        <input
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          id="confirmPassword"
          placeholder="••••••••"
          className="peer border-b-2 w-full border-slate-600 py-2 px-2 outline-none text-xl placeholder-transparent focus:placeholder-slate-400"
        />
        <label
          htmlFor="confirmPassword"
          className="text-white text-xl absolute left-2 top-0 transition-all duration-300 peer-focus:-top-8 peer-not-placeholder-shown:-top-8"
        >
          Confirm Password
        </label>
      </div>

      <div className="relative mb-4">
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          id="username"
          placeholder="Your Username"
          className="peer border-b-2 w-full border-slate-600 py-2 px-2 text-xl placeholder-transparent focus:placeholder-slate-400 outline-none"
        />
        <label
          htmlFor="username"
          className="text-white text-xl absolute top-0 left-2 transition-all duration-300 peer-focus:-top-8 peer-not-placeholder-shown:-top-8"
        >
          Username
        </label>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-400 text-md p-2 -mt-2 rounded-xl">
          {error}
        </div>
      )}

      <button
        onClick={handleSignup}
        type="submit"
        className="w-full h-15 sm:text-xl text-lg flex items-center justify-center gap-2 border-2 border-slate-600 rounded-3xl py-2 hover:bg-emerald-500 hover:scale-105 hover:py-5 text-white transition-transform"
      >
        Sign Up
      </button>

      <div className="flex items-center">
        <div className="flex-1 h-px bg-slate-600"></div>
        <span className="px-4 text-slate-400 text-md">OR</span>
        <div className="flex-1 h-px bg-slate-600"></div>
      </div>

      <p className="text-center text-slate-400 sm:text-lg text-md">
        Already have an account?{" "}
        <button
          onClick={handleVisible}
          className="text-emerald-400 hover:underline"
        >
          Sign in
        </button>
      </p>
    </form>
  );
}

export default Signup;
