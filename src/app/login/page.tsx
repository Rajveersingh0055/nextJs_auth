"use client"; // This is a client component which means it can only be used on the client side and not on the server side
import React, { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {

  const router = useRouter();

  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const [loading , setLoading] = React.useState(false);

  const onLogin = async () => {
 try {
  setLoading(true);
const response = await axios.post("/api/users/login", user);
console.log("Login success", response.data);
toast.success("Login successful! Please wait.");
router.push("/profile"); // Redirect to profile page after successful login
  // You can also store the token in localStorage or cookies if needed
} catch (error:any) {
   console.log("Login failed", error.message);
   toast.error(error.message);
 } finally {
   setLoading(false);
  }
  };

  return (

    <div className="flex flex-col bg-[#151212] items-center justify-center min-h-screen py-2">
      <h1>{loading ? "processing" : "Login"}</h1>
      <br />
      <label htmlFor="email"> email</label>
      <input
        className="p-2 border hover:bg-gray-300 text-black border-gray-900 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="email"
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password"> password</label>
      <input
        className="p-2 border hover:bg-gray-300 text-gray-500 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 border border-blue-600 transition-colors duration-300"
        onClick={onLogin}
      >
        {buttonDisabled ? "Please login " : " Login"}
      </button>
      <Link className="px-3 py-2 text-gray-300 text-[15px]" href="/signup">
        Don't have an account? Signup
      </Link>
    </div>
  );
}
