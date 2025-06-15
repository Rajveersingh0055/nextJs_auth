"use client"; // This is a client component which means it can only be used on the client side and not on the server side 
import React from "react";
import { useRouter , } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function SignupPage() {
    const [user , setUser] = React.useState({
        email:"",
        password:"",
        username:"",
    })
    const onSignup = async () => {
        
    }
    return (
      <div className="flex flex-col bg-[#151212] items-center justify-center min-h-screen py-2">
        <h1>Signup</h1>
        <br />
        <label htmlFor="username"> username</label>
        <input
          className="p-2 border hover:bg-gray-300 text-gray-500 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          id="username"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="username"
        />
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
            onClick={onSignup}
        >
          Signup
        </button>
        <Link className="px-3 py-2 text-gray-300 text-[15px]" href="/login">Already have an account? Login</Link>
      </div>
    );
}