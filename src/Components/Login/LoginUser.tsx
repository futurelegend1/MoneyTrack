import { FcGoogle } from "react-icons/fc";
import React from "react";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

function LoginUser({ handleVisible }: { handleVisible: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      if (!user.emailVerified) {
        setError("Please verify your email before logging in.");
        await auth.signOut();
        return;
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <form
      action="submit"
      className="grid min-w-lg border-2 border-slate-700 rounded-4xl p-10 gap-4 pt-18"
    >
      {error && (
        <p className="bg-red-500/20 border border-red-500 text-red-400 text-md p-2 -mt-2 rounded-xl">
          {error}
        </p>
      )}
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

      <div className="relative mb-4">
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

      <button
        type="submit"
        onClick={handleLogin}
        className="flex justify-center items-center text-white text-xl w-full h-15 border-2 border-slate-600 rounded-3xl py-2 hover:bg-emerald-500 hover:scale-105 hover:py-5 transition-transform"
      >
        Sign In
      </button>

      <div className="flex items-center">
        <div className="flex-1 h-px bg-slate-600"></div>
        <span className="px-4 text-slate-400 text-md">OR</span>
        <div className="flex-1 h-px bg-slate-600"></div>
      </div>

      <button className="w-full h-15 text-lg mt-8 flex items-center justify-center gap-2 border-2 border-slate-700 rounded-3xl py-2 hover:bg-slate-800 hover:text-white transition">
        <FcGoogle size={22} />
        Continue with Google
      </button>

      <p className="text-center text-slate-400 text-lg mt-6">
        Don’t have an account?{" "}
        <button
          onClick={handleVisible}
          className="text-emerald-400 hover:underline"
        >
          Sign up
        </button>
      </p>

      <p className="text-center text-slate-400 text-lg">
        Forgot your password?{" "}
        <button className="text-emerald-400 hover:underline">
          Reset it here
        </button>
      </p>
    </form>
  );
}
export default LoginUser;
